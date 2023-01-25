import { addPlace } from "./card";
import { cardsList } from "./utils";

//profile popup selectors
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profilePopup = document.querySelector('.popup');
export const profilePopupCloseButton = document.querySelector('.popup__close-button');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const profilePopupInputValueName = document.querySelector('.popup__form-text_type_name');
const profilePopupInputValueDescription = document.querySelector('.popup__form-text_type_description');


//profile popup values
profilePopupInputValueName.value = userName.textContent;
profilePopupInputValueDescription.value = userDescription.textContent;

//open and close popups
export const closeAndOpenProfilePopup = function (popup) {
    if(popup.classList.contains('popup_opened')) {
            popup.classList.remove('popup_opened');
        } else {
            popup.classList.add('popup_opened');
        }
};

//escape button close popup
export function closePopupOnEscBtn(popup) {
    document.addEventListener('keydown', function (event) {
    if (event.key == 'Escape' && popup.classList.contains('popup_opened')) {
        closeAndOpenProfilePopup(popup);
    }
});
}

//overlay close popup
export function closePopupOnOverlayClick(popup) {
    popup.addEventListener('mousedown', function (event) {
        if (event.target.classList.contains('popup_opened')) {
            closeAndOpenProfilePopup(popup);
        }
    });
}



//second popup
export const addCardPopup = document.querySelector('#popup-add-card');
export const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close-button');
const popupPlaceHolderForNameOfPlace = addCardPopup.querySelector('.popup__form-text_type_name');
const popupPlaceHolderForLink = addCardPopup.querySelector('.popup__form-text_type_description');
export const addCardPopupSaveButton = addCardPopup.querySelector('.popup__button');
const formElementImage = addCardPopup.querySelector('.popup__form');
export const addButton = document.querySelector('.profile__add-button');

//big img popup
export const templateBigImg = document.querySelector('#popup-image');
templateBigImg.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.9)');
export const bigImg = templateBigImg.querySelector('.popup__full-image');
export const bigImgDescription = templateBigImg.querySelector('.popup__image-description');
export const placeImg = document.querySelector('.place__image');
export const closeBtnImg = templateBigImg.querySelector('.popup__close-button');

closeBtnImg.addEventListener('click', function (evt) {
    if (evt.target.closest('.popup__big-image')) {
        templateBigImg.classList.remove('popup_opened');
    }
});

//first popup form
const formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = profilePopupInputValueName.value;
    userDescription.textContent = profilePopupInputValueDescription.value;
    closeAndOpenProfilePopup(profilePopup);
}
formElement.addEventListener('submit', handleFormSubmit);

//second popup form
const addPlaceSubmit = function (evt) {
    evt.preventDefault();
    const cardNewPlace = {};
    cardNewPlace.name = popupPlaceHolderForNameOfPlace.value;
    cardNewPlace.link = popupPlaceHolderForLink.value;
    
    const newPlace = addPlace(cardNewPlace);
    cardsList.prepend(newPlace);
    closeAndOpenProfilePopup(addCardPopup);
    evt.target.reset();
};
formElementImage.addEventListener('submit', addPlaceSubmit);