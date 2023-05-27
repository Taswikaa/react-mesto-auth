class Api {
  constructor({ url, key }) {
    this._url = url;
    this._key = key;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._key
      }
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._key
      }
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  editUserInfo(name, job) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about: job
      })
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  addNewCard(name, link, likes) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link,
        likes
      })
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._key,
      },
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._key,
      }
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  cancelLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._key,
      }
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }

  changeAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => {
      return this._checkStatus(res);
    })
  }
} 

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-63',
  key: '1f54a3c5-b2a8-45c9-9b64-ac21ab4a1c2a'
});

export default api;