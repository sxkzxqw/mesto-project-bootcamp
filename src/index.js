import "./pages/index.css";
import { initialCards } from "./components/defaultCards";
import { validation } from "./components/validate";
import { cardsList } from "./components/utils";
import { profileEditButton, profilePopupCloseButton, addButton, addCardPopupCloseButton, profilePopup, addCardPopup, templateBigImg, closePopupOnEscBtn, closePopupOnOverlayClick, closePopup, openPopup } from "./components/modal";
import { addPlace, submitDeletePopup } from "./components/card";

//add six default cards
initialCards.forEach(function (el) {
    const newPlace = addPlace(el);
    cardsList.prepend(newPlace);
});



//validation configuration
const selectorsForValidation = {
    formSelector: '.popup__form',
    buttonSubmitSelector: '.popup__button',
    inputSelector: '.popup__form-text',
    inputErrorSelector: 'popup__form-text_type_invalid',
    buttonDisabledSelector: 'popup__button_type_disabled'
}

validation(selectorsForValidation);



//event listeners for first popup
profilePopupCloseButton.addEventListener('click', () => {
    closePopup(profilePopup);
});
profileEditButton.addEventListener('click', () => {
    openPopup(profilePopup);
});


//event listeners for second popup
addButton.addEventListener('click', () => {
    openPopup(addCardPopup);
});


addCardPopupCloseButton.addEventListener('click', () => {
    closePopup(addCardPopup);
});



//adding opportunity to close popups by overflow click
profilePopup.addEventListener('mousedown', closePopupOnOverlayClick);
addCardPopup.addEventListener('mousedown', closePopupOnOverlayClick);
templateBigImg.addEventListener('mousedown', closePopupOnOverlayClick);
submitDeletePopup.addEventListener('mousedown', closePopupOnOverlayClick);

