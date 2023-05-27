import React from 'react';
import successImage from '../images/success.jpg';
import repeatImage from '../images/repeat.jpg';

const InfoPopup = ({ isOpen, onClose, isSuccess }) => {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="button popup__button popup__button_purpose_close" type="button" onClick={ onClose } />
        <img style={{maxWidth:'120px', margin:'35px auto 0'}} src={isSuccess ? successImage : repeatImage}/>
        <p style={{
          fontSize:'24px',
          fontWeight:'900',
          lineHeight:'29px',
          maxWidth:'358px',
          margin:'32px auto 23px'
        }}>{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </div>
  );
}

export default InfoPopup;