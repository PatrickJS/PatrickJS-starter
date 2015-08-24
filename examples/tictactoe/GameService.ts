
import {Injectable} from 'angular2/angular2';

type Triple = [ string, string, string ]; // tuple type
type Rows   = [ Triple, Triple, Triple ];
type Point  = { x: number; y: number };

@Injectable()
export class GameService {

  board: Rows = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  plays: Point[] = [];

  static create(): GameService {
    return new GameService();
  }

  dispose() {
    this.board = null;
    this.plays = null;
  }

  play(coord: Point) {
    const { x, y } = coord;
    if (!this.gameover && this.board[x][y] === '') {
      this.board[x][y] = this.player;
    }
    this.plays.push(coord); //TODO: create Rx Observable
  }

  get player() {
    return ['x', 'o'][this.plays.length % 2];
  }

  get gameover() {
    return this.draw || this.winner !== '';
  }

  get winner(): string {
    return getWinnerFromBoard(this.board);
  }

  get draw() {
    return this.plays.length === 9;
  }

}

export var GAMESERVICE_BINDINGS = [
  GameService
];

// Pure functions

export function getWinnerFromBoard(board: Rows): string {
  const allWinningLists = [].concat(
    board,             // rows
    zip(board),        // columns
    diagonals(board)   // diagonals
  );

  return allWinningLists.reduce(getWinnerFromList, '');
}

export function getWinnerFromList(winner: string, list: Triple) {
  if (winner) return winner;
  if (list.every(s => s == 'o')) return 'o';
  if (list.every(s => s == 'x')) return 'x';
  return '';
}

export function zip(arrays: Rows) {
  return arrays[0].map((_, i) => arrays.map(array => array[i]));
}

export function diagonals(rows: Rows) {
  return [
    rows.map((row, index) => row[index]), // left to right diagonal
    rows.map((row, index) => row[row.length - 1 - index]) // right to left diagonal
  ];
}
