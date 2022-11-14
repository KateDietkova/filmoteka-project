import { getPosterFilm } from './getPosterFilm';
import Loading from './loader.js';

const refs = {
  watchedFilmsLibraryBtn: document.querySelector('.watched-btn'),
  queueFilmsLibraryBtn: document.querySelector('.queue-btn'),
  libraryGallery: document.querySelector('.js-library'),
  libraryImgWrapper: document.querySelector('.library-img-wrapper'),
};
let getWatchedFilmsArr;
let getQueueFilmsArr;
export const STORAGE_KEY_WATCHED = 'watched-films';
export const STORAGE_KEY_QUEUE = 'queue-films';

addListenerToLibraryBtn();
onGetFromLocalStorageWatchedFilms();

function onGetFromLocalStorageWatchedFilms() {
  hideLibraryImgNotFound();
  addBtnActiveClassToWatched();
  Loading.pulse('Loading...', {
    svgColor: '#FF6B08',
  });

  getWatchedFilmsArr = localStorage.getItem(STORAGE_KEY_WATCHED);
  if (getWatchedFilmsArr) {
    const parseGetWatchedFilms = JSON.parse(getWatchedFilmsArr);
    getFilms(parseGetWatchedFilms);
    Loading.remove();
    return;
  }
  showLibraryImgNotFound(refs.libraryImgWrapper);
}

function onGetFromLocalStorageQueueFilms() {
  hideLibraryImgNotFound();
  addBtnActiveClassToQueue();
  Loading.pulse('Loading...', {
    svgColor: '#FF6B08',
  });
  getQueueFilmsArr = localStorage.getItem(STORAGE_KEY_QUEUE);

  if (getQueueFilmsArr) {
    const parseGetQueueFilms = JSON.parse(getQueueFilmsArr);
    getFilms(parseGetQueueFilms);
    Loading.remove();
    return;
  }
  showLibraryImgNotFound(refs.libraryImgWrapper);
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

function addBtnActiveClassToQueue() {
  if (refs.watchedFilmsLibraryBtn || refs.queueFilmsLibraryBtn) {
    refs.watchedFilmsLibraryBtn.classList.remove('active');
    refs.queueFilmsLibraryBtn.classList.add('active');
  }
}

function addBtnActiveClassToWatched() {
  if (refs.watchedFilmsLibraryBtn || refs.queueFilmsLibraryBtn) {
    refs.queueFilmsLibraryBtn.classList.remove('active');
    refs.watchedFilmsLibraryBtn.classList.add('active');
  }
}

function showLibraryImgNotFound(imgWrapper) {
  if (imgWrapper && refs.libraryGallery) {
    refs.libraryGallery.innerHTML = '';
    imgWrapper.classList.remove('visually-hidden');
  }
}

export function getFilms(savedMovies) {
  if (savedMovies.length) {

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
