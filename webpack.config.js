// @AngularClass

// Helper
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var NODE_ENV = process.env.NODE_ENV;

// Node
var webpack = require('webpack');
var path = require('path');
var pkg  = require('./package.json');

// Webpack Plugins
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var CommonsChunkPlugin   = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var DedupePlugin   = webpack.optimize.DedupePlugin;
var DefinePlugin   = webpack.DefinePlugin;
var BannerPlugin   = webpack.BannerPlugin;


/*
 * Config
 */

var config = {
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
      'reflect-metadata',
      'rtts_assert/rtts_assert',
      'angular2/angular2'
    ],
    'app': [
      // App

      /*
       * include any 3rd party js lib here
       */

      './src/app/bootstrap'
    ],
    'app-simple': [
      // Simple Version of App

      /*
       * include any 3rd party js lib here
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
      { test: /\.ts$/,    loader: 'typescript-simple?ignoreWarnings[]=2345', exclude: [
          /\.spec\.ts$/,
          /\.e2e\.ts$/,
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

  // plugins: plugins, // see below
  context: __dirname,
  stats: { colors: true, reasons: true }
};


var commons_chunks_plugins = [
  {
    name: 'angular2',
    minChunks: Infinity,
    filename: 'angular2.js'
  },
  {
    name: 'common',
    filename: 'common.js'
  }
]


//
var environment_plugins = {

  all: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'VERSION': pkg.version
    }),
    new OccurenceOrderPlugin(),
    new DedupePlugin(),
  ],

  production: [
    new UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: false
      },
      output: {
        comments: false
      },
      beautify: false
    }),
    new BannerPlugin(getBanner(), {entryOnly: true})
  ],

  development: [
    /* Dev Plugin */
    // new webpack.HotModuleReplacementPlugin(),
  ]

}//env









if (NODE_ENV === 'production') {
  // replace filename `.js` with `.min.js`
  config.output.filename = config.output.filename.replace('.js', '.min.js');
  config.output.sourceMapFilename = config.output.sourceMapFilename.replace('.js', '.min.js');
  commons_chunks_plugins = commons_chunks_plugins.map(function(chunk) {
    return chunk.filename.replace('.js', '.min.js');
  });
}
else if (NODE_ENV === 'development') {
  // any development actions here
}

// create CommonsChunkPlugin instance for each config
var combine_common_chunks = commons_chunks_plugins.map(function(config) {
  return new CommonsChunkPlugin(config);
});

// conbine everything
config.plugins = [].concat(combine_common_chunks, environment_plugins.all, environment_plugins[NODE_ENV]);


module.exports = config;

// Helper functions
function getBanner() {
  return 'Angular2 Webpack Starter v'+ pkg.version +' by @gdi2990 from @AngularClass';
}

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
function rootNode(args) {
  args = sliceArgs(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}

