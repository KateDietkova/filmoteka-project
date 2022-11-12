import axios from 'axios';
import Notiflix from 'notiflix';
import { getLangFromStorage } from './translation/translate';
import Pagination from 'tui-pagination';
import { containerSearch } from './pagination';
import { options, container } from './pagination';
options.totalItems = 2;

export let instanceSearch = new Pagination(containerSearch, options);

let lang = getLangFromStorage();
const movieErrorWrapper = document.querySelector('.movie-error-wrapper');

export async function getFilmByKeywords(queryVal, pageNum) {
  const url = `https://api.themoviedb.org/3/search/movie`;

  return await axios
    .get(url, {
      params: {
        api_key: '579a7483bae7d6a5a25eb4c1ddded2cf',
        query: `${queryVal}`,
        page: `${pageNum}`,
        language: `${lang}`,
      },
    })
    .then(res => {
      if (!res.data.total_results) {
        throw new Error();
      }
      if (!movieErrorWrapper.classList.contains('visually-hidden')) {
        movieErrorWrapper.classList.add('visually-hidden');
      }
      const searchInfo = res.data;

      instanceSearch.setTotalItems(searchInfo.total_results);
      activeSearchPagination(searchInfo.total_results);
      console.log(res.data);
      return res.data.results;
    })
    .catch(error => {
      movieErrorWrapper.classList.remove('visually-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no movies matching your search query. Please try again.'
      );
    });
}

function activeSearchPagination(totalItems) {
  if (containerSearch.classList.contains('visually-hidden') && totalItems > 20) {
    container.classList.add('visually-hidden');
    containerSearch.classList.remove('visually-hidden');
  }
  if (totalItems <= 20) {
    container.classList.add('visually-hidden');
  }
  return;
}

