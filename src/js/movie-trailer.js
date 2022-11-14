import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { fetchTrailer } from './trailer-api';

const movieTrailer = () => {
  const trailerBtn = document.querySelector('.js-trailer-btn');

  trailerBtn.addEventListener('click', function (e) {
    openTrailer(e.target.dataset.id);
  });
};

function openTrailer(id) {
  fetchTrailer(id)
    .then(data => {
      const key = data.results[0].key;
      const lightBox = basicLightbox.create(`
  <iframe width="680" height="415" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
      lightBox.show();
    })
    .catch(error => {
      const lightBox = basicLightbox.create(`
    <iframe width="860" height="615" src="https://www.youtube.com/embed/6DhiiFGk4_s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `);
      lightBox.show();
    });
}

export default movieTrailer;
