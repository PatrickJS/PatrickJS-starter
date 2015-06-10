var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var path = require('path');

module.exports = {
  devtool: 'source-map',
  // devtool: 'eval',

  //
  entry: {
    angular2: [
      // Angular 2 Deps
      'zone.js',
      // 'zone.js/dist/long-stack-trace-zone.js',
      'reflect-metadata',
      'rtts_assert/rtts_assert',

      './src/common/BrowserDomAdapter',

      'angular2/angular2',
      'angular2/router',
      'angular2/di',
      'angular2/src/facade/browser'
    ],
    app: [
      // App

      // 'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/dev-server',

      /*
      // * include any 3rd party js lib here
      */
      './src/app/bootstrap'
    ]
  },

  // Config for our build files
  output: {
    path: root('public/__build__'),
    filename: '[name].js',
    // filename: '[name].[hash].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
    // publicPath: 'http://mycdn.com/'
  },

  resolve: {
    root: __dirname,
    extensions: [
      '',
      '.ts',
      '.js',
      '.json',
      '.webpack.js',
      '.web.js'
    ],
    alias: {
      // When Angular2 has a TypeScript build
      // we can switch between development and production
      // 'angular2': 'angular2/es6/prod',
      // 'angular2': 'angular2/es6/dev',

      'app': 'src/app',
      'common': 'src/common',

      // 'components': 'src/app/components'
      // 'services': '/app/services/*.js',
      // 'stores/*': '/app/stores/*.js'
      // 'angular2': 'angular2/es6/dev'
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
      { test: /\.ts$/,    loader: 'typescript-simple' }
    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    }),
    new webpack.DefinePlugin({
      'ENV': {
        'type': JSON.stringify('development'),
        'debug': true
      }
    }),

    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: './src/index.html',
    //   title: getBanner(),
    //   filename: '../index.html',
    //   chunks: ['shared']
    // }),

    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_debugger: false
    //   }
    // beautify: false
    // }),

    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin(getBanner())
  ],
  // our Development Server configs
  devServer: {
    inline: true,
    colors: true,
    historyApiFallback: true,
    contentBase: 'public',
    publicPath: '/__build__'
  },
  debug: true,
  cache: true,

  context: __dirname,
  stats: { colors: true, reasons: true }
};

function getBanner() {
  return 'Angular2 Webpack Starter by @gdi2990 from @AngularClass';
}

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
function rootNode(args) {
  args = sliceArgs(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}

