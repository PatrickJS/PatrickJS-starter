// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var helpers = require('./helpers');
// Webpack Plugins
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
var WebpackMd5Hash    = require('webpack-md5-hash');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
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
module.exports = {
  // static data for index.html
  metadata: metadata,

  devtool: 'source-map',
  debug: false,

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },

  // Config for our build files
  output: {
    path: helpers.root('dist'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

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
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs')
        ]
      }
    ],
    loaders: [
      // Support Angular 2 async routes via .async.ts
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          // remove TypeScript helpers to be injected below by DefinePlugin
          'compilerOptions': {
            'removeComments': true
          }
        },
        exclude: [
          /\.(spec|e2e)\.ts$/,
        ]
      },

      // Support for *.json files.
      {
        test: /\.json$/,
        loader: 'json-loader',
      },

      // Support for CSS as raw text
      {
        test: /\.css$/,
        loader: 'raw-loader',
      },

      // support for .html as raw text
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [
          helpers.root('src/index.html')
        ]
      }

    ],
    noParse: [
      helpers.root('zone.js', 'dist'),
      helpers.root('angular2', 'bundles')
    ]

  },

  plugins: [
    new ForkCheckerPlugin(),
    new WebpackMd5Hash(),
    new DedupePlugin(),
    new OccurenceOrderPlugin(true),
    new CommonsChunkPlugin({
      name: ['main', 'vendor', 'polyfills'],
      filename: '[name].bundle.js',
      minChunks: Infinity
    }),
    // static assets
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html', chunksSortMode: 'none' }),
    new DefinePlugin({
      'ENV': JSON.stringify(metadata.ENV),
      'HMR': false
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

      beautify: false,//prod
      // disable mangling because of a bug in angular2 beta.1, beta.2 and beta.3
      // TODO(mastertinner): enable mangling as soon as angular2 beta.4 is out
      // mangle: { screw_ie8 : true },//prod
      mangle: {
        screw_ie8 : true,
        except: [
          'App',
          'About',
          'Contact',
          'Home',
          'Menu',
          'Footer',
          'XLarge',
          'RouterActive',
          'RouterLink',
          'RouterOutlet',
          'NgFor',
          'NgIf',
          'NgClass',
          'NgSwitch',
          'NgStyle',
          'NgSwitchDefault',
          'NgControl',
          'NgControlName',
          'NgControlGroup',
          'NgFormControl',
          'NgModel',
          'NgFormModel',
          'NgForm',
          'NgSelectOption',
          'DefaultValueAccessor',
          'NumberValueAccessor',
          'CheckboxControlValueAccessor',
          'SelectControlValueAccessor',
          'RadioControlValueAccessor',
          'NgControlStatus',
          'RequiredValidator',
          'MinLengthValidator',
          'MaxLengthValidator',
          'PatternValidator',
          'AsyncPipe',
          'DatePipe',
          'JsonPipe',
          'NumberPipe',
          'DecimalPipe',
          'PercentPipe',
          'CurrencyPipe',
          'LowerCasePipe',
          'UpperCasePipe',
          'SlicePipe',
          'ReplacePipe',
          'I18nPluralPipe',
          'I18nSelectPipe'
        ] // needed for uglify RouterLink problem
      },// prod
      compress : { screw_ie8 : true },//prod
      comments: false//prod

    }),
   // include uglify in production
    new CompressionPlugin({
      algorithm: helpers.gzipMaxLevel,
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    })
  ],
  // Other module loader config
  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'src',
  },

  //Needed to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
    customAttrAssign: [ /\)?\]?=/ ]
  },

  // don't use devServer for production
  node: {
    global: 'window',
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
