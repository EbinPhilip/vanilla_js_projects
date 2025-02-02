const seating = document.getElementById("seating");

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
    }
})