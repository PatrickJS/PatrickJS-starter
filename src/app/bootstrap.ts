/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/angular2';

/*
 * Angular Bindings
 */
// should be angular2/http in next release
import {FORM_BINDINGS} from 'angular2/angular2'
import {ROUTER_BINDINGS} from 'angular2/router';
import {ELEMENT_PROBE_BINDINGS} from 'angular2/debug';
import {HTTP_BINDINGS} from 'angular2/http';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app';

const APP_BINDINGS = [ FORM_BINDINGS, ROUTER_BINDINGS, HTTP_BINDINGS, ELEMENT_PROBE_BINDINGS ];
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our services/bindings into Angular's dependency injection
 */
bootstrap(App, APP_BINDINGS);
