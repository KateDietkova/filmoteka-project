import { lang, getLangFromStorage } from './translation/translate';

export async function getMovie(pageNum) {
  lang = getLangFromStorage();
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=579a7483bae7d6a5a25eb4c1ddded2cf&page=${pageNum}&language=${lang}`;
  const resp = await fetch(url);
  localStorage.setItem('lastFetch', url);
  const responseInfo = await resp.json();
  const movies = responseInfo.results;
  return { responseInfo, movies };
}
