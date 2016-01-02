// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
var ENV = process.env.ENV || process.env.NODE_ENV || 'test';

/*
 * Config
 */
module.exports = {
  resolve: {
    cache: false,
    root: root(),
    extensions: ['','.ts','.js','.json', '.css', '.html'],
    alias: {
      'app': 'src/app',
      'common': 'src/common'
    }
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          // remove TypeScript helpers to be injected below by DefinePlugin
          'compilerOptions': {
            'removeComments': true,
            'noEmitHelpers': true,
          },
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [ /\.e2e\.ts$/, /node_modules/ ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/,  loader: 'raw-loader' }
    ],
    postLoaders: [
      // instrument only testing sources with Istanbul
      {
        test: /\.(js|ts)$/,
        include: root('src'),
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.e2e\.ts$/,
          /node_modules/
        ]
      }
    ],
    noParse: [
      /zone\.js\/dist\/.+/,
      /angular2\/bundles\/.+/
    ]
  },
  stats: { colors: true, reasons: true },
  debug: false,
  plugins: [
    new ProvidePlugin({
      'Reflect': 'es7-reflect-metadata/dist/browser' // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
    }),
    new DefinePlugin({
      'process.env.ENV': JSON.stringify(ENV),
      'process.env.NODE_ENV': JSON.stringify(ENV),
      'global': 'window'
    }),
    new DefinePlugin({
      // TypeScript helpers
      '__metadata': 'Reflect.metadata',
      '__decorate': 'Reflect.decorate',
      // Taken from TypeScript Source until I use a module
      '__param': 'function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n}',
      '__extends': '\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};',
      '__awaiter': '\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {\n    return new Promise(function (resolve, reject) {\n        generator = generator.call(thisArg, _arguments);\n        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }\n        function onfulfill(value) { try { step(\"next\", value); } catch (e) { reject(e); } }\n        function onreject(value) { try { step(\"throw\", value); } catch (e) { reject(e); } }\n        function step(verb, value) {\n            var result = generator[verb](value);\n            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);\n        }\n        step(\"next\", void 0);\n    });\n};'
    })
  ]
};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
