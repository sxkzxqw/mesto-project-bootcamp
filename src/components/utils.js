const cardsList = document.querySelector('.places');

export { cardsList };

export function buttonValidityForStatus(button, booleanTrue, selectors, text) {
    if (booleanTrue) {
        button.disabled = 'disabled';
        button.classList.add(selectors.buttonDisabledSelector);
        button.classList.remove('buttons-hover');
        button.textContent = 'Сохранение...';
    } else {
        button.disabled = false;
        button.classList.remove(selectors.buttonDisabledSelector);
        button.textContent = text;
    }
}

export function isLiked(likes, userID) {
    return likes.some(user => user._id === userID);
}

export function checkLikeLocalView(likes, userID, likeButton, likesCounter) {
    if(isLiked(likes, userID)) {
        likeButton.classList.add('place__like-button_type_active');
    }   else {
        likeButton.classList.remove('place__like-button_type_active'); 
    }
    likesCounter.textContent = likes.length;
}