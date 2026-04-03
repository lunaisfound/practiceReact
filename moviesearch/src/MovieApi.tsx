async function GetMovie(name: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWQ4ZTcxZWYwNDA3ODUzYzBmODZkNWFkNmVmODYyOSIsIm5iZiI6MTc3NDQ4NDM3OC4zMjMsInN1YiI6IjY5YzQ3YjlhZWYwZDIzZGI4MjE0NjJmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rDDDqphDIsw2CsDRIy-QaqBIJhUyj6EDyCjZudcDLFQ",
    },
  };

  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,
    options,
  );
  const data = await movieResponse.json();
  const movieList = data.results;
  return movieList;
}

async function GetAllMovie(name: string) {
  const results = await GetMovie(name);
  const movieOptions = results.map((value) => ({
  title: value.original_title,
  poster: value.poster_path,
}));
  return movieOptions;
}

export default GetAllMovie;
