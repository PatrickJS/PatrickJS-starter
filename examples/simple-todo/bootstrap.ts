/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/angular2';

import {FORM_BINDINGS, ELEMENT_PROBE_BINDINGS} from 'angular2/angular2'
import {ROUTER_BINDINGS} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

/*
 * App
 */
import {App} from './app';

/*
 * Services
 */
import {TODO_BINDINGS} from './services/TodoService';


const APP_BINDINGS = [
  // These are dependencies of our App
  FORM_BINDINGS,
  ROUTER_BINDINGS,
  HTTP_BINDINGS,
  ELEMENT_PROBE_BINDINGS,
  // Services
  TODO_BINDINGS
];
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Universal/Platform services/bindings into Angular's dependency injection
 */
bootstrap(
  // Top Level Component
  App,
  // AppBindings
  APP_BINDINGS
);
