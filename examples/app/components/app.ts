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
// We use a folder if we want separate files
import {Home} from './home/home';
// Otherwise we only use one file for a component
import {Dashboard} from './dashboard';
// A simple example of a Component using a Service
import {Todo} from './todo';

// RxJs examples
import {RxJsExamples} from './rxjs-examples/rxjs-examples';

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
    <header>
      <div layout="row" class="top-nav ac-default-theme">
        <img src="angular-shield.png" alt="Angular2" height="54" width="54">
        <span class="logo">{{ name | capitalize }} + Webpack</span>
        <ul>
          <li class="l-left">
            <a [router-link]=" ['/home'] "class="top-nav-button ac-default-theme">Home</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/dashboard'] "class="top-nav-button ac-default-theme">Dashboard</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/todo'] "class="top-nav-button ac-default-theme">Todo</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/rxjs-examples', 'search'] "class="top-nav-button ac-default-theme">RxJs Examples</a>
          </li>
        </ul>
      </div>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      WebPack Angular 2 Starter by <a href="https://twitter.com/AngularClass">@AngularClass</a>
    </footer>
  `
})
@RouteConfig([
  { path: '/',                  as: 'home',          component: Home },
  { path: '/dashboard',         as: 'dashboard',     component: Dashboard },
  { path: '/todo',              as: 'todo',          component: Todo },
  { path: '/rxjs-examples/...', as: 'rxjs-examples', component: RxJsExamples }
])
export class App {
  name: string;
  constructor() {
    this.name = 'angular'; // used in logo
  }
}
