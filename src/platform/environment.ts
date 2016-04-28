// Angular 2 browser
import {
  ELEMENT_PROBE_PROVIDERS,
  ELEMENT_PROBE_PROVIDERS_PROD_MODE
} from 'angular2/platform/browser';

// Angular 2
import {provide, enableProdMode} from 'angular2/core';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';

// Environment Providers
let PROVIDERS: any[] = [
  provide(LocationStrategy, { useClass: HashLocationStrategy })
];

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

}


export const ENV_PROVIDERS = [
  ...PROVIDERS
];
