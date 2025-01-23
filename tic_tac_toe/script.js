
/** @type {Element[]} */
const cells = Array.from(document.querySelectorAll('.cell'));

const MARK_O = true;
const MARK_X = false;

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

function markCell(
    /** @type {HTMLDivElement} */ cell,
    /** @type {boolean} */ shouldMarkO,
) {

    cell.classList.add('clicked');
    cell.textContent = shouldMarkO ? "O" : "X";
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


document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.classList.contains('clicked')) {
            markCell(cell, MARK_X);


            markRandomCellWithO();
        }
    });
});

document.getElementById("restart").addEventListener("click", () => {
    location.reload();
})