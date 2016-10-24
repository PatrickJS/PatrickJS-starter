/* tslint:disable: variable-name max-line-length no-var-requires no-unused-variable */
/**
 * @author: @AngularClass
 */
import 'ts-helpers';

import {
  CUSTOM_COPY_FOLDERS,
  CUSTOM_DEV_SERVER_OPTIONS,
  HTML5_BASE_URL,
  CUSTOM_RULES_COMMON,
  CUSTOM_RULES_PROD,
  CUSTOM_RULES_DEV,
  CUSTOM_PLUGINS_COMMON,
  CUSTOM_PLUGINS_DEV,
  CUSTOM_PLUGINS_PROD,
} from './config/env';

import {
  root,
  isWebpackDevServer,
  hasProcessFlag,
  tryDll,
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

const isDev = EVENT.includes('dev');
const isDll = EVENT.includes('dll');

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

if (!isDll
  && isDev) { // if we not aim for creating dll
  tryDll(['polyfills', 'vendors', 'rxjs']);
}

const commonConfig = function webpackConfig(): WebpackConfig {

  const config: WebpackConfig = {} as WebpackConfig;

  config.module = {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loaders: [
          'tslint',
        ],
      },
      {
        test: /\.ts$/,
        loaders: [
          // '@angularclass/hmr-loader',
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

      ...CUSTOM_RULES_COMMON,

    ],

  };

  config.plugins = [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root(`src`),
    ),
    new ProgressPlugin(),
    new ForkCheckerPlugin(),
    new NamedModulesPlugin(),
    new HtmlElementsPlugin({
      headTags: head,
    }),

    ...CUSTOM_PLUGINS_COMMON,

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

};

const devConfig = function () {

  const config: WebpackConfig = {} as WebpackConfig;

  config.devtool = 'cheap-module-source-map';

  config.resolve = {
    modules: [root(`src`), `node_modules`],
  };

  config.entry = {
    main: [].concat(polyfills(), './src/main.browser', rxjs()),
  };

  config.output = {
    path: root(`dist`),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',
  };

  COPY_FOLDERS.push({ from: `dll`, ignore: ['*.json'] });

  config.plugins = [
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: `src`,
        },
      },
    }),
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': JSON.stringify(process.env),
    }),
    // new HtmlWebpackPlugin({
    //   template: `${SRC}/index.html`,
    //   title: meta.title,
    //   chunksSortMode: 'dependency',
    //   metadata: Object.assign(meta, { baseUrl: BASE_URL }),
    //   inject: true,
    // }),
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
      meta: meta,
      inject: true,
    }),
    new CopyWebpackPlugin(COPY_FOLDERS),

    ...CUSTOM_PLUGINS_DEV,

  ];

  if (isWebpackDevServer) {
    config.devServer = Object.assign(
      {
        contentBase: root(`src`),
        historyApiFallback: true,
        host: HOST,
        port: PORT,
      },
      CUSTOM_DEV_SERVER_OPTIONS
    );
  }

  return config;

};

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

};

const prodConfig = function () {

  const config: WebpackConfig = {} as WebpackConfig;

  config.module = {
    rules: [

      ...CUSTOM_RULES_PROD,

    ],
  };

  config.plugins = [

    // new CommonsChunkPlugin({
    //   name: ['polyfills', 'vendor', 'rxjs'].reverse(),
    // }),
    // new DefinePlugin(CONSTANTS),

    ...CUSTOM_PLUGINS_PROD,

  ];

  return config;

};

const defaultConfig = function () {

  const config: WebpackConfig = {} as WebpackConfig;

  config.resolve = {
    extensions: ['.ts', '.js', '.json'],
  };

  return config;

};

switch (ENV) { // it is the most simple logic
  case 'dev':
  case 'development':
  default:
    module.exports = isDll
      ? webpackMerge.smart({}, defaultConfig(), commonConfig(), dllConfig())
      : webpackMerge.smart({}, defaultConfig(), commonConfig(), devConfig());
}
