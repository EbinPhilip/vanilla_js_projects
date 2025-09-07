import { Figure } from "./figure.js";
import { ResultCard } from "./result.js";
import { Toast } from "./toast.js";
import { WordBox } from "./wordbox.js";
import { WrongLetters } from "./wrongletters.js";

export class AppContext {

    constructor(word) {
        this.word = word;
        this.services = {
            /** @type {WrongLetters} */
            wrongLettersService: undefined,
            /** @type {Toast} */
            toastService: undefined,
            /** @type {WordBox} */
            wordBoxService: undefined,
            /** @type {Figure} */
            figureService: undefined,
            /** @type {ResultCard} */
            resultCardService: undefined,
        }
        this.registerDomElements();
        this.registerServices();
    }

    registerDomElements() {
        this.wrongLettersElement = document.getElementById('wrong-letters');
        this.toastElement = document.getElementById("notification");
        this.wordBoxElement = document.getElementById("word");
        this.figureElement = document.getElementById("figure");
        this.resultCardElement = document.getElementById("result");
    }

    registerServices() {
        this.services.wrongLettersService = new WrongLetters(this.wrongLettersElement);
        this.services.toastService = new Toast(this.toastElement);
        this.services.wordBoxService = new WordBox(this.wordBoxElement, this.word);
        this.services.figureService = new Figure(this.figureElement);
        this.services.resultCardService = new ResultCard(this.resultCardElement)
    }

    getServices() {
        return this.services;
    }
}