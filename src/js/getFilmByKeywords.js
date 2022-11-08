import axios from "axios";
import Notiflix from "notiflix";
import { getFilmByKeywords } from "./fetchFunction";
import { galleryMarkup } from "./galleryMarkup";
import { getMovie } from './getTrendFilm';
import { getAllGenres } from './getGenres';
import Loading from './loader.js';

Loading.pulse('Loading...', {
  svgColor: '#FF6B08',
});


const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryCont: document.querySelector('.movie-gallery'),
    cardFilm: document.querySelector('.js-trend-film'),
    button: document.querySelector('.button-search')
 };

let queryVal= '';
let pageNum = 1;

 refs.searchForm.addEventListener('submit', onSubmitForm);



 function onSubmitForm(evt){
     evt.preventDefault();
     clearForm();
     if (evt.currentTarget.elements.searchQuery.value.trim() === '') {
         return Notiflix.Notify.warning('Field cannot be emply');
    };

     queryVal = evt.currentTarget.elements.searchQuery.value;
     
    //  if(!queryVal){
    //      return Notiflix.Notify.warning(
    //     'Field cannot be empty.'//    Sorry, there are no movies matching your search query. Please try again.'
    //      );
    //      }
        pageNum = 1;
        addMoviesToGallery(queryVal);

     }

 function clearForm(){
    refs.cardFilm.innerHTML = '';
 }
 async function getMovieWithAllGenres(queryVal) {
    const movieInfo = await getFilmByKeywords(queryVal, pageNum)
    console.log(movieInfo);
    const allGenres = await getAllGenres();
    return { movieInfo, allGenres };
 }
 async function addMoviesToGallery(queryVal) {
    try {
      Loading.remove();
      const { movieInfo, allGenres } = await getMovieWithAllGenres(queryVal);
      console.log(movieInfo);
      refs.cardFilm.innerHTML = galleryMarkup(movieInfo, allGenres);
    } catch (error) {
      console.log('Some error:', error);
      return;
    }
  }
//   refs.cardFilm.insertAdjacentHTML('beforeend', galleryMarkup);