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

/**
 * Webpack configuration
 *
 * See: https://webpack.js.org/configuration/
 */
module.exports = function(envOptions) {
  const ENV = (process.env.ENV = process.env.NODE_ENV = 'development');
  const HOST = process.env.HOST || 'localhost';
  const PORT = process.env.PORT || 3000;

  //in order of priority:
  // first the data from 'buildUtils.DEFAULT_METADATA';
  // then, if they exist, they are overwritten by process.env (eg pre-existing environment variables or 'cross-env BUILD_AOT = 1 SOURCE_MAP = 0 npm run webpack')
  // then, if they exist, they are overwritten by envOptions.metadata (ex: --env.metadata.distSufixTarget=prod ou --env.metadata.title=title_setted_by_argument)
  const METADATA = 
    buildUtils.deepMerge(
      {},
      buildUtils.DEFAULT_METADATA, 
      {
        host: HOST,
        port: PORT,
        buildMode: ENV,
        HMR: helpers.hasProcessFlag('hot'),
        PUBLIC: process.env.PUBLIC_DEV || HOST + ':' + PORT,
        //deprecated for distSufixTarget by argument. Exe: --env.metadata.distSufixTarget=dev
        //envFileSuffix
        distSufixTarget: 'dev'
      },
      //envOptions.metadata has priority over the other
      envOptions? envOptions.metadata : {});


  const NEW_ENV_OPTIONS = buildUtils.deepMerge({}, envOptions, { metadata: METADATA });
  return webpackMerge(commonConfig(NEW_ENV_OPTIONS), {
    mode: METADATA.buildMode,
    devtool: 'inline-source-map',

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
      libraryTarget: 'var'
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
        }
      ]
    },

    plugins: [
      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug: true,
        options: {}
      })
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
