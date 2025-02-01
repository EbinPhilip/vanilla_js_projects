const MARK_O = true;
const MARK_X = false;

const WinningCombinationType = Object.freeze({
    ROW: "row",
    COLUMN: "column",
    DIAGONAL: "diagonal",
    OFF_DIAGONAL: "off-diagonal"
});

const winningCombinations = [
    { indices: [0, 1, 2], type: WinningCombinationType.ROW },      // Top row
    { indices: [3, 4, 5], type: WinningCombinationType.ROW },      // Middle row
    { indices: [6, 7, 8], type: WinningCombinationType.ROW },      // Bottom row
    { indices: [0, 3, 6], type: WinningCombinationType.COLUMN },   // Left column
    { indices: [1, 4, 7], type: WinningCombinationType.COLUMN },   // Middle column
    { indices: [2, 5, 8], type: WinningCombinationType.COLUMN },   // Right column
    { indices: [0, 4, 8], type: WinningCombinationType.DIAGONAL }, // Top-left to bottom-right
    { indices: [2, 4, 6], type: WinningCombinationType.OFF_DIAGONAL } // Top-right to bottom-left
];

/** @type {Element[]} */
const cells = Array.from(document.querySelectorAll('.cell'));

const card = document.getElementById("card");
const cardFront = card.querySelector(".card-front");

const gameResult = document.getElementById("game-result");
const smiley = document.getElementById("smiley");
const restartButton = document.getElementById("restart");
const strikeLine = document.getElementById("strike-line");

let gameOver = false;

/**
 * @typedef {Object} winningCombination
 * @property {number[]} indices - The indices of the winning cells.
 * @property {string} type - The type of winning combination.
 */
let winningCombination = null;

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
        if (combination.indices.every(index => {
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

function drawStrikeLine() {

    /** @type {number[]} */
    const combination = winningCombination.indices;
    /** @type {string} */
    const combinationType = winningCombination.type;

    const firstRect = cells[combination[0]].getBoundingClientRect();
    const lastRect = cells[combination[2]].getBoundingClientRect();
    const boardRect = cardFront.getBoundingClientRect();

    let top, left, dx, dy;

    switch (combinationType) {
        
        case  WinningCombinationType.ROW:
            top = (firstRect.top + lastRect.bottom) / 2 - boardRect.top;
            left = firstRect.left - boardRect.left;
            dx = lastRect.right - firstRect.left;
            dy = 0;
            break;
        
        case WinningCombinationType.COLUMN:
            top = firstRect.top - boardRect.top;
            left = (firstRect.right + lastRect.left) / 2 - boardRect.left;
            dx = 0;
            dy = lastRect.bottom - firstRect.top;
            break;
        
        case WinningCombinationType.DIAGONAL:
            top = firstRect.top - boardRect.top;
            left = firstRect.left - boardRect.left;
            dx = lastRect.right - firstRect.left;
            dy = lastRect.bottom - firstRect.top;
            break;

        case WinningCombinationType.OFF_DIAGONAL:
            top = lastRect.bottom - boardRect.top;
            left = lastRect.left - boardRect.left;
            dx =  firstRect.right - lastRect.left;
            dy = firstRect.top - lastRect.bottom;
            break;
    }

    // Set position
    strikeLine.style.top = `${top}px`;
    strikeLine.style.left = `${left}px`;

    // Compute width
    // const dx = lastRect.bottom - firstRect.top;
    // const dy = lastRect.right - firstRect.left;
    strikeLine.style.width = `${Math.sqrt(dx * dx + dy * dy)}px`;

    // Compute rotation
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    strikeLine.style.transform = `rotate(${angle}deg)`;

    // Show the strike line
    strikeLine.style.visibility = `visible`;
}

function highlightWinningCombination(
    /** @type {boolean} */ didPlayerWin) {
    
    classToApply = didPlayerWin ? "won" : "lost";

    drawStrikeLine();
    strikeLine.classList.add(classToApply);
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