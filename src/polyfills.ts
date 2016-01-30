// Polyfills
import 'es6-shim';
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'es6-promise';
import 'zone.js/lib/browser/zone-microtask';

if ('production' === process.env.ENV) {

  // RxJS
  // In development manually include the operators you use

  require('rxjs/add/operator/map');

} else {
  // Reflect Polyfill
  require('es7-reflect-metadata/src/global/browser');

  // In production Reflect with es7-reflect-metadata/reflect-metadata is added
  // by webpack.prod.config ProvidePlugin
  Error['stackTraceLimit'] = Infinity;
  Zone['longStackTraceZone'] = require('zone.js/lib/zones/long-stack-trace.js');

  // RxJS
  // In production manually include the operators you use

  // Observable Operators
  require('rxjs/add/operator/combineLatest-static');
  require('rxjs/add/operator/concat-static');
  require('rxjs/add/operator/merge-static');
  require('rxjs/add/observable/bindCallback');
  require('rxjs/add/observable/defer');
  require('rxjs/add/observable/empty');
  require('rxjs/add/observable/forkJoin');
  require('rxjs/add/observable/from');
  require('rxjs/add/observable/fromArray');
  require('rxjs/add/observable/fromEvent');
  require('rxjs/add/observable/fromEventPattern');
  require('rxjs/add/observable/fromPromise');
  require('rxjs/add/observable/interval');
  require('rxjs/add/observable/never');
  require('rxjs/add/observable/range');
  require('rxjs/add/observable/throw');
  require('rxjs/add/observable/timer');
  require('rxjs/add/operator/zip-static');

  // Operators
  require('rxjs/add/operator/buffer');
  require('rxjs/add/operator/bufferCount');
  require('rxjs/add/operator/bufferTime');
  require('rxjs/add/operator/bufferToggle');
  require('rxjs/add/operator/bufferWhen');
  require('rxjs/add/operator/catch');
  require('rxjs/add/operator/combineAll');
  require('rxjs/add/operator/combineLatest');
  require('rxjs/add/operator/concat');
  require('rxjs/add/operator/concatAll');
  require('rxjs/add/operator/concatMap');
  require('rxjs/add/operator/concatMapTo');
  require('rxjs/add/operator/count');
  require('rxjs/add/operator/dematerialize');
  require('rxjs/add/operator/debounce');
  require('rxjs/add/operator/debounceTime');
  require('rxjs/add/operator/defaultIfEmpty');
  require('rxjs/add/operator/delay');
  require('rxjs/add/operator/distinctUntilChanged');
  require('rxjs/add/operator/distinctUntilKeyChanged');
  require('rxjs/add/operator/do');
  require('rxjs/add/operator/elementAt');
  require('rxjs/add/operator/exhaust');
  require('rxjs/add/operator/exhaustMap');
  require('rxjs/add/operator/expand');
  require('rxjs/add/operator/filter');
  require('rxjs/add/operator/find');
  require('rxjs/add/operator/findIndex');
  require('rxjs/add/operator/finally');
  require('rxjs/add/operator/first');
  require('rxjs/add/operator/groupBy');
  require('rxjs/add/operator/ignoreElements');
  require('rxjs/add/operator/inspect');
  require('rxjs/add/operator/inspectTime');
  require('rxjs/add/operator/isEmpty');
  require('rxjs/add/operator/every');
  require('rxjs/add/operator/last');
  require('rxjs/add/operator/map');
  require('rxjs/add/operator/mapTo');
  require('rxjs/add/operator/materialize');
  require('rxjs/add/operator/max');
  require('rxjs/add/operator/merge');
  require('rxjs/add/operator/mergeAll');
  require('rxjs/add/operator/mergeMap');
  require('rxjs/add/operator/mergeMapTo');
  require('rxjs/add/operator/mergeScan');
  require('rxjs/add/operator/min');
  require('rxjs/add/operator/multicast');
  require('rxjs/add/operator/observeOn');
  require('rxjs/add/operator/partition');
  require('rxjs/add/operator/publish');
  require('rxjs/add/operator/publishBehavior');
  require('rxjs/add/operator/publishReplay');
  require('rxjs/add/operator/publishLast');
  require('rxjs/add/operator/reduce');
  require('rxjs/add/operator/repeat');
  require('rxjs/add/operator/retry');
  require('rxjs/add/operator/retryWhen');
  require('rxjs/add/operator/sample');
  require('rxjs/add/operator/sampleTime');
  require('rxjs/add/operator/scan');
  require('rxjs/add/operator/share');
  require('rxjs/add/operator/single');
  require('rxjs/add/operator/skip');
  require('rxjs/add/operator/skipUntil');
  require('rxjs/add/operator/skipWhile');
  require('rxjs/add/operator/startWith');
  require('rxjs/add/operator/subscribeOn');
  require('rxjs/add/operator/switch');
  require('rxjs/add/operator/switchMap');
  require('rxjs/add/operator/switchMapTo');
  require('rxjs/add/operator/take');
  require('rxjs/add/operator/takeUntil');
  require('rxjs/add/operator/takeWhile');
  require('rxjs/add/operator/throttle');
  require('rxjs/add/operator/throttleTime');
  require('rxjs/add/operator/timeInterval');
  require('rxjs/add/operator/timeout');
  require('rxjs/add/operator/timeoutWith');
  require('rxjs/add/operator/toArray');
  require('rxjs/add/operator/toPromise');
  require('rxjs/add/operator/window');
  require('rxjs/add/operator/windowCount');
  require('rxjs/add/operator/windowTime');
  require('rxjs/add/operator/windowToggle');
  require('rxjs/add/operator/windowWhen');
  require('rxjs/add/operator/withLatestFrom');
  require('rxjs/add/operator/zip');
  require('rxjs/add/operator/zipAll');
}

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
