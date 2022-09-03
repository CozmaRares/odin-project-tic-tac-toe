const gameLogic = (() => {
  let board = new Array(9).fill("");

  const resetBoard = () => (board = new Array(9).fill(""));

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

  const a = () => {
    console.log(board[0], board[1], board[2]);
    console.log(board[3], board[4], board[5]);
    console.log(board[6], board[7], board[8]);
  };

  const setCell = (idx, value) => {
    board[idx] = value;
    return checkWin();
  };

  return { resetBoard, setCell, checkWin, a };
})();

const Player = sign => {
  const setChoice = idx => {
    gameLogic.setCell(idx, sign);
  };

  return { setChoice };
};

const human = Player("X");
