const editButton = document.querySelector('.profile__edit-button');
const editButtonPopup = document.querySelector('.popup');
const editButtonClosing = document.querySelector('.popup__close-button');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const editButtonPopupInputValueName = document.getElementsByName('user-name');
const editButtonPopupInputValueDescription = document.getElementsByName('user-description');
// open popup
editButton.addEventListener('click', function () {
    editButtonPopup.classList.add('popup_opened');
    editButtonPopupInputValueName[0].setAttribute('value', userName.textContent);
    editButtonPopupInputValueDescription[0].setAttribute('value', userDescription.textContent);
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
    userName.textContent = editButtonPopupInputValueName[0].getAttribute('value');
    userDescription.textContent = editButtonPopupInputValueDescription[0].getAttribute('value');
}
formElement.addEventListener('submit', handleFormSubmit); 
