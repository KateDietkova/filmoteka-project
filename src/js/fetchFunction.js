import axios from 'axios';
import Notiflix from 'notiflix';

const movieErrorWrapper = document.querySelector('.movie-error-wrapper');

export async function getFilmByKeywords(queryVal, pageNum) {
  const url = `https://api.themoviedb.org/3/search/movie/`;

  return await axios
    .get(url, {
      params: {
        api_key: '579a7483bae7d6a5a25eb4c1ddded2cf',
        query: `${queryVal}`,
        page: `${pageNum}`,
      },
    })
    .then(res => {
      if (!res.data.total_results) {
        throw new Error();
      }
      if (!movieErrorWrapper.classList.contains('visually-hidden')) {
        movieErrorWrapper.classList.add('visually-hidden');
      }
        return res.data.results;
    })
    .catch(error => {
      movieErrorWrapper.classList.remove('visually-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no movies matching your search query. Please try again.'
      );
    });
}
