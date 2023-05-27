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
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(null);
  const [emailText, setEmailText] = useState('');

  const handleRegistrationEnd = function(isSuccess) {
    isSuccess ? setIsRegistrationSuccess(true) : setIsRegistrationSuccess(false);
  }

  const loginUser = function(emailText) {
    setLoggedIn(true);
    setEmailText(emailText);
  }

  const unloginUser = function() {
    setLoggedIn(false);
    setEmailText('');
    localStorage.removeItem('token');
    navigate('/sign-in', {replace: true});
  }

  const tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
  
      auth.getLoggedUserInfo(jwt)
      .then(data => {
        loginUser(data.data.email);
        navigate('/', {replace: true})
      })
    }
   } 

  useEffect(() => {
    api.getUserInfo()
    .then(data => {
      setCurrentUser(data);
    })
    .catch(err => {
      console.log(`Ошибка ${err}, данные пользователя не загружены`);
    })

    api.getInitialCards()
    .then(data => {
      setCards(data)
    })
    .catch(err => {
      console.log(`Ошибка ${err}, карточки не загружены`);
    })

    tokenCheck();
  }, [])

  const handleUpdateUser = function(name, description) {
    setIsLoading(true);

    api.editUserInfo(name, description)
    .then(data => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch(err => {
      console.log(`Ошибка ${err}, не удалось обновить данные пользователя`);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const handleUpdateAvatar = function(link) {
    setIsLoading(true);

    api.changeAvatar(link)
    .then(data => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch(err => {
      console.log(`Ошибка ${err}, не удалось обновить аватар`);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const handleAddPlaceSubmit = function(name, link) {
    setIsLoading(true);

    api.addNewCard(name, link, [])
    .then(data => {
      setCards([data, ...cards]);
      closeAllPopups();
    }).catch(err => {
      console.log(`Ошибка ${err}, не удалось добавить карточку`);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser ? currentUser : {
      name: 'Загрузка...',
      about: 'Загрузка...',
      avatar: ''
    }}>
      <div className="page">
        <Routes>
          <Route path="/" element={(
            <>
              <ProtectedRoute element={Header} loggedIn={loggedIn} key={Header} isAuthorizationPage={false} emailText={emailText} unloginUser={unloginUser} />
              <ProtectedRoute element={Main} loggedIn={loggedIn} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleLikeClick} cards={cards} onCardDelete={handleCardDelete} key={Main} />,
              <ProtectedRoute element={Footer} loggedIn={loggedIn} key={Footer} />
              <ProtectedRoute element={EditProfilePopup} loggedIn={loggedIn} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} key={EditProfilePopup} />
              <ProtectedRoute element={AddPlacePopup} loggedIn={loggedIn} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} isLoading={isLoading} key={AddPlacePopup} />
              <ProtectedRoute element={EditAvatarPopup} loggedIn={loggedIn} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} key={EditAvatarPopup} />
              <ProtectedRoute element={ImagePopup} loggedIn={loggedIn} card={selectedCard} onClose={closeAllPopups} key={ImagePopup} />
            </>
          )}/>
          {/* <Header />
          <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleLikeClick} cards={cards} onCardDelete={handleCardDelete} />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} isLoading={isLoading} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} /> */}

          <Route path="/sign-up" element={(
            <>
              <Register handleRegistrationEnd={handleRegistrationEnd} key={Register} />
              <InfoPopup isOpen={isInfoPopupOpened} onClose={closeAllPopups} key={InfoPopup} isSuccess={isRegistrationSuccess} />
            </>
          )} />
          <Route path="/sign-in" element={(
            <>
              <Login key={Login} loginUser={loginUser} handleRegistrationEnd={handleRegistrationEnd} />
              <InfoPopup isOpen={isInfoPopupOpened} onClose={closeAllPopups} isSuccess={false} key={InfoPopup} />
            </>
          )} />

          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
