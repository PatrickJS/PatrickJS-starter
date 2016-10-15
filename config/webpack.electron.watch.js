const helpers = require('./helpers');
const electronConfig = require('./webpack.electron.common');
const rendererConfig = require('./webpack.renderer.watch');

const webpackMerge = require('webpack-merge');
const { server, client } = require('electron-connect');

const electron = server.create({ path: helpers.root('dist') });

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const WebpackOnBuildPlugin = require('on-build-webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = () => {
  let started = false;

  return [
    // The Electron main thread configuration
    webpackMerge(electronConfig(), {
      plugins: [
        new WebpackOnBuildPlugin(function (stats) {
          if (!started) {
            started = true;
            electron.start();
          } else {
            electron.restart();
          }
        }),
        new ProvidePlugin({
          livesyncClient: client,
        }),
      ],
    }),
    // The Electron renderer thread configuration
    webpackMerge(rendererConfig(), {
      plugins: [
        new WebpackOnBuildPlugin(function (stats) {
          if (started) {
            electron.reload();
          }
        }),
      ],
    }),
  ]
};
