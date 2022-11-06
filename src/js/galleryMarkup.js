const gallery = document.querySelector('.movie-list');
let genre;

async function getMovie() {
  const movies = await fetch(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=579a7483bae7d6a5a25eb4c1ddded2cf&page=1'
  );
  const resp = await movies.json();
  console.log(resp.results);
  return resp.results;
}

async function render() {
  const movies = await getMovie();
  const allGenres = await getAllGenres();
  return { movies, allGenres };
}
render().then(({ movies, allGenres }) => {
  console.log(allGenres);
  // galleryMarkup(movies, allGenres);
  gallery.innerHTML = galleryMarkup(movies, allGenres);
});

function galleryMarkup(movies, allGenres) {
  return movies
    .map(({ poster_path, title, genre_ids }) => {
      return `<div class="photo-card">
                    <img class="searchImage" src="https://image.tmdb.org/t/p/w200/${poster_path}" alt="${title}" loading="lazy" />
                    <div class="info">
                    <p class="info-item">
                        <b>Genres</b>
                        ${getGenres(genre_ids, allGenres)}
                    </p>
                    <p class="info-item">
                        <b>Title</b>
                        ${title}
                    </p>
                </div>
            </div>`;
    })
    .join('');
}

function getGenres(genresMovie, allGenres) {
  console.log(allGenres);
  const filterGenres = allGenres.filter(genre =>
    genresMovie.includes(genre.id)
  );
  const genresName = filterGenres
    .map(genre => {
      return genre.name;
    })
    .join(', ');
  console.log(genresName);

  return genresName;
}

async function getAllGenres() {
  const genresResponse = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=579a7483bae7d6a5a25eb4c1ddded2cf'
  );
  const genresParse = await genresResponse.json();
  const allGenres = genresParse.genres;
  console.log(allGenres);
  return allGenres;
}
