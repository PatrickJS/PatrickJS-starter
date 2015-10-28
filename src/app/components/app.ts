/// <reference path="../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

/*
 * Directives
 */
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
// Import all of our custom app directives
import {APP_DIRECTIVES} from '../directives/directives';

/*
 * App Pipes
 * our collection of pipes registry
 */
import {APP_PIPES} from '../pipes/pipes';

/*
 * Components
 */
import {Dashboard} from './dashboard/dashboard';

// Use webpack's `require` to get files as a raw string using raw-loader
const APP_STYLES = require('./app.css');

/*
 * App Component
 * Top Level Component
 * Simple router component example
 */
@Component({
  selector: 'app', // without [ ] means we are selecting the tag directly
  viewBindings: []
})
@View({
  pipes:      [ APP_PIPES ],
  directives: [ APP_DIRECTIVES ],
  styles:     [ APP_STYLES ],
  template: `
    <static-header>header...</static-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <static-footer>footer...</static-footer>
  `
})
@RouteConfig([
  //{ path: '/',                  as: 'Home',          component: Home },
  { path: '/',         as: 'Dashboard',     component: Dashboard },
  //{ path: '/todo',              as: 'Todo',          component: Todo },
  //{ path: '/rxjs-examples/...', as: 'RxjsExamples', component: RxJsExamples }
])
export class App {
  name: string;
  constructor() {
    this.name = 'angular'; // used in logo
  }
}
