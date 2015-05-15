import {RouteConfig, RouterOutlet, Router, RouterLink} from 'angular2/router';
import {Component, View} from 'angular2/angular2';
import {Inject} from 'angular2/di';

import {Home} from './home';
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
      <a router-link="login">Login</a>
    </li>
  </ul>
  <router-outlet></router-outlet>
  `
})
@RouteConfig([
  {
    'path': '/home',
    'as': 'home',
    'component': Home
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
    router.navigate('home');
  }
}
