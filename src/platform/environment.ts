// Angular 2 browser
import {
  ELEMENT_PROBE_PROVIDERS,
  ELEMENT_PROBE_PROVIDERS_PROD_MODE
} from 'angular2/platform/browser';

// Angular 2
import {enableProdMode, provide} from 'angular2/core';
import {XHRBackend} from 'angular2/http';

// Environment Providers
let PROVIDERS = [];

if ('production' === ENV) {
  // Production
  enableProdMode();

  PROVIDERS = [
    ...PROVIDERS,
    ELEMENT_PROBE_PROVIDERS_PROD_MODE
  ];

} else {
  // Development
  PROVIDERS = [
    ...PROVIDERS,
    ELEMENT_PROBE_PROVIDERS
  ];

  // To avoid code built in production, we use require instead of import
  let api = require('../api');
  let seedData = new api.SeedData();
  if (!seedData.isEmpty()) {
    let webApi = require('a2-in-memory-web-api/src/core');

    PROVIDERS = [
      ...PROVIDERS,
      provide(XHRBackend, { useClass: webApi.InMemoryBackendService }),
      provide(webApi.SEED_DATA,  { useValue: seedData })
    ];
  }
}


export const ENV_PROVIDERS = [
  ...PROVIDERS
];
