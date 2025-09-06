import { AppContext } from "./appcontext.js";
import { LetterBox } from "./letterbox.js";
import { WrongLetters } from "./wrongletters.js";


const appContext = new AppContext()

const charsEntered = [];
const currentWord = await fetchWordsByLength(10);

console.log(currentWord);

const wrongLettersService = appContext.getServices().wrongLettersService;
const toastService = appContext.getServices().toastService;

async function fetchWordsByLength(length = 10) {
    const url = `https://random-words-api.kushcreates.com/api?language=en&length=${length}&words=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json(); 
    return data.map(item => item.word);
}

document.addEventListener('keypress', (event) => {
    const char = event.key.toLowerCase();
    console.log("", char);
    if (/^[a-z]$/.test(char)) {
        if (!charsEntered.includes(char)) {
            charsEntered.push(char);
            wrongLettersService.addLetter(char)
        } else {
            wrongLettersService.bounce(char)
            toastService.showToast()
        }
    }
});

