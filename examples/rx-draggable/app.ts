/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

import {Draggable} from './components/draggable';

/*
 * App Component
 * our top level component that holds all of our components
 */
@Component({
  selector: 'app'
})
@View({
  directives: [ Draggable ],
  template: `
  <main>
    <draggable></draggable>
  </main>
  `
})
export class App {
  constructor() {

  }

}
