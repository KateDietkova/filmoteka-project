import axios from 'axios';
import { getLangFromStorage } from './translation/translate';

export async function getFilmInfoById(filmId) {
  lang = getLangFromStorage();
  const URL = `https://api.themoviedb.org/3/movie/${filmId}?api_key=579a7483bae7d6a5a25eb4c1ddded2cf&language=${lang}`;
  try {
    const film = await axios.get(URL);
    return film.data;
  } catch (error) {
    console.log(error);
  }
}
