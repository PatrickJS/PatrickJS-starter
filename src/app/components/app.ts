/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../custom_typings/ng2.d.ts" />

import {Component, View} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, Router, RouterLink} from 'angular2/router';

import {Home} from './home/home';
import {Dashboard} from './dashboard';
// Top Level Component
@Component({
  selector: 'app' // without [ ] means we are selecting the tag directly
})
@View({
  directives: [
    RouterOutlet,
    RouterLink,
    Home
  ], // needed in order to tell Angular's compiler what's in the template
  template: `
  <style>
    .title {
      font-family: Arial, Helvetica, sans-serif;
    }
    .nav {
      display: inline;
      list-style-type: none;
    }
  </style>

  <h1 class="title">Hello {{ name }}</h1>

  <ul class="nav">
    <li>
      <a router-link="home">Home</a>
    </li>
    <li>
      <a router-link="dashboard">Dashboard</a>
    </li>
  </ul>

  <router-outlet></router-outlet>
  `
})
@RouteConfig([
  { path: '/', as: 'home', component: Home},
  { path: '/dashboard', as: 'dashboard', component: Dashboard }
])
export class App {
  name: string;
  constructor(public router: Router) {
    this.name = 'Angular 2';
  }
}
