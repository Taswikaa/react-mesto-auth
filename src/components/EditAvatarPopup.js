import React from "react";

import PopupWithForm from "./PopupWithForm"

const EditAvatarPopup = function({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef('');

  const handleSubmit = function(evt) {
    evt.preventDefault();

    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm name="change-avatar" title="Обновить аватар" buttonText={isLoading ? "Сохранение..." : "Сохранить"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_pupose_url" type="url" name="url-avatar" placeholder="Ссылка на аватар" id="url-avatar" ref={avatarRef} required />
      <span className="popup__span-error url-avatar-error"></span>
    </ PopupWithForm> 
  )
}

export default EditAvatarPopup;