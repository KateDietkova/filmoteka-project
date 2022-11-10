import axios from 'axios';
import modalFilmMarkupTpl from '../templates/modalFilmMarkup.hbs';
import { getPosterFilm } from './getPosterFilm';

const refs = {
  movieList: document.querySelector('.movie-list'),
  modal: document.querySelector('[data-modal]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modalContainer: document.querySelector('.modal-container'),
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
  const filmId = event.target.closest('li[data-id]').dataset.id;
  // getFilmInfoById(filmId);

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

  // проверить, есть ли постер, и если нет, поставить заглушку
  dataObj.poster_path = getPosterFilm(dataObj.poster_path);

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

async function getFilmInfoById(filmId) {
  const url = `https://api.themoviedb.org/3/movie/${filmId}?api_key=579a7483bae7d6a5a25eb4c1ddded2cf&language=en-US`;

  try {
    const film = await axios.get(url);
    return film.data;
  } catch (error) {
    console.log(error);
  }
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
