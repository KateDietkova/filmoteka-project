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
    .map(({ poster_path, title, genre_ids, release_date }) => {
      return `<div class="films-card">
                    <img
                        class="projects-list__img"
                        src='https://image.tmdb.org/t/p/w500/${poster_path}'
                        alt='${title}'
                    />
                    <div class="film-item-wrapper">
                        <p class="film-description-title">${title}</p>
                        <div class="film-description-wrapper">
                        <p class="film-description-items">${getGenres(
                          genre_ids,
                          allGenres
                        )}</p>
                        <p class="film-description-items">${getDate(release_date)}</p>
                    </div>
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

function getDate(date) {
  const year = date.split('-')[0];
  return year;
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
