// @Arturozh

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var webpack = require('webpack');
var helpers = require('./helpers');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');
var METADATA = {
  title: 'Angular2 Minimal Starter',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV,
  HMR: HMR
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  return {
    // for faster builds use 'eval'
    devtool: 'source-map',
    // cache: false,

    // our angular app
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'main': './src/main.ts',
    },

    // Config for our build files
    output: {
      path: helpers.root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    /*
    * Options affecting the resolving of modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#resolve
    */
    resolve: {

      /*
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js', '.json'],

      // An array of directory names to be resolved to the current directory
      modules: [helpers.root('src'), 'node_modules'],

    },
    module: {
      rules: [
        // Support for .ts files.
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        // Support for *.json files.
        {
          test: /\.json$/,
          loader: 'json-loader'
        },

        // support for .html as raw text
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },

        // Component specific sass should be included in the component
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loaders: ['raw-loader', 'sass-loader'],
        },
      ]
    },

    plugins: [
      // Plugin: ForkCheckerPlugin
      // Description: Do type checking in a separate process, so webpack don't need to wait.
      //
      // See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
      new ForkCheckerPlugin(),
      /*
      * Plugin: CommonsChunkPlugin
      * Description: Shares common code between the pages.
      * It identifies common modules and put them into a commons chunk.
      *
      * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
      * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
      */
      new webpack.optimize.CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),

      // Plugin: CopyWebpackPlugin
      // Description: Copy files and directories in webpack.
      //
      // Copies project static assets.
      //
      // See: https://www.npmjs.com/package/copy-webpack-plugin
      new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),

      // Plugin: HtmlWebpackPlugin
      // Description: Simplifies creation of HTML files to serve your webpack bundles.
      // This is especially useful for webpack bundles that include a hash in the filename
      // which changes every compilation.
      //
      // See: https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin(
        {
          template: 'src/index.html',
          title: METADATA.title,
          chunksSortMode: 'dependency',
          metadata: METADATA,
        }
      ),

      // Plugin: DefinePlugin
      // Description: Define free variables.
      // Useful for having development builds with debug logging or adding global constants.
      //
      // Environment helpers
      //
      // See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
      new webpack.DefinePlugin({ 'ENV': JSON.stringify(METADATA.ENV), 'HMR': HMR }),
      /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * See: https://github.com/angular/angular/issues/11580
       */
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      ),
      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug: true,
        options: {
          /**
           * Static analysis linter for TypeScript advanced options configuration
           * Description: An extensible linter for the TypeScript language.
           *
           * See: https://github.com/wbuchwalter/tslint-loader
           */
          tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
          },
        }
      }),
    ],
    // our Webpack Development Server config
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      // contentBase: 'src/',
      historyApiFallback: true,
      watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },
    // we need this due to problems with es6-shim
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  }
}
