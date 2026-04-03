import { useState } from "react";
import "./App.css";
import GetAllMovie from "./MovieApi";

function App() {
  type Movie = {
    title: string;
    poster: string;
  };
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);

  async function handleSearch(name: string) {
    const movies = await GetAllMovie(name); // type Array
    setMovieList(movies);
  }

  return (
    <>
      <h1>Movie Search</h1>
      <p>Search for a movie</p>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        name="movieInput"
      />
      <button onClick={() => handleSearch(search)}>Search</button>
      {movieList &&
        movieList.map((value, index) => (
          <div key={index}>
            <h3>{value.title}</h3>
            <img src={`https://image.tmdb.org/t/p/w200${value.poster}`} />
          </div>
        ))}
    </>
  );
}

export default App;
