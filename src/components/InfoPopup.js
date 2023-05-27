import React from 'react';
import successImage from '../images/success.jpg';

const InfoPopup = ({ isOpen, onClose }) => {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="button popup__button popup__button_purpose_close" type="button" onClick={ onClose } />
        <img style={{maxWidth:'120px', margin:'35px auto 0'}} src={successImage}/>
        <p style={{
          fontSize:'24px',
          fontWeight:'900',
          lineHeight:'29px',
          maxWidth:'358px',
          margin:'32px auto 23px'
        }}>Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
}

export default InfoPopup;