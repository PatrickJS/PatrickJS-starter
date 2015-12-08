// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var toString  = Function.prototype.call.bind(Object.prototype.toString);
var path = require('path');
var webpack = require('webpack');
// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

/*
 * Config
 */
module.exports = {
  devtool: 'source-map', // for faster builds use 'eval'
  debug: true,

  // our Webpack Development Server config
  devServer: {
    historyApiFallback: true,
    contentBase: 'src/public',
    publicPath: '/__build__'
  },

  entry: {
    'angular2': [
      // group angular2 deps into the angular2.js file
      'rxjs',
      'zone.js',
      'reflect-metadata',
      'angular2/angular2',
      'angular2/core',
      'angular2/router',
      'angular2/http'
    ],
    'app': './src/app/bootstrap' // our angular app
  },

  // Config for our build files
  output: {
    path: root('__build__'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['','.ts','.js','.json', '.css', '.html'],
    alias: {
      'rxjs/operators/toPromise': 'rxjs/operator/toPromise.js'
    }
  },

  module: {
    loaders: [
      // Support for *.json files.
      { test: /\.json$/,  loader: 'json' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw' },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw' },

      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts',
        query: { 'ignoreDiagnostics': [ 2403 ] }, // 2403 -> Subsequent variable declarations
        exclude: [ /\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/ ]
      }
    ]
  },

  plugins: [
    new CommonsChunkPlugin({ name: 'angular2', filename: 'angular2.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common',   filename: 'common.js' })
  ]
};

// Helper functions

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = sliceArgs(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
