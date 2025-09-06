const CORRECT_TITLE = 'Great Job!'
const WRONG_TITLE = 'Oops...'
const CORRECT_SMILEY = '&#x1F600'
const INCORRECT_SMILEY = '&#x1F61E'

export class ResultCard {
    
    /**
     * @param {HTMLDivElement} resultCardElement - The div element containing the result card
     */
    constructor(resultCardElement) {
        /** @type {HTMLDivElement} */
        this.resultCard = resultCardElement;

        /** @type {HTMLHeadingElement} */
        this.titleElement = resultCardElement.querySelector('#result-title');
        if (!this.titleElement) throw new Error("Result title element not found");

        /** @type {HTMLParagraphElement} */
        this.answerElement = resultCardElement.querySelector("#result-answer");
        if (!this.answerElement) throw new Error("Result answer element not found");

        /** @type {HTMLParagraphElement} */
        this.smileyElement = resultCardElement.querySelector("#smiley");
        if (!this.smileyElement) throw new Error("Smiley element not found");

        /** @type {HTMLButtonElement} */
        this.restartBtnElement = resultCardElement.querySelector("#restart-btn");
        if (!this.restartBtnElement) throw new Error("Restart button element not found");

        /** @type {HTMLButtonElement} */
        this.closeBtnElement = resultCardElement.querySelector("#result-close");
        if (!this.closeBtnElement) throw new Error("Close button element not found");
    }

    showSuccess(answer) {
        this.titleElement.textContent = CORRECT_TITLE;
        this.smileyElement.innerHTML = CORRECT_SMILEY;
        this.#showResultCard(answer);
    }

    showFailure(answer) {
        this.titleElement.textContent = WRONG_TITLE;
        this.smileyElement.innerHTML = INCORRECT_SMILEY;
        this.#showResultCard(answer);

    }

    #showResultCard(answer) {
        this.answerElement.textContent = answer;
        this.restartBtnElement.onclick = () => window.location.reload();
        this.closeBtnElement.onclick = () => this.hideCard();
        this.#repaint();
        this.showCard();
    }

    showCard() {
        this.resultCard.style.visibility = "visible";
    }

    hideCard() {
        this.resultCard.style.visibility = "hidden";
    }

    #repaint() {
        this.resultCard.offsetHeight;
    }
}