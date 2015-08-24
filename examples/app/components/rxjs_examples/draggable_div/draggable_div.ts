/// <reference path="../../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

import {DragElement} from './drag_element';

@Component({
  selector: 'draggable-div'
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [ DragElement ],
  template: `
    <style>
    [drag-element] {
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
      position: fixed;
      cursor: move;
    }
  </style>

  <div drag-element>
    Draggable Div
  </div>

  `
})
export class DraggableDiv {
  constructor() {
  }
}
