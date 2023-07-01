export function ListOfMovies({ movies }) {
  return (
    <>
      <ul className='movies'>
        {movies.map((movie) => (
          <li className='movie' key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} />
          </li>
        ))}
      </ul>
    </>
  );
}

export function NoMoviesResults() {
  return <p>No movies were Found</p>;
}

export function Movies({ movies, isFirstInput }) {
  const hasMovies = movies?.length > 0;

  if (isFirstInput.current) return <h2>Start Searching Movies Right Now!</h2>;

  return hasMovies ? (
    <ListOfMovies movies={movies} />
  ) : (
    <NoMoviesResults></NoMoviesResults>
  );
}
