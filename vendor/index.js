const editButton = document.querySelector('.profile__edit-button');
const editButtonPopup = document.querySelector('.popup');
const editButtonClosing = document.querySelector('.popup__close-button');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const editButtonPopupInputValueName = document.querySelector('.popup__form-text_type_name');
const editButtonPopupInputValueDescription = document.querySelector('.popup__form-text_type_description');
// open popup
editButton.addEventListener('click', function () {
    editButtonPopup.classList.add('popup_opened');
    editButtonPopupInputValueName.value = userName.textContent;
    editButtonPopupInputValueDescription.value = userDescription.textContent;
});
// close popup
editButtonClosing.addEventListener('click', function () {
    editButtonPopup.classList.remove('popup_opened');
});

//save values in popup
const formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = editButtonPopupInputValueName.value;
    userDescription.textContent = editButtonPopupInputValueDescription.value;
}

//function handleFormSubmitClosing(evt) {
//    evt.preventDefault();
//    editButtonPopup.classList.remove('popup_opened');
//}

/* formElement.addEventListener('submit', function () {
    handleFormSubmit();
    handleFormSubmitClosing();
}); 
 */


//delete and like place
formElement.addEventListener('submit', handleFormSubmit);

const place = document.querySelector('.place');
const placeImage = document.querySelector('.place__image');
const deleteButton = document.querySelector('.place__delete-button');
const likeButton = document.querySelector('.place__like-button');

likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('place__like-button_type_active');
});

deleteButton.addEventListener('click', function () {
    place.remove();
});


//second popup
const addButton = document.querySelector('.profile__add-button');
const popupAddPlace = editButtonPopup.cloneNode(true);
const page = document.querySelector('.page');
const popupAddPlaceCloseButton = popupAddPlace.querySelector('.popup__close-button');
const popupPlaceHolderForNameOfPlace = popupAddPlace.querySelector('.popup__form-text_type_name');
const popupPlaceHolderForLink = popupAddPlace.querySelector('.popup__form-text_type_description');
const popupTitle = popupAddPlace.querySelector('.popup__title');
const popupSaveButton = popupAddPlace.querySelector('.popup__button');

popupSaveButton.textContent = 'Создать';
popupTitle.textContent = ('Новое место');
popupPlaceHolderForNameOfPlace.setAttribute('placeholder', 'Название');
popupPlaceHolderForLink.setAttribute('placeholder', 'Ссылка на картинку');
page.append(popupAddPlace);

addButton.addEventListener('click', function () {
    popupAddPlace.classList.add('popup_opened');
});

popupAddPlaceCloseButton.addEventListener('click', function () {
    popupAddPlace.classList.remove('popup_opened');
});

// aa
const places = document.querySelector('.places');
const formElementImage = popupAddPlace.querySelector('.popup__form');
const templatePlace = document.querySelector('.place-template').content;
console.log(templatePlace);
const placeName = templatePlace.querySelector('.place__name');
const placeTemplateImg = templatePlace.querySelector('.place__image');
function handleFormSubmitImg(evt) {
    evt.preventDefault();
    placeName.textContent = popupPlaceHolderForNameOfPlace.getAttribute('value');
    placeTemplateImg.setAttribute('src',  popupPlaceHolderForLink.getAttribute('value'));
    places.append(templatePlace);
};

formElementImage.addEventListener('submit', handleFormSubmitImg);