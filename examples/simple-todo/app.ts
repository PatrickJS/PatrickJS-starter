/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

import {Todo} from './components/todo';

/*
 * App Component
 * our top level component that holds all of our components
 */
@Component({
  selector: 'app'
})
@View({
  directives: [ Todo ],
  template: `
  <main>
    <todo></todo>
  </main>
  `
})
export class App {
  constructor() {

  }

}
