import './components/api';
import "./pages/index.css";
import { validation } from "./components/validate";

import { buttonValidityForStatus, 
        cardsList,
        popupPlaceHolderForLink,
        popupPlaceHolderForNameOfPlace,
        formElementImage } from "./components/utils";

import { profileEditButton, 
        addButton, 
        profilePopup, 
        addCardPopup, 
        closePopupOnOverlayClick, 
        closePopup, 
        openPopup, 
        profileImage, 
        profileImagePopup, 
        addCardPopupSaveButton,
        openPopupWithForm } from "./components/modal";

import { addPlace, submitDeletePopup } from "./components/card";

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



//event listener for open user edit info popup
profileEditButton.addEventListener('click', () => {
    openPopupWithForm(profilePopup);
});
//--------------------------------------------------------------
// к сожалению вынужден не согласиться с вами по поводу замечания с вставкой инпутов в данные пользователя,
// так как это функция уже присутствует в коде и все корректно работает. на данный момент можно обновлять данные о
// пользователе и все будет хорошо работать. вывод информации тоже работает корректно.
// логика этой функции описана в файле modal.js на 93 строчке.
// или я вас неправильно понял и в этом случае хотелось бы более подробно разъяснить что вы имели в виду
//--------------------------------------------------------------

//event listener for add card popup
addButton.addEventListener('click', () => {
    openPopupWithForm(addCardPopup);
});

//event listener for change profile image popup
profileImage.addEventListener('click', () => {
    openPopupWithForm(profileImagePopup);
});




//adding opportunity to close popups by overflow click

const allPopups = document.querySelectorAll('.popup');
allPopups.forEach((popup) => {
    popup.addEventListener('mousedown', closePopupOnOverlayClick);
});

submitDeletePopup.removeEventListener('mousedown', closePopupOnOverlayClick);