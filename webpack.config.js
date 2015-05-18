var webpack = require('webpack');

module.exports = {
  devtool: '#eval-source-map',
  devServer: {
    contentBase: 'public',
    publicPath: '/__build__'
  },

  debug: true,
  cache: false,

  context: __dirname,

  entry: {
    shared: [
      // Angular 2 Deps
      'zone.js',
      'reflect-metadata',
      'rtts_assert/rtts_assert',

      './src/common/BrowserDomAdapter',

      'angular2/angular2',
      'angular2/router'
    ],
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
      '.ts',
      '.json',
      '.webpack.js',
      '.web.js'
    ],
    // Todo: learn more about aslias
    alias: {
      // 'angular2$': '/node_modules/angular2/atscript/angular2',
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
      { test: /\.json$/,                    loader: 'json-loader' },
      // Support for CSS (with hot module replacement)
      { test: /\.css$/,                     loader: 'style-loader!css-loader' },
      // Copy all assets in to asset folder (use hash filename)
      { test: /\.(png|jpg|gif|woff|eot|ttf|svg)$/,      loader: 'file-loader?name=assets/[hash].[ext]' },
      // Copy all .html as static file (keep filename)
      { test: /index[a-z-]*\.html$/,        loader: 'file-loader?name=[path][name].html&context=./src' },
      // Support for .ts files.
      { test: /\.ts$/,                      loader: 'typescript-simple-loader' }
    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/
    ]
  },

  plugins: [
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      minChunks: Infinity,
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_debugger: false
    //   }
    // }),
    new webpack.BannerPlugin(getBanner(), {raw: true})
  ]

};

function getBanner() {
  return '// Angular 2, TypeScript 1.5, and Webpack Starter Kit by @gdi2290 from AngularClass \n';
}


