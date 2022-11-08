import axios from "axios";
import Notiflix from "notiflix";
import { getFilmByKeywords } from "./fetchFunction";
import { galleryMarkup } from "./galleryMarkup";
import { getMovie } from './getTrendFilm';
import { getAllGenres, getGenres } from './getGenres';

export async function getFilmByKeywords(queryVal, pageNum){
    
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
          Notiflix.Notify.failure(
            'Sorry, there are no movies matching your search query. Please try again.'
          );
        }
    
        return res.data.results;

      });
};

