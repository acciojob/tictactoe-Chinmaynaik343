//your JS code here. If required.
const playerForm = document.getElementById("submitForm");
const playerFormContainer = document.getElementById("playerForm");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart");

let players = [];
let currentPlayer = 0;
let board = Array(9).fill("");
let gameOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

playerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const player1 = document.getElementById("player-1").value.trim();
  const player2 = document.getElementById("player-2").value.trim();

  if (!player1 || !player2) {
    return;
  }

  players = [
    { name: player1, symbol: "x" },
    { name: player2, symbol: "o" }
  ];

  playerFormContainer.hidden = true;
  game.hidden = false;

  startGame();
});

function startGame() {
  board = Array(9).fill("");
  currentPlayer = 0;
  gameOver = false;

  cells.forEach(function (cell) {
    cell.textContent = "";
  });

  updateMessage();
}

function updateMessage() {
  message.textContent =
    players[currentPlayer].name + ", you're up";
}

cells.forEach(function (cell) {
  cell.addEventListener("click", function () {
    const index = Number(cell.id) - 1;

    if (gameOver || board[index] !== "") {
      return;
    }

    board[index] = players[currentPlayer].symbol;
    cell.textContent = players[currentPlayer].symbol;

    if (checkWinner()) {
      message.textContent =
        players[currentPlayer].name + " congratulations you won!";
      gameOver = true;
      return;
    }

    if (board.every(function (value) {
      return value !== "";
    })) {
      message.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === 0 ? 1 : 0;
    updateMessage();
  });
});

function checkWinner() {
  return winningCombinations.some(function (combination) {
    const [a, b, c] = combination;

    return (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    );
  });
}

restartBtn.addEventListener("click", startGame);