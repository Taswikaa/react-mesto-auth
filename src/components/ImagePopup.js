import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {
  usePopupClose(card, onClose);

  return (
    <div className={`popup popup_image ${card ? 'popup_opened' : ''}`}>
      <figure className="popup__figure">
        <button className="button popup__button popup__button_purpose_close" onClick={card && onClose}></button>
        <img className="popup__img" src={`${card && card.link}`} alt={card && card.name} />
        <figcaption className="popup__text">{card && card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;