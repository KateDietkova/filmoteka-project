import modalFilmMarkupTpl from '../templates/modalFilmMarkup.hbs';
import { getPosterFilm } from './getPosterFilm';
import { getFilmInfoById } from './getFilmInfoById';
import { translateTexts } from './translation/translate';
import { getDate } from './galleryMarkup';
import movieTrailer from './movie-trailer';
import { scrollController } from './scrollController';
import { translations } from './translation/langs';
import { getLangFromStorage } from './translation/translate';
import { STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE, getFilms } from './localStorage';

const refs = {
  movieList: document.querySelector('.movie-list'),
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modalContainer: document.querySelector('.modal-container'),
  libraryGallery: document.querySelector('.js-library'),
};

const lang = getLangFromStorage();

let dataObj = {};

let watchedFilms = [];
let queueFilms = [];
let addToWatchedBtn;
let addToQueueBtn;


refs.movieList.addEventListener('click', onClickShowModal);

export default function onClickShowModal(event) {
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

function updateLibrary(sevedMovie) {
  if (refs.libraryGallery) {
    getFilms(sevedMovie);
  }
}

function onAddToWatched() {
  const savedWatchedFilms = localStorage.getItem(STORAGE_KEY_WATCHED);
  if (savedWatchedFilms) {
    watchedFilms = JSON.parse(savedWatchedFilms);
  }
  if (addToWatchedBtn.textContent === translations.removewatched[lang]) {
    let indexFilmObj;
    watchedFilms.filter((film, index) => {
      if (film.filmId === dataObj.filmId) {
        indexFilmObj = index;
      }
      return film.filmId === dataObj.filmId;
    });
    watchedFilms.splice(indexFilmObj, 1);
    updateLibrary(watchedFilms);
    localStorage.setItem(STORAGE_KEY_WATCHED, JSON.stringify(watchedFilms));
    addToWatchedBtn.textContent = translations.addwatched[lang];
    return;
  }
  addToWatchedBtn.textContent = translations.removewatched[lang];
  watchedFilms.push(dataObj);
  localStorage.setItem(STORAGE_KEY_WATCHED, JSON.stringify(watchedFilms));
}

function onAddToQueue() {
  const savedQueueFilms = localStorage.getItem(STORAGE_KEY_QUEUE);
  if (savedQueueFilms) {
    queueFilms = JSON.parse(savedQueueFilms);
  }

  if (addToQueueBtn.textContent === translations.removequeue[lang]) {
    let indexFilmObj;
    queueFilms.filter((film, index) => {
      if (film.filmId === dataObj.filmId) {
        indexFilmObj = index;
      }
      return film.filmId === dataObj.filmId;
    });
    queueFilms.splice(indexFilmObj, 1);
    updateLibrary(queueFilms);
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
