let gameBoard, message, restartButton;
let board = [];
let currentPlayer = "red";
let gameOver = false;

// Initialiser les éléments du DOM
function initializeDomElements() {
    gameBoard = document.getElementById("gameBoard");
    message = document.getElementById("message");
    restartButton = document.getElementById("restartButton");

    // Ajouter l'écouteur d'événements seulement après avoir trouvé le bouton
    restartButton.addEventListener("click", () => {
        createBoard();
        drawBoard();
        message.textContent = "";
        currentPlayer = "red";
        gameOver = false;
    });
}

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
    return board;  // Retourner le plateau pour les tests
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
            if (checkDraw()) {
                message.textContent = "Match nul !";
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

    return checkDirection(0, 1) || // Lignes
        checkDirection(1, 0) ||    // Colonnes
        checkDirection(1, 1) ||    // Diagonale descendante
        checkDirection(1, -1);     // Diagonale montante
}

// Vérifier le match nul
function checkDraw() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (board[row][col] === null) {
                return false; // Il reste des cellules vides, donc le match n'est pas nul
            }
        }
    }
    return true; // Toutes les cellules sont remplies, donc c'est un match nul
}

// Initialiser le jeu
function initGame() {
    initializeDomElements();
    createBoard();
    drawBoard();
}

// Exporte les fonctions pour les tests
export { createBoard, drawBoard, handleCellClick, checkWin, checkDraw, initGame };