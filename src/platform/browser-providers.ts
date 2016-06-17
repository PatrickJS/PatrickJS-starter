/*
 * These are globally available services in any component or any other service
 */

// Angular 2
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// Angular 2 forms
import { disableDeprecatedForms, provideForms } from '@angular/forms';
// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';
// Angular 2 Router
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
export const APPLICATION_PROVIDERS = [
  disableDeprecatedForms(),
  provideForms(),
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
