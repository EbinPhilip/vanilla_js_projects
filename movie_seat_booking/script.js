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
    const selectedSeats = [...seating.querySelectorAll(".seat.selected")];
    
    const selectedIndices = []
    selectedSeats.forEach(seat => {
        const index = seats.indexOf(seat);
        selectedIndices.push(index);
    })

    console.log("saving");
    console.log(selectedIndices);

    const selectedIndicesString = JSON.stringify(selectedIndices);
    console.log(selectedIndicesString);
    const currentSelectedMovie = movieSelector.value;

    localStorage.setItem(currentSelectedMovie, selectedIndicesString);
}

function resetSeatsToUnselected() {

    seats.forEach((seat)=>{
        seat.classList.remove("selected");
    })
}

function loadSavedSeatSelection() {
    resetSeatsToUnselected();

    const currentSelectedMovie = movieSelector.value;
    
    console.log("loading selection");
    console.log("current selection:" + currentSelectedMovie);

    const selectedIndicesString = localStorage.getItem(currentSelectedMovie);
    if (selectedIndicesString == null) {
        console.log("storage not found");
        return;
    }

    console.log(selectedIndicesString);

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
        }

        saveSeatSelection();
        updateSelectionSumary();
    }
})

updateBookingStateFromStorage();