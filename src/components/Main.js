import React, { useEffect, useState, useContext } from "react";

import Card from "./Card";
import pencilImage from "../images/pencil.svg"
// import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, cards, onCardDelete }) {
  
  const userData = React.useContext(CurrentUserContext);

  const userName = userData.name;
  const userDescription = userData.about;
  const userAvatar = userData.avatar;

  return (
    <main className="main">
      <section className="profile">
        <img className="profile__avatar" src={userAvatar} alt="Аватар" onClick={ onEditAvatar } />
        <img className="profile__pencil" src={pencilImage} alt="Иконка редактирования профиля" />
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="button profile__edit-button" type="button" onClick={ onEditProfile } />
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="button profile__add-button" type="button" onClick={ onAddPlace }></button>
      </section>
      <section className="elements">
        <ul className="elements__wrapper">
          {
            cards.length && cards.map(el => 
              (<Card cardData={el} onCardClick={onCardClick} key={el._id} onCardLike={onCardLike} onCardDelete={onCardDelete} />)
            )
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;