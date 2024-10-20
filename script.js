let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let isVsComputer = false; // This determines whether the player is playing against a computer
const playerDisplay = document.getElementById('titleHeader');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartbutton');

// Winning combinations
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

// Function to check if a player has won
function checkWinner() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningCombinations[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        playerDisplay.innerHTML = `${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        playerDisplay.innerHTML = `It's a Draw!`;
        isGameActive = false;
    }
}

// Handle a user or computer move
function makeMove(index) {
    if (board[index] !== "" || !isGameActive) {
        return;
    }
    board[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    checkWinner();
    if (isGameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerDisplay.innerText = `${currentPlayer}'s Turn`;
    }
    if (isVsComputer && currentPlayer === "O" && isGameActive) {
        setTimeout(computerMove, 500);
    }
}

// Computer makes a random move
function computerMove() {
    let emptyCells = board.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(randomIndex);
    }
}

// Restart the game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    playerDisplay.innerText = "Choose";
    cells.forEach(cell => {
        cell.innerText = "";
    });
    document.getElementById("gameModeSelection").style.display = "block"; // Show game mode selection again
}

// Set the game mode: vs Player or vs Computer
function setGameMode(mode) {
    isVsComputer = mode === 'computer';
    document.getElementById("gameModeSelection").style.display = "none"; // Hide game mode selection
    playerDisplay.innerText = "Choose your player: X or O";
}

// Choose player and start the game
function choosePlayer(player) {
    if (isGameActive && playerDisplay.innerText.includes("Choose")) {
        currentPlayer = player;
        playerDisplay.innerText = `${currentPlayer}'s Turn`;
        document.getElementById(`${player.toLowerCase()}PlayerDisplay`).classList.add('player-active');
        document.getElementById(`${player === 'X' ? 'o' : 'x'}PlayerDisplay`).classList.remove('player-active');

        // If the computer is "O", the computer will make the first move
        if (isVsComputer && currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    }
}

// Add event listeners to the cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});

// Restart game on button click
restartButton.addEventListener('click', restartGame);
