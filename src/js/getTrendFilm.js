 export async function getMovie() {
  const resp = await fetch(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=579a7483bae7d6a5a25eb4c1ddded2cf&page=1'
  );
  const movies = await resp.json();
  return movies.results;
}