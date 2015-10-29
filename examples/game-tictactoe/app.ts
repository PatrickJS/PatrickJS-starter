/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {Component} from 'angular2/angular2';

import {Tictactoe} from './components/tictactoe';

/*
 * App Component
 * our top level component that holds all of our components
 */
@Component({
  selector: 'app',
  directives: [ Tictactoe ],
  template: `
  <main>
    <tictactoe></tictactoe>
  </main>
  `
})
export class App {
  constructor() {

  }

}
