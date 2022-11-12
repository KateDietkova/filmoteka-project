
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { fetchTrailer } from './trailer-api';

const movieTrailer = () => {
  const trailerBtn = document.querySelector('.js-trailer-btn');

  trailerBtn.addEventListener('click', function (e) {
        openTrailer(e.target.dataset.id);
  })
}

function openTrailer (id) {
  fetchTrailer(id).then(data => {
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















// // import { getTrailer } from './trailer-api';

// const KEY = 'api_key=579a7483bae7d6a5a25eb4c1ddded2cf';
// const API_BASE_URL = 'https://api.themoviedb.org/3/';


// export default async function watchTrailer(trailerTitle) {
//     const movieId = await movieTrailer(trailerTitle, {
//         id: true,
//         api_key: KEY,
//     }); 

//     if (movieId !== null || movieId !== undefined) {
//         return basicLightbox.create(`<iframe class="movie-trailer" type="text/html" width="640" height="360" src="${movieId}" frameborder="0" allow="autoplay; fullscreen"></iframe>`).show();
//     } else {
//         const trailerBtn = document.querySelector('.js-trailer-btn');
//             trailerBtn.textContent = 'Sorry, trailer is not found';
//           }
//     };

// export default class WatchTrailer {
//     constructor(trailerId, trailerTitle) {
//         this.trailerId = trailerId;
//         this.trailerTitle = trailerTitle;
//     }
    
//     async fetchTrailer() {
//         const movieId = await movieTrailer(this.trailerTitle, {
//             id: true,
//             api_base_url: API_BASE_URL,
//             api_key: KEY,
//             trailerId: this.trailerId,
//         });
//         if (movieId !== null) {
//             return movieId;
//         }
//     }
    
//     templateMovieTrailer(movieId) {
//         if (movieId !== undefined) {
//             return `<iframe class="movie-trailer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/${movieId}?autoplay=1" frameborder="0" allow="autoplay; fullscreen"></iframe>`
//         }
//         else {
//       const trailerBtn = document.querySelector('.js-trailer-btn');
//             trailerBtn.textContent = 'Sorry, trailer is not found';
//     }
//     }
    
//     lightboxTrailer(markup) {
//         return basicLightbox.create(markup).show();
//     }

//     showTrailer() {
//         this.fetchTrailer().then(this.templateMovieTrailer).then(this.lightboxTrailer);
//     }

// }