const initialCards = [
    {
      name: 'Speedwagon',
      link: 'https://ami.animecharactersdatabase.com/uploads/chars/5688-1493820448.jpg',
    },
    {
      name: 'Dio Brando',
      link: 'https://i.ytimg.com/vi/K0Os61wkEPQ/maxresdefault.jpg',
    },
    {
      name: 'Kakyoin Noriaki',
      link: 'https://u.livelib.ru/character/1000005188/o/wg7h5tb7/o-o.jpeg',
    },
    {
      name: 'Jean Pierre Polnareff',
      link: 'https://animesweet.com/wp-content/uploads/2021/04/jojo-jean-pierre-polnareff-protagonista-dettagliato-spettacolare-tatuaggio-v3-509381.webp.webp',
    },
    {
      name: 'Bruno Bucciarati',
      link: 'https://i.pinimg.com/originals/3e/16/41/3e16419a5cf771bf9a85cb2ea04bf5b3.png',
    },
    {
      name: 'Leone Abbacchio',
      link: 'https://i.ytimg.com/vi/PMAhN2ma0Pg/maxresdefault.jpg',
    },
    {
      name: 'Giorno Giovanna',
      link: 'https://i.ytimg.com/vi/0ths2Kbxw6o/maxresdefault.jpg',
    },
    {
        name: 'Kira Yoshikage',
        link: 'https://ae04.alicdn.com/kf/Ha986a1078b8f47c587a4744d592a148fi/jojo.jpg'
    },
    {
        name: 'Diavolo',
        link: 'https://static.wikia.nocookie.net/93dce567-c450-4eef-87d6-69cb4ebb5208'
    }
  ];


const page = document.querySelector('.page');
    cardsList = document.querySelector('.places');


//profile popup selectors
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup');
const profilePopupCloseButton = document.querySelector('.popup__close-button');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const profilePopupInputValueName = document.querySelector('.popup__form-text_type_name');
const profilePopupInputValueDescription = document.querySelector('.popup__form-text_type_description');


//profile popup values
profilePopupInputValueName.value = userName.textContent;
profilePopupInputValueDescription.value = userDescription.textContent;

//open and close popups
const closeAndOpenProfilePopup = function(popup) {
    popup.classList.contains('popup_opened')
        ?   popup.classList.remove('popup_opened')
        :   popup.classList.add('popup_opened');
};


profilePopupCloseButton.addEventListener('click', () => {
    closeAndOpenProfilePopup(profilePopup);
});
profileEditButton.addEventListener('click', () => {
    closeAndOpenProfilePopup(profilePopup);
});


const formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = profilePopupInputValueName.value;
    userDescription.textContent = profilePopupInputValueDescription.value;
    closeAndOpenProfilePopup(profilePopup);
}

formElement.addEventListener('submit', handleFormSubmit);

//second popup
const addCardPopup = document.querySelector('#popup-add-card');
    addCardPopupCloseButton = addCardPopup.querySelector('.popup__close-button');
    popupPlaceHolderForNameOfPlace = addCardPopup.querySelector('.popup__form-text_type_name');
    popupPlaceHolderForLink = addCardPopup.querySelector('.popup__form-text_type_description');
    addCardPopupSaveButton = addCardPopup.querySelector('.popup__button');
    formElementImage = addCardPopup.querySelector('.popup__form');
    addButton = document.querySelector('.profile__add-button');

addButton.addEventListener('click', () => {
    closeAndOpenProfilePopup(addCardPopup);
});

addCardPopupCloseButton.addEventListener('click', () => {
    closeAndOpenProfilePopup(addCardPopup);
});


//big img popup
const templateBigImg = document.querySelector('#popup-image');
templateBigImg.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.9)');
const bigImg = templateBigImg.querySelector('.popup__full-image');
const bigImgDescription = templateBigImg.querySelector('.popup__image-description');
const placeImg = document.querySelector('.place__image');
const closeBtnImg = templateBigImg.querySelector('.popup__close-button');


//add place function
const addPlace = function (el) {
    const placeTemplate = document.querySelector('#place-template').content;
    const card = placeTemplate.querySelector('.place').cloneNode(true);
    const placeImage = placeTemplate.querySelector('.place__image');
    const placeCard = card.querySelector('.place');
    
    //place create
    card.querySelector('.place__image').src = el.link;
    card.querySelector('.place__name').textContent = el.name;
    cardsList.prepend(card); 

    //big img popup

    //like
    const likeButton = document.querySelector('.place__like-button');
    likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-button_type_active');
    });

    const deleteButton = document.querySelector('.place__delete-button');
    const submitDeletePopup = document.querySelector('#popup-delete-submit');
    const submitDeletePopupYesButton = submitDeletePopup.querySelector('.popup__button-delete_type_accept');
    const submitDeletePopupNoButton = submitDeletePopup.querySelector('.popup__button-delete_type_deny');
    const submitDeletePopupCloseButton = submitDeletePopup.querySelector('.popup__close-button');
    deleteButton.addEventListener('click', function(evt) {
        if (evt.target.closest('.place')) {
            submitDeletePopup.classList.add('popup_opened');
            const closeDeletePopup = function() {
                submitDeletePopup.classList.remove('popup_opened');
            };
            submitDeletePopupYesButton.addEventListener('click', function() {
                card.remove();
                closeDeletePopup();
            });
            submitDeletePopupNoButton.addEventListener('click', closeDeletePopup);
            submitDeletePopupCloseButton.addEventListener('click', closeDeletePopup);
        };
    });

    card.querySelector('.place__image').addEventListener('click', function(evt) {
        if (evt.target.closest('.place')) {
            bigImg.src = el.link;
            bigImgDescription.textContent = el.name;
            closeAndOpenProfilePopup(templateBigImg);
        }
    });
    closeBtnImg.addEventListener('click', function(evt) {
        if (evt.target.closest('.popup__big-image')) {
            templateBigImg.classList.remove('popup_opened');
        }
    });

    return card;
}; 
console.log(card);


//add six default cards
initialCards.forEach(addPlace);

//second popup form
const addPlaceSubmit = function (evt) {
    evt.preventDefault();
    const newPlace = {};
    newPlace.name = popupPlaceHolderForNameOfPlace.value;
    newPlace.link = popupPlaceHolderForLink.value;
    addPlace(newPlace);
    closeAndOpenProfilePopup(addCardPopup);
    evt.target.reset();
};

formElementImage.addEventListener('submit', addPlaceSubmit);

