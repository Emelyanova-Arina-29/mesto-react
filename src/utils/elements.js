const page = document.querySelector('.page');

const buttonOpenPopupCreateCard = page.querySelector('.profile__add');
const buttonOpenPopupEditProfile = page.querySelector('.profile__edit');
const buttonOpenPopupAvatar = page.querySelector('.profile__edit-avatar');

const formPopupEdit = document.forms.popupEdit;
const formPopupAdd = document.forms.popupAdd;
const formPopupAvatar = document.forms.popupAvatar;

const popupView = page.querySelector('.popup_type_view');
const popupImage = popupView.querySelector('.popup__image');
const popupNameImage = popupView.querySelector('.popup__caption');
const inputNameProfile = formPopupEdit.querySelector('.popup__input_type_name');
const inputDescriptionProfile = formPopupEdit.querySelector('.popup__input_type_description');
const inputAvatar = formPopupAvatar.querySelector('.popup__input_type_avatar');


export { buttonOpenPopupCreateCard,
  buttonOpenPopupEditProfile,
  formPopupEdit, formPopupAdd,
  popupImage, popupNameImage,
  inputNameProfile, inputDescriptionProfile,
  formPopupAvatar, buttonOpenPopupAvatar,
  inputAvatar }
