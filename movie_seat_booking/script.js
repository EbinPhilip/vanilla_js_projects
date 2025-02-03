const seating = document.getElementById("seating");
const seats = [...seating.querySelectorAll(".seat")];

/** @type {HTMLSelectElement} */
const movieSelector = document.getElementById("movie-selector");

const seatSelectedCounter = document.getElementById("seat-count");
const totalPriceCounter = document.getElementById("total-price");

const movieDetailsStruct = {
    "Kingdom of the Planet of the Apes" : {
        price: 20
    },
    "Deadpool and Wolverine" : {
        price: 40
    },
    "Joker: Folie a deux" : {
        price: 30
    },
}

function saveSeatSelection() {    

    const selectedIndices = seats
        .map((seat, index) => seat.classList.contains("selected") ? index : -1)
        .filter(index => index !== -1);

    const selectedIndicesString = JSON.stringify(selectedIndices);
    const currentSelectedMovie = movieSelector.value;

    localStorage.setItem(currentSelectedMovie, selectedIndicesString);
}

function resetSeatsToUnselected() {

    seats.forEach((seat)=>{
        if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
            seat.classList.add("available")
        }
    })
}

function loadSavedSeatSelection() {
    resetSeatsToUnselected();

    const currentSelectedMovie = movieSelector.value;

    const selectedIndicesString = localStorage.getItem(currentSelectedMovie);
    if (selectedIndicesString == null) {
        return;
    }

    /** @type {number[]} */
    const selectedIndices = JSON.parse(selectedIndicesString);

    selectedIndices.forEach(seatIndex => {
        seats[seatIndex].classList.add("selected");
    })
}

function updateSelectionSumary() {

    const selectedSeats = [...seating.querySelectorAll(".seat.selected")];
    const currentSelectedMovie = movieSelector.value;

    seatSelectedCounter.innerText = selectedSeats.length;
    totalPriceCounter.innerText = selectedSeats.length * movieDetailsStruct[currentSelectedMovie].price;
}

function updateBookingStateFromStorage() {
    loadSavedSeatSelection();
    updateSelectionSumary();
}

movieSelector.addEventListener("change", () => {
    updateBookingStateFromStorage();
})

seating.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("seat")
        && !target.classList.contains("occupied")) {

        if (target.classList.contains("selected")) {
            target.classList.remove("selected");
            target.classList.add("available");
        } else {
            target.classList.add("selected");
            target.classList.remove("available")
        }

        saveSeatSelection();
        updateSelectionSumary();
    }
})

updateBookingStateFromStorage();