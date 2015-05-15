/// <reference path="../../../typings/angular2/angular2.d.ts" />

import {RouteConfig, RouterOutlet, Router, RouterLink} from 'angular2/router';
import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';

import {Home} from './home';
import {Dashboard} from './dashboard';
import {Login} from './login';

@Component({
  selector: 'app'
})
@View({
  directives: [ RouterOutlet, RouterLink ],
  template: `
  <h1>Hello {{ name }}</h1>
  <ul>
    <li>
      <a router-link="home">Home</a>
    </li>
    <li>
      <a router-link="dashboard">Dashboard</a>
    </li>
    <li>
      <a router-link="login">Login</a>
    </li>
  </ul>
  <router-outlet></router-outlet>
  `
})
@RouteConfig([
  {
    'path': '/',
    'as': 'home',
    'component': Home
  },
  {
    'path': '/dashboard',
    'as': 'dashboard',
    'component': Dashboard
  },
  {
    'path': '/login',
    'as': 'login',
    'component': Login
  }
])
export class App {
  constructor(@Inject(Router) router: Router) {
    this.name = 'Angular 2';
    // router.navigate('home');
    // debugger;
  }
}
