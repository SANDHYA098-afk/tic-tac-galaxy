// 🌌 DOM Elements
const gameBoard = document.getElementById("gameBoard");
const gridSizeSelect = document.getElementById("grid-size");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const modeSelect = document.getElementById("mode");
const markerSelect = document.getElementById("player-marker");
const themeSelect = document.getElementById("theme");

// 🌀 Game State
let gridSize = 3;
let currentPlayer = "X";
let gameRunning = false;
let board = [];

// ⚙ Initialization
window.addEventListener("DOMContentLoaded", () => {
  setupBoard();
  addEventListeners();
});

// 🛠 Setup Event Listeners
function addEventListeners() {
  gridSizeSelect.addEventListener("change", () => {
    gridSize = parseInt(gridSizeSelect.value);
    setupBoard();
  });

  restartBtn.addEventListener("click", () => {
    setupBoard();
  });

  themeSelect.addEventListener("change", () => {
    changeTheme(themeSelect.value);
  });
}

// 🌌 Change Theme
function changeTheme(theme) {
  document.body.classList.remove("pixel-theme", "dark-theme", "pastel-theme");

  if (theme === "pixel") {
    document.body.classList.add("pixel-theme");
  } else if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else if (theme === "pastel") {
    document.body.classList.add("pastel-theme");
  }
}

// 🔄 Setup the Game Board
function setupBoard() {
  board = Array(gridSize * gridSize).fill("");
  currentPlayer = "X";
  gameRunning = true;

  // Clear and style the grid
  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  }

  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// 🚀 Handle Cell Click
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameRunning || board[index] !== "") return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameRunning = false;
  } else if (!board.includes("")) {
    statusText.textContent = `It's a Draw! 🌀`;
    gameRunning = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// 🧠 Winner Check (supports 3x3 to 5x5)
function checkWinner() {
  const winCount = gridSize;

  // Row Check
  for (let r = 0; r < gridSize; r++) {
    let rowStart = r * gridSize;
    let row = board.slice(rowStart, rowStart + gridSize);
    if (row.every(cell => cell === currentPlayer)) return true;
  }

  // Column Check
  for (let c = 0; c < gridSize; c++) {
    let col = [];
    for (let r = 0; r < gridSize; r++) {
      col.push(board[r * gridSize + c]);
    }
    if (col.every(cell => cell === currentPlayer)) return true;
  }

  // Diagonal Check - TL to BR
  let diag1 = [];
  for (let i = 0; i < gridSize; i++) {
    diag1.push(board[i * gridSize + i]);
  }
  if (diag1.every(cell => cell === currentPlayer)) return true;

  // Diagonal Check - TR to BL
  let diag2 = [];
  for (let i = 1; i <= gridSize; i++) {
    diag2.push(board[i * gridSize - i]);
  }
  if (diag2.every(cell => cell === currentPlayer)) return true;

  return false;
}
window.addEventListener("DOMContentLoaded", () => {
  const bgAudio = document.getElementById("bg-audio");

  // Play audio after first user interaction
  const enableAudio = () => {
    bgAudio.volume = 0.3;
    bgAudio.muted = false;
    bgAudio.play();
    document.removeEventListener("click", enableAudio);
  };

  document.addEventListener("click", enableAudio);

});
