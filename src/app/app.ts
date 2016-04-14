/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import {ViewEncapsulation} from 'angular2/core';


import {Title} from './providers/title';
import {Home} from './home/home';
import {Abc} from './abc/abc';

/*
 * App Component
 * Top Level Component
 */
@Component({

  styles: [require('./styles/style.scss')],
  // global css styles
  encapsulation: ViewEncapsulation.None,


  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app', // <app></app>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ FORM_PROVIDERS, Title],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ROUTER_DIRECTIVES ],

  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
    <header>
      <h1 class="title">Hello {{ title.value }}</h1>
      <nav>
        <a [routerLink]=" ['Home'] ">Home</a>
        <a [routerLink]=" ['Abc'] ">Abc</a>
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
  { path: '/', component: Home, name: 'Home' },
  { path: '/aaa', component: Abc, name: 'Abc' }
])
export class App {
  url: string = 'https://twitter.com/AngularClass';
  constructor(public title: Title, private router: Router) {}
  ngOnInit() {
    console.log('App Start');
    this.router.navigate(['Home']);
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
