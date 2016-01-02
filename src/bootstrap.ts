/*
 * Providers provided by Angular
 */
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';
import {enableProdMode} from 'angular2/core';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';

/*
 * Enable production mode for production build
 */
declare var __PRODUCTION__: any;

if (__PRODUCTION__) {
  enableProdMode();
}

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
function main() {

  // These are dependencies of our App
  var dependencies = [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
  ];

  if (!__PRODUCTION__) {
    dependencies.push(ELEMENT_PROBE_PROVIDERS);
  }

  return bootstrap(App, dependencies)
  .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);
