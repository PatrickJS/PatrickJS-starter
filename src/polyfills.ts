// Polyfills
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)

//import 'ie-shim'; // Internet Explorer 9 support

// import 'core-js/es6';
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

// Prefer CoreJS over the polyfills above
//import 'core-js';
require('zone.js/dist/zone.js');

if ('production' === ENV) {
  // Production
} else {
  // Development

  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
