import { LetterBox } from "./letterbox.js";

export class WordBox {
    
    /**
     * Creates a new WordBox instance
     * @param {HTMLDivElement} wordBoxElement - DOM element to contain the word boxes
     * @param {string} word - Word to display in the word box
     * @throws {Error} If wordBoxElement is not found
     */
    constructor(wordBoxElement, word) {
        this.wordBoxElement = wordBoxElement;
        if (!this.wordBoxElement) {
            throw new Error("Empty wordbox element");
        }

        if (!/^[a-z ]+$/.test(word)) {
            throw new Error("Word must contain only lowercase alphabets and spaces");
        }

        /** @type {string} */
        this.word = word;
        
        /** @type {LetterBox[]} */
        this.letters = [];
       
        this.#initWordBox();
        this.charsAdded = 0;

        this.addCharacter(this.word[0]);
    }

    #initWordBox() {
        for (let i = 0; i < this.word.length; ++i) {
            const isSpaceChar = this.word[i] === " "            
            const letterBox = new LetterBox(isSpaceChar?" ": "", !isSpaceChar);
            this.letters.push(letterBox);
        }

        /** @type {HTMLSpanElement[]} */
        const elementsToAdd = this.letters.map(letterBox => letterBox.getElement());
        console.log("Elements to add", elementsToAdd);
        this.wordBoxElement.replaceChildren();
        for(let elem in elementsToAdd) {
            this.wordBoxElement.append(elementsToAdd[elem]);
        }
    }

    addCharacter(charToAdd) {
        if (!this.word.includes(charToAdd)) {
                console.log("couldn't add character");
            return;
        }

        for(let i = 0; i < this.letters.length; i++) {
            if (this.word[i] === charToAdd) {
                this.letters[i].setCharacter(charToAdd);
                this.charsAdded++;
            }
        }
    }

    bounceIfPresent(charToBounce) {
        for(let i = 0; i < this.letters.length; i++) {
            if (this.letters[i].getCharacter() === charToBounce) {
                this.letters[i].bounce()
            }
        }
    }
}