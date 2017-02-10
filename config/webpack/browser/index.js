/**
 * @author: Michael De Abreu
 *
 * Made for AngularClass
 */

const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const commonConfig = require('./webpack.common.js');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');

module.exports = (env) => webpackMerge(commonConfig(env),
  (env.isProd ? prodConfig : devConfig)(env)
);
