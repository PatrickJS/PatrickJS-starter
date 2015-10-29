/// <reference path="../../typings/_custom.d.ts" />

// Angular 2
import {Component} from 'angular2/angular2';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

// Services
import {GameService}  from '../services/GameService';

// Components
import {Board} from './board/board';

const ANGULAR_DIRECTIVES = [
  // Angular's core directives
  CORE_DIRECTIVES,
  // Angular's form directives
  FORM_DIRECTIVES,
  // Angular's router
  ROUTER_DIRECTIVES
];

@Component({
  selector: 'tictactoe',
  bindings: [ GameService ],
  directives: [
    ANGULAR_DIRECTIVES,
    //
    Board
  ],
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
  constructor(public game: GameService) {

  }

  reset() {
    this.game.dispose();
    this.game = GameService.create();
  }

}
