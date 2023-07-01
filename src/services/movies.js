import noResults from '../mocks/no_results.json';

export const BASE_URL = `http://www.omdbapi.com/?apikey=9c2e1a9b&s=`;

export const getMoviesRequest = async (search) => {
  if (search == '') return null;
  try {
    if (search) {
      const response = await fetch(`${BASE_URL}${search}`);

      const movies = await response.json();
      const mappedMovies = movies.Search?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      }));

      return mappedMovies;
    }
  } catch (error) {
    throw new Error('Error Searching movies');
  }
};

export const getMoviesWithFetch = async ({ search }) => {
  if (search) {
    // setresponseMovies(data);
    return fetch(`http://www.omdbapi.com/?apikey=9c2e1a9b&s=${search}`).then(
      (response) =>
        response.json().then((json) => {
          return json;
        })
    );
  } else {
    return noResults;
  }
};
