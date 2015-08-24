/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

import {Tictactoe} from './tictactoe';

/*
 * App Component
 * our top level component that holds all of our components
 */
@Component({
  selector: 'app'
})
@View({
  directives: [ Tictactoe ],
  template: `
  <tictactoe></tictactoe>
  `
})
class App {

}
