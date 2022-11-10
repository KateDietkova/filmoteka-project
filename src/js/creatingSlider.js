import Glide from '@glidejs/glide';
import filmsCardsToSlider from '../templates/filmsCardsToSlider.hbs';
import getPosterFilm from './getPosterFilm';

const sliderContainer = document.querySelector('.slider__container');

trendToSlider();

var glide = new Glide('.glide', {
  type: 'slider',
  startAt: 5,
  perView: 10,
  autoplay: 3500,
  hoverpause: true,
  bound: true,
});

glide.mount();

function renderSliderFilms(e) {
  sliderContainer.innerHTML = filmsCardsToSlider(e);
}

function trendToSlider() {
  const URL = `https://api.themoviedb.org/3/trending/tv/day?api_key=579a7483bae7d6a5a25eb4c1ddded2cf`;
  return fetch(URL)
    .then(response => response.json())
    .then(({ results }) => {
      return results;
    })
    .then(renderSliderFilms)
    .catch(error => {
      sliderContainer.innerHTML = getPosterFilm(posterPath);
    });
}
