/// <reference path="../typings/_custom.d.ts" />

/*
 * Providers provided by Angular
 */
import {bootstrap, FORM_PROVIDERS, ELEMENT_PROBE_PROVIDERS} from 'angular2/angular2';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
bootstrap(App, [
  // These are dependencies of our App
  FORM_PROVIDERS,
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  ELEMENT_PROBE_PROVIDERS
]);
