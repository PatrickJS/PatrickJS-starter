/// <reference path="../../typings/_custom.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

// Directives
import {Draggable} from '../directives/draggable';

@Component({
  selector: 'drag-element',
  directives: [ Draggable ],
  styles: [`
    [draggable] {
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      background-image: url(https://cdn.rawgit.com/Reactive-Extensions/rx.angular.js/master/examples/draganddrop/logo.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      height: 200px;
      width: 200px;
      color: #000000;
      border: 1px solid #666666;
      padding: 10px;
    }
  `],
  template: `

  <div draggable>
    Draggable Div
  </div>

  `
})
export class DragElement {
  constructor() {

  }
}
