import React from 'react';

function Card({ card, onCardClick }) {
  
  function handleCardClick() {
    onCardClick(card);
  } 

  return (
    <article className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <button className="card__delete" type="button" aria-label="Удалить карточку"></button>
      <div className="card__inscription">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes">
          <button className="card__like" type="button" aria-label="Поставить лайк"></button>
          <p className="card__number-like">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;