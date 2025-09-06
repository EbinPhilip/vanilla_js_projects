import { Toast } from "./toast.js";
import { WrongLetters } from "./wrongletters.js";

export class AppContext {

    constructor() {
        this.services = {
            /** @type {WrongLetters} */
            wrongLettersService: undefined,
            /** @type {Toast} */
            toastService: undefined
        }
        this.registerDomElements();
        this.registerServices();
    }

    registerDomElements() {
        this.wrongLettersElement = document.getElementById('wrong-letters');
        this.toastElement = document.getElementById("notification");
    }

    registerServices() {
        this.services.wrongLettersService = new WrongLetters(this.wrongLettersElement);
        this.services.toastService = new Toast(this.toastElement);
    }

    getServices() {
        return this.services;
    }
}