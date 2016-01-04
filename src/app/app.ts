/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {Home} from './home/home';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES ],
  pipes: [],
  styles: [],
  template: `
    <header>
      <nav>
        <h1>Hello {{ name }}</h1>
        <a [routerLink]=" ['Index'] ">Index</a>
        <a [routerLink]=" ['Home'] ">Home</a>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a>
    </footer>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Index' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  constructor() {

  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
