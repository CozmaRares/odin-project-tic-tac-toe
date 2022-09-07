const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const playerOrder = ["x", "o"];
let currentPlayer = 0;

let gameBoard = new Array(9).fill("");

let isAIenabled = false,
  AIaccuracy = 0;

let userSign = "x",
  AIsign = "o";

function setCell(cell, value) {
  gameBoard[cell] = value;
}

function isCellFilled(cell) {
  return gameBoard[cell] !== "";
}

function getEmptyCells(board) {
  const emptyCells = [];

  board.forEach((cell, idx) => {
    if (cell === "") emptyCells.push(idx);
  });

  return emptyCells;
}

function resetBoard() {
  currentPlayer = 0;

  gameBoard = new Array(9).fill("");

  document.querySelectorAll(".grid div").forEach(div => (div.className = ""));

  const grid = document.querySelector(".grid");

  grid.className = "grid";

  if (isAIenabled === false || AIsign !== playerOrder[0])
    return (grid.className += " " + playerOrder[0]);

  grid.className += " " + playerOrder[1];

  setTimeout(() => setPlayerChoice(computeAIchoice(), AIsign), 350);
}

function checkWin(board) {
  return winningPositions.some(position => {
    const check = board[position[0]];

    if (check === "") return false;

    return position.every(cell => board[cell] === check);
  });
}

function checkDraw(board) {
  return board.every(cell => cell !== "");
}

function checkEndGame(board, sign) {
  let overlayMessage = "";

  if (checkWin(board)) overlayMessage = sign.toUpperCase() + " wins!";
  else if (checkDraw(board)) overlayMessage = "It's a draw!";

  if (overlayMessage === "") return false;

  openOverlay(overlayMessage);
  return true;
}

function setPlayerChoice(idx, sign) {
  setCell(idx, sign);

  document
    .querySelector(`.grid > div:nth-child(${idx + 1})`)
    .classList.add(sign);
}

function cellClicked(cell) {
  if (isAIenabled) handleAI(cell);
  else handlePlayers(cell);
}

function handleAI(cell) {
  if (isCellFilled(cell)) return;

  setPlayerChoice(cell, userSign);

  if (checkEndGame(gameBoard, userSign)) return;

  setPlayerChoice(computeAIchoice(), AIsign);

  if (checkEndGame(gameBoard, AIsign)) return;
}

function handlePlayers(cell) {
  const currentPlayerSign = playerOrder[currentPlayer];

  if (isCellFilled(cell)) return;

  setPlayerChoice(cell, currentPlayerSign);

  if (checkEndGame(gameBoard, currentPlayerSign)) return;

  const grid = document.querySelector(".grid");
  grid.classList.remove(currentPlayerSign);
  currentPlayer = 1 - currentPlayer;
  grid.classList.add(playerOrder[currentPlayer]);
}

function openOverlay(text) {
  document.querySelector(".overlay p").innerText = text;

  document.querySelector(".overlay").classList.add("active");

  // push to next frame of the event loop
  setTimeout(() => document.addEventListener("mousedown", closeOverlay), 1);
}

function closeOverlay() {
  document.querySelector(".overlay").classList.remove("active");
  document.removeEventListener("mousedown", closeOverlay);
  resetBoard();
}

function setDifficulty(difficulty) {
  AIaccuracy = parseInt(difficulty);

  resetBoard();
}

function enableAI(enable) {
  isAIenabled = enable;

  resetBoard();
}

function randomChoice() {
  const emptyCells = getEmptyCells(gameBoard);

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function setPlayerSign(sign) {
  userSign = sign;

  AIsign = sign === playerOrder[0] ? playerOrder[1] : playerOrder[0];

  resetBoard();
}

function computeAIchoice() {
  const value = Math.random() * 100;

  if (value > AIaccuracy) return randomChoice();

  const board = [...gameBoard];

  const signs = [AIsign, userSign];

  const minmax = (signIdx, depth) => {
    if (checkWin(board))
      // the deeper the win is, the smaller the score is
      return { score: signIdx === 1 ? 10 - depth : depth - 10 };
    else if (checkDraw(board)) return { score: 0 };

    depth++;

    const moves = getEmptyCells(board).map(cell => {
      board[cell] = signs[signIdx];
      const score = minmax(1 - signIdx, depth).score;
      board[cell] = "";
      return { score, cell };
    });

    const compare = signIdx === 0 ? (a, b) => a < b : (a, b) => a > b;

    return moves.reduce((best, move) => {
      if (compare(best.score, move.score)) return move;
      return best;
    }, moves[0]);
  };

  return minmax(0, -1).cell;
}
