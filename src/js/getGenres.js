export async function getAllGenres() {
  const genresResponse = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=579a7483bae7d6a5a25eb4c1ddded2cf'
  );
  const genresParse = await genresResponse.json();
  const allGenres = genresParse.genres;
  return allGenres;
}

export function getGenres(genresMovie, allGenres) {
  const genresName = filterGenreList(genresMovie, allGenres);
  if (genresName.length > 2) {
    return `${genresName.slice(0, 2).join(', ')}, Other`;
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
