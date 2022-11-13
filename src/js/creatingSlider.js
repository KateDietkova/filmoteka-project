import Glide from '@glidejs/glide';
import filmsCardsToSlider from '../templates/filmsCardsToSlider.hbs';
import getPosterFilm from './getPosterFilm';
import noposter from '../images/filmsPoster/noposter.jpg';

let sliderContainer;
let glide;

function selectBoxForSlider() {
  if (document.querySelector('.slider__container')) {
    sliderContainer = document.querySelector('.slider__container');
  }
}

selectBoxForSlider();
trendToSlider();
selectAndDefineSlider();

function selectAndDefineSlider() {
  if (document.querySelector('.glide')) {
    glide = new Glide('.glide', {
      type: 'slider',
      startAt: 5,
      perView: 10,
      autoplay: 3500,
      hoverpause: true,
      bound: true,
    });
    glide.mount();
  }
}

function renderSliderFilms(e) {
  if (sliderContainer) {
    sliderContainer.innerHTML = filmsCardsToSlider(e);
  }
}

async function trendToSlider() {
  const URL = `https://api.themoviedb.org/3/trending/tv/day?api_key=579a7483bae7d6a5a25eb4c1ddded2cf`;
  return fetch(URL)
    .then(response => response.json())
    .then(({ results }) => {
      const failmsInfo = ratingToFixed(results);
      return failmsInfo;
    })
    .then(renderSliderFilms)
    .catch(error => {
      console.log(error);
      sliderContainer.innerHTML = `<img src=${noposter} alt='No poster' loading='lazy'>`;
    });
}

function ratingToFixed(filmsDay) {
  const filmsDayInfo = filmsDay.map(
    ({ id, poster_path, title, name, vote_average }) => {
      let voteFixed = parseFloat(vote_average.toFixed(1));
      return { id, poster_path, title, name, voteFixed };
    }
  );
  return filmsDayInfo;
}
