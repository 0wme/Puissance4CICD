const gameBoard = document.getElementById("gameBoard");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

let board = [];
let currentPlayer = "red";
let gameOver = false;

// Initialiser le tableau
function createBoard() {
    board = [];
    for (let row = 0; row < 6; row++) {
        const rowArray = [];
        for (let col = 0; col < 7; col++) {
            rowArray.push(null);
        }
        board.push(rowArray);
    }
}

// Dessiner le plateau
function drawBoard() {
    gameBoard.innerHTML = "";
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (board[row][col]) {
                cell.classList.add(board[row][col]);
            }
            cell.addEventListener("click", () => handleCellClick(col));
            gameBoard.appendChild(cell);
        }
    }
}

// Gérer les clics sur les cases
function handleCellClick(col) {
    if (gameOver) return;

    for (let row = 5; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            drawBoard();
            if (checkWin()) {
                message.textContent = `Le joueur ${currentPlayer === "red" ? "rouge" : "jaune"} a gagné !`;
                gameOver = true;
                return;
            }
            currentPlayer = currentPlayer === "red" ? "yellow" : "red";
            return;
        }
    }
}

// Vérifier la victoire
function checkWin() {
    // Vérifier les lignes, colonnes et diagonales
    function checkDirection(dirRow, dirCol) {
        let count = 0;
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                count = 0;
                for (let i = 0; i < 4; i++) {
                    const newRow = row + i * dirRow;
                    const newCol = col + i * dirCol;
                    if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7) break;
                    if (board[newRow][newCol] === currentPlayer) count++;
                    if (count === 4) return true;
                }
            }
        }
        return false;
    }

    return checkDirection(0, 1) || // Horizontal
        checkDirection(1, 0) || // Vertical
        checkDirection(1, 1) || // Diagonale droite-bas
        checkDirection(1, -1);  // Diagonale droite-haut
}

// Recommencer le jeu
restartButton.addEventListener("click", () => {
    createBoard();
    drawBoard();
    message.textContent = "";
    currentPlayer = "red";
    gameOver = false;
});

// Initialiser le jeu
createBoard();
drawBoard();