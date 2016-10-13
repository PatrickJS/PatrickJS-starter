/**
 * @author: @AngularClass
 */

export const path = require('path');

// Helper functions
export const ROOT = path.resolve(__dirname, '..');

export const hasProcessFlag = function(flag) {
  return process.argv.join('').indexOf(flag) > -1;
};

export const hasHMR = this.hasProcessFlag('hot');

export const isWebpackDevServer = function() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
};

export const root = function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
};
