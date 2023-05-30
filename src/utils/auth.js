import React from 'react';

export const BASE_URL = 'https://auth.nomoreparties.co';

const getResponseData = function(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.status);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    return getResponseData(response);
  })      
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    return getResponseData(response);
  })
}

export const getLoggedUserInfo = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    }
  }) 
  .then(response => {
    return getResponseData(response);
  })
}