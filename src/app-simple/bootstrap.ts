/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/angular2';
/*
 * Angular Modules
 */
import {httpInjectables, formInjectables} from 'angular2/angular2'
import {routerInjectables} from 'angular2/router';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our services/bindings into Angular's dependency injection
 */
bootstrap(App, [ httpInjectables, formInjectables, routerInjectables ]);
