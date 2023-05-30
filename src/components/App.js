import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoPopup from "./InfoPopup";

import * as auth from '../utils/auth.js';

function App() {

  const navigate = useNavigate();

  const handleEditProfileClick = function() {
    setEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = function() {
    setEditAvatarPopupOpen(true);
  }
  
  const handleAddPlaceClick = function() {
    setAddPlacePopupOpen(true);
  }

  const closeAllPopups = function() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsInfoPopupOpened(false);
    setSelectedCard(null);
  }

  const handleCardClick = function(card) {
    setSelectedCard(card);
  }

  const handleLikeClick = function(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.cancelLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(`Ошибка: ${err}, не удалось изменить состояние лайка`);
      })
    } else {
      api.likeCard(card._id)
      .then((newCard) => {
        setCards(state => state.map(el => {
          return el._id === card._id ? newCard : el;
        }));
      })
      .catch(err => {
        console.log(`Ошибка: ${err}, не удалось изменить состояние лайка`);
      })
    }
  }

  const handleCardDelete = function(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(state => state.filter(el => {
        return el._id !== card._id;
      })
      )
    })
    .catch(err => {
      console.log(`Ошибка: ${err}, не удалось удалить карточку`);
    })
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoPopupOpened, setIsInfoPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
      name: 'Загрузка...',
      about: 'Загрузка...',
      avatar: ''
  });
  const [isUpdateUserPopupLoading, setIsUpdateUserPopupLoading] = useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);
  const [isUpdateAvatatrPopupLoading, setIsUpdateAvatatrPopupLoading] = useState(false);

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);

  const [emailText, setEmailText] = useState('');

  const setInfoTooltipStatus = function(isSuccess) {
    setIsSuccessInfoTooltipStatus(isSuccess);
    setIsInfoPopupOpened(true);
  }

  const loginUser = function(emailText) {
    setLoggedIn(true);
    setEmailText(emailText);
  }

  const signOut = function() {
    setLoggedIn(false);
    setEmailText('');
    localStorage.removeItem('token');
    navigate('/sign-in', {replace: true});
  }

  const checkToken = () => {
    const jwt = localStorage.getItem('token');

    if (jwt) {
      auth.getLoggedUserInfo(jwt)
      .then(data => {
        loginUser(data.data.email);
        navigate('/', {replace: true})
      })
      .catch(err => {
        console.log('Ошибка при обработке токена', err);
      })
    }
   } 

  useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      const userInfoPromise = api.getUserInfo();
      const initialCardsPromise = api.getInitialCards();

      Promise.all([userInfoPromise, initialCardsPromise])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch(err => {
        console.log('Ошибка получения данных', err);
      })
    }
  }, [loggedIn])

  const handleUpdateUser = function(name, description) {
    setIsUpdateUserPopupLoading(true);

    api.editUserInfo(name, description)
    .then(data => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch(err => {
      console.log(`Ошибка ${err}, не удалось обновить данные пользователя`);
    })
    .finally(() => {
      setIsUpdateUserPopupLoading(false);
    })
  }

  const handleUpdateAvatar = function(link) {
    setIsUpdateAvatatrPopupLoading(true);

    api.changeAvatar(link)
    .then(data => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch(err => {
      console.log(`Ошибка ${err}, не удалось обновить аватар`);
    })
    .finally(() => {
      setIsUpdateAvatatrPopupLoading(false);
    })
  }

  const handleAddPlaceSubmit = function(name, link) {
    setIsAddPlacePopupLoading(true);

    api.addNewCard(name, link, [])
    .then(data => {
      setCards([data, ...cards]);
      closeAllPopups();
    }).catch(err => {
      console.log(`Ошибка ${err}, не удалось добавить карточку`);
    })
    .finally(() => {
      setIsAddPlacePopupLoading(false);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={(
            <>
              <ProtectedRoute
                element={Header}
                loggedIn={loggedIn}
                isAuthorizationPage={false}
                emailText={emailText}
                signOut={signOut}
              />
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleLikeClick}
                cards={cards}
                onCardDelete={handleCardDelete}
              />,
              <ProtectedRoute
                element={Footer}
                loggedIn={loggedIn}
              />
              <ProtectedRoute
                element={EditProfilePopup}
                loggedIn={loggedIn}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isLoading={isUpdateUserPopupLoading}
              />
              <ProtectedRoute
                element={AddPlacePopup}
                loggedIn={loggedIn}
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddCard={handleAddPlaceSubmit}
                isLoading={isAddPlacePopupLoading}
              />
              <ProtectedRoute
                element={EditAvatarPopup} 
                loggedIn={loggedIn} 
                isOpen={isEditAvatarPopupOpen} 
                onClose={closeAllPopups} 
                onUpdateAvatar={handleUpdateAvatar} 
                isLoading={isUpdateAvatatrPopupLoading} 
              />
              <ProtectedRoute 
                element={ImagePopup} 
                loggedIn={loggedIn} 
                card={selectedCard} 
                onClose={closeAllPopups} 
              />
            </>
          )}/>
          <Route path="/sign-up" element={(
            <>
              <Header 
                isAuthorizationPage={true} 
                buttonText='Войти' 
                isLoginPage={false} 
                route='/sign-in' 
              />
              <Register setInfoTooltipStatus={setInfoTooltipStatus} />
            </>
          )} />
          <Route path="/sign-in" element={(
            <>
              <Header 
                isAuthorizationPage={true} buttonText='Зарегистрироваться' 
                isLoginPage={true} 
                route='/sign-up' 
              />
              <Login loginUser={loginUser} setInfoTooltipStatus={setInfoTooltipStatus} />
            </>
          )} />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>
        <InfoPopup isOpen={isInfoPopupOpened} onClose={closeAllPopups} isSuccess={isSuccessInfoTooltipStatus} />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
