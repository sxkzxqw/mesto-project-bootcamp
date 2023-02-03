import { templateBigImg, 
        bigImg, 
        bigImgDescription} from "./modal";

import { closePopup, 
        openPopup } from "./modal";

import { deleteCard, 
    updateLike } from "./api";

import { isLiked, 
    checkLikeLocalView } from "./utils";


const placeTemplate = document.querySelector('#place-template').content;

//delete
export const submitDeletePopup = document.querySelector('#popup-delete-submit');
const submitDeletePopupYesButton = submitDeletePopup.querySelector('.popup__button-delete_type_accept');
export const submitDeletePopupNoButton = submitDeletePopup.querySelector('.popup__button-delete_type_deny');
export const submitDeletePopupCloseButton = submitDeletePopup.querySelector('.popup__close-button');

//add place function
export const addPlace = function (el, userID) {
    const card = placeTemplate.querySelector('.place').cloneNode(true);
    const deleteCardButton = card.querySelector('.place__delete-button');
    const likeButton = card.querySelector('.place__like-button'); 

    //place create
    card.querySelector('.place__image').src = el.link;
    card.querySelector('.place__name').textContent = el.name;
    card.querySelector('.place__image').alt = `Картинка ${el.name}`;
    el.id = userID;
    const likesCounter = card.querySelector('.place__count-likes');
    checkLikeLocalView(el.likes, userID, likeButton, likesCounter);


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
    likeButton.addEventListener('click', likeClick); 

    //del popup
     card.querySelector('.place__delete-button').addEventListener('click', function (evt) {
        openPopup(submitDeletePopup);
        submitDeletePopupYesButton.addEventListener('click', function () {
            evt.target.closest('.place').remove();
            deleteCard(el._id)
            .then(() => {
                evt.target.closest('.place').remove(); 
            })
            .catch((error) => {
                console.log(error);
            });
            closePopup(submitDeletePopup);
        });
    });
    if(el.owner._id !== el.id){
        deleteCardButton.remove();
    }

    function likeClick(){
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