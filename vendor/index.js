const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    },
  ];
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
const closeEditPopup = function () {
    editButtonPopup.classList.remove('popup_opened');
};
editButtonClosing.addEventListener('click', closeEditPopup);
//save values in popup
const formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = editButtonPopupInputValueName.value;
    userDescription.textContent = editButtonPopupInputValueDescription.value;
    closeEditPopup();
}

formElement.addEventListener('submit', handleFormSubmit);

//second popup
const addButton = document.querySelector('.profile__add-button');
const popupAddPlace = editButtonPopup.cloneNode(true);
const page = document.querySelector('.page');
const popupAddPlaceCloseButton = popupAddPlace.querySelector('.popup__close-button');
const popupPlaceHolderForNameOfPlace = popupAddPlace.querySelector('.popup__form-text_type_name');
const popupPlaceHolderForLink = popupAddPlace.querySelector('.popup__form-text_type_description');
const popupTitle = popupAddPlace.querySelector('.popup__title');
const popupSaveButton = popupAddPlace.querySelector('.popup__button');
const formElementImage = popupAddPlace.querySelector('.popup__form');

popupSaveButton.textContent = 'Создать';
popupTitle.textContent = ('Новое место');
popupPlaceHolderForNameOfPlace.setAttribute('placeholder', 'Название');
popupPlaceHolderForLink.setAttribute('placeholder', 'Ссылка на картинку');
page.append(popupAddPlace);

closePlacePopup = function () {
    popupAddPlace.classList.remove('popup_opened');
};

addButton.addEventListener('click', function () {
    popupAddPlace.classList.add('popup_opened');
});

popupAddPlaceCloseButton.addEventListener('click', closePlacePopup);

//add place function
const addPlace = function (el) {
    const placeTemplate = document.querySelector('.place-template').content;
    const place = placeTemplate.querySelector('.place').cloneNode(true);
    const placeImage = placeTemplate.querySelector('.place__image');
    const places = document.querySelector('.places');
    const placeCard = place.querySelector('.place');
    //place create
    place.querySelector('.place__image').src = el.link;
    place.querySelector('.place__name').textContent = el.name;
    //like
    places.prepend(place); 

    //big img popup
    const templateBigImg = document.querySelector('.popup-image');
    templateBigImg.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.9)');
    const closeBtnImg = templateBigImg.querySelector('.popup__close-button');
    const bigImg = templateBigImg.querySelector('.popup__full-image');
    const bigImgDescription = templateBigImg.querySelector('.popup__image-description');
    const placeImg = document.querySelector('.place__image');
    placeImg.addEventListener('click', function(evt) {
        if (evt.target.closest('.place')) {
        bigImg.src = el.link;
        bigImgDescription.textContent = el.name;
        templateBigImg.classList.add('popup_opened');
        };
    });
    
    closeBtnImg.addEventListener('click', function(evt) {
        templateBigImg.classList.remove('popup_opened'); 
    });
    
    //like
    const likeButton = document.querySelector('.place__like-button');
    likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-button_type_active');
    });

    //delete
    const deleteButton = document.querySelector('.place__delete-button');
    deleteButton.addEventListener('click', function(evt) {
        if (evt.target.closest('.place')) {
            place.remove();
        };
    });
}; 

//add six default cards
initialCards.forEach(addPlace);

//second popup form
const addPlaceSubmit = function (evt) {
    evt.preventDefault();
    const newPlace = {};
    newPlace.name = popupPlaceHolderForNameOfPlace.value;
    newPlace.link = popupPlaceHolderForLink.value
    addPlace(newPlace);
    closePlacePopup();
};

formElementImage.addEventListener('submit', addPlaceSubmit);
