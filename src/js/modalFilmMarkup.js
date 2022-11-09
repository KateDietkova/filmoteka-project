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

async function showModal(event) {
  refs.modalContainer.innerHTML = '';

  const filmId = event.target.closest('div[data-id]').dataset.id;
  // getFilmInfoById(filmId);
  // console.log(getFilmInfoById(filmId));

  const {
    backdrop_path,
    poster_path,
    genres,
    original_title,
    overview,
    popularity,
    title,
    vote_average,
    vote_count,
  } = await getFilmInfoById(filmId);
  const genresName = genres.map(({ name }) => name).join(', ');
  const slicePopularity = parseFloat(popularity.toFixed(1));
  const sliceVoteAverage = parseFloat(vote_average.toFixed(1));
  // console.log(slicePopularity);
  // console.log(genresName);

  // сохранить данные из карточки в объект
  const dataObj = {
    backdrop_path,
    genresName,
    poster_path,
    original_title,
    overview,
    slicePopularity,
    title,
    sliceVoteAverage,
    vote_count,
  };

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

async function getFilmInfoById(filmId) {
  const url = `https://api.themoviedb.org/3/movie/${filmId}?api_key=579a7483bae7d6a5a25eb4c1ddded2cf&language=en-US`;

  const getInfo = await fetch(url);
  const parseInfo = await getInfo.json();
  return parseInfo;
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
    scrollController.enabledScroll();
    refs.modal.removeEventListener('click', onBackdropClick);
  }
}
