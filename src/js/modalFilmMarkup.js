import modalFilmMarkupTpl from '../templates/modalFilmMarkup.hbs';

const refs = {
  //   element: document.querySelector('.element'),
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modalContainer: document.querySelector('.modal-container'),
};

// refs.element.addEventListener('click', onClickShowModal);
function onClickShowModal(event) {
  event.preventDefault();
  // if (event.target === event.currentTarget) {
  //     //или прописать другое условие, когда кликнули не туда и модалка не открывается
  //     return;
  //   };
  showModal(event);
}

function showModal(event) {
  // сохранить данные из карточки в объект
  // const { src, title, vote, votes, и т.д. } = event.target;
  const dataObj = {};
  // отобразить модалку
  toggleModalClass();
  // отрисовать разметку модалки
  refs.modalContainer.insertAdjacentHTML(
    'afterbegin',
    modalFilmMarkupTpl(dataObj)
  );
  // навесить слушателей на закрытие
  addListeners();
}

function onBtnClick(event) {
  event.preventDefault();
  toggleModalClass();
  removeListeners();
}

function onKeyDown(event) {
  event.preventDefault();
  if (event.key === 'Escape') {
    toggleModalClass();
    removeListeners();
  }
}

function onBackdropClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    toggleModalClass();
    removeListeners();
  }
}

// Навешивает и убирает класс is-hidden
function toggleModalClass() {
  refs.modal.classList.toggle('is-hidden');
}

// Навешивает слушателей на закрытие
function addListeners() {
  if (!refs.modal.classList.contains('is-hidden')) {
    refs.closeModalBtn.addEventListener('click', onBtnClick);
    window.addEventListener('keydown', onKeyDown);
    refs.modal.addEventListener('click', onBackdropClick);
  }
}

// Снимает слушателей на закрытие
function removeListeners() {
  if (refs.modal.classList.contains('is-hidden')) {
    refs.closeModalBtn.removeEventListener('click', onBtnClick);
    window.removeEventListener('keydown', onKeyDown);
    refs.modal.removeEventListener('click', onBackdropClick);
  }
}
