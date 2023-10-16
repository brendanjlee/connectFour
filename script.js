function GameBoard() {
  const rows = 6;
  const columns = 7;
  const board = [];

  // create a gameboard with empty cells
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  // return the board matrix
  const getBoard = () => board;

  // represents player dropping a chip in a column
  const dropToken = (column, player) => {
    // check for valid column
    if (column < 0 || column >= 7) return;

    // get lowest available row in the current column
    let lowestRow = -1;
    for (let r = 0; r < rows; r++) {
      if (board[r][column] === 0) lowestRow = r;
    }

    // entire column is filled up
    if (lowestRow === -1) return;

    board[lowestRow][column].addToken(player);
  };

  // prints board as if it was a simple matrix (not cell objects)
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithCellValues);
  };

  return { getBoard, dropToken, printBoard };
}

// Represents a single cell of a connectFour board
function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue
  };
}