/**
 * @author: @AngularClass
 */

const helpers = require('./helpers');
const dllConfig = require('./dll.config.js');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DllPlugin = require('webpack/lib/DllPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

/**
 + * Webpack configuration
 + *
 + * See: http://webpack.github.io/docs/configuration.html#cli
 + */
module.exports = function(env) {
  return webpackMerge.strategy({entry: 'replace', plugins: 'replace'})(commonConfig({env: env}), {
    
    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: dllConfig,

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {
      path: helpers.root('dll'),
      filename: '[name].dll.js',
      library: '[name]_lib'
    },

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'cheap-module-source-map',

    plugins: [
      /**
        * Plugin: DllPlugin (experimental)
        *
        * See: https://github.com/webpack/docs/wiki/list-of-plugins#dllplugin
        */
      new DllPlugin({
        path: helpers.root('dll/[name]-manifest.json'),
        name: '[name]_lib',
      })
    ]


  })
}
