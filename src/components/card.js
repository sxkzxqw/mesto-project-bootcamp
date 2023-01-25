import { cardsList } from "./utils";
import { templateBigImg, bigImg, bigImgDescription} from "./modal";
import { closeAndOpenProfilePopup } from "./modal";

const placeTemplate = document.querySelector('#place-template').content;

//add place function
export const addPlace = function (el) {
    const card = placeTemplate.querySelector('.place').cloneNode(true);

    //place create
    card.querySelector('.place__image').src = el.link;
    card.querySelector('.place__name').textContent = el.name;

    
    //big img
    card.querySelector('.place__image').addEventListener('click', function (evt) {
        if (evt.target.closest('.place')) {
            bigImg.src = el.link;
            bigImgDescription.textContent = el.name;
            closeAndOpenProfilePopup(templateBigImg);
        }
    });
    return card;
};

/* cardsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('place__image')) {
        bigImg.src = evt.target.src;
        bigImgDescription.textContent = evt.target.textContent;
        closeAndOpenProfilePopup(templateBigImg);
    }
}); */

//like

cardsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('place__like-button')) {
        evt.target.classList.toggle('place__like-button_type_active');
    }
});

//delete
export const submitDeletePopup = document.querySelector('#popup-delete-submit');
const submitDeletePopupYesButton = submitDeletePopup.querySelector('.popup__button-delete_type_accept');
const submitDeletePopupNoButton = submitDeletePopup.querySelector('.popup__button-delete_type_deny');
const submitDeletePopupCloseButton = submitDeletePopup.querySelector('.popup__close-button');

cardsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('place__delete-button')) {
        submitDeletePopup.classList.add('popup_opened');
        const closeDeletePopup = function () {
            submitDeletePopup.classList.remove('popup_opened');
        };
        submitDeletePopupYesButton.addEventListener('click', function () {
            evt.target.closest('.place').remove();
            closeDeletePopup();
        });
        submitDeletePopupNoButton.addEventListener('click', closeDeletePopup);
        submitDeletePopupCloseButton.addEventListener('click', closeDeletePopup);
    }
});


