import { getLangFromStorage } from './translation/translate';
import { translations } from './translation/langs';

let lang;
export async function getAllGenres() {
  lang = getLangFromStorage();
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=579a7483bae7d6a5a25eb4c1ddded2cf&language=${lang}`;
  const genresResponse = await fetch(url);
  localStorage.setItem('lastFetch', url);
  const genresParse = await genresResponse.json();
  const allGenres = genresParse.genres;
  return allGenres;
}

export function getGenres(genresMovie, allGenres) {
  const genresName = filterGenreList(genresMovie, allGenres);
  if (genresName.length > 2) {
    return `${genresName.slice(0, 2).join(', ')}, ${translations.other[lang]}`;
  }

  return genresName.join(', ');
}

function filterGenreList(genresMovie, allGenres) {
  const filterGenres = allGenres.filter(genre =>
    genresMovie.includes(genre.id)
  );
  const genresName = filterGenres.map(genre => {
    return genre.name;
  });
  return genresName;
}
