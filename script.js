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

function setCell(cell, value) {
  board[cell] = value;
}

function isCellFilled(cell) {
  return board[cell] !== "";
}

function resetBoard() {
  currentPlayer = 0;

  board = new Array(9).fill("");

  document.querySelectorAll(".grid div").forEach(div => (div.className = ""));
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
  setCell(idx, sign);

  document
    .querySelector(`.grid > div:nth-child(${idx + 1})`)
    .classList.add(sign);
}

function cellClicked(cell) {
  const currentPlayerSign = playerSigns[currentPlayer];

  if (isCellFilled(cell)) return;

  setPlayerChoice(cell, currentPlayerSign);

  console.log(checkWin());

  if (checkWin())
    return openOverlay(currentPlayerSign.toUpperCase() + " wins!");

  if (checkDraw()) return openOverlay("It's a draw!");

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
  console.log(difficulty);
}

function enableAI(enable) {
  console.log(enable);
}
