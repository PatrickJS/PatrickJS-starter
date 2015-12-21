// @AngularClass
/*
 * When testing with webpack and ES6, we have to do some extra
 * things get testing to work right. Because we are gonna write test
 * in ES6 to, we have to compile those as well. That's handled in
 * karma.conf.js with the karma-webpack plugin. This is the entry
 * file for webpack test. Just like webpack will create a bundle.js
 * file for our client, when we run test, it well compile and bundle them
 * all here! Crazy huh. So we need to do some setup
*/
Error.stackTraceLimit = Infinity;
require('phantomjs-polyfill');
require('es6-promise');
require('es6-shim');
require('es7-reflect-metadata/dist/browser');
require('zone.js/lib/browser/zone-microtask.js');
require('zone.js/lib/browser/long-stack-trace-zone.js');
require('zone.js/lib/browser/jasmine-patch.js');
// these are global EmitHelpers used by compiled typescript
globalPolyfills()

require('angular2/testing');

/*
  Ok, this is kinda crazy. We can use the the context method on
  require that webpack created in order to tell webpack
  what files we actually want to require or import.
  Below, context will be an function/object with file names as keys.
  using that regex we are saying look in client/app and find
  any file that ends with spec.js and get its path. By passing in true
  we say do this recursively
*/
var testContext = require.context('./test', true, /\.spec\.ts/);
var appContext = require.context('./src', true, /\.spec\.ts/);

// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
appContext.keys().forEach(appContext);
testContext.keys().forEach(testContext);

// Select BrowserDomAdapter.
// see https://github.com/AngularClass/angular2-webpack-starter/issues/124
var domAdapter = require('angular2/src/platform/browser/browser_adapter');
domAdapter.BrowserDomAdapter.makeCurrent();




// these are helpers that typescript uses
// I manually added them by opting out of EmitHelpers by noEmitHelpers: false
function globalPolyfills(){
  global.__extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    var __ = function() { this.constructor = d; };
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };

  global.__decorate = global.Reflect.decorate;
  global.__metadata = global.Reflect.metadata;

  global.__param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
  };

  global.__awaiter = (this && this.__awaiter) ||
    function (thisArg, _arguments, Promise, generator) {
      return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
          return value instanceof Promise && value.constructor === Promise ?
          value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step('next', value); } catch (e) { reject(e); } }
        function onreject(value) { try { step('throw', value); } catch (e) { reject(e); } }
        function step(verb, value) {
          var result = generator[verb](value);
          result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step('next', void 0);
      });
    };
}
