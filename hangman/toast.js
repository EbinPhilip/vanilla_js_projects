export class Toast {
    constructor(toastElement) {
        /** @type {HTMLDivElement} */
        this.toastElement = toastElement;
        if (toastElement == null) {
            throw new Error("Toast not found");
        }
    }

    showToast() {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.toastElement.classList.add("show");
        this.timer = setTimeout(() => {
            this.toastElement.classList.remove("show");
        }, 1000);
    }
}