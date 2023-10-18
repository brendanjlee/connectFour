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

  const getRows = () => rows;
  const getCols = () => columns;

  // represents player dropping a chip in a column
  const dropToken = (column, playerToken) => {
    console.log(`col: ${column}, token: ${playerToken}`)
    // check for valid column
    if (column < 0 || column >= 7) return;

    // get lowest available row in the current column
    let lowestRow = -1;
    for (let r = 0; r < rows; r++) {
      if (board[r][column].getValue() === 0) lowestRow = r;
    }

    // entire column is filled up
    if (lowestRow === -1) return;

    board[lowestRow][column].addToken(playerToken);
  };

  // prints board as if it was a simple matrix (not cell objects)
  const printBoard = () => {
    let boardWithCellValues = [];
    for (let i = 0; i < rows; i++) {
      boardWithCellValues[i] = [];
      for (let j = 0; j < columns; j++) {
        boardWithCellValues[i].push(board[i][j].getValue());
      }
    }
    console.log(boardWithCellValues);
  };

  return {
    getBoard,
    dropToken,
    printBoard,
    getRows,
    getCols
   };
}

// Represents a single cell of a connectFour board
function Cell() {
  let value = 0;

  const addToken = (playerValue) => {
    value = playerValue;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue
  };
}

// Game Controller
function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  // initialize gameboard
  const board = GameBoard();

  // create players: {name, token}
  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    }
  ]

  let activePlayer = players[0];

  // gets the board
  const getBoard = () => board.getBoard();

  // switch player turn
  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  // return the current active player
  const getActivePlayer = () => activePlayer;

  // prints the current board state
  const printNewRound = () => {
    console.log(`${getActivePlayer().name}\'s turn.`);
    board.printBoard();
  }
  
  // plays a round. Drops the token, switches player, then prints the board
  const playRound = (column) => { 
    // drop token
    board.dropToken(column, getActivePlayer().token);
    
    // output new board state
    printNewRound();

    // check for a win
    if (checkBoard() === getActivePlayer().token) {
      console.log(`${getActivePlayer().name} wins!`);
      return true;
    } 

    // switch player
    switchPlayer();

    
    return false;
  }

  // checks for win condition
  const checkBoard = () => {
    const dirs = [
      [-1, 0], [-1, 1], [0, 1], [1 ,1],
      [1, 0], [1, -1], [0, -1], [-1, -1]
    ];
    for (let r = 0; r < board.getRows(); r++) {
      for (let c = 0; c < board.getCols(); c++) {
        //let currToken = getBoard()[r][c].getValue();
        let currToken = getActivePlayer().token;
        if (currToken === 0) continue;

        // check 8 directions
        for (let i = 0; i < dirs.length; i++) {
          let dr = dirs[i][0];
          let dc = dirs[i][1];
          if (search(r, c, currToken, 0, dr, dc)) return currToken;
        }
      }
    }
    return -1;
  }

  // helper for check board
  const search = (r, c, token, count, dirR, dirC) => {
    if (count >= 4) return true;

    // check bounds
    if (r < 0 || r >= board.getRows() || c < 0 || c >= board.getCols()) return false;
    // check valid token
    if (getBoard()[r][c].getValue() != token) return false;

    return search(r + dirR, c + dirC, token, count + 1, dirR, dirC);
  }
 
  printNewRound();

  return {
    playRound,
    switchPlayer,
    getBoard,
    checkBoard
  }
}