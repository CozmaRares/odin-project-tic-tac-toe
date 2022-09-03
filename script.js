const gameLogic = (() => {
  let board = new Array(9).fill("");

  const initialGridHTML = document.querySelector(".grid").innerHTML;

  const setCell = (cell, value) => {
    if (board[cell] !== "") return false;

    board[cell] = value;

    return true;
  };

  const resetBoard = () => {
    board = new Array(9).fill("");

    document.querySelector(".grid").innerHTML = initialGridHTML;
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

  const setChoice = idx => {
    if (gameLogic.setCell(idx, sign) === false) return false;

    document.querySelector(
      `.grid > div:nth-child(${idx + 1}) > img`
    ).src = `assets/${sign}.png`;

    return true;
  };

  return { setChoice };
};

const players = [Player("x"), Player("o")];
let currentPlayer = 0;

function aaa(cell) {
  const isValid = players[currentPlayer].setChoice(cell);

  if (isValid === false) return;

  console.log("win", gameLogic.checkWin());

  currentPlayer = 1 - currentPlayer;
}
