
const form = document.getElementById('form');

/** @type {HTMLInputElement} */
var userNameField = document.getElementById("username");

/** @type {HTMLInputElement} */
var passwordField = document.getElementById("password");

/** @type {HTMLInputElement} */
var confirmPasswordField = document.getElementById("confirm-password");

/** @type {HTMLButtonElement} */
var submitButton = document.getElementById("submit-button");

/** @type {NodeListOf<HTMLInputElement>} */
var inputFields = document.querySelectorAll("input");

console.log(inputFields);

function setFormOptionFailedFromInputField(/** @type {HTMLInputElement} */ inputField,
    /** @type {string} */ errorMsg) {

    var formOption = inputField.parentElement;

    formOption.className = "form-option error";

    var smallText = formOption.querySelector("small");
    smallText.innerText = errorMsg;
}

function getFieldName(/** @type {HTMLInputElement} */ inputField) {

    return inputField.id.charAt(0).toUpperCase() + inputField.id.slice(1);
}

function setFormOptionSuccessFromInputField(/** @type {HTMLInputElement} */ inputField) {
    console.log("success");
    var formOption = inputField.parentElement;
    formOption.className = "form-option success";
}

function verifyNotEmpty(/** @type {HTMLInputElement} */ inputField) {
    
    if (inputField.value.trim() === "") {
        setFormOptionFailedFromInputField(inputField, `${getFieldName(inputField)} cannot be empty`);
        return false;
    }
    
    setFormOptionSuccessFromInputField(inputField);
    return true;
}

function verifyInputLengthWithinLimits(/** @type {HTMLInputElement} */ inputField, minLength, maxLength) {

    if (inputField.value.length > maxLength) {

        setFormOptionFailedFromInputField(inputField, `Length should be less that ${maxLength} characters`);
        return false;
    } else if (inputField.value.length < minLength) {

        setFormOptionFailedFromInputField(inputField, `Length should be greater that ${minLength} characters`);
        return false;
    } else {

        setFormOptionSuccessFromInputField(inputField);
        return true;
    }
}

function validateUserName() {

    if (verifyNotEmpty(userNameField)
        && verifyInputLengthWithinLimits(userNameField, 4, 16)) {
    
        return true;
    }

    return false;
}

function validatePassword() {

    if (verifyNotEmpty(passwordField)
        && verifyInputLengthWithinLimits(passwordField, 8, 20)) {
        return true;
    }

    return false;
}

function verifyPasswordsMatch() {

    if (confirmPasswordField.value !== passwordField.value) {

        setFormOptionFailedFromInputField(confirmPasswordField, `Passwords do not match`);
        return false;
    }

    setFormOptionSuccessFromInputField(confirmPasswordField);
    return true;
}

function validateConfirmPassword() {
    
    if (verifyNotEmpty(confirmPasswordField)
        && verifyPasswordsMatch()
        && verifyInputLengthWithinLimits(confirmPasswordField, 8, 20)) {

        return true;
    }

    return false;
}

form.addEventListener("submit", (submitEvent)=> {
    submitEvent.preventDefault();
    
    validateUserName();
    validatePassword();
    validateConfirmPassword();
})
