/*
 * @author: Michael De Abreu
 *
 * Made for @AngularClass
 */

const appRoot = require('app-root-path');
const hasFlag = require('has-flag');

const isDevServer = process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));

/**
 * HtmlWebpackPlugin configuration options
 *
 */
const HTML_OPTIONS = {
  template: appRoot.resolve('src/index.html'),
  chunksSortMode: 'dependency',
  title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
  description: 'Angular 2 Webpack Starter',
  baseUrl: '/',
  isDevServer,
};

/**
 * Production process configuration options
 */
const PROD_OPTIONS = {
  ENV: process.env.ENV = process.env.NODE_ENV = 'production',
  HMR: false,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
};

/**
 * Development process configuration options
 */
const DEV_OPTIONS = {
  ENV: process.env.ENV = process.env.NODE_ENV = 'development',
  HMR: hasFlag('hot'),
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
};

module.exports = {
  HTML_OPTIONS,
  DEV_OPTIONS,
  PROD_OPTIONS,
};
