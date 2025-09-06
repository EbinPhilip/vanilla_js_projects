export class LetterBox {

    constructor(letter = '',  underlineOn = false) {
        this.letter = letter;
        this.underlineOn = underlineOn;
        [this.element, this.letterSpan] = this.createElement()
    }

    createElement() {
        /** @type {HTMLSpanElement} */
        const letterSpan = document.createElement("span")
        letterSpan.className = "letter"
        letterSpan.textContent = this.letter

        /** @type {HTMLSpanElement} */
        const letterBox = document.createElement("span")
        letterBox.className = "letter-box"
        letterBox.appendChild(letterSpan)
        if (this.underlineOn) {
            letterBox.classList.add("bg")
        }
        
        return [letterBox, letterSpan]
    }

    getElement() {
        return this.element
    }

    getCharacter() {
        return this.letter
    }

    bounce() {
         // If already animating, restart the animation
         if (this.isAnimating) {
            this.letterSpan.classList.remove("bounce");
            // // Force reflow
            this.letterSpan.offsetHeight;
        }

        this.isAnimating = true;
        this.letterSpan.classList.add('bounce');
        
        // Listen for animation end
        const handleAnimationEnd = () => {
            this.letterSpan.classList.remove('bounce');
            this.isAnimating = false;
            this.letterSpan.removeEventListener('animationend', handleAnimationEnd);
        };
        
        this.letterSpan.addEventListener('animationend', handleAnimationEnd);
    }
}
