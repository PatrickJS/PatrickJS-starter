// Polyfills
import 'es6-shim';
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'es6-promise';

if ('production' === process.env.ENV) {
  // Production

  // In production Reflect with es7-reflect-metadata/reflect-metadata is added

  // Zone.js
  require('zone.js/dist/zone-microtask.min');

  // RxJS
  // In production manually include the operators you use
  require('rxjs/add/operator/map');
  require('rxjs/add/operator/mergeMap');

} else {
  // Development

  // Reflect Polyfill
  require('es7-reflect-metadata/src/global/browser');
  // In production Reflect with es7-reflect-metadata/reflect-metadata is added

  // by webpack.prod.config ProvidePlugin
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/zone-microtask');
  require('zone.js/dist/long-stack-trace-zone');

  // RxJS
  // In development we are including every operator
  require('rxjs/add/operator/map');
  require('rxjs/add/operator/mergeMap');

}

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
