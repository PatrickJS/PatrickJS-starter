/*
 * These are globally available services in any component or any other service
 */


import {provide} from '@angular/core';

// Angular 2
import {FORM_PROVIDERS, LocationStrategy, HashLocationStrategy} from '@angular/common';

// Angular 2 Http
import {HTTP_PROVIDERS} from '@angular/http';
// Angular 2 Router
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

// Angular 2 Material
// TODO(gdi2290): replace with @angular2-material/all
import {MATERIAL_PROVIDERS} from './angular2-material2';

/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
export const APPLICATION_PROVIDERS = [
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...MATERIAL_PROVIDERS,
  ...ROUTER_PROVIDERS,
  {provide: LocationStrategy, useClass: HashLocationStrategy }
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
