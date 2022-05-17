import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // promise
  /*function fetcMoiesHandler() {
    fetch("https://swapi.py4e.com/api/films")
      .then((response) => response.json())
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return{
            id:movieData.episode_id,
            title:movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate:movieData.release_date
          }
        });
        setMovies(transformedMovies);
      });
  }*/

  console.log("a");

  // async away
  //with useCallback we ensure that this fetch movie's handler function  is not recreated unnecessarily
  const fetcMoviesHandler = useCallback(async () => {
    console.log("c");

    setIsLoading(true);
    //reset error
    setError(null);

    try {
      const response = await fetch("https://react-http-76b5e-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {
        throw new Error("Somenthing went wrong");
      }
      const data = await response.json();

      const loadedMovies = []

      for (const key in data ){
        loadedMovies.push({
           id:key,
           title:data[key].title,
           openingText: data[key].openingText,
           releaseData: data[key].releaseData
        })
      }

      
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("b");
    fetcMoviesHandler();
  }, [fetcMoviesHandler]);

  async function addMovieHandler(movie){
    const response = await fetch('https://react-http-76b5e-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    const data = await response.json();
    console.log(data)
  }
 

  let content = <p>Found no movies</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading.....</p>;
  }

  return (
    <React.Fragment>
    <section><AddMovie onAddMovie={addMovieHandler} /> </section>
      <section>
        <button onClick={fetcMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/*{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading.....</p>}*/}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
