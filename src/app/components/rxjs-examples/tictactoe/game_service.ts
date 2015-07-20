type Triple = [string, string, string]; // tuple type
type Rows = [Triple, Triple, Triple];
type Point = { x: number; y: number }

export class Game {

  board: Rows = [['', '', ''], ['', '', ''], ['', '', '']];
  plays: Point[] = [];

  public static create(): Game {
    return new Game();
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

// Pure functions

function getWinnerFromBoard(board: Rows): string {
  const allWinningLists = [].concat(
    board,             // rows
    zip(board),        // columns
    diagonals(board)   // diagonals
  );

  return allWinningLists.reduce(getWinnerFromList, '');
}

function getWinnerFromList(winner: string, list: Triple) {
  if (winner) return winner;
  if (list.every(s => s == 'o')) return 'o';
  if (list.every(s => s == 'x')) return 'x';
  return '';
}

function zip(arrays: Rows) {
  return arrays[0].map(function(_, i) {
    return arrays.map(function(array) { return array[i] } )
  });
}

function diagonals(rows: Rows) {
  return [
    rows.map((row, index) => row[index]), // left to right diagonal
    rows.map((row, index) => row[row.length - 1 - index]) // right to left diagonal
  ];
}
