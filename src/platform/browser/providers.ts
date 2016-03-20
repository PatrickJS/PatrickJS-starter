import {provide} from 'angular2/core';

// Angular 2 browser
import {
  ELEMENT_PROBE_PROVIDERS,
  ELEMENT_PROBE_PROVIDERS_PROD_MODE
} from 'angular2/platform/browser';

// Angular 2
import {FORM_PROVIDERS} from 'angular2/common';

// Angular 2 Http
import {HTTP_PROVIDERS} from 'angular2/http';
// Angular 2 Router
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
// Angular 2 Material
import {MdRadioDispatcher} from '@angular2-material/radio/radio_dispatcher';

// application_providers: providers that are global through out the application
// Environment
var ENV_PROVIDERS = [

];

if ('production' === ENV) {
  // Production
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS_PROD_MODE);
} else {
  // Development
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
export const APPLICATION_PROVIDERS = [
  ...ENV_PROVIDERS,
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  MdRadioDispatcher,
  ...ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
