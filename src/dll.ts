/**
 * @author: @AngularClass
 */

// Polyfills
export function polyfills() {
  return [
    // 'ie-shim',

    'core-js/es6/symbol',
    'core-js/es6/object',
    'core-js/es6/function',
    'core-js/es6/parse-int',
    'core-js/es6/parse-float',
    'core-js/es6/number',
    'core-js/es6/math',
    'core-js/es6/string',
    'core-js/es6/date',
    'core-js/es6/array',
    'core-js/es6/regexp',
    'core-js/es6/map',
    'core-js/es6/set',
    'core-js/es6/weak-map',
    'core-js/es6/weak-set',
    'core-js/es6/typed',
    'core-js/es6/reflect',
    // 'core-js/es6/promise', // problem with firefox
    'core-js/es7/reflect',

    // zone.js
    'zone.js/dist/zone',
    'zone.js/dist/long-stack-trace-zone',

    // typescript helpers
    'ts-helpers',
  ];
}

// Angular 2 and other Vendor imports
export function vendors() {
  return [
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/compiler',
    '@angular/router',
    '@angular/forms',
    '@angular/common',
    '@angular/core',
    '@angular/http',

    // '@angularclass/form-validators',
    // '@angularclass/hmr',
  ];
}

// RxJS
export function rxjs() {
  return [
    'rxjs/Observable',
    'rxjs/Subscription',
    'rxjs/Subject',
    'rxjs/BehaviorSubject',
    'rxjs/add/operator/map',
    'rxjs/add/operator/mergeMap',
    'rxjs/add/operator/distinctUntilChanged',
  ];
}
