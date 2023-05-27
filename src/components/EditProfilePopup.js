import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const userData = React.useContext(CurrentUserContext);

  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  React.useEffect(() => {
    setNameValue(userData.name);
    setDescriptionValue(userData.about);
  }, [userData, isOpen])

  const handleNameChange = function(evt) {
    setNameValue(evt.target.value);
  }

  const handleDescriptionChange = function(evt) {
    setDescriptionValue(evt.target.value);
  }

   const handleSubmit = function(evt) {
    evt.preventDefault();
  
    onUpdateUser(nameValue, descriptionValue);
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" buttonText={isLoading ? "Сохранение..." : "Сохранить"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_pupose_name" type="text" name="nick" placeholder="Ваше имя" id="nick-input" required minLength="2" maxLength="40" value={nameValue} onChange={handleNameChange} />
      <span className="popup__span-error nick-input-error"></span>
      <input className="popup__input popup__input_pupose_job" type="text" name="job" placeholder="Ваше хобби" id="job-input" required minLength="2" maxLength="200" value={descriptionValue} onChange={handleDescriptionChange} />
      <span className="popup__span-error job-input-error"></span>
    </ PopupWithForm>
  )
}

export default EditProfilePopup;