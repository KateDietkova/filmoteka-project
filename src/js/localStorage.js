import { STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from './modalFilmMarkup';
import { getPosterFilm } from './getPosterFilm';

const refs = {
  watchedFilmsLibraryBtn: document.querySelector('.watched-btn'),
  queueFilmsLibraryBtn: document.querySelector('.queue-btn'),
  libraryGallery: document.querySelector('.js-library'),
  libraryImgWrapper: document.querySelector('.library-img-wrapper'),
};
let getWatchedFilmsArr;
let getQueueFilmsArr;

addListenerToLibraryBtn();
onGetFromLocalStorageWatchedFilms();

function onGetFromLocalStorageWatchedFilms() {
  hideLibraryImgNotFound();
  getWatchedFilmsArr = localStorage.getItem(STORAGE_KEY_WATCHED);

  if (getWatchedFilmsArr) {
    const parseGetWatchedFilms = JSON.parse(getWatchedFilmsArr);
    getFilms(parseGetWatchedFilms);
  }

}

function onGetFromLocalStorageQueueFilms() {
  hideLibraryImgNotFound();
  removeBtnActiveClass();
  getQueueFilmsArr = localStorage.getItem(STORAGE_KEY_QUEUE);

  if (getQueueFilmsArr) {
    const parseGetQueueFilms = JSON.parse(getQueueFilmsArr);
    getFilms(parseGetQueueFilms);
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
                    ${genresName} | ${releaseDate}
                    <span class="modal-film__value-vote">${sliceVoteAverage}</span>
                  </p>
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

function showLibraryImgNotFound(imgWrapper) {
  if (imgWrapper && refs.libraryGallery) {
    refs.libraryGallery.innerHTML = '';
    imgWrapper.classList.remove('visually-hidden');
  }
}

function getFilms(savedMovies) {
  if (savedMovies.length) {
    console.log(savedMovies);

    addLibraryGallery(savedMovies);
    return;
  }
  showLibraryImgNotFound(refs.libraryImgWrapper);
}

function hideLibraryImgNotFound() {
  if (!refs.libraryImgWrapper.classList.contains('visually-hidden')) {
    refs.libraryImgWrapper.classList.add('visually-hidden');
  }
}