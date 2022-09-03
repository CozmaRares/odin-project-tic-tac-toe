const gameLogic = (() => {
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

  const checkWin = () => {
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

    return winningPositions.some(position => {
      const check = board[position[0]];

      if (check === "") return false;

      return position.every(cell => board[cell] === check);
    });
  };

  return { resetBoard, setCell, checkWin };
})();

const Player = sign => {
  sign = sign.toUpperCase();

  const getSign = () => sign;

  const setChoice = idx => {
    if (gameLogic.setCell(idx, sign) === false) return false;

    const img = document.querySelector(
      `.grid > div:nth-child(${idx + 1}) > img`
    );
    img.src = `assets/${sign}.png`;
    img.classList.add("active");

    return true;
  };

  return { getSign, setChoice };
};

const players = [Player("x"), Player("o")];
let currentPlayer = 0;

function aaa(cell) {
  const isValid = players[currentPlayer].setChoice(cell);

  if (isValid === false) return;

  if (gameLogic.checkWin()) {
    document.querySelector(".overlay p").innerText =
      players[currentPlayer].getSign() + " wins";

    document.querySelector(".overlay").classList.add("active");

    // push to next frame of the event loop
    setTimeout(() => document.addEventListener("click", closeOverlay), 1);

    return;
  }

  currentPlayer = 1 - currentPlayer;
}

function closeOverlay() {
  document.querySelector(".overlay").classList.remove("active");
  document.removeEventListener("click", closeOverlay);
  gameLogic.resetBoard();
}
