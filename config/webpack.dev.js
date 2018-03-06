/**
 * @author: tipe.io
 */

const helpers = require('./helpers');
const buildUtils = require('./build-utils');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const EvalSourceMapDevToolPlugin = require('webpack/lib/EvalSourceMapDevToolPlugin');


/**
 * Webpack configuration
 *
 * See: https://webpack.js.org/configuration/
 */
module.exports = function (options) {
  const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
  const HOST = process.env.HOST || 'localhost';
  const PORT = process.env.PORT || 3000;

  const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: helpers.hasProcessFlag('hot'),
    PUBLIC: process.env.PUBLIC_DEV || HOST + ':' + PORT
  });

  return webpackMerge(commonConfig({ env: ENV, metadata: METADATA  }), {
    /**
     * Options affecting the output of the compilation.
     *
     * See: https://webpack.js.org/configuration/output/
     */
    output: {

      /**
       * The output directory as absolute path (required).
       *
       * See: https://webpack.js.org/configuration/output/#output-path
       */
      path: helpers.root('dist'),

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: https://webpack.js.org/configuration/output/#output-filename
       */
      filename: '[name].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
       */
      sourceMapFilename: '[file].map',

      /** The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: https://webpack.js.org/configuration/output/#output-chunkfilename
       */
      chunkFilename: '[id].chunk.js',

      library: 'ac_[name]',
      libraryTarget: 'var',
    },

    module: {

      rules: [

        /**
         * Css loader support for *.css files (styles directory only)
         * Loads external css styles into the DOM, supports HMR
         *
         */
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: [helpers.root('src', 'styles')]
        },

        /**
         * Sass loader support for *.scss files (styles directory only)
         * Loads external sass styles into the DOM, supports HMR
         *
         */
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: [helpers.root('src', 'styles')]
        },

      ]

    },

    plugins: [
      new EvalSourceMapDevToolPlugin({
        moduleFilenameTemplate: '[resource-path]',
        sourceRoot: 'webpack:///'
      }),

      /**
       * Plugin: NamedModulesPlugin (experimental)
       * Description: Uses file names as module name.
       *
       * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
       */
      new NamedModulesPlugin(),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug: true,
        options: { }
      }),

      // TODO: HMR
    ],

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      hot: METADATA.HMR,
      public: METADATA.PUBLIC,
      historyApiFallback: true,
      watchOptions: {
        // if you're using Docker you may need this
        // aggregateTimeout: 300,
        // poll: 1000,
        ignored: /node_modules/
      },
      /**
      * Here you can access the Express app object and add your own custom middleware to it.
      *
      * See: https://webpack.js.org/configuration/dev-server/
      */
      setup: function(app) {
        // For example, to define custom handlers for some paths:
        // app.get('/some/path', function(req, res) {
        //   res.json({ custom: 'response' });
        // });
      }
    },

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.js.org/configuration/node/
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      fs: 'empty'
    }

  });
};
