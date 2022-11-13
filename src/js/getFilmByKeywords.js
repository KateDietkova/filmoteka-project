import Notiflix from 'notiflix';
import { getFilmByKeywords } from './fetchFunction';
import { galleryMarkup } from './galleryMarkup';
import { getAllGenres } from './getGenres';
import Loading from './loader.js';
import { instanceSearch } from './fetchFunction';
import { scrollToTop } from './scroll-up';
import { translations } from './translation/langs';
import { getLangFromStorage } from './translation/translate';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryCont: document.querySelector('.movie-gallery'),
  cardFilm: document.querySelector('.js-trend-film'),
  button: document.querySelector('.button-search'),
};

let lang = getLangFromStorage();
let queryVal = '';
let pageNum = 1;

function addListenerToSearchForm() {
  if (refs.searchForm) {
    refs.searchForm.addEventListener('submit', onSubmitForm);
  }
}

addListenerToSearchForm();

function onSubmitForm(evt) {
  evt.preventDefault();
  clearForm();
  if (evt.currentTarget.elements.searchQuery.value.trim() === '') {
    return Notiflix.Notify.warning(translations.emptyfield[lang]);
  }

  Loading.pulse('Loading...', {
    svgColor: '#FF6B08',
  });
  Loading.pulse();
  queryVal = evt.currentTarget.elements.searchQuery.value;

  pageNum = 1;
  addMoviesToGallery(queryVal, pageNum);
}

instanceSearch.on('afterMove', onClickPageSearch);

function onClickPageSearch(eventData) {
  addMoviesToGallery(queryVal, eventData.page);
  scrollToTop();
}

function clearForm() {
  refs.cardFilm.innerHTML = '';
}

async function getMovieWithAllGenres(queryVal, page) {
  const movieInfo = await getFilmByKeywords(queryVal, page);
  console.log(movieInfo);
  const allGenres = await getAllGenres();
  return { movieInfo, allGenres };
}

async function addMoviesToGallery(queryVal, page) {
  try {
    Loading.remove();
    const { movieInfo, allGenres } = await getMovieWithAllGenres(
      queryVal,
      page
    );
    console.log(movieInfo);
    refs.cardFilm.innerHTML = galleryMarkup(movieInfo, allGenres);
  } catch (error) {
    console.log('Some error:', error);
    return;
  }
}
