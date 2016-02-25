// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
var zlib = require('zlib');
var webpack = require('webpack');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8080;

var metadata = {
  title: 'Angular2 Webpack Starter by @gdi2990 from @AngularClass',
  baseUrl: '/',
  host: HOST,
  port: PORT,
  ENV: ENV
};
/*
 * Config
 */
module.exports = function makeWebpackConfig(options) {

  //Whether or not we're building for Production
  var PRODUCTION = !!options.PRODUCTION;

  var config = {};

  // static data for index.html
  config.metadata = metadata;

  if (PRODUCTION) {
    config.devtool = 'source-map';
  } {
    config.devtool = 'eval';
  }

  config.debug = !PRODUCTION;

  // our angular app
  config.entry = {
    'polyfills': './src/polyfills.ts',
    'main': './src/main.ts'
  };

  // Config for our build files if building
  if (PRODUCTION) {
    config.output = {
      path: root('dist'),
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[name].[chunkhash].bundle.map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    };
  } else {
    config.output = {
      path: root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    };
  }

  config.resolve = {
    // ensure loader extensions match
    extensions: prepend(['.ts', '.js', '.json', '.css', '.html'], '.async'), // ensure .async.ts etc also works
    cache: !PRODUCTION //Don't cache when building
  };

  config.module = {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: [
        root('node_modules')
      ]
    }, {
      test: /\.js$/,
      loader: "source-map-loader",
      exclude: [root('node_modules/rxjs')]
    }],
    loaders: [
      // Support Angular 2 async routes via .async.ts
      {
        test: /\.async\.ts$/,
        loaders: ['es6-promise-loader', 'ts-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [/\.(spec|e2e|async)\.ts$/]
      },

      // Support for *.json files.
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      // Support for CSS as raw text
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },

      // support for .html as raw text
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [root('src/index.html')]
      }

      // if you add a loader include the resolve file extension above
    ]
  };

  config.plugins = [
    new OccurenceOrderPlugin(true),
    // static assets
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),
    // generating html
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // replace
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    })
  ];

  if (PRODUCTION) {
    config.plugins.push(
      new WebpackMd5Hash(),
      new CommonsChunkPlugin({
        name: 'polyfills',
        filename: 'polyfills.[chunkhash].bundle.js',
        chunks: Infinity
      }),
      new ProvidePlugin({
        // TypeScript helpers
        '__metadata': 'ts-helper/metadata',
        '__decorate': 'ts-helper/decorate',
        '__awaiter': 'ts-helper/awaiter',
        '__extends': 'ts-helper/extends',
        '__param': 'ts-helper/param',
        'Reflect': 'es7-reflect-metadata/src/global/browser'
      }),
      new UglifyJsPlugin({
        // to debug prod builds uncomment //debug lines and comment //prod lines

        // beautify: true,//debug
        // mangle: false,//debug
        // dead_code: false,//debug
        // unused: false,//debug
        // deadCode: false,//debug
        // compress : { screw_ie8 : true, keep_fnames: true, drop_debugger: false, dead_code: false, unused: false, }, // debug
        // comments: true,//debug

        beautify: false, //prod
        // disable mangling because of a bug in angular2 beta.1, beta.2 and beta.3
        // TODO(mastertinner): enable mangling as soon as angular2 beta.4 is out
        // mangle: { screw_ie8 : true },//prod
        mangle: false,
        compress: {
          screw_ie8: true
        }, //prod
        comments: false //prod

      }),
      // include uglify in production
      new CompressionPlugin({
        algorithm: gzipMaxLevel,
        regExp: /\.css$|\.html$|\.js$|\.map$/,
        threshold: 2 * 1024
      })
    );
  } else {
    config.plugins.push(
      new CommonsChunkPlugin({
        name: 'polyfills',
        filename: 'polyfills.bundle.js',
        minChunks: Infinity
      })
    );
  }

  // Other module loader config
  config.tslint = {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  };

  // we need this due to problems with es6-shim
  config.node = {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

  // our Webpack Development Server config
  if (!PRODUCTION) {
    config.devServer = {
      port: metadata.port,
      host: metadata.host,
      // contentBase: 'src/',
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    };
  }

  return config;
};


// Helper functions
function gzipMaxLevel(buffer, callback) {
  return zlib['gzip'](buffer, {
    level: 9
  }, callback)
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function prepend(extensions, args) {
  args = args || [];
  if (!Array.isArray(args)) {
    args = [args]
  }
  return extensions.reduce(function(memo, val) {
    return memo.concat(val, args.map(function(prefix) {
      return prefix + val
    }));
  }, ['']);
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
