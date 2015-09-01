/// <reference path="../../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';

// Services
import {GameService}  from './GameService';

// Components
import {Board} from './board';


@Component({
  selector: 'tictactoe',
  viewBindings: [ GameService ]
})
@View({
  directives: [ CORE_DIRECTIVES, Board ],
  template:`
  <div style="padding: 0 16px;">
    <h1>Tic Tac Toe</h1>
    <h2 *ng-if="game.winner">{{ game.winner }} won!</h2>
    <h2 *ng-if="game.draw">draw</h2>
    <button (^click)="reset()">reset</button>

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
