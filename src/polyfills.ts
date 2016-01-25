// Polyfills
import 'es6-shim';
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'es6-promise';
import 'zone.js/lib/browser/zone-microtask';

if ('production' !== process.env.ENV) {
  // Reflect Polyfill
  require('es7-reflect-metadata/src/global/browser');
  // In production Reflect with es7-reflect-metadata/reflect-metadata is added
  // by webpack.prod.config ProvidePlugin
  Error['stackTraceLimit'] = Infinity;
  Zone['longStackTraceZone'] = require('zone.js/lib/zones/long-stack-trace.js');
}

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
