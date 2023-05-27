import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ el, onCardClick, onCardLike, onCardDelete }) {

  const handleCardClick = function() {
    onCardClick(el);
  }

  const handleLikeClick = function() {
    onCardLike(el);
  }

  const handleDeleteClick = function() {
    onCardDelete(el);
  }

  const userData = React.useContext(CurrentUserContext);

  const isOwn = el.owner._id === userData._id;
  const isLiked = el.likes.some(i => i._id === userData._id);

  const cardLikeButtonClassName = ( 
    `button elements__favorite ${isLiked && 'elements__favorite_active'}` 
  )

  return (
    <li className="elements__item">
      <div className="elements__card">
        {isOwn && <button className="button elements__delete-icon" onClick={handleDeleteClick}></button>}
        <img className="elements__image" src={el.link} alt={el.name} onClick={handleCardClick} />
        <div className="elements__info">
          <h2 className="elements__name">{el.name}</h2>
          <div className="elements__likes">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <p className="elements__like-counter">{el.likes.length}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;