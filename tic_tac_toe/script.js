
/** @type {Element[]} */
const cells = Array.from(document.querySelectorAll('.cell'));

const card = document.getElementById("card");

const gameResult = document.getElementById("game-result");
const smiley = document.getElementById("smiley");
const restartButton = document.getElementById("restart");

let gameOver = false;

const MARK_O = true;
const MARK_X = false;

/** @type {number[]} */
let winningCombination = null;

const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6]  // Diagonal from top-right
];

function getRandomIndex(max) {
    return Math.floor(Math.random() * (max));
}

function isFreeCellPresent() {

    let freeCellPresent = false;
    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].classList.contains('clicked')) {
            freeCellPresent = true;
            break;
        }
    }

    return freeCellPresent;
}

function checkWin(/** @type {Element[]} */ playerSymbol) {

    return winningCombinations.some(combination=>{
        if (combination.every(index => {
            return cells[index].getAttribute("cell-symbol") === playerSymbol;
        })) {
            winningCombination = combination;
            return true;
        } else {
            return false;
        }
    })
}

function markCell(
    /** @type {HTMLDivElement} */ cell,
    /** @type {boolean} */ shouldMarkO,
) {

    cell.classList.add('clicked');

    const stringToMark = shouldMarkO ? "O" : "X";
    cell.textContent = stringToMark;
    cell.setAttribute("cell-symbol", stringToMark);
}

function markRandomCellWithO() {

    if (!isFreeCellPresent()) {
        return;
    }

    let randomIdx;
    do {

        randomIdx = getRandomIndex(cells.length);

    } while (cells[randomIdx].classList.contains("clicked"));

    markCell(cells[randomIdx], MARK_O);
}

function flipCardAndEndGame() {

    card.classList.add("flipped");
    gameOver = true;
}

function highlightWinningCombination(
    /** @type {boolean} */ didPlayerWin) {
    
    classToApply = didPlayerWin ? "won" : "lost";

    winningCombination.forEach(cellIdx => {
        cells[cellIdx].classList.add(classToApply);
    })
}

function endGamePlayerWon() {
    highlightWinningCombination(true);

    smiley.textContent = `\u{1F600}`;
    gameResult.textContent = "You won!";
    flipCardAndEndGame();
}

function endGamePlayerLost() {
    highlightWinningCombination(false);

    smiley.textContent = "\u{1F61E}";
    gameResult.textContent = "You lost!";
    flipCardAndEndGame();
}

function endGameDraw() {
    smiley.textContent = "\u{1F610}";
    gameResult.textContent = "It's a draw!";
    flipCardAndEndGame();
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameOver) {
            return;
        }

        if (!cell.classList.contains('clicked')) {
            markCell(cell, MARK_X);

            if (checkWin("X")) {
                endGamePlayerWon();
                return;
            }


            markRandomCellWithO();

            if (checkWin("O")) {
                endGamePlayerLost();
                return;
            }

            if (!isFreeCellPresent()) {
                endGameDraw();
            }
        }
    });
});

restartButton.addEventListener("click", () => {
    location.reload();
})