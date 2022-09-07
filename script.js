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

const playerSigns = ["X", "O"];
let currentPlayer = 0;

let board = new Array(9).fill("");

function setCell(cell, value) {
  if (board[cell] !== "") return false;

  board[cell] = value;

  return true;
}

function resetBoard() {
  currentPlayer = 0;

  board = new Array(9).fill("");

  document
    .querySelectorAll(".grid img")
    .forEach(img => img.classList.remove("active"));
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

function setPlayerChoice(idx, sign) {
  if (setCell(idx, sign) === false) return false;

  const img = document.querySelector(`.grid > div:nth-child(${idx + 1}) > img`);
  img.src = `assets/${sign}.png`;
  img.classList.add("active");

  return true;
}

function cellClicked(cell) {
  const currentPlayerSign = playerSigns[currentPlayer];

  const isValid = setPlayerChoice(cell, currentPlayerSign);

  if (isValid === false) return;

  if (checkWin()) return openOverlay(currentPlayerSign + " wins!");

  if (checkDraw()) return openOverlay("It's a draw!");

  currentPlayer = 1 - currentPlayer;
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
  console.log(difficulty);
}

function enableAI(enable) {
  console.log(enable);
}
