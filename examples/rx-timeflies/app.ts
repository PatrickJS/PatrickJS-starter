/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {Component} from 'angular2/angular2';

import {Timeflies} from './components/timeflies';

/*
 * App Component
 * our top level component that holds all of our components
 */
@Component({
  selector: 'app',
  directives: [ Timeflies ],
  template: `
  <main>
    <timeflies></timeflies>
  </main>
  `
})
export class App {
  constructor() {

  }

}
