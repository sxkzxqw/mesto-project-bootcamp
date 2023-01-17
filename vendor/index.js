const editButton = document.querySelector('.profile__edit-button');
const editButtonPopup = document.querySelector('.popup');
const editButtonClosing = document.querySelector('.popup__close-button');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const editButtonPopupInputValueName = document.querySelector('.popup__form-text_type_name');
const editButtonPopupInputValueDescription = document.querySelector('.popup__form-text_type_description');
// open popup
editButton.addEventListener('click', function () {
    editButtonPopup.classList.add('popup_opened');
    editButtonPopupInputValueName.value = userName.textContent;
    editButtonPopupInputValueDescription.value = userDescription.textContent;
});
// close popup
editButtonClosing.addEventListener('click', function () {
    editButtonPopup.classList.remove('popup_opened');
});
// popup-name-display

//save values in popup
const formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = editButtonPopupInputValueName.value;
    userDescription.textContent = editButtonPopupInputValueDescription.value;
}

//function handleFormSubmitClosing(evt) {
//    evt.preventDefault();
//    editButtonPopup.classList.remove('popup_opened');
//}

/* formElement.addEventListener('submit', function () {
    handleFormSubmit();
    handleFormSubmitClosing();
}); 
 */

formElement.addEventListener('submit', handleFormSubmit);