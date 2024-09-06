document.addEventListener('DOMContentLoaded', () => {
    const gameboard = document.getElementById('gameboard');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;

    // Create game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => handleClick(i));
        gameboard.appendChild(cell);
    }

    function handleClick(index) {
        if (board[index] || !gameActive) return;
        board[index] = currentPlayer;
        updateBoard();
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
        } else if (board.every(cell => cell)) {
            alert('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function updateBoard() {
        Array.from(gameboard.children).forEach((cell, index) => {
            cell.textContent = board[index];
        });
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    restartButton.addEventListener('click', () => {
        board = Array(9).fill(null);
        currentPlayer = 'X';
        gameActive = true;
        updateBoard();
    });
});