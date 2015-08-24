/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/angular2';

/*
 * Angular Bindings
 */
import {FORM_BINDINGS} from 'angular2/angular2'
// should be ROUTER_BINDINGS in next release
import {routerInjectables as ROUTER_BINDINGS} from 'angular2/router';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app';

const APP_BINDINGS = [ FORM_BINDINGS, ROUTER_BINDINGS ];
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our services/bindings into Angular's dependency injection
 */
bootstrap(App, APP_BINDINGS);
