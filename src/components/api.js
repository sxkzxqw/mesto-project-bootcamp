const config = {
    url: 'https://mesto.nomoreparties.co/v1/wbf-cohort-5',
    headers: {
        'content-type': 'application/json',
        'authorization': 'e428d967-ad54-4ed1-8f27-1e899a8fcfdd'
    }
};

function promiseCall(res) {
    return res.ok ? res.json() : res.json().then((data) =>  Promise.reject(data));
}

export function getAllCards() {
    return fetch(`${config.url}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then(promiseCall);
}

export function getUserId() {
    return fetch(`${config.url}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(promiseCall);
}

export function getAllInfo() {
    return Promise.all([getAllCards(), getUserId()]);
}

export function addCardApi(body) {
    return fetch(`${config.url}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
    .then(promiseCall);
}

export function deleteCard(id) {
    return fetch(`${config.url}/cards/${id}`, {
        headers: config.headers,
        method: 'DELETE'
    })
    .then(promiseCall);
}

export function getProfileInfo() {
    return fetch(`${config.url}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(promiseCall);
}

export function setUserPicture(body) {
    return fetch(`${config.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(body)
    })
    .then(promiseCall);
}

export function setUserInfo(body) {
    return fetch(`${config.url}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(body)
    })
    .then(promiseCall);
}

export function updateLike(cardID, liked) {
    return fetch(`${config.url}/cards/likes/${cardID}`, {
        method: liked ? 'DELETE' : 'PUT',
        headers: config.headers
    })
    .then(promiseCall);
}
