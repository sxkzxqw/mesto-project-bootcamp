import { cardsList } from "./utils";
import { templateBigImg, bigImg, bigImgDescription} from "./modal";
import { closePopup, openPopup } from "./modal";

const placeTemplate = document.querySelector('#place-template').content;

//delete
export const submitDeletePopup = document.querySelector('#popup-delete-submit');
const submitDeletePopupYesButton = submitDeletePopup.querySelector('.popup__button-delete_type_accept');
export const submitDeletePopupNoButton = submitDeletePopup.querySelector('.popup__button-delete_type_deny');
export const submitDeletePopupCloseButton = submitDeletePopup.querySelector('.popup__close-button');

//add place function
export const addPlace = function (el) {
    const card = placeTemplate.querySelector('.place').cloneNode(true);

    //place create
    card.querySelector('.place__image').src = el.link;
    card.querySelector('.place__name').textContent = el.name;
    card.querySelector('.place__image').alt = `Картинка ${el.name}`;

    
    //big img
    card.querySelector('.place__image').addEventListener('click', function (evt) {
        if (evt.target.closest('.place')) {
            bigImg.src = el.link;
            bigImgDescription.textContent = el.name;
            bigImg.alt = `Картинка ${el.name}`;
            openPopup(templateBigImg);
        }
    });

    //like btn
    const likeButton = card.querySelector('.place__like-button'); 
    likeButton.addEventListener('click', function (evt) { 
    evt.target.classList.toggle('place__like-button_type_active'); 
    }); 

    //del popup
    card.querySelector('.place__delete-button').addEventListener('click', function (evt) {
        openPopup(submitDeletePopup);
        submitDeletePopupYesButton.addEventListener('click', function () {
            evt.target.closest('.place').remove();
            closePopup(submitDeletePopup);
        });
    });

    return card;
};

