/**
 * @author: @AngularClass
 * 
 * @description: Checks if DLL files are up-to-date and rebuilds them if necessary
 */

"use strict";

const fs = require('fs');
const spawn = require('child_process').spawn;
const equals = require('shallow-equals');
const rimraf = require('rimraf');
const helpers = require('./helpers');
const dllConfig = require('./dll.config');
const findPackageJson = require('find-package-json');

var dllsPresent = checkRequiredFiles(dllConfig);
var dllsOutOfDate;
var currentVersions = getInstalledVersions(dllConfig);

if(dllsPresent) {
  var dllVersions = require(helpers.root('dll', 'dll-versions.json'));
  dllsOutOfDate = !equals(currentVersions, dllVersions);
  if(dllsOutOfDate) {
    console.log('DLLs are out of date, rebuilding...');
  }
} else {
  console.log('DLLs are missing, building...');
}

if(!dllsPresent || dllsOutOfDate) {
  const dllDir = helpers.root('dll');
  if(fs.existsSync(dllDir)) {
    rimraf.sync(dllDir);
  }
  fs.mkdirSync(dllDir);
  saveInstalledVersions(currentVersions);
  rebuildDlls();
} else {
  console.log('DLLs are up-to-date');
}

function dllFileExists(file) {
  return fs.existsSync(helpers.root('dll', file));
}

// Returns true if all the required DLL files are present
function checkRequiredFiles(dllConfig) {
  const bundles = Object.keys(dllConfig);
  var requiredFiles = ['dll-versions.json'];
  var dllFileBases = [
    '.dll.js',
    '-manifest.json'
  ];
  bundles.forEach(bundle => {
    dllFileBases.forEach(base => {
      requiredFiles.push(bundle + base);
    });
  });
  for(var i in requiredFiles) {
    var file = requiredFiles[i];
    if(!dllFileExists(file)) {
      return false;
    }
  }
  return true;
}

// Returns an object with installed versions of all packages in the dllConfig
function getInstalledVersions(dllConfig) {
  var versions = {};
  const bundles = Object.keys(dllConfig);
  bundles.forEach(bundle => {
    dllConfig[bundle].forEach(moduleName => {
      var info = getPackageInfo(moduleName);
      if(info) {
        versions[info.name] = info.version;
      }
    });
  });
  return versions;
}

function getPackageInfo(moduleName) {
  var moduleDir = require.resolve(moduleName);
  var pkg = findPackageJson(moduleDir).next().value;
  if(!pkg || !pkg.name || !pkg.version || !(moduleName.indexOf(pkg.name) > -1)) {
    return;
  }
  return {
    name: pkg.name,
    version: pkg.version
  }
}

function saveInstalledVersions(versions) {
  return fs.writeFileSync(helpers.root('dll', 'dll-versions.json'), JSON.stringify(versions, null, 2));
}

// Run NPM script to rebuild DLLs and forward output to console
function rebuildDlls() {
  const isWin = /^win/.test(process.platform);
  const npmCmd = isWin ? 'npm.cmd' : 'npm';
  var child = spawn(npmCmd, ['run', 'build:dll'], {stdio: 'inherit', cwd: helpers.root('.')});
  child.on('error', function(err) {
    console.error(err);
    process.exit(1); 
  });
  child.on('exit', function(code) {
    process.exit(code);
  });
}
