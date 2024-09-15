("use strict");

/**
 * main.js
 * Main JavaScript file for the project
 * Author: Catsucci
 * Created: 2024-09-14
 */

function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = Cell({ x: j, y: i });
    }
  }

  const GetBoard = () => board;

  const GetCell = ({ x, y }) => {
    if (x != -1 && y != -1 && x < columns && y < rows) {
      return board[y][x];
    } else {
      console.log(
        `OUT OF SCOOP ERROR: INVALID COORDINATES\n\t(${x}, ${y}) ARE INVALID AS THEY ARE OUTSIDE THE SCOOP OF THE GAME BOARD.`
      );
    }
  };

  const PlaceSymbol = (coordinates, player) => {
    const cell = GetCell(coordinates);
  };

  console.log({ board: board });

  return {
    GetBoard,
    PlaceSymbol,
    GetCell,
  };
}

function Cell({ x, y }) {
  let symbol = null;
  const coordinates = {
    x: x,
    y: y,
  };

  const AddSymbol = (player) => (symbol = player);

  const GetSymbol = () => symbol;

  const GetCoordinates = () => coordinates;

  return {
    AddSymbol,
    GetSymbol,
    GetCoordinates,
  };
}

GameBoard();
