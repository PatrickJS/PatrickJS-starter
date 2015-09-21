/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

import {Home} from './home/home';

/*
 * App Component
 * our top level component that holds all of our components
 */
@Component({
  selector: 'app'
})
@View({
  directives: [ Home ],
  template: `
  <main>
    <tictactoe></tictactoe>
  </main>
  `
})
class App {
  constructor() {

  }

}
