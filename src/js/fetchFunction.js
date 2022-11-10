import axios from 'axios';
import Notiflix from 'notiflix';
import { lang, getLangFromStorage } from './translation/translate';
import Pagination from 'tui-pagination';
import { containerSearch } from './pagination';
import { options, container } from './pagination';

export let instanceSearch = new Pagination(containerSearch, options);

lang = getLangFromStorage();
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

      activeSearchPagination();
      instanceSearch.setTotalItems(searchInfo.total_results);
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

function activeSearchPagination() {
  if (containerSearch.classList.contains('visually-hidden')) {
    container.classList.add('visually-hidden');
    containerSearch.classList.remove('visually-hidden')
  }
  return;
}
