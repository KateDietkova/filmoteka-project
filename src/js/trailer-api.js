const KEY = '579a7483bae7d6a5a25eb4c1ddded2cf';

export async function fetchTrailer(idCard) {
  return await fetch(
    `https://api.themoviedb.org/3/movie/${idCard}/videos?api_key=${KEY}&language=en-US`
  ).then(response => response.json());
}
