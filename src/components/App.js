import React from 'react';
import Header from './Header'
import '../index.css';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard()
  } 

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main 
          onEditProfile={() => setIsEditProfilePopupOpen(true)} 
          onAddPlace={() => setIsAddPlacePopupOpen(true)} 
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={(card) => setSelectedCard(card)}
        />
        <Footer />
        <PopupWithForm
          name="popup_type_edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          textButton="Сохранить"
          onClose={closeAllPopups}
        >
          <label className="popup__label">
            <input className="popup__input popup__input_type_name" type="text" defaultValue="" name="inputNameProfile" id="nameProfile" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="nameProfile-error popup__input-error"></span>
          </label>
          <label className="popup__label">
            <input className="popup__input popup__input_type_description" type="text" defaultValue="" name="inputDescriptionProfile" id="descriptionProfile" placeholder="Вид деятельности" minLength="2" maxLength="200" required />
            <span className="descriptionProfile-error popup__input-error"></span>
          </label>
        </PopupWithForm>
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
  );
}

export default App;
