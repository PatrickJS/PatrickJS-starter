var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
// var CODE = __dirname+'/src';
var TRACEUR_RUNTIME = require('traceur-compiler-loader').runtime;

module.exports = {
  devtool: 'eval-source-map',

  publicPath: 'public',
  context: __dirname,

  entry: {
    common: './src/common/shared',
    // rtts_assert: ['./node_modules/rtts_assert/rtts_assert'],
    // app: ['./src/app/app'],
    app: ['./src/app/app']
  },
  output: {
    path: 'public/__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  devServer: {
    contentBase: 'public',
    publicPath: 'public'
  },

  stats: {
    colors: true,
    reasons: true
  },

  // entry: fs.readdirSync(CODE).reduce(function(entries, dir) {
  //   if (isDirectory(path.join(CODE, dir))) {
  //     entries[dir] = path.join(CODE, dir, 'app.js');
  //   }
  //   return entries;
  // }, {}),

  // output: {
  //   path: 'excercises/__build__',
  //   filename: '[name].js',
  //   chunkFilename: '[id].chunk.js',
  //   publicPath: '/__build__/'
  // },

  resolve: {
    extensions: [
      '',
      '.js',
      '.es6',
      '.es7',
      '.ts',
      '.json',
      '.webpack.js',
      '.web.js'
    ],
    alias: {
      // 'rtts_assert/rtts_assert': 'rtts_assert',
      // 'angular2/angular2': '/../node_modules/angular2/es6/prod/angular2.es6',
      'app/*': '/app/*',
      'components/*': '/app/components/*.js',
      'decorators/*': '/app/decorators/*.js',
      'services/*': '/app/services/*.js',
      'stores/*': '/app/stores/*.js'
    }
  },

  module: {
    loaders: [
      // Define assert in global
      // { test: require.resolve('rtts_assert/rtts_assert'), loader: "expose?$traceurRuntime" },
      // Support for *.json files.
      { test: /\.json$/,                    loader: 'json-loader' },
      // Support for CSS (with hot module replacement)
      { test: /\.css$/,                     loader: 'style-loader!css-loader' },
      // Copy all assets in to asset folder (use hash filename)
      { test: /\.(png|jpg|gif|woff|eot|ttf|svg)$/,      loader: 'file-loader?name=assets/[hash].[ext]' },
      // Load all *.jade as templates
      { test: /(?!\.html)\.jade$/,          loader: 'jade-loader' },
      // Copy all .html.jade as static html files (keep filename)
      { test: /index[a-z-]*\.html\.jade$/,  loader: 'file-loader?name=[path][name]&context=./src!jade-html-loader' },
      // Copy all .html as static file (keep filename)
      { test: /index[a-z-]*\.html$/,        loader: 'file-loader?name=[path][name].html&context=./src' },
      // Support for .es6 files.
      { test: /\.es6/,                      loader: 'babel-loader' },
      // Support for .ts files.
      { test: /\.ts$/,                      loader: 'typescript-loader' },
      // Support for .es7 files.
      { test: /\.es7/,                      loader: [
                                              'traceur-compiler-loader?',
                                              'modules=commonjs&',
                                              'sourceMaps&',
                                              'experimental&',
                                              'runtime=false&',
                                              'types=false&',
                                              'annotations&',
                                              'memberVariables&'
                                              // 'typeAssertionModule="rtts_assert"'
                                            ].join('')
      }
    ]
  },

  noParse: [
    new RegExp(TRACEUR_RUNTIME)
  ],

  plugins: [
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('common', 'shared.js'),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
    new webpack.BannerPlugin(getBanner(), {raw: true})
  ]

};

function getBanner() {
  return '// Angular2 Webpack Seed by @gdi2290 \n';
}

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

