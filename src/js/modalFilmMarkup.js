import modalFilmMarkupTpl from '../templates/modalFilmMarkup.hbs';
import { getPosterFilm } from './getPosterFilm';
import { getFilmInfoById } from './getFilmInfoById';
import { translateTexts } from './translation/translate';
import { getDate } from './galleryMarkup';
import movieTrailer from './movie-trailer';
import { scrollController } from './scrollController';
import { translations } from './translation/langs';
import { getLangFromStorage } from './translation/translate';

const refs = {
  movieList: document.querySelector('.movie-list'),
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modalContainer: document.querySelector('.modal-container'),
};


const lang = getLangFromStorage();

let dataObj = {};
export const STORAGE_KEY_WATCHED = 'watched-films';
export const STORAGE_KEY_QUEUE = 'queue-films';
let watchedFilms = [];
let queueFilms = [];
let addToWatchedBtn;
let addToQueueBtn;


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
  const filmId = event.target.closest('li[data-id]').dataset.id;

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
    release_date,
    id,
  } = await getFilmInfoById(filmId);

  const genresName = genres.map(({ name }) => name).join(', ');
  const slicePopularity = parseFloat(popularity.toFixed(1));
  const sliceVoteAverage = parseFloat(vote_average.toFixed(1));
  const releaseDate = getDate(release_date);
  console.log(genresName);

  dataObj = {
    filmId,
    backdrop_path,
    genresName,
    poster_path,
    original_title,
    overview,
    slicePopularity,
    title,
    sliceVoteAverage,
    vote_count,
    releaseDate,
    id,
  };

  // проверить, есть ли постер, и если нет, поставить заглушку
  dataObj.poster_path = getPosterFilm(dataObj.poster_path);

  // отобразить модалку
  toggleModalClass();

  // отрисовать разметку модалки
  refs.modalContainer.insertAdjacentHTML(
    'afterbegin',
    modalFilmMarkupTpl(dataObj)
  );

  scrollController.disabledScroll();

  translateTexts();

  // навесить слушателей на закрытие
  addListeners();

  movieTrailer();

  addToWatchedBtn = document.querySelector('.modal-film__button-watched');
  addToQueueBtn = document.querySelector('.modal-film__button-queue');


  isInSavedFilm(STORAGE_KEY_WATCHED, addToWatchedBtn);
  isInSavedFilm(STORAGE_KEY_QUEUE, addToQueueBtn);

  addToWatchedBtn.addEventListener('click', onAddToWatched);
  addToQueueBtn.addEventListener('click', onAddToQueue);
}

function isInSavedFilm(key, button) {
  const savedFilms = localStorage.getItem(key);
  if (savedFilms) {
    let findId;
    const savedFilmsParse = JSON.parse(savedFilms);
    savedFilmsParse.map(({ filmId }) => {
      if (filmId === dataObj.filmId) {
        findId = filmId;
        return;
      }
      return;
    });
    if (findId && button.classList.contains('modal-film__button-watched')) {
      button.textContent = translations.removewatched[lang];
    }
    if (findId && button.classList.contains('modal-film__button-queue')) {
      button.textContent = translations.removequeue[lang];
    }
  }
}

function onAddToWatched() {
  console.log(addToWatchedBtn.textContent);
  const savedWatchedFilms = localStorage.getItem(STORAGE_KEY_WATCHED);
  if (savedWatchedFilms) {
    watchedFilms = JSON.parse(savedWatchedFilms);
  }
  if (addToWatchedBtn.textContent === translations.removewatched[lang]) {
    let indexFilmObj;
    console.log(watchedFilms);
    watchedFilms.filter((film, index) => {
      console.log('Compare', film.filmId, dataObj.filmId);
      if (film.filmId === dataObj.filmId) {
        indexFilmObj = index;
      }
      return film.filmId === dataObj.filmId;
    });
    watchedFilms.splice(indexFilmObj, 1);
    localStorage.setItem(STORAGE_KEY_WATCHED, JSON.stringify(watchedFilms));
    addToWatchedBtn.textContent = translations.addwatched[lang];
    return;
  }
  addToWatchedBtn.textContent = translations.removewatched[lang];
  watchedFilms.push(dataObj);
  localStorage.setItem(STORAGE_KEY_WATCHED, JSON.stringify(watchedFilms));
}

function onAddToQueue() {
  console.log(dataObj);
  const savedQueueFilms = localStorage.getItem(STORAGE_KEY_QUEUE);
  if (savedQueueFilms) {
    queueFilms = JSON.parse(savedQueueFilms);
  }

  if (addToQueueBtn.textContent === translations.removequeue[lang]) {
    let indexFilmObj;
    console.log(queueFilms);
    queueFilms.filter((film, index) => {
      console.log('Compare', film.filmId, dataObj.filmId);
      if (film.filmId === dataObj.filmId) {
        indexFilmObj = index;
      }
      return film.filmId === dataObj.filmId;
    });
    queueFilms.splice(indexFilmObj, 1);
    localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(queueFilms));

    addToQueueBtn.textContent = translations.addqueue[lang];
    return;
  }
  addToQueueBtn.textContent = translations.removequeue[lang];


  queueFilms.push(dataObj);
  localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(queueFilms));
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
