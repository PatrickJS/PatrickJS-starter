/**
 * @author: @AngularClass
 */
const webpack = require('webpack');
const path = require('path');

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const devConfig = require('./webpack.dev.js'); // the settings that are common to prod and dev
const clone = require('js.clone');
/**
 * Webpack Plugins
 */

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(devConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
});

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  var clientConfig = devConfig({ env: ENV });
  clientConfig.output.path = helpers.root('dist/client');
  clientConfig.entry = {
    'polyfills': './src/polyfills.browser.ts',
    'vendor': './src/vendor.browser.ts',
    'main': './src/main.client.ts'
  };

  return clientConfig;
};
