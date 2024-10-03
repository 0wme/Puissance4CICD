import { createBoard, checkWin, checkDraw, handleCellClick, initGame } from '../game'; 

describe('Tests du jeu Puissance 4', () => {
    let board;

    beforeEach(() => {
        // Simuler la structure HTML nécessaire pour les tests
        document.body.innerHTML = `
          <div id="gameBoard"></div>
          <div id="message"></div>
          <button id="restartButton"></button>
        `;

        initGame();  // Initialiser le jeu, ce qui initialise aussi les éléments DOM

        board = createBoard();  // Réinitialiser le plateau avant chaque test
    });

    // Test sur la création du plateau
    test('devrait créer un tableau de 6 lignes et 7 colonnes', () => {
        expect(board.length).toBe(6);
        expect(board[0].length).toBe(7);
    });

    // Test de la victoire horizontale
    test('devrait détecter une victoire horizontale', () => {
        board[0][0] = 'red';
        board[0][1] = 'red';
        board[0][2] = 'red';
        board[0][3] = 'red';
        expect(checkWin()).toBe(true);  // Vérifie qu'une victoire horizontale est détectée
    });

    // Test de la victoire verticale
    test('devrait détecter une victoire verticale', () => {
        board[0][0] = 'red';
        board[1][0] = 'red';
        board[2][0] = 'red';
        board[3][0] = 'red';
        expect(checkWin()).toBe(true);  // Vérifie qu'une victoire verticale est détectée
    });

    // Test d'absence de victoire
    test('devrait ne pas détecter de victoire au début', () => {
        expect(checkWin()).toBe(false);  // Aucun jeton n'a été placé, donc pas de victoire
    });

    // Test du match nul
    test('devrait détecter un match nul quand toutes les cases sont remplies', () => {
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                board[row][col] = (col % 2 === 0) ? 'red' : 'yellow';
            }
        }
        expect(checkDraw()).toBe(true);  // Vérifie que le match nul est détecté
    });

    // Test de la gestion des clics
    test('devrait gérer un clic sur une colonne et changer de joueur', () => {
        handleCellClick(0);
        expect(board[5][0]).toBe('red');
        handleCellClick(0);
        expect(board[4][0]).toBe('yellow');
    });
});