export class Figure {
    /**
     * @param {SVGElement} figureElement - The SVG element representing the hangman figure
     */
    constructor(figureElement) {
        this.figureElement = figureElement;
        /** @type {SVGElement[]} */
        this.parts = [];
        const children = Array.from(this.figureElement.children);
        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            if (child.classList.contains('figure-part')) {
                this.parts.push(child);
            }
        }
    }

    displayNextPart() {
        if (this.isHanged()) {
            console.log("all parts displayed");
            return;
        }

        const part = this.parts.pop();
        part.setAttribute('style', 'display: inherit')
    }

    isHanged() {
        return this.parts.length === 0;
    }
}