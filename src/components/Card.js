import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {

  const handleCardClick = function() {
    onCardClick(cardData);
  }

  const handleLikeClick = function() {
    onCardLike(cardData);
  }

  const handleDeleteClick = function() {
    onCardDelete(cardData);
  }

  const userData = React.useContext(CurrentUserContext);

  const isOwn = cardData.owner._id === userData._id;
  const isLiked = cardData.likes.some(i => i._id === userData._id);

  const cardLikeButtonClassName = ( 
    `button elements__favorite ${isLiked && 'elements__favorite_active'}` 
  )

  return (
    <li className="elements__item">
      <div className="elements__card">
        {isOwn && <button className="button elements__delete-icon" onClick={handleDeleteClick}></button>}
        <img className="elements__image" src={cardData.link} alt={cardData.name} onClick={handleCardClick} />
        <div className="elements__info">
          <h2 className="elements__name">{cardData.name}</h2>
          <div className="elements__likes">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <p className="elements__like-counter">{cardData.likes.length}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;