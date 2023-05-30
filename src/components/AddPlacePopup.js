import React, { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = function({ isOpen, onClose, onAddCard, isLoading }) {
  const [nameValue, setNameValue] = useState('');
  const [linkValue, setLinkValue] = useState('');

  const handleNameChange = function(evt) {
    setNameValue(evt.target.value);
  }

  const handleLinkChange = function(evt) {
    setLinkValue(evt.target.value);
  }

  const handleSubmit = function(evt) {
    evt.preventDefault();
  
    onAddCard(nameValue, linkValue);
  }

  useEffect(() => {
    setNameValue('');
    setLinkValue('');
  }, [isOpen])

  return (
    <PopupWithForm
      name="add" 
      title="Новое место"     
      buttonText={isLoading ? "Создание..." : "Создать"} 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
    >
        <input
          className="popup__input popup__input_pupose_place" type="text" 
          name="place" 
          placeholder="Название" 
          id="place-input" 
          required 
          value={nameValue} 
          minLength="2" 
          maxLength="30" 
          onChange={handleNameChange} 
        />
        <span className="popup__span-error place-input-error"></span>
        <input 
          className="popup__input popup__input_pupose_url" 
          type="url" 
          name="url-image" 
          placeholder="Ссылка на картинку" 
          id="url-input" 
          required 
          value={linkValue} 
          onChange={handleLinkChange} 
        />
        <span className="popup__span-error url-input-error"></span>
    </ PopupWithForm>
  )
}

export default AddPlacePopup;