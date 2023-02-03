import { addPlace, submitDeletePopupNoButton, submitDeletePopupCloseButton, submitDeletePopup } from "./card";
import { cardsList } from "./utils";
import { addCardApi, getProfileInfo, setUserPicture, setUserInfo } from "./api";
import { buttonValidityForStatus } from "./utils";
import { selectorsForValidation } from "../index";

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
});


//open and close popups
export const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEscBtn);
}

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
        const currentPopup = document.querySelector('.popup_opened');
        closePopup(currentPopup);
    }
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
        closePopup(templateBigImg);
    }
});

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




//close delete popup
submitDeletePopupNoButton.addEventListener('click', function () {
    closePopup(submitDeletePopup);
});
submitDeletePopupCloseButton.addEventListener('click', function () {
    closePopup(submitDeletePopup);
});

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