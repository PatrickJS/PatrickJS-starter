const prodConfig = require('./webpack.browser.prod');
const commonConfig = require('./webpack.renderer.common');
const webpackMerge = require('webpack-merge');

module.exports = () => {
  return webpackMerge(prodConfig(), commonConfig(), {
  });
}
