function showErrorMessage(inputElement, errorElement, selectors) {
    inputElement.classList.add(selectors.inputErrorSelector);
    errorElement.textContent = inputElement.validationMessage;
}

function hideErrorMessage(inputElement, errorElement, selectors) {
    inputElement.classList.remove(selectors.inputErrorSelector);
    errorElement.textContent = inputElement.validationMessage;
}

function buttonValidity(button, booleanTrue, selectors) {
    if (booleanTrue) {
        button.disabled = false;
        button.classList.remove(selectors.buttonDisabledSelector);
    } else {
        button.disabled = 'disabled';
        button.classList.add(selectors.buttonDisabledSelector);
        button.classList.remove('buttons-hover');
    }
}

function inputValidity(inputElement, elementForm, selectors) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = elementForm.querySelector(`#${inputElement.name}-error`);

    if (!isInputValid) {
        showErrorMessage(inputElement, errorElement, selectors);
    } else {
        hideErrorMessage(inputElement, errorElement, selectors);
    }
}

function setEventListeners(elementForm, selectors) {
    const inputList = elementForm.querySelectorAll(selectors.inputSelector);
    const submitButton = elementForm.querySelector(selectors.buttonSubmitSelector);

    buttonValidity(submitButton, elementForm.checkValidity(), selectors);

    elementForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    //reset validation on new card
    elementForm.addEventListener('reset', () => {
        buttonValidity(submitButton, false, selectors);
    });

    [...inputList].forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            buttonValidity(submitButton, elementForm.checkValidity(), selectors);
            inputValidity(inputElement, elementForm, selectors);
        });
    });
}



export function validation(selectors) {

    const allForms = document.querySelectorAll(selectors.formSelector);
    [...allForms].forEach((elementForm) => {

        setEventListeners(elementForm, selectors);
    });
}
