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

const playerSigns = ["x", "o"];
let currentPlayer = 0;

let board = new Array(9).fill("");

let isAIEnabled = false,
  AIFunction;

let playerSign = "x",
  AISign = "o";

function setCell(cell, value) {
  board[cell] = value;
}

function isCellFilled(cell) {
  return board[cell] !== "";
}

function getEmptyCells() {
  const emptyCells = [];

  board.forEach((cell, idx) => {
    if (cell === "") emptyCells.push(idx);
  });

  return emptyCells;
}

function resetBoard() {
  currentPlayer = 0;

  board = new Array(9).fill("");

  document.querySelectorAll(".grid div").forEach(div => (div.className = ""));
  document.querySelector(".grid").className = "grid x";
}

function checkWin() {
  return winningPositions.some(position => {
    const check = board[position[0]];

    if (check === "") return false;

    return position.every(cell => board[cell] === check);
  });
}

function checkDraw() {
  return board.every(cell => cell !== "");
}

function checkEndGame(sign) {
  let overlayMessage = "";

  if (checkWin()) overlayMessage = sign.toUpperCase() + " wins!";
  else if (checkDraw()) overlayMessage = "It's a draw!";

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
  if (isAIEnabled) handleAI(cell);
  else handlePlayers(cell);
}

function handleAI(cell) {
  if (isCellFilled(cell)) return;

  setPlayerChoice(cell, playerSign);

  if (checkEndGame(playerSign)) return;

  setPlayerChoice(AIFunction(), AISign);

  if (checkEndGame(AISign)) return;
}

function handlePlayers(cell) {
  const currentPlayerSign = playerSigns[currentPlayer];

  if (isCellFilled(cell)) return;

  setPlayerChoice(cell, currentPlayerSign);

  if (checkEndGame(currentPlayerSign)) return;

  const grid = document.querySelector(".grid");

  grid.classList.remove(currentPlayerSign);

  currentPlayer = 1 - currentPlayer;

  grid.classList.add(playerSigns[currentPlayer]);
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
  AIFunction = window[difficulty];

  resetBoard();
}

function enableAI(enable) {
  isAIEnabled = enable;

  resetBoard();
}

function easy() {
  const emptyCells = getEmptyCells();

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function medium() {
  console.log("medium");
}

function hard() {
  console.log("hard");
}

function impossible() {
  console.log("impossible");
}

AIFunction = easy;
