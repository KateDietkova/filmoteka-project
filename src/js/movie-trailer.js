const movieTrailer = require('movie-trailer');
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getTrailer } from './trailer-api';

const KEY = 'api_key=579a7483bae7d6a5a25eb4c1ddded2cf';

export default class WatchTrailer {
    constructor(trailerId, trailerTitle) {
        this.trailerId = trailerId;
        this.trailerTitle = trailerTitle;
    }
    
    async fetchTrailer() {
        const movieId = await movieTrailer(getTrailer(this.trailerId), {
            id: true,
            api_key: KEY,
            trailerTitle: this.trailerTitle,
        });
        if (movieId !== null) {
      return movieId;
    }
    }
    
    templateMovieTrailer(movieId) {
        if (movieId !== undefined) {
            return `<iframe class="movie-trailer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/${movieId}?autoplay=1" frameborder="0" allow="autoplay; fullscreen"></iframe>`
        }
        else {
      const trailerBtn = document.querySelector('.js-trailer-btn');
            trailerBtn.textContent = 'Sorry, trailer is not found';
    }
    }
    
    lightboxTrailer(markup) {
        return basicLightbox.create(markup).show();
    }

    showTrailer() {
        this.fetchTrailer().then(this.templateMovieTrailer).then(this.lightboxTrailer);
    }

}


