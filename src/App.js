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
    if (board[y][x].isCoordinatesValid({ xDim: columns, yDim: rows })) {
      return board[y][x];
    } else {
      console.log(
        `OUT OF SCOOP ERROR: INVALID COORDINATES\n\t(${x}, ${y}) ARE INVALID AS THEY ARE OUTSIDE THE SCOOP OF THE GAME BOARD.`
      );
    }
  };

  /**
    * Getting surrounding cells using clock direction
  */
  const GetSurroundingCells = ({ x, y }) => {
    const cell = GetCell({ x, y });
    const surroundingCells = [];
    if (!cell.isCoordinatesValid({ xDim: columns, yDim: rows })) {
      console.log(
        `OUT OF SCOOP ERROR: INVALID COORDINATES\n\t(${x}, ${y}) ARE INVALID AS THEY ARE OUTSIDE THE SCOOP OF THE GAME BOARD.`
      );
    }
    // 12 o'clock
    if (cell.GetCoordinates().y - 1 >= 0) {
      surroundingCells.push({
        cell: GetCell({ x: x, y: y - 1 }),
        direction: 12,
      });
    }
    // 1:30 o'clock
    if (
      cell.GetCoordinates().x + 1 <= columns &&
      cell.GetCoordinates().y - 1 >= 0
    ) {
      surroundingCells.push({
        cell: GetCell({ x: x + 1, y: y - 1 }),
        direction: 1.5,
      });
    }
    // 3 o'clock
    if (cell.GetCoordinates().x + 1 <= columns) {
      surroundingCells.push({
        cell: GetCell({ x: x + 1, y: y }),
        direction: 3,
      });
    }
    // 4:30 o'clock
    if (
      cell.GetCoordinates().x + 1 <= columns &&
      cell.GetCoordinates().y + 1 <= rows
    ) {
      surroundingCells.push({
        cell: GetCell({ x: x + 1, y: y + 1 }),
        direction: 4.5,
      });
    }
    // 6 o'clock
    if (cell.GetCoordinates().y + 1 <= rows) {
      surroundingCells.push({
        cell: GetCell({ x: x, y: y + 1}),
        direction: 6,
      });
    }
    // 7:30 o'clock
    if (
      cell.GetCoordinates().x - 1 >= 0 &&
      cell.GetCoordinates().y + 1 <= rows
    ) {
      surroundingCells.push({
        cell: GetCell({ x: x - 1, y: y + 1 }),
        direction: 7.5,
      });
    }
    // 9 o'clock
    if (cell.GetCoordinates().x - 1 >= 0) {
      surroundingCells.push({
        cell: GetCell({ x: x - 1, y: y}),
        direction: 9,
      });
    }
    // 10:30 o'clock
    if (
      cell.GetCoordinates().x - 1 >= 0 &&
      cell.GetCoordinates().y - 1 <= 0
    ) {
      surroundingCells.push({
        cell: GetCell({ x: x - 1, y: y - 1 }),
        direction: 10.5,
      });
    }
  };

  const PlaceSymbol = (coordinates, player) => {
    const cell = GetCell(coordinates);
  };

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

  const isCoordinatesValid = ({ xDim, yDim }) => {
    return (
      coordinates.x != -1 &&
      coordinates.y != -1 &&
      coordinates.x < xDim &&
      coordinates.y < yDim
    );
  };

  return {
    AddSymbol,
    GetSymbol,
    GetCoordinates,
    isCoordinatesValid,
  };
}

let game = GameBoard();
game.GetCell({ x: 0, y: 0 }).AddSymbol("X");
console.log(game.GetCell({ x: 0, y: 0 }).GetSymbol());
