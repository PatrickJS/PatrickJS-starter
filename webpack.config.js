var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
// var CODE = __dirname+'/src';
var TRACEUR_RUNTIME = require('traceur-compiler-loader').runtime;



module.exports = {
  devtool: '#eval-source-map',
  devServer: {
    contentBase: 'public',
    // publicPath: 'public'
  },
  debug: true,
  cache: false,

  context: __dirname,
  publicPath: 'public',

  entry: {
    shared: [
      // 'zone.js',
      // 'zone.js/long-stack-trace-zone.js',
      'rtts_assert/rtts_assert',
      './src/common/shared'
    ],
    // angular2: 'angular2/angular2',
    app: './src/app/bootstrap'
  },
  output: {
    path: 'public/__build__',
    filename: '[name].js',
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
      '.es6',
      '.es6.js',
      '.es7',
      '.ts',
      '.json',
      '.webpack.js',
      '.web.js'
    ],
    // Todo: learn more about aslias
    // alias: {
      // 'angular2$': '/node_modules/angular2/atscript/angular2',
      // 'app/*': '/app/*'
      // 'components$': '/src/app/components/'
      // 'decorators/*': '/app/decorators/*.js',
      // 'services/*': '/app/services/*.js',
      // 'stores/*': '/app/stores/*.js'
    // },
    modulesDirectories: [
      'web_modules',
      'node_modules',
      'src/app' // hard coded for now until I figure out alias
    ]
  },

  module: {
    loaders: [
      // Define assert in global
      // { test: require.resolve('angular2/angular2'), loader: "traceur-compiler-loader?" },
      // { test: require.resolve('rtts_assert/rtts_assert'), loader: "imports?window&zone" },
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
      { test: /\.es6$/,                      loader: 'babel-loader' },
      // Support for .ts files.
      { test: /\.ts$/,                      loader: 'typescript-loader' },
      // Support for .es7 files.
      { test: /\.es6\.js$/,                      loader: ['traceur-compiler-loader'].concat([
                                              // 'inputSourceMap=true',
                                              // 'imports=true',
                                              'runtime=false',
                                              'sourceMaps=true',
                                              'moduleName=true',
                                              'modules=commonjs',
                                              'experimental',
                                              'types',
                                              'annotations',
                                              'memberVariables'
                                              // 'typeAssertionModule="rtts_assert"'
                                            ].join('&')).join('?')
      }
    ],
    noParse: [
      new RegExp(TRACEUR_RUNTIME),
      /rtts_assert\/src\/rtts_assert/,
      /\/zone\.js$/
    ]
  },

  plugins: [
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',

      // filename: "vendor.js"
      // (Give the chunk a different name)

      minChunks: Infinity,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    }),
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

