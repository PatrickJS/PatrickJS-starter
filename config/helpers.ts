/**
 * @author: @AngularClass
 */
const path = require('path');
const fs = require('fs');

const _root = path.resolve(__dirname, '..');

export function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

export function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

export function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

export function tryDll(manifests) {
  try {
    manifests
      .forEach(manifest => {
        fs.accessSync(`dll/${manifest}-manifest.json`);
      });
  } catch (e) {
    console.info(`Initializing Dll's`);
    const spawn: any = require('cross-spawn');
    spawn.sync('npm', ['run', 'dll'], { stdio: 'inherit' });
    return true;
  }
}

// function tryDll(cb) {
//   try {
//     return cb();
//   } catch (e) {
//     console.info("Initializing `%s`...", "DLL files");
//     var spawn: any = require('cross-spawn');
//     spawn.sync("npm", ["run", "dll"], { stdio: "inherit" });
//     return cb();
//     // throw new Error('Please run `npm run dll` first before building or running the server');
//   }
// }
