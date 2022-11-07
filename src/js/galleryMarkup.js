import { getMovie } from './getTrendFilm';
import { getAllGenres, getGenres } from './getGenres';

const gallery = document.querySelector('.movie-list');

async function getMoviesWithAllGenres() {
    const movies = await getMovie();
    console.log(movies);
  const allGenres = await getAllGenres();
  return { movies, allGenres };
}

addMoviesToGallery();

function galleryMarkup(movies, allGenres) {
  return movies
    .map(({ poster_path, title, genre_ids, release_date, id }) => {
      return `<div class="films-card" data-id=${id}>
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
                            )} | ${getDate(release_date)}</p>
                        </div>
                    </div>
                </div>`;
    })
    .join('');
}

function getDate(date) {
  const year = date.split('-')[0];
  return year;
}

async function addMoviesToGallery() {
  const { movies, allGenres } = await getMoviesWithAllGenres();
  gallery.innerHTML = galleryMarkup(movies, allGenres);
}
