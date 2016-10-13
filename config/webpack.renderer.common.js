const helpers = require('./helpers');
const webpack = require('webpack');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

/**
 * Webpack Constants
 */
const METADATA = {
  baseUrl: './',
  ENV: 'renderer',
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = (env) => {
  METADATA.ENV = env
    ? env
    : METADATA.ENV

  return {

    /**
     * Static metadata for index.html
     *
     * See: (custom attribute)
     */
    metadata: METADATA,

    /**
     * The plataform target where the aplication is going to run in.
     * It support target electron-renderer, but is not documented.
     *
     * See: https://webpack.github.io/docs/configuration.html#target
     */

    target: 'electron-renderer',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {

      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: helpers.root('dist'),
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

      /**
       * Automatically loaded modules. Module (value) is loaded when the identifier (key) is used as
       * free variable in a module. The identifier is filled with the exports of the loaded module.
       *
       * See: http://webpack.github.io/docs/list-of-plugins.html#provideplugin
       */
      new ProvidePlugin({
        /*
         * Require the electron module and expose it as a global variable.
         */
        electron: 'electron',
      }),
    ],

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: 'window',
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
};
