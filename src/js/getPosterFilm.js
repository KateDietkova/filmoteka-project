import noposter from '../images/filmsPoster/noposter.jpg'
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500'
export function getPosterFilm(posterPath) {
    if (!posterPath) {
        return `${noposter}`;
    }
    return `${BASE_IMG_URL}/${posterPath}`;
}