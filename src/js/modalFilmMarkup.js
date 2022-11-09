import modalFilmMarkupTpl from '../templates/modalFilmMarkup.hbs';

const refs = {
  movieList: document.querySelector('.movie-list'),
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modalContainer: document.querySelector('.modal-container'),
};

const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    //отримуємо позицію скролу
    scrollController.scrollPosition = window.scrollY;
    // фіксуємо скролл на поточній позиції
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
    
      top: -${scrollController.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
 
      padding-right: ${window.innerWidth - document.body.offsetWidth}px
    `;
    // вираховуємо ширину скроллу
    document.documentElement.style.scrollBehavior = 'unset';
  },
  enabledScroll() {
    document.body.style.cssText = '';
    window.scroll({ top: scrollController.scrollPosition });
    document.documentElement.style.scrollBehavior = '';
  },
};

refs.movieList.addEventListener('click', onClickShowModal);

function onClickShowModal(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }

  showModal(event);
}

function showModal(event) {
  refs.modalContainer.innerHTML = '';

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
  scrollController.disabledScroll();
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
  refs.modal.classList.toggle('visually-hidden');
}

// Навешивает слушателей на закрытие
function addListeners() {
  if (!refs.modal.classList.contains('visually-hidden')) {
    refs.closeModalBtn.addEventListener('click', onBtnClick);
    window.addEventListener('keydown', onKeyDown);
    refs.modal.addEventListener('click', onBackdropClick);
  }
}

// Снимает слушателей на закрытие
function removeListeners() {
  if (refs.modal.classList.contains('visually-hidden')) {
    scrollController.enabledScroll();
    refs.closeModalBtn.removeEventListener('click', onBtnClick);
    window.removeEventListener('keydown', onKeyDown);
    refs.modal.removeEventListener('click', onBackdropClick);
  }
}
