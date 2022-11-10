import { STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from './modalFilmMarkup';
import { galleryMarkup } from './galleryMarkup';

const refs = {
  watchedFilmsLibraryBtn: document.querySelector('.watched-btn'),
  queueFilmsLibraryBtn: document.querySelector('.queue-btn'),
};
let getWatchedFilmsArr;
let getQueueFilmsArr;

addListenerToLibraryBtn();

function onGetFromLocalStorageWatchedFilms() {
  getWatchedFilmsArr = localStorage.getItem(STORAGE_KEY_WATCHED);

  if (getWatchedFilmsArr) {
    const parseGetWatchedFilms = JSON.parse(getWatchedFilmsArr);
    console.log(parseGetWatchedFilms);
  }
}

function onGetFromLocalStorageQueueFilms() {
  getQueueFilmsArr = localStorage.getItem(STORAGE_KEY_QUEUE);

  if (getQueueFilmsArr) {
    const parseGetQueueFilms = JSON.parse(getQueueFilmsArr);
    console.log(parseGetQueueFilms);
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

// addToStorage = (key, value) => {
//   try {
//     if (typeof value === 'string') {
//       localStorage.setItem(key, value);
//     } else {
//       localStorage.setItem(key, JSON.stringify(value));
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// getFromStorage = key => {
//   try {
//     return JSON.parse(localStorage.getItem(key));
//   } catch (error) {
//     console.error(error);
//   }
// };

// removeFromStorage = key => {
//   try {
//     localStorage.removeItem(key);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export { addToStorage, getFromStorage, removeFromStorage };
