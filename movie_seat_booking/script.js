const seating = document.getElementById("seating");
const seats = [...seating.querySelectorAll(".seat")];

/** @type {HTMLSelectElement} */
const movieSelector = document.getElementById("movie-selector");

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

movieSelector.addEventListener("change", () => {
    loadSavedSeatSelection();
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
    }
})

loadSavedSeatSelection();