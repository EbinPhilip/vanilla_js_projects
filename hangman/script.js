import { AppContext } from "./appcontext.js";
import { LetterBox } from "./letterbox.js";
import { WrongLetters } from "./wrongletters.js";


/** @type {string[]} */
const charsEntered = [];
/** @type {string} */
const currentWord = await fetchWordsByLength(10);

console.log(currentWord);

const appContext = new AppContext(currentWord)

const wrongLettersService = appContext.getServices().wrongLettersService;
const wordBoxService = appContext.getServices().wordBoxService;
const toastService = appContext.getServices().toastService;
const figureService = appContext.getServices().figureService;
const resultCardService = appContext.getServices().resultCardService;

let gameOver = false;

async function fetchWordsByLength(length = 10) {
    const url = `https://random-words-api.kushcreates.com/api?language=en&length=${length}&words=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json(); 
    return data.map(item => item.word)[0];
}

document.addEventListener('keypress', (event) => {
    if (gameOver) {
        return;
    }

    const char = event.key.toLowerCase();
    if (!/^[a-z]$/.test(char)) {
        return;
    }

    if (!charsEntered.includes(char)) {
        charsEntered.push(char);
        if (currentWord.includes(char)) {
            wordBoxService.addCharacter(char);
        } else {
            wrongLettersService.addLetter(char)
            figureService.displayNextPart()
        }
    } else {
        if (currentWord.includes(char)) {
            wordBoxService.bounceIfPresent(char);
        } else {
            wrongLettersService.bounce(char)
        }
        toastService.showToast()
    }

    if (figureService.isHanged()) {
        gameOver = true;
        resultCardService.showFailure(currentWord);
    } else if (wordBoxService.isWordCompleted()) {
        gameOver = true;
        resultCardService.showSuccess(currentWord)
    }
});

