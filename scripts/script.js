// ================================================
// Tic-Tac-Toe Game Implementation (Vanilla JS)
// Author: [Erick Rodriguez]
// Description:
//   Simple and efficient browser-based Tic-Tac-Toe game
//   demonstrating DOM manipulation, event-driven architecture,
//   and clean state management.
// ================================================

// --- DOM ELEMENT SELECTION & INITIALIZATION ---

// Select all grid cells representing the 9 playable positions
const cells = document.querySelectorAll(".cell");

// Reference to the text element displaying game status messages
const statusText = document.querySelector(".status");

// Reference to the button used to reset the game state
const resetButton = document.querySelector(".reset");

// Track the current active player ("X" always starts first)
let currentPlayer = "X";

// Internal representation of the 3x3 game board using a flat array
let board = ["", "", "", "", "", "", "", "", ""];

// Predefined index combinations representing all possible win conditions
// Includes horizontal, vertical, and diagonal lines
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// --- EVENT REGISTRATION ---

// Assign a click event listener to each cell
// Each click triggers the core interaction handler
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// --- CORE GAME LOGIC ---

/**
 * Handles user interaction with a cell.
 * Updates the board state, validates moves,
 * checks for winning conditions, and alternates turns.
 */
function handleCellClick() {
    const cellIndex = this.getAttribute("data-index");

    // Prevent overwriting existing moves or playing after game end
    if (board[cellIndex] !== "" || checkWinner()) {
        return;
    }

    // Register the move in both the internal state and UI
    board[cellIndex] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add("taken");

    // Evaluate the board for win or draw conditions
    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
    } else if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
    } else {
        // Alternate between Player X and Player O
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

/**
 * Determines whether the current board state satisfies any win condition.
 * Uses array destructuring for clarity and concise logic.
 * @returns {boolean} True if a winning condition is met.
 */
function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
}

// --- GAME RESET HANDLER ---

// Reset button event binding — allows replaying without reload
resetButton.addEventListener("click", resetGame);

/**
 * Resets the game to its initial state.
 * Clears board data, restores UI, and resets the current player.
 */
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    // Clear the board UI and remove any styling applied to played cells
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}
