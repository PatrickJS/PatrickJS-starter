/// <reference path="../../../typings/tsd.d.ts" />

/*
 * TODO: use the real App component
 * uncomment `./components/app` in bootstrap.ts and comment
 * this file `./components/app-simple`
 */

/*
 * Angular 2
 */
import {Component, View, coreDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';
// import {formDirectives} from 'angular2/forms';
import {formDirectives} from '../../common/formDirectives'; // current workaround fix

/*
 * App Directives
 */
import {appDirectives} from '../directives/directives';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [ coreDirectives, formDirectives, routerDirectives, appDirectives ],
  template: `
  <style>
    .title  { font-family: Arial, Helvetica, sans-serif; }
  </style>

  <header>
    <h1 class="title">Hello {{ name }}</h1>
  </header>

  <main>
    Your Content Here
  </main>

  <footer>
    WebPack Angular 2 Starter by <a href="https://twitter.com/AngularClass">@AngularClass</a>
  </footer>
  `
})
export class App {
  name: string;
  constructor() {
    this.name = 'Angular 2';

  }
}
