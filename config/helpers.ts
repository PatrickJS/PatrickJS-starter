/**
 * @author: @AngularClass
 */

import * as path from 'path';

// Helper functions
export const ROOT = path.resolve(__dirname, '..');

export const hasProcessFlag = function(flag) {
  return process.argv.join('').indexOf(flag) > -1;
};

export const shouldBeHMR = () => this.hasProcessFlag('hot');

export const isProd = () => process.env.ENV !== 'development' ||
  process.env.NODE_ENV !== 'development';
export const isDev = () => !this.isProd();

export const isWebpackDevServer = function() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
};

export const root = function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
};
