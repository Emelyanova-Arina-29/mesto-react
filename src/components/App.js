import React, { useState, useEffect } from 'react';
import Header from './Header';
import api from '../utils/Api';
import '../index.css';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: ''});
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cards]) => {
        
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(`Произошла ошибка: ${err}`)
      )
    }, [])

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard()
  } 

  function handleCardLike(card) {
    
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    
    if (!isLiked) {
    api.addLikeCard(card._id)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    });
  } else {
    api.deleteLikeCard(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }}

  function handleCardDelete(card) {

    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id && c));
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
  }

  function handleUpdateUser(data) {
    console.log(data);
    api.editUserInfo(data)
    .then((user) => {
    
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__container">
        <Header />
        <Main 
          onEditProfile={() => setIsEditProfilePopupOpen(true)} 
          onAddPlace={() => setIsAddPlacePopupOpen(true)} 
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={(card) => setSelectedCard(card)}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupWithForm
          name="popup_type_create"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          textButton="Создать"
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input className="popup__input popup__input_type_title" type="text" defaultValue="" name="name" id="titleImage" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="titleImage-error popup__input-error"></span>
          </label>
          <label className="popup__label">
            <input className="popup__input popup__input_type_link" type="url" defaultValue="" name="link" id="linkImage" placeholder="Ссылка на картинку" required />
            <span className="linkImage-error popup__input-error"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="popup_type_avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          textButton="Сохранить"
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input className="popup__input popup__input_type_avatar" type="url" defaultValue="" name="inputAvatar" id="linkNewAvatar" placeholder="Ссылка на аватар" required />
            <span className="linkNewAvatar-error popup__input-error"></span>
          </label>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  </div>
  </CurrentUserContext.Provider>  
  );
}

export default App;
