import React, { useState, useEffect } from 'react';
import Header from './Header';
import api from '../utils/Api';
import '../index.css';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

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
    
    api.editUserInfo(data)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
  }

  function handleAddPlaceSubmit(data) {
    api.createCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
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
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  </div>
  </CurrentUserContext.Provider>  
  );
}

export default App;
