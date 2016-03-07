// @AngularClass

var helpers = require('./helpers');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*
 * Config
 */
module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          helpers.root('node_modules')
        ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          helpers.root('node_modules/rxjs')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          "compilerOptions": {
            "removeComments": true,
          }
        },
        exclude: [ /\.e2e\.ts$/, helpers.root('node_modules') ]
      },
      { test: /\.json$/, loader: 'json-loader', exclude: [ helpers.root('src/index.html'), helpers.root('node_modules') ] },
      { test: /\.html$/, loader: 'raw-loader', exclude: [ helpers.root('src/index.html'), helpers.root('node_modules') ] },
      { test: /\.css$/,  loader: 'raw-loader', exclude: [ helpers.root('src/index.html'), helpers.root('node_modules') ] }
    ],
    postLoaders: [
      // instrument only testing sources with Istanbul
      {
        test: /\.(js|ts)$/,
        include: helpers.root('src'),
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      // Environment helpers
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    })
  ],
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src',
  }
};

