sidebarToggle = document.getElementById('sidebar-toggle')

sidebarToggle.addEventListener('click', () => {
    document.body.classList.toggle('show-side-bar')
})

const showModalClass = "show-modal"

signUpBtn = document.getElementById("sign-up")
closeBtn = document.getElementById("modal-close-btn")
modalContainer = document.getElementById("modal-container")

signUpBtn.addEventListener("click", () => {
    modalContainer.classList.add(showModalClass)
})

closeBtn.addEventListener("click", () => {
    modalContainer.classList.remove(showModalClass)
})
modalContainer.addEventListener("click", (e) => {
    e.target == modalContainer ? modalContainer.classList.remove(showModalClass) : false
})