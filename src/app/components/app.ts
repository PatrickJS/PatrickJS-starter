/// <reference path="../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

/*
 * Directives
 */
// Import all of our custom app directives
import {coreDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';
// import {formDirectives} from 'angular2/forms';
import {formDirectives} from '../../common/formDirectives'; // current workaround fix
import {appDirectives} from '../directives/directives';

/*
 * Components
 */
// We use a folder if we want separate files
import {Home} from './home/home';
// Otherwise we only use one file for a component
import {Dashboard} from './dashboard';
// A simple example of a Component using a Service
import {Todo} from './todo';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app', // without [ ] means we are selecting the tag directly
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
  template: `
  <style>
    .title  { font-family: Arial, Helvetica, sans-serif; }
    .nav    { display: inline; list-style-type: none; padding: 0;  background-color: #F8F8F8; }
    .nav li { display: inline; }
    main    { padding: 0.5em; }
  </style>
  <h1 class="title">Hello {{ name }}</h1>

  <ul class="nav">
    <li><a [router-link]=" ['/home'] ">Home</a></li>
    |
    <li><a [router-link]=" ['/dashboard'] ">Dashboard</a></li>
    |
    <li><a [router-link]=" ['/todo'] ">Todo</a></li>
  </ul>

  <main>
    <router-outlet></router-outlet>
  </main>

  <footer>
    WebPack Angular 2 Starter by <a href="https://twitter.com/AngularClass">@AngularClass</a>
  </footer>
  `
})
@RouteConfig([
  { path: '/',          as: 'home',      component: Home },
  { path: '/dashboard', as: 'dashboard', component: Dashboard },
  { path: '/todo',      as: 'todo',      component: Todo }
])
export class App {
  name: string;
  constructor() {
    this.name = 'Angular 2';
  }
}
