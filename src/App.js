("use strict");

/**
 * main.js
 * Main JavaScript file for the project
 * Author: lunarhaze
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

  const isCoordinatesValid = ({ x, y }) => {
    return x >= 0 && y >= 0 && x < columns && y < rows;
  };

  const GetCell = ({ x, y }) => {
    x = +x;
    y = +y;
    if (isCoordinatesValid({ x: x, y: y })) {
      return board[y][x];
    } else {
      console.error(
        `OUT OF SCOOP ERROR: INVALID COORDINATES\n\t(${x}, ${y}) ARE INVALID AS THEY ARE OUTSIDE THE SCOOP OF THE GAME BOARD.`,
      );
      return 0;
    }
  };

  /**
   * Getting surrounding cells using clock direction
   */
  const GetSurroundingCells = ({ x, y }) => {
    x = +x;
    y = +y;
    if (!isCoordinatesValid({ x: x, y: y })) {
      console.error(
        `OUT OF SCOOP ERROR: INVALID COORDINATES\n\t(${x}, ${y}) ARE INVALID AS THEY ARE OUTSIDE THE SCOOP OF THE GAME BOARD.`,
      );
      return 0;
    }
    const cell = GetCell({ x, y });
    const surroundingCells = [];

    // 12 o'clock
    if (cell.GetCoordinates().y - 1 >= 0) {
      surroundingCells.push({
        cell: GetCell({ x: x, y: y - 1 }),
        direction: 12,
      });
    }
    // 1:30 o'clock
    if (
      cell.GetCoordinates().x + 1 < columns &&
      cell.GetCoordinates().y - 1 >= 0
    ) {
      surroundingCells.push({
        cell: GetCell({ x: x + 1, y: y - 1 }),
        direction: 1.5,
      });
    }
    // 3 o'clock
    if (cell.GetCoordinates().x + 1 < columns) {
      surroundingCells.push({
        cell: GetCell({ x: x + 1, y: y }),
        direction: 3,
      });
    }
    // 4:30 o'clock
    if (
      cell.GetCoordinates().x + 1 < columns &&
      cell.GetCoordinates().y + 1 < rows
    ) {
      surroundingCells.push({
        cell: GetCell({ x: x + 1, y: y + 1 }),
        direction: 4.5,
      });
    }
    // 6 o'clock
    if (cell.GetCoordinates().y + 1 < rows) {
      surroundingCells.push({
        cell: GetCell({ x: x, y: y + 1 }),
        direction: 6,
      });
    }
    // 7:30 o'clock
    if (
      cell.GetCoordinates().x - 1 >= 0 &&
      cell.GetCoordinates().y + 1 < rows
    ) {
      surroundingCells.push({
        cell: GetCell({ x: x - 1, y: y + 1 }),
        direction: 7.5,
      });
    }
    // 9 o'clock
    if (cell.GetCoordinates().x - 1 >= 0) {
      surroundingCells.push({
        cell: GetCell({ x: x - 1, y: y }),
        direction: 9,
      });
    }
    // 10:30 o'clock
    if (cell.GetCoordinates().x - 1 >= 0 && cell.GetCoordinates().y - 1 >= 0) {
      surroundingCells.push({
        cell: GetCell({ x: x - 1, y: y - 1 }),
        direction: 10.5,
      });
    }
    return surroundingCells;
  };

  const GetSurroundingCellByDirection = ({ x, y }, direction) => {
    x = +x;
    y = +y;
    if (!isCoordinatesValid({ x: x, y: y })) {
      console.error(
        `OUT OF SCOOP ERROR: INVALID COORDINATES\n\t(${x}, ${y}) ARE INVALID AS THEY ARE OUTSIDE THE SCOOP OF THE GAME BOARD.`,
      );
      return -1;
    }
    const cell = GetCell({ x, y });

    switch (direction) {
      case 12:
        if (cell.GetCoordinates().y - 1 >= 0) {
          return GetCell({ x: x, y: y - 1 });
        }
        break;

      case 1.5:
        if (
          cell.GetCoordinates().x + 1 < columns &&
          cell.GetCoordinates().y - 1 >= 0
        ) {
          return GetCell({ x: x + 1, y: y - 1 });
        }
        break;

      case 3:
        if (cell.GetCoordinates().x + 1 < columns) {
          return GetCell({ x: x + 1, y: y });
        }
        break;

      case 4.5:
        if (
          cell.GetCoordinates().x + 1 < columns &&
          cell.GetCoordinates().y + 1 < rows
        ) {
          return GetCell({ x: x + 1, y: y + 1 });
        }
        break;

      case 6:
        if (cell.GetCoordinates().y + 1 < rows) {
          return GetCell({ x: x, y: y + 1 });
        }
        break;

      case 7.5:
        if (
          cell.GetCoordinates().x - 1 >= 0 &&
          cell.GetCoordinates().y + 1 < rows
        ) {
          return GetCell({ x: x - 1, y: y + 1 });
        }
        break;

      case 9:
        if (cell.GetCoordinates.x - 1 >= 0) {
          return GetCell({ x: x - 1, y: y });
        }
        break;

      case 10.5:
        if (
          cell.GetCoordinates().x - 1 >= 0 &&
          cell.GetCoordinates().y - 1 >= 0
        ) {
          return GetCell({ x: x - 1, y: y - 1 });
        }
        break;
    }
    return 0;
  };

  const PlaceSymbol = (coordinates, player) => {
    const cell = GetCell(coordinates);
    if (cell.GetSymbol() === null) {
      cell.AddSymbol(player.symbol);
      return 1;
    } else {
      console.error(
        `CELL OCCUPIED ERROR: CELL (${coordinates.x}, ${coordinates.y}) IS ALREADY OCCUPIED.`,
      );
      return 0;
    }
  };

  function PrintBoard() {
    for (let i = 0; i < rows; i++) {
      let row = "";
      for (let j = 0; j < columns; j++) {
        row += board[i][j].GetSymbol() || "_";
        if (j < columns - 1) {
          row += " | ";
        }
      }
      console.log(row);
    }
  }

  const ClearBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = Cell({ x: j, y: i });
      }
    }
  };

  return {
    GetBoard,
    PlaceSymbol,
    GetCell,
    GetSurroundingCells,
    GetSurroundingCellByDirection,
    PrintBoard,
    ClearBoard,
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

const GameController = (function (
  playerOneName = "one",
  playerTwoName = "two",
) {
  const board = GameBoard();

  const players = [
    { name: playerOneName, symbol: "X" },
    { name: playerTwoName, symbol: "O" },
  ];

  let activePlayer = players[0];
  let winner = null;
  let draw = null;

  const SwitchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const GetActivePlayer = () => activePlayer;

  const PrintNewRound = () => {
    board.PrintBoard();
    console.log(`It's ${activePlayer.name}'s turn.`);
  };

  const PlayNewRound = (coordinates) => {
    if (
      board.PlaceSymbol(coordinates, activePlayer) &&
      !CheckForWin(activePlayer.symbol, coordinates) &&
      !CheckForDraw()
    ) {
      SwitchActivePlayer();
      PrintNewRound();
    }
    GameUIController.CreateUI();
  };

  const CheckForDraw = () => {
    for (let i = 0; i < board.GetBoard().length; i++) {
      for (let j = 0; j < board.GetBoard()[i].length; j++) {
        console.log({cell: board.GetCell({ x: j, y: i }).GetCoordinates()});
        console.log({symbol: board.GetCell({ x: j, y: i }).GetSymbol()});
        if (board.GetCell({ x: j, y: i }).GetSymbol() === null) {
          draw = null
          return null;
        }
      }
    }
    draw = true;
    return draw;
  };

  const CheckForWin = (symbol, { x, y }) => {
    const surroundingCells = board.GetSurroundingCells({ x, y });
    surroundingCells.some((cell) => {
      if (cell.cell.GetSymbol() === symbol) {
        let potentialWinningCell;
        if (
          (potentialWinningCell = board.GetSurroundingCellByDirection(
            cell.cell.GetCoordinates(),
            cell.direction,
          )) ||
          (potentialWinningCell = board.GetSurroundingCellByDirection(
            { x, y },
            cell.direction <= 6 ? cell.direction + 6 : cell.direction - 6,
          ))
        ) {
          if (potentialWinningCell.GetSymbol() === symbol) {
            console.log(`Player ${activePlayer.name} wins!`);
            board.PrintBoard();
            winner = activePlayer;
          }
        }
      }
    });
    return winner;
  };

  const Reset = () => {
    activePlayer = players[0];
    winner = null;
    draw = null;
  };

  PrintNewRound();

  const GameUIController = (function () {
    const ClearUI = () => {
      document.querySelector("body").innerHTML = "";
    };

    const CreateTitle = () => {
      const title = document.createElement("h1");
      title.classList.add("title");
      title.innerText = "Tic Tac Toe";
      return title;
    };

    const CreateBoard = () => {
      const boardDiv = document.createElement("div");
      boardDiv.classList.add("board");
      for (let i = 0; i < board.GetBoard().length; i++) {
        for (let j = 0; j < board.GetBoard()[i].length; j++) {
          const cell = CreateCell(
            board.GetBoard()[i][j].GetSymbol(),
            board.GetBoard()[i][j].GetCoordinates(),
          );
          boardDiv.appendChild(cell);
        }
      }
      return boardDiv;
    };

    const CreateRoundInfo = () => {
      console.log({ draw: draw });
      const roundInfo = document.createElement("div");
      roundInfo.classList.add("round-info");
      if (winner) {
        roundInfo.innerText = `Player ${winner.name} wins!`;
        return roundInfo;
      }
      if (draw) {
        roundInfo.innerText = "It's a draw!";
        return roundInfo;
      }
      if (activePlayer) {
        roundInfo.innerText = `Player ${activePlayer.name}'s turn`;
        return roundInfo;
      }
    };

    const CreateResetButton = () => {
      const resetButton = document.createElement("button");
      resetButton.classList.add("reset");
      resetButton.innerText = "Reset";
      resetButton.addEventListener("click", () => {
        board.ClearBoard();
        Reset();
        ClearUI();
        CreateUI();
      });
      return resetButton;
    };

    const CreateCell = (symbol, coordinates) => {
      const cell = document.createElement("div");
      cell.innerText = symbol;
      cell.dataset.x = coordinates.x;
      cell.dataset.y = coordinates.y;
      AddEventListenerToCell(cell);
      return cell;
    };

    const AddEventListenerToCell = (cell) => {
      if (!winner && !draw) {
        cell.addEventListener("click", () => {
          PlayNewRound({ x: cell.dataset.x, y: cell.dataset.y });
        });
      }
    };

    const CreateUI = () => {
      ClearUI();
      document.body.appendChild(CreateTitle());
      document.body.appendChild(CreateBoard());
      document.body.appendChild(CreateRoundInfo());
      document.body.appendChild(CreateResetButton());
    };

    CreateUI();

    return {
      ClearUI,
      CreateUI,
    };
  })();

  return {
    GetActivePlayer,
    PlayNewRound,
    CheckForWin,
    GameUIController,
  };
})();
