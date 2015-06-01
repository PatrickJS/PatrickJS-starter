var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);

module.exports = {
  // devtool: 'source-maps',
  devtool: 'eval',
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
      './src/app/bootstrap'
    ]
  },
  output: {
    path: 'public/__build__',
    filename: '[name].js',
    // filename: '[name].[hash].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
    // publicPath: 'http://mycdn.com/'
  },


  stats: {
    colors: true,
    reasons: true
  },



  resolve: {
    root: __dirname,
    extensions: [
      '',
      '.js',
      '.ts',
      // '.es6',
      '.json',
      '.webpack.js',
      '.web.js'
    ],
    // Todo: learn more about alias
    alias: {
      // When Angular2 has a TypeScript build
      // 'angular2': grootNode('angular2/es6/prod'),

      // 'app/*': '/app/*'
      // 'components$': '/src/app/components/'
      // 'decorators/*': '/app/decorators/*.js',
      // 'services/*': '/app/services/*.js',
      // 'stores/*': '/app/stores/*.js'
      // 'angular2': 'angular2/es6/dev'
    },
    modulesDirectories: [
      'web_modules',
      'node_modules',
      'src/app' // hard coded for now until I figure out alias
    ]
  },

  module: {
    loaders: [
      // Support for *.json files.
      { test: /\.json$/,                    loader: 'json' },
      // Support for CSS
      { test: /\.css$/,                     loader: 'raw' },
      // Copy all assets in to asset folder (use hash filename)
      { test: /\.(png|jpg|gif|woff|eot|ttf|svg)$/, loader: 'file?name=assets/[hash].[ext]' },
      // Copy all .html as static file (keep filename)
      // { test: /index[a-z-]*\.html$/,        loader: 'file?name=[path][ ].html&context=./src' },
      // support for .html as static file
      { test: /\.html$/,                    loader: 'raw' },
      // Support for .ts files.
      { test: /\.ts$/,                      loader: 'typescript-simple' }
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin(getBanner())
  ]

};

function getBanner() {
  return 'Angular2 Webpack Starter by @gdi2990 from @AngularClass';
}

function groot(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
function grootNode(args) {
  args = sliceArgs(arguments, 0);
  return groot.apply(path, ['node_modules'].concat(args));
}

