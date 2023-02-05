import { templateBigImg, 
        bigImg, 
        bigImgDescription} from "./modal";

import { closePopup, 
        openPopup } from "./modal";

import { deleteCard, 
    updateLike } from "./api";

import { isLiked, 
    checkLikeLocalView,
buttonValidityForStatus } from "./utils";

import { selectorsForValidation } from "../index";

const placeTemplate = document.querySelector('#place-template').content;

//delete
export const submitDeletePopup = document.querySelector('#popup-delete-submit');
const submitDeletePopupYesButton = submitDeletePopup.querySelector('.popup__button-delete_type_accept');
export const submitDeletePopupNoButton = submitDeletePopup.querySelector('.popup__button-delete_type_deny');
export const submitDeletePopupCloseButton = submitDeletePopup.querySelector('.popup__close-button');

//add place function
let cardForDelete;
let cardForDeleteId;

//add place function
export const addPlace = function (el, userID) {
    const card = placeTemplate.querySelector('.place').cloneNode(true);
    const deleteCardButton = card.querySelector('.place__delete-button');
    const likeButton = card.querySelector('.place__like-button');
    const element = el;
    //place create
    card.querySelector('.place__image').src = el.link;
    card.querySelector('.place__name').textContent = el.name;
    card.querySelector('.place__image').alt = `Картинка ${el.name}`;
    el.id = userID;
    const likesCounter = card.querySelector('.place__count-likes');
    checkLikeLocalView(el.likes, userID, likeButton, likesCounter);


    //big img
    card.querySelector('.place__image').addEventListener('click', function (evt) {
            bigImg.src = el.link;
            bigImgDescription.textContent = el.name;
            bigImg.alt = `Картинка ${el.name}`;
            openPopup(templateBigImg);
        });

    //like btn
    likeButton.addEventListener('click', likeClick);

    //del popup
    function submitDeleting() {
        openPopup(submitDeletePopup);
        cardForDelete = card;
        cardForDeleteId = el._id;
    }
    card.querySelector('.place__delete-button').addEventListener('click', function (evt) {
        submitDeleting();
    });

    if (el.owner._id !== el.id) {
        deleteCardButton.remove();
    }

    function likeClick() {
        updateLike(el._id, isLiked(el.likes, userID))
            .then(newDataCard => {
                el.likes = newDataCard.likes;
                checkLikeLocalView(el.likes, userID, likeButton, likesCounter);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return card;
};


function deleteCardApi() {
    buttonValidityForStatus(submitDeletePopupYesButton, true, selectorsForValidation);
    deleteCard(cardForDeleteId)
        .then(() => {
            cardForDelete.remove();
            closePopup(submitDeletePopup);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            buttonValidityForStatus(submitDeletePopupYesButton, false, selectorsForValidation, 'Да');
        });
}

submitDeletePopupYesButton.addEventListener('click', deleteCardApi);

 

