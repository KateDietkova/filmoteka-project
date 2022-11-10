 

export async function getMovie(pageNum) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=579a7483bae7d6a5a25eb4c1ddded2cf&page=${pageNum}`
  );
  const responseInfo = await resp.json();
  const movies = responseInfo.results;
  console.log(responseInfo);
  return { responseInfo, movies };
}