import { getMovie, instance } from './getTrendFilm';
import { getAllGenres, getGenres } from './getGenres';
import { getPosterFilm } from './getPosterFilm';
import { scrollToTop } from './scroll-up';

import Loading from './loader.js';

let pageNum = 1;


const gallery = document.querySelector('.js-trend-film');


async function getMoviesWithAllGenres(pageNum) {
  const { movies } = await getMovie(pageNum);
  const allGenres = await getAllGenres();
  return { movies, allGenres };
}
Loading.pulse('Loading...', {
  svgColor: '#FF6B08',
});

addMoviesToGallery(pageNum);

instance.on('afterMove', onClickPage);

function onClickPage(eventData) {
  Loading.pulse('Loading...', {
    svgColor: '#FF6B08',
  });
  addMoviesToGallery(eventData.page);
  scrollToTop();
}

export function galleryMarkup(movies, allGenres) {
  return movies
    .map(({ poster_path, title, genre_ids, release_date, id }) => {
      return `<li class="films-card" data-id=${id}  data-aos="fade-up">
                <a href="#" class="link-film-card">
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
                  </a>
                </li>`;
    })
    .join('');
}

export function getDate(date) {
  const year = date.split('-')[0];
  return year;
}

 async function addMoviesToGallery(pageNum) {
  try {
    Loading.remove();
    const { movies, allGenres } = await getMoviesWithAllGenres(pageNum);
    gallery.innerHTML = galleryMarkup(movies, allGenres);
  } catch (error) {
    return;
  }
}


