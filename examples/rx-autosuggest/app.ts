/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

import {SearchGithub} from './components/search-github';

/*
 * App Component
 * our top level component that holds all of our components
 */
@Component({
  selector: 'app'
})
@View({
  directives: [ SearchGithub ],
  template: `
  <main>
    <search-github></search-github>
  </main>
  `
})
export class App {
  constructor() {

  }

}
