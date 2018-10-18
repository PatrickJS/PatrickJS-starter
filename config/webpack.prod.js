/**
 * @author: tipe.io
 */
const helpers = require('./helpers');
const buildUtils = require('./build-utils');

/**
 * Used to merge webpack configs
 */
const webpackMerge = require('webpack-merge');

/**
 * The settings that are common to prod and dev
 */
const commonConfig = require('./webpack.common.js');

/**
 * Webpack Plugins
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/***
 * Ref: https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
 * @param supportES2015
 * @param enableCompress disabling compress could improve the performance, see https://github.com/webpack/webpack/issues/4558#issuecomment-352255789
 * @returns {{ecma: number, warnings: boolean, ie8: boolean, mangle: boolean, compress: {pure_getters: boolean, passes: number}, output: {ascii_only: boolean, comments: boolean}}}
 */
function getUglifyOptions(supportES2015, enableCompress) {
  const uglifyCompressOptions = {
    pure_getters: true /* buildOptimizer */,
    // PURE comments work best with 3 passes.
    // See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
    passes: 2, /* buildOptimizer */
    //https://github.com/mishoo/UglifyJS2/issues/1609
    collapse_vars: false,
    reduce_vars: false
  };

  return {
    ecma: supportES2015 ? 6 : 5,
    warnings: false, // TODO verbose based on option?
    ie8: false,
    mangle: true,
    compress: enableCompress ? uglifyCompressOptions : false,
    output: {
      ascii_only: true,
      comments: false
    }
  };
}

module.exports = function(envOptions) {
  const ENV = (process.env.NODE_ENV = process.env.ENV = 'production');
  const supportES2015 = buildUtils.supportES2015(buildUtils.DEFAULT_METADATA.tsConfigPath);
  const sourceMapEnabled = process.env.SOURCE_MAP === '1';
  //in order of priority:
  // first the data from 'buildUtils.DEFAULT_METADATA';
  // then, if they exist, they are overwritten by process.env (eg pre-existing environment variables or 'cross-env BUILD_AOT = 1 SOURCE_MAP = 0 npm run webpack')
  // then, if they exist, they are overwritten by envOptions.metadata (ex: --env.metadata.distSufixTarget=prod ou --env.metadata.title=title_setted_by_argument)
  const NEW_ENV_OPTIONS = buildUtils.getFinalEnvOptions(
    {
      metadata: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 8080,
        buildMode: ENV,
        AOT: true,
        HMR: false,
        distSufixTarget: 'prod',
        sourceMapEnabled: sourceMapEnabled
      },
    },
    envOptions);
  console.log('[webpack.prod.js] final envOptions:\n' + JSON.stringify(NEW_ENV_OPTIONS, null, 2));
  const METADATA = NEW_ENV_OPTIONS.metadata;

  return webpackMerge(commonConfig(NEW_ENV_OPTIONS), {
    mode: METADATA.buildMode,

    devtool: METADATA.sourceMapEnabled? 'source-map' : 'disabled',

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
      filename: '[name].[chunkhash].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
       */
      sourceMapFilename: '[file].map',

      /**
       * The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: https://webpack.js.org/configuration/output/#output-chunkfilename
       */
      chunkFilename: '[name].[chunkhash].chunk.js'
    },

    module: {
      rules: [
        /**
         * Extract CSS files from .src/styles directory to external CSS file
         */
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
          include: [helpers.root('src', 'styles')]
        },

        /**
         * Extract and compile SCSS files from .src/styles directory to external CSS file
         */
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          include: [helpers.root('src', 'styles')]
        }
      ]
    },

    optimization: {
      minimizer: [
        /**
         * Plugin: UglifyJsPlugin
         * Description: Minimize all JavaScript output of chunks.
         * Loaders are switched into minimizing mode.
         *
         * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
         *
         * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
         */
        new UglifyJsPlugin({
          sourceMap: METADATA.sourceMapEnabled,
          parallel: true,
          cache: helpers.root('webpack-cache/uglify-cache'),
          uglifyOptions: getUglifyOptions(supportES2015, true)
        })
      ],
      splitChunks: {
        chunks: 'all'
      }
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: https://webpack.js.org/configuration/plugins/
     */
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name]-[hash].css', chunkFilename: '[name]-[chunkhash].css' }),
      new HashedModuleIdsPlugin()
    ],

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.js.org/configuration/node/
     */
    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      fs: 'empty'
    }
  });
};
