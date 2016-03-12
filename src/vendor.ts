// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors to be async loaded later then you import them at the entry point of the async loaded file
// Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module


// RxJS
// In production manually include the operators you use
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeMap');

if ('production' === ENV) {
  // Production


} else {
  // Development or Testing

}

