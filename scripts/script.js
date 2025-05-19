// Initialize game variables
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.querySelector(".reset");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Add event listeners to cells
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Handle cell click
function handleCellClick() {
    const cellIndex = this.getAttribute("data-index");

    // Check if the cell is already taken
    if (board[cellIndex] !== "" || checkWinner()) {
        return;
    }

    // Update the board and UI
    board[cellIndex] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add("taken");

    // Check for a winner or a draw
    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
    } else if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
    } else {
        // Switch players
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check if there is a winner
function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
}

// Reset the game
resetButton.addEventListener("click", resetGame);

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}
