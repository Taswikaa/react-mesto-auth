import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({ name, title, buttonText, isOpen, onClose, children, onSubmit }) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button className="button popup__button popup__button_purpose_close" type="button" onClick={ onClose } />
          <p className="popup__heading">{title}</p>
          <form className="popup__form" action="#" name={`${name}`} onSubmit={onSubmit}>
            {children}
            <button className="popup__button popup__button_purpose_submit">{buttonText}</button>
          </form>
        </div>
      </div>
  );
}

export default PopupWithForm;