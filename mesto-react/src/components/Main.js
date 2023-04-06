import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  
  const [userName, setUserName] = useState("")
  const [userDescription, setUserDescription] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [cards, setCards] = useState([])
  
  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
      })
      .catch((err) => console.log(`Произошла ошибка: ${err}`)
      )
    }
  )

  useEffect(() => {
    api
      .getCards()
      .then((elements) => {
        setCards(elements)
      })
      .catch((err) => console.log(`Произошла ошибка: ${err}`))
    }, [])

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" src={userAvatar} alt="Фото пользователя" />
        <button className="profile__edit-avatar" aria-label="Кнопка обновления аватара" type="button" onClick={onEditAvatar}></button>
        <div className="profile__info">
          <div className="profile__fullname">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit" aria-label="Редактировать профиль" type="button" onClick={onEditProfile} ></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add" type="button" aria-label="Добавить карточку" onClick={onAddPlace} ></button>
      </section>
      <section className="cards">
        {cards.map((card => {
          return (<Card card={card}
                        key={card._id}
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        onCardClick={onCardClick}
                        />)
        }))}
      </section>
    </main>
  );
}

export default Main;
