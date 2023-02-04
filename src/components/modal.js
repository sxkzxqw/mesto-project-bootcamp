import { submitDeletePopupNoButton, 
        submitDeletePopupCloseButton, 
        submitDeletePopup } from "./card";

import { getProfileInfo, 
        setUserPicture, 
        setUserInfo } from "./api";

import { buttonValidityForStatus } from "./utils";

import { selectorsForValidation } from "../index";

import { buttonValidity } from "./validate";
//profile popup selectors
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profilePopup = document.querySelector('.popup');
export const profilePopupCloseButton = document.querySelector('.popup__close-button');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const profilePopupInputValueName = document.querySelector('.popup__form-text_type_name');
const profilePopupInputValueDescription = document.querySelector('.popup__form-text_type_description');
const profilePicture = document.querySelector('.profile__picture');


//get profile info from api
getProfileInfo()
    .then(data => {
        userName.textContent = data.name;
        userDescription.textContent = data.about;
        profilePicture.src = data.avatar;
        profilePopupInputValueName.value = userName.textContent;
        profilePopupInputValueDescription.value = userDescription.textContent;
    })
    .catch((error) => {
        console.log(error);
    });


//open and close popups
export const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEscBtn);
}

export const openPopupWithForm = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEscBtn);
    const currentButton = popup.querySelector('.popup__button');
    buttonValidity(currentButton, false, selectorsForValidation);
};

export const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEscBtn);
};

//escape button close popup
function closePopupOnEscBtn(event) {
    if (event.key == 'Escape') {
        const currentPopup = document.querySelector('.popup_opened');
        closePopup(currentPopup);
    }
}

//overlay close popup
export function closePopupOnOverlayClick(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        // ---------------------------------------------------------------------------------------------------------
        // В вашем решении второе условие функции теряет свою работоспособность, ниже описал почему.
        // (клик на закрытие попапа перестает работать)
        //
        // В данной функции currentpopup нужен для того, чтобы отображать сам попап и закрывать его по
        // клику на закрывающую кнопку(в случае если этой константы не будет, то в evt.target приходит только
        // кнопка, и выходит два возможных вариант решения, либо делать переменную current popup, либо
        // описывать второе условоие в котором будет только evt.target.classList.contains('popup__close-button')
        // и в случае выбора второго варианта придется делать все это через метод closest, как по мне проще читать
        // код в котором есть перменная с текущим попапом, нежели делать два условия)
        //
        // По поводу ошибки при двойном щелчке было бы интересно послушать как можно это исправить.
        // ---------------------------------------------------------------------------------------------------------
        const currentPopup = document.querySelector('.popup_opened');
        closePopup(currentPopup);
    }
}

//second popup
export const addCardPopup = document.querySelector('#popup-add-card');
export const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close-button');
export const addCardPopupSaveButton = addCardPopup.querySelector('.popup__button');
export const addButton = document.querySelector('.profile__add-button');

//big img popup
export const templateBigImg = document.querySelector('#popup-image');
templateBigImg.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.9)');
export const bigImg = templateBigImg.querySelector('.popup__full-image');
export const bigImgDescription = templateBigImg.querySelector('.popup__image-description');
export const placeImg = document.querySelector('.place__image');
export const closeBtnImg = templateBigImg.querySelector('.popup__close-button');

//first popup form
const formElement = document.querySelector('.popup__form');

const profilePopupSaveButton = profilePopup.querySelector('.popup__button');
function handleFormSubmit(evt) {
    evt.preventDefault();
    buttonValidityForStatus(profilePopupSaveButton, true, selectorsForValidation);
    setUserInfo({name: profilePopupInputValueName.value, about: profilePopupInputValueDescription.value})
    .then((userInfo) => {
        userName.textContent = profilePopupInputValueName.value;
        userDescription.textContent = profilePopupInputValueDescription.value;
        closePopup(profilePopup);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        buttonValidityForStatus(profilePopupSaveButton, false, selectorsForValidation, 'Сохранить');
    });
}
formElement.addEventListener('submit', handleFormSubmit);






//change profile image popup
export const profileImage = document.querySelector('.profile__picture');
export const profileImagePopup = document.querySelector('#popup-change-image-profile');
export const profileImagePopupCloseButton = profileImagePopup.querySelector('.popup__close-button');
const profileImageInput = profileImagePopup.querySelector('.popup__form-text');
const profileImageFieldset = profileImagePopup.querySelector('.popup__fieldset');
const profileImageForm = profileImagePopup.querySelector('.popup__form');
profileImageFieldset.setAttribute('style', 'margin-bottom: 30px');
const profileImagePopupSaveButton = profileImagePopup.querySelector('.popup__button');



//change profile image form 
function changeImageSubmit(evt) {
    evt.preventDefault();
    buttonValidityForStatus(profileImagePopupSaveButton, true, selectorsForValidation);
    setUserPicture({ avatar: profileImageInput.value })
    .then(() => {
        profileImage.src = profileImageInput.value;
        closePopup(profileImagePopup);
        evt.target.reset();
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        buttonValidityForStatus(profileImagePopupSaveButton, false, selectorsForValidation, 'Сохранить');
    });
}
profileImageForm.addEventListener('submit', changeImageSubmit);