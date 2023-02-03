import './components/api';
import "./pages/index.css";
import { validation } from "./components/validate";

import { buttonValidityForStatus, 
        cardsList,
        popupPlaceHolderForLink,
        popupPlaceHolderForNameOfPlace,
        formElementImage } from "./components/utils";

import { profileEditButton, 
        profilePopupCloseButton, 
        addButton, 
        addCardPopupCloseButton, 
        profilePopup, 
        addCardPopup, 
        templateBigImg, 
        closePopupOnOverlayClick, 
        closePopup, 
        openPopup, 
        profileImage, 
        profileImagePopup, 
        profileImagePopupCloseButton, 
        addCardPopupSaveButton } from "./components/modal";

import { addPlace, 
        submitDeletePopup } from "./components/card";

import { addCardApi, 
        getAllInfo } from './components/api';


//get user id
let userID = null;

//add default cards
function renderDefaultCards() {
    getAllInfo()
    .then(([dataCards, userData]) => {
        userID = userData._id;
        dataCards.forEach(function (el) {
            const newPlace = addPlace(el, userID);
            cardsList.append(newPlace);
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

renderDefaultCards();

//second popup form
const addPlaceSubmit = function (evt) {
    evt.preventDefault();
    buttonValidityForStatus(addCardPopupSaveButton, true, selectorsForValidation);
    addCardApi({ name: popupPlaceHolderForNameOfPlace.value, link: popupPlaceHolderForLink.value}).then((newCardApi) => {
        const newPlace = addPlace(newCardApi, userID);
        cardsList.prepend(newPlace);
        closePopup(addCardPopup);
        evt.target.reset();
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        buttonValidityForStatus(addCardPopupSaveButton, false, selectorsForValidation, 'Создать');
    });
};

formElementImage.addEventListener('submit', addPlaceSubmit);

//validation configuration
export const selectorsForValidation = {
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


//event listeners for change profile image popup
profileImage.addEventListener('click', () => {
    openPopup(profileImagePopup);
});

profileImagePopupCloseButton.addEventListener('click', () => {
    closePopup(profileImagePopup);
});




//adding opportunity to close popups by overflow click
profilePopup.addEventListener('mousedown', closePopupOnOverlayClick);
addCardPopup.addEventListener('mousedown', closePopupOnOverlayClick);
templateBigImg.addEventListener('mousedown', closePopupOnOverlayClick);
submitDeletePopup.addEventListener('mousedown', closePopupOnOverlayClick);
profileImagePopup.addEventListener('mousedown', closePopupOnOverlayClick);