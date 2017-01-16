/*
 * Plugin: SpecifyTsFilesPlugin
 * 
 * By default TypeScipt will compile every single .ts file in your project tree.
 * This is inefficient and leads to problems. This plugin specifies your Webpack 
 * entries and any other files you pass in as "files" and writes them to a temporary 
 * tsconfig.json to use for your build. Only the entry files you pass in and their 
 * dependencies will get compiled. This makes builds faster and avoids issues.
 */
'use strict';
const fs = require('fs');
const path = require('path');

function SpecifyTsFilesPlugin(options) {
  this.root = options.root || process.cwd();
  this.entry = options.entry;
  this.otherFilesToCompile = options.otherFilesToCompile || [];
  this.tsConfigBase = options.tsConfigBase || 'tsconfig.json';
  this.customTsConfigFileName = options.customTsConfigFileName || 'tsconfig.temp.json';
}

SpecifyTsFilesPlugin.prototype.apply = function(compiler) {
  if(!this.entry || typeof this.entry !== 'object') {
    throw new Error('SpecifyTsFilesPlugin Error: entry was not specified');
  }
  const allFilesToCompile = Object.keys(this.entry)
    .map(key => this.entry[key])
    .concat(this.otherFilesToCompile);
  const baseConfigData = require(path.join(this.root, this.tsConfigBase));
  const tsConfigContent = Object.assign({}, baseConfigData, {files: allFilesToCompile});
  const customConfigFilePath = path.join(this.root, this.customTsConfigFileName);
  fs.writeFileSync(customConfigFilePath, JSON.stringify(tsConfigContent));
};

module.exports = SpecifyTsFilesPlugin;
