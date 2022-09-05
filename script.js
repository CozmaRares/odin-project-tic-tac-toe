let board = new Array(9).fill("");

const setCell = (cell, value) => {
  if (board[cell] !== "") return false;

  board[cell] = value;

  return true;
};

const resetBoard = () => {
  board = new Array(9).fill("");

  document
    .querySelectorAll(".grid img")
    .forEach(img => img.classList.remove("active"));
};

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

const checkWin = () => {
  return winningPositions.some(position => {
    const check = board[position[0]];

    if (check === "") return false;

    return position.every(cell => board[cell] === check);
  });
};

const checkDraw = () => {
  return board.every(cell => cell !== "");
};

const Player = sign => {
  const getSign = () => sign;

  const setChoice = idx => {
    if (setCell(idx, sign) === false) return false;

    const img = document.querySelector(
      `.grid > div:nth-child(${idx + 1}) > img`
    );
    img.src = `assets/${sign}.png`;
    img.classList.add("active");

    return true;
  };

  return { getSign, setChoice };
};

const players = [Player("X"), Player("O")];
let currentPlayer = 0;

function cellClicked(cell) {
  const isValid = players[currentPlayer].setChoice(cell);

  if (isValid === false) return;

  if (checkWin())
    return openOverlay(players[currentPlayer].getSign() + " wins!");

  if (checkDraw()) return openOverlay("It's a draw!");

  currentPlayer = 1 - currentPlayer;
}

function openOverlay(text) {
  currentPlayer = 0;

  document.querySelector(".overlay p").innerText = text;

  document.querySelector(".overlay").classList.add("active");

  // push to next frame of the event loop
  setTimeout(() => document.addEventListener("click", closeOverlay), 1);
}

function closeOverlay() {
  document.querySelector(".overlay").classList.remove("active");
  document.removeEventListener("click", closeOverlay);
  resetBoard();
}
