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
        }
        this.registerDomElements();
        this.registerServices();
    }

    registerDomElements() {
        this.wrongLettersElement = document.getElementById('wrong-letters');
        this.toastElement = document.getElementById("notification");
        this.wordBoxElement = document.getElementById("word");
    }

    registerServices() {
        this.services.wrongLettersService = new WrongLetters(this.wrongLettersElement);
        this.services.toastService = new Toast(this.toastElement);
        this.services.wordBoxService = new WordBox(this.wordBoxElement, this.word);
    }

    getServices() {
        return this.services;
    }
}