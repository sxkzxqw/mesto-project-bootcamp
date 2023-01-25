import "./pages/index.css";
import { initialCards } from "./components/defaultCards";
import { validation } from "./components/validate";
import { cardsList } from "./components/utils";
import { profileEditButton, profilePopupCloseButton, addButton, addCardPopupCloseButton, profilePopup, addCardPopup, templateBigImg, closeAndOpenProfilePopup, closePopupOnEscBtn, closePopupOnOverlayClick } from "./components/modal";
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
    closeAndOpenProfilePopup(profilePopup);
});
profileEditButton.addEventListener('click', () => {
    closeAndOpenProfilePopup(profilePopup);
});


//event listeners for second popup
addButton.addEventListener('click', () => {
    closeAndOpenProfilePopup(addCardPopup);
});

addCardPopupCloseButton.addEventListener('click', () => {
    closeAndOpenProfilePopup(addCardPopup);
});

//adding opportunity to close popups by escape button
closePopupOnEscBtn(profilePopup);
closePopupOnEscBtn(addCardPopup);
closePopupOnEscBtn(templateBigImg);
closePopupOnEscBtn(submitDeletePopup);

//adding opportunity to close popups by overflow click
closePopupOnOverlayClick(profilePopup);
closePopupOnOverlayClick(addCardPopup);
closePopupOnOverlayClick(templateBigImg);
closePopupOnOverlayClick(submitDeletePopup);

