import React from 'react';
import successImage from '../images/success.jpg';
import repeatImage from '../images/repeat.jpg';

const InfoPopup = ({ isOpen, onClose, isSuccess }) => {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="button popup__button popup__button_purpose_close" type="button" onClick={ onClose } />
        <img className='popup__info-img' src={isSuccess ? successImage : repeatImage}/>
        <p className='popup__info'>{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </div>
  );
}

export default InfoPopup;