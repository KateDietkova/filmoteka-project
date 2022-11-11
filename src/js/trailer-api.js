import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const KEY = 'api_key=579a7483bae7d6a5a25eb4c1ddded2cf';

export async function getTrailer(movieId) {
  try {
    return await axios.get(
      `movie/${movieId}/videos?api_key=${KEY}&language=en-US`
    );
  } catch (error) {
    console.log(error);
  }
}