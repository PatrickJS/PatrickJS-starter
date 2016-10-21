/* tslint:disable: variable-name max-line-length */
/**
 * @author: @AngularClass
 */
import 'ts-helpers';

import {
  CUSTOM_COPY_FOLDERS,
  CUSTOM_COMMON_PLUGINS,
  CUSTOM_COMMON_RULES,
  CUSTOM_DEV_SERVER_OPTIONS,
  CUSTOM_DEV_PLUGINS,
  CUSTOM_PROD_PLUGINS,
  HTML5_BASE_URL,
} from './config/env';

import {
  root,
  isWebpackDevServer,
  hasProcessFlag,
} from './config/helpers';

import {
  polyfills,
  vendors,
  rxjs,
} from './src/dll';

import head from './config/head';
import meta from './config/meta';

const { ContextReplacementPlugin } = require('webpack');
const { ProgressPlugin } = require('webpack');
const { DefinePlugin } = require('webpack');
const { DllPlugin } = require('webpack');
const { DllReferencePlugin } = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

const { ForkCheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlElementsPlugin = require('./config/html-elements-plugin');
const webpackMerge = require('webpack-merge');

const EVENT = process.env.npm_lifecycle_event;
const ENV = process.env.NODE_ENV || 'development';
const DEV_SERVER = isWebpackDevServer();
const [SCOPE, TASK] = EVENT.split(/:/i) || 'build';

const PORT = process.env.PORT ||
  ENV === 'development' ? 3000 : 8080;
const HOST = process.env.HOST || 'localhost';

const COPY_FOLDERS = [
  { from: `src/assets` },
  { from: `src/meta` },
  // { from: 'node_modules/hammerjs/hammer.min.js' },
  // { from: 'node_modules/hammerjs/hammer.min.js.map' },

  ...CUSTOM_COPY_FOLDERS,

];

console.info(`${SCOPE}ing ${TASK} \u2192 ${ENV}`);

const commonConfig = function webpackConfig(): WebpackConfig {

  const config: WebpackConfig = {} as WebpackConfig;

  config.module = {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          '@angularclass/hmr-loader',
          'awesome-typescript-loader',
          'angular2-template-loader',
        ],
        exclude: [/\.(spec|e2e)\.ts$/],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [root('src/index.html')],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file',
      },

      ...CUSTOM_COMMON_RULES,

    ],

  };

  config.plugins = [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root(`src`),
    ),
    new ProgressPlugin(),
    new ForkCheckerPlugin(),

    ...CUSTOM_COMMON_PLUGINS,

  ];

  // config.plugins.push(
  //   new CopyWebpackPlugin(COPY_FOLDERS),
  // );

  config.node = {
    Buffer: false,
    clearImmediate: false,
    clearTimeout: true,
    crypto: true,
    global: true,
    module: false,
    process: true,
    setImmediate: false,
    setTimeout: true,
  };

  return config;

} ();

const devConfig = function () {

  const config: WebpackConfig = {} as WebpackConfig;

  config.devtool = 'cheap-module-source-map';

  config.entry = {
    main: [].concat(polyfills(), './src/main.browser', rxjs()),
  };

  config.output = {
    path: root(`dist`),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',
  };

  config.plugins = [
    new NamedModulesPlugin(),
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        // tslint: {
        //   emitErrors: false,
        //   failOnHint: false,
        //   resourcePath: SRC,
        // },
      },
    }),
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': JSON.stringify(process.env),
    }),
    new NamedModulesPlugin(),
    // new HtmlWebpackPlugin({
    //   template: `${SRC}/index.html`,
    //   title: meta.title,
    //   chunksSortMode: 'dependency',
    //   metadata: Object.assign(meta, { baseUrl: BASE_URL }),
    //   inject: true,
    // }),
    new HtmlElementsPlugin({
      headTags: head,
    }),
    new DllReferencePlugin({
      context: '.',
      manifest: require(`./dll/polyfills-manifest.json`),
    }),
    new DllReferencePlugin({
      context: '.',
      manifest: require(`./dll/vendors-manifest.json`),
    }),
    new DllReferencePlugin({
      context: '.',
      manifest: require(`./dll/rxjs-manifest.json`),
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),
    new CopyWebpackPlugin(COPY_FOLDERS.concat([{ from: `dll`, ignore: ['*.json'] }])),

    ...CUSTOM_DEV_PLUGINS,

  ];

  if (DEV_SERVER) {
    config.devServer = Object.assign({
      contentBase: root(`src`),
      historyApiFallback: true,
      host: HOST,
      port: PORT,
    }, CUSTOM_DEV_SERVER_OPTIONS);
  }

  return config;

} ();

const dllConfig = function () {

  const config: WebpackConfig = {} as WebpackConfig;

  config.entry = {
    polyfills: polyfills(),
    rxjs: rxjs(),
    vendors: vendors(),
  };

  config.output = {
    path: root(`dll`),
    filename: '[name].dll.js',
    sourceMapFilename: '[name].dll.map',
    library: '__[name]',
  };

  config.plugins = [
    new DllPlugin({
      name: '__[name]',
      path: root('dll/[name]-manifest.json'),
    }),
  ];

  return config;

} ();

const prodConfig = function() {

  const config: WebpackConfig = {} as WebpackConfig;

  config.plugins = [

    // new CommonsChunkPlugin({
    //   name: ['polyfills', 'vendor', 'rxjs'].reverse(),
    // }),
    // new DefinePlugin(CONSTANTS),

    ...CUSTOM_PROD_PLUGINS

  ];

  return config;

} ();

const defaultConfig = function () {

  const config: WebpackConfig = {} as WebpackConfig;

  config.resolve = {
    extensions: ['.ts', '.js', '.json'],
  };

  return config;

} ();

switch (ENV) { // it is the most simple logic
  case 'dev':
  case 'development':
  default:
    module.exports = webpackMerge({}, defaultConfig, commonConfig, devConfig);
}


// // Look in ./config folder for webpack.dev.js
// switch (process.env.NODE_ENV) {
//   case 'prod':
//   case 'production':
//     module.exports = require('./config/webpack.prod')({env: 'production'});
//     break;
//   case 'test':
//   case 'testing':
//     module.exports = require('./config/webpack.test')({env: 'test'});
//     break;
//   case 'dev':
//   case 'development':
//   default:
//     module.exports = require('./config/webpack.dev')({env: 'development'});
// }
