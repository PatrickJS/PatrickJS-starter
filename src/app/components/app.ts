/// <reference path="../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/annotations';
import {RouteConfig} from 'angular2/router';

/*
 * Directives
 */
import {coreDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';
import {formDirectives} from 'angular2/forms';
// Import all of our custom app directives
import {appDirectives} from '../directives/directives';

/*
 * App Pipes
 * our collection of pipes registry
 */
import {appPipes} from '../pipes/pipes';

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
let styles   = require('./app.css');

/*
 * App Component
 * Top Level Component
 * Simple router component example
 */
@Component({
  selector: 'app', // without [ ] means we are selecting the tag directly
  viewInjector: [ appPipes ]
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [
    // Angular's core directives
    coreDirectives,

    // Angular's form directives
    formDirectives,

    // Angular's router
    routerDirectives,

    // Our collection of directives from /directives
    appDirectives
  ],
  // include our .css file
  styles: [ styles ],
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
            <a [router-link]=" ['/rxjs-examples'] "class="top-nav-button ac-default-theme">RxJs Examples</a>
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
  { path: '/',              as: 'home',          component: Home },
  { path: '/dashboard',     as: 'dashboard',     component: Dashboard },
  { path: '/todo',          as: 'todo',          component: Todo },
  { path: '/rxjs-examples', as: 'rxjs-examples', component: RxJsExamples }
])
export class App {
  name: string;
  constructor() {
    this.name = 'angular'; // used in logo
  }
}
