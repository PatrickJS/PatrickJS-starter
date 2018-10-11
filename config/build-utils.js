const ts = require('typescript');
const path = require('path');
const fs = require('fs');
const helpers = require('./helpers');


const APP_COMMON_CONFIG = require('./config.common.json');

const DEFAULT_METADATA = {
  title: APP_COMMON_CONFIG.title,
  description: APP_COMMON_CONFIG.description,
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer(),
  HMR: helpers.hasProcessFlag('hot'),
  AOT: process.env.BUILD_AOT || helpers.hasNpmFlag('aot'),
  E2E: !!process.env.BUILD_E2E,
  WATCH: helpers.hasProcessFlag('watch'),
  tsConfigPath: 'tsconfig.webpack.json',
  /**
   * This suffix is added to the environment.ts file, if not set the default environment file is loaded (development)
   * To disable environment files set this to null
   * this deprecated envFileSuffix
   */
  distSufixTarget: ''
};

function supportES2015(tsConfigPath) {
  if (!supportES2015.hasOwnProperty('supportES2015')) {
    const tsTarget = readTsConfig(tsConfigPath).options.target;
    supportES2015['supportES2015'] = tsTarget !== ts.ScriptTarget.ES3 && tsTarget !== ts.ScriptTarget.ES5;
  }
  return supportES2015['supportES2015'];
}

function readTsConfig(tsConfigPath) {
  const configResult = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
  return ts.parseJsonConfigFileContent(configResult.config, ts.sys,
    path.dirname(tsConfigPath), undefined, tsConfigPath);
}

function getEnvFile(e2e, suffix) {
  if (suffix && suffix[0] !== '.') {
    suffix = '.' + suffix;
    if (e2e) {
      suffix = '.e2e'+ suffix;
    }
  }

  if (suffix === null) {
    return;
  }

  let fileName = helpers.root(`src/environments/environment${suffix}.ts`);
  if (fs.existsSync(fileName)) {
    return fileName;
  } else if (fs.existsSync(fileName = helpers.root('src/environments/environment.ts'))) {
    console.warn(`Could not find environment file with suffix ${suffix}, loading default environment file`);
    return fileName;
  } else {
    throw new Error('Environment file not found.')
  }
}

function getConfigFile(e2e, suffix) {
  if (suffix && suffix[0] !== '.') {
    suffix = '.' + suffix;
    if (e2e) {
      suffix = '.e2e'+ suffix;
    }
  }

  let fileName = helpers.root(`config/config${suffix}.json`);
  if (fs.existsSync(fileName)) {
    return fileName;
  } else if (fs.existsSync(fileName = helpers.root('config/config.json'))) {
    console.warn(`Could not find config.json file with suffix ${suffix}, loading default environment file`);
    return fileName;
  } else {
    throw new Error('config.json file not found.')
  }
}

/**
 * Read the tsconfig to determine if we should prefer ES2015 modules.
 * Load rxjs path aliases.
 * https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md#build-and-treeshaking
 * @param supportES2015 Set to true when the output of typescript is >= ES6
 */
function rxjsAlias(supportES2015) {
  try {
    const rxjsPathMappingImport = supportES2015 ? 'rxjs/_esm2015/path-mapping' : 'rxjs/_esm5/path-mapping';
    const rxPaths = require(rxjsPathMappingImport);
    return rxPaths(helpers.root('node_modules'));
  } catch (e) {
    return {};
  }
}

function ngcWebpackSetup(prod, metadata) {
  if (!metadata) {
    metadata = DEFAULT_METADATA;
  }

  const buildOptimizer = prod && metadata.AOT;
  const sourceMap = true; // TODO: apply based on tsconfig value?
  const ngcWebpackPluginOptions = {
    skipCodeGeneration: !metadata.AOT,
    sourceMap
  };

  const environmentFilePath = getEnvFile(metadata.E2E, metadata.distSufixTarget);

  if (environmentFilePath) {
    ngcWebpackPluginOptions.hostReplacementPaths = {
      [helpers.root('src/client/environments/environment.ts')]: environmentFilePath
    }
  }

  if (!prod && metadata.WATCH) {
    // Force commonjs module format for TS on dev watch builds.
    ngcWebpackPluginOptions.compilerOptions = {
      module: 'commonjs'
    };
  }

  const buildOptimizerLoader = {
    loader: '@angular-devkit/build-optimizer/webpack-loader',
    options: {
      sourceMap
    }
  };

  const loaders = [
    {
      test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      use: buildOptimizer ? [ buildOptimizerLoader, '@ngtools/webpack' ] : [ '@ngtools/webpack' ]
    },
    ...buildOptimizer
      ? [ { test: /\.js$/, use: [ buildOptimizerLoader ] } ]
      : []
  ];

  return {
    loaders,
    plugin: ngcWebpackPluginOptions
  };
}

function deepMergeRecursive(visitedSourceObjectsMap, target, source) {
  if (!visitedSourceObjectsMap.get(source)) {
    var keysArr = source? Object.keys(source) : [];
    for (let j = 0; j < keysArr.length; j++) {
      var key = keysArr[j];
      if (isObject(source[key])) {
        target[key] = deepMergeRecursive(visitedSourceObjectsMap, target[key] || {}, source[key]);
        visitedSourceObjectsMap.set(source[key], target[key]);
      } else {
        target[key] = source[key];
      }
    }
  } else {
    return visitedSourceObjectsMap.get(source);
  }
  return target;
}

function deepMerge(...args) {
  var target;
  if (args.length > 0) {
    target = args[0];
  }
  var visitedSourceObjectsMap = new Map();
  for (let i = 1; i < args.length; i++) {
    const source = args[i];
    target = deepMergeRecursive(visitedSourceObjectsMap, target, source);
  }

  return target;
}

function isObject(x) {
  return typeof x === "object" && !Array.isArray(x) && x !== null && x.constructor && x.constructor !== Number && x.constructor !== Date;
}

// function getEnvObject(suffix) {
//   var environmentObject = require(getEnvFile(metadata.distSufixTarget));
//   return environmentObject;
// }

exports.DEFAULT_METADATA = DEFAULT_METADATA;
exports.supportES2015 = supportES2015;
exports.readTsConfig = readTsConfig;
exports.getEnvFile = getEnvFile;
exports.getConfigFile = getConfigFile;
exports.rxjsAlias = rxjsAlias;
exports.ngcWebpackSetup = ngcWebpackSetup;
exports.deepMerge = deepMerge;