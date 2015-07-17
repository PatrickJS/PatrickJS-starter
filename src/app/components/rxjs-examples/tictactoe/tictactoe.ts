/// <reference path="../../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View, NgIf } from 'angular2/angular2';

import { Board } from './board';
import { Game }  from './game_service';



@Component({
  selector: 'tictactoe',
  viewInjector: [ Game ]
})
@View({
  directives: [NgIf, Board],

  template:`
  <div style="padding: 0 16px;">
    <h1>Tic Tac Toe</h1>
    <h2 *ng-if="game.winner">{{ game.winner }} won!</h2>
    <h2 *ng-if="game.draw">draw</h2>
    <button (click)="reset()">reset</button>
    <board [board]="game.board" (select)="game.play($event)"></board>
  </div>
  `
})
export class Tictactoe {

  constructor(public game: Game) {
  }

  reset() {
    this.game = new this.game.constructor();
  }

}
