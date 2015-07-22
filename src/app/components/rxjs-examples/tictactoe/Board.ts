/// <reference path="../../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View, NgFor, EventEmitter} from 'angular2/angular2';

let styles = require('./board.css');

@Component({
  selector: 'board',
  properties: ['board'],
  events: ['select']
})
@View({
  directives: [ NgFor ],
  styles: [ styles ],
  template:`
    <div class="board">
      <div *ng-for="#row of board; #x=index" class="row">
        <div *ng-for="#tile of row; #y=index">
          <div class="tile"
               [class.x]="tile=='x'"
               [class.o]="tile=='o'"
               (click)="select.next({x: x, y: y})">
          </div>
        </div>
      </div>
    </div>
  `
})
export class Board {
  select = new EventEmitter();
}
