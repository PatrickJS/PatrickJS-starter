/* tslint:disable: variable-name max-line-length no-var-requires no-unused-variable */
/**
 * @author: @AngularClass
 */
import * as path from 'path';
import * as fs from 'fs';

const _root = path.resolve(__dirname, '..');

export function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

export function isWebpackDevServer() {
  return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
}

export function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

export function tryDll(manifests) {
  toSpawn(() => manifests
    .forEach(manifest => {
      fs.accessSync(`dll/${manifest}-manifest.json`);
    }), 'dll');
}

export function toSpawn(cb, task) {
  try {
    cb();
  } catch (e) {
    const spawn: any = require('cross-spawn');
    spawn.sync('npm', ['run', task], { stdio: 'inherit' });
    return true;
  }
}
