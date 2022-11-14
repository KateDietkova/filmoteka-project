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
Notiflix.Notify.init({
  width: '300px',
  position: 'center-top',
  distance: '10px',
  opacity: 0.9,
  borderRadius: '2px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,
  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Georgia',
  fontSize: '12px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'from-right',
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic',
  fontAwesomeIconSize: '34px',
  failure: {
  background: 'rgb(104, 34, 34)',
  textColor: '#fff',
  childClassName: 'notiflix-notify-failure',
  notiflixIconColor: 'rgba(0,0,0,0.2)',
  fontAwesomeClassName: 'fas fa-times-circle',
  fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
  backOverlayColor: 'rgba(255,85,73,0.2)',
  },
  warning: {
  background: 'rgb(104, 34, 34)',
  textColor: '#fff',
  childClassName: 'notiflix-notify-warning',
  notiflixIconColor: 'rgba(0,0,0,0.2)',
  fontAwesomeClassName: 'fas fa-exclamation-circle',
  fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
  backOverlayColor: 'rgba(238,191,49,0.2)',
  },
  info: {
  background: '#26c0d3',
  textColor: '#fff',
  childClassName: 'notiflix-notify-info',
  notiflixIconColor: 'rgba(0,0,0,0.2)',
  fontAwesomeClassName: 'fas fa-info-circle',
  fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
  backOverlayColor: 'rgba(38,192,211,0.2)',
  },
  });