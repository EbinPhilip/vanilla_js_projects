import { LetterBox } from './letterbox.js';

export class WrongLetters {
    
    /**
     * Creates a new WrongLetters instance
     * @param {HTMLDivElement} wrongLettersElement - DOM element to contain wrong letter boxes
     * @throws {Error} If wrongLettersElement is not found
     */
    constructor(wrongLettersElement) {
        this.domObject = wrongLettersElement;
        if (!this.domObject) {
            throw new Error('Could not find wrong-letters element');
        }
        
        /** @type {LetterBox[]} */
        this.letters = [];
    }

    /**
     * @param {string} charToFind - Single character to search for
     * @returns {LetterBox|undefined} Found letter box or undefined if not found
     */
    #findLetter(charToFind) {
        for (let i = 0; i < this.letters.length; ++i) {
            if (charToFind === this.letters[i].getCharacter()) {
                return this.letters[i];
            }
        }

        return undefined;
    }

    addLetter(charToAdd) {
        let letterBox = new LetterBox(charToAdd);
        this.letters.push(letterBox);

        this.domObject.appendChild(letterBox.getElement());
    }

    bounce(charToBounce) {
        const letter = this.#findLetter(charToBounce);
        if (letter) {
            letter.bounce();
        }
    }
}