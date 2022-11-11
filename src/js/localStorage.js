import { STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from './modalFilmMarkup';
import { getPosterFilm } from './getPosterFilm';

const refs = {
  watchedFilmsLibraryBtn: document.querySelector('.watched-btn'),
  queueFilmsLibraryBtn: document.querySelector('.queue-btn'),
  libraryGallery: document.querySelector('.js-library'),
};
let getWatchedFilmsArr;
let getQueueFilmsArr;

addListenerToLibraryBtn();
onGetFromLocalStorageWatchedFilms();

function onGetFromLocalStorageWatchedFilms() {
  getWatchedFilmsArr = localStorage.getItem(STORAGE_KEY_WATCHED);

  if (getWatchedFilmsArr) {
    const parseGetWatchedFilms = JSON.parse(getWatchedFilmsArr);
    console.log(parseGetWatchedFilms);
    addLibraryGallery(parseGetWatchedFilms);
  }
}

function onGetFromLocalStorageQueueFilms() {
  removeBtnActiveClass();
  getQueueFilmsArr = localStorage.getItem(STORAGE_KEY_QUEUE);

  if (getQueueFilmsArr) {
    const parseGetQueueFilms = JSON.parse(getQueueFilmsArr);
    console.log(parseGetQueueFilms);
    addLibraryGallery(parseGetQueueFilms);
  }
}

function addListenerToLibraryBtn() {
  if (refs.watchedFilmsLibraryBtn || refs.queueFilmsLibraryBtn) {
    refs.watchedFilmsLibraryBtn.addEventListener(
      'click',
      onGetFromLocalStorageWatchedFilms
    );
    refs.queueFilmsLibraryBtn.addEventListener(
      'click',
      onGetFromLocalStorageQueueFilms
    );
  }
}

function libraryMarkup(dataFilm) {
  return dataFilm
    .map(
      ({
        filmId,
        genresName,
        poster_path,
        title,
        sliceVoteAverage,
        releaseDate,
      }) => {
        return `<li class="films-card" data-id=${filmId}>
              <img
                  class="projects-list__img"
                  src='${getPosterFilm(poster_path)}'
                  alt='${title}'
              />
              <div class="film-item-wrapper">
                <p class="film-description-title">${title}</p>
                <div class="film-description-wrapper">
                  <p class="film-description-items">
                  ${genresName} | ${releaseDate}</p>
                </div>
              </div>
            </li>`;
      }
    )
    .join('');
}

function addLibraryGallery(dataFilm) {
  if (refs.libraryGallery) {
    refs.libraryGallery.innerHTML = libraryMarkup(dataFilm);
  }
}


function removeBtnActiveClass() {
  refs.watchedFilmsLibraryBtn.classList.remove('active');
}