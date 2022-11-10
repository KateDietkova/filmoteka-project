import { getMovie } from './getTrendFilm';
import { getAllGenres, getGenres } from './getGenres';
import { getPosterFilm } from './getPosterFilm';
import Pagination from 'tui-pagination';
import { options, container } from './pagination';

import Loading from './loader.js';
Loading.pulse('Loading...', {
  svgColor: '#FF6B08',
});

let pageNum = 1;
let instance;

const gallery = document.querySelector('.js-trend-film');

// const paginnationBox = document.querySelector('.tui-pagination');

async function getMoviesWithAllGenres(pageNum) {
  const { movies, responseInfo } = await getMovie(pageNum);
  options.page = responseInfo.page;
  options.totalItems = responseInfo.total_results;
  console.log(movies);
  const allGenres = await getAllGenres();
  return { movies, allGenres };
}
Loading.pulse();
addMoviesToGallery(pageNum);
instance = new Pagination(container, options);
instance.on('afterMove', onClickPage);


function onClickPage(eventData) {
  addMoviesToGallery(eventData.page);
}

export function galleryMarkup(movies, allGenres) {
  return movies
    .map(({ poster_path, title, genre_ids, release_date, id }) => {
      return `<li class="films-card" data-id=${id}>
                    <img
                        class="projects-list__img"
                        src='${getPosterFilm(poster_path)}'
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
                </li>`;
    })
    .join('');
}

function getDate(date) {
  const year = date.split('-')[0];
  return year;
}

async function addMoviesToGallery(pageNum) {
  try {
    Loading.remove();
    const { movies, allGenres } = await getMoviesWithAllGenres(pageNum);
    gallery.innerHTML = galleryMarkup(movies, allGenres);
  } catch (error) {
    console.log('Error', error);
    return;
  }
}
