const devConfig = require('./webpack.browser.dev');
const commonConfig = require('./webpack.renderer.common');
const webpackMerge = require('webpack-merge');

module.exports = () => {
  return webpackMerge(devConfig(), commonConfig(), {
  });
}
