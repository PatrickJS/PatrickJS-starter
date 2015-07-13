// @AngularClass
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var path = require('path');

module.exports = {
  devtool: 'source-map',
  // devtool: 'eval',
  debug: true,
  cache: true,
  // our Development Server configs
  devServer: {
    inline: true,
    colors: true,
    historyApiFallback: true,
    contentBase: 'src/public',
    publicPath: '/__build__'
  },

  //
  entry: {
    'angular2': [
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
    'app': [
      // App

      // 'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/dev-server',

      /*
      // * include any 3rd party js lib here
      */
      './src/app/bootstrap'
    ],
    'app-simple': [
      // Simple Version of App
      /*
      // * include any 3rd party js lib here
      */
      './src/app-simple/bootstrap'
    ]
  },

  // Config for our build files
  output: {
    path: root('__build__'),
    filename: '[name].js',
    // filename: '[name].[hash].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
    // publicPath: 'http://mycdn.com/'
  },

  resolve: {
    root: __dirname,
    extensions: ['','.ts','.js','.json'],
    alias: {
      // we can switch between development and production
      // 'angular2': 'node_modules/angular2/ts',
      // 'angular2': 'angular2/ts/dev',

      'app': 'src/app',
      'common': 'src/common',

      // 'components': 'src/app/components'
      // 'services': '/app/services/*.js',
      // 'stores/*': '/app/stores/*.js'
      // 'angular2': 'angular2/es6/dev'
    }
  },

  /*
   * When using `templateUrl` and `styleUrls` please use `__filename`
   * rather than `module.id` for `moduleId` in `@View`
   */
  node: {
    __filename: true
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
      { test: /^(?!.*(spec|e2e)).*ts$/,    loader: 'typescript-simple?ignoreWarnings[]=2309', exclude: [
          /web_modules/,
          /test/,
          /node_modules/
        ]
      }
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
        'type': JSON.stringify(process.env.NODE_ENV),
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

