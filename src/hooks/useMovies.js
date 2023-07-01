import { useRef, useState, useMemo, useCallback } from 'react';
import { getMoviesRequest } from '../services/movies';

export function useMovies({ search, sort }) {
  const [movies, setmovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const prevSearchRef = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    try {
      if (search === prevSearchRef.current) return;
      setloading(true);
      seterror(null);
      prevSearchRef.current = search;
      const newMovies = await getMoviesRequest(search);
      setmovies(newMovies);
    } catch (e) {
      seterror(e.message);
    } finally {
      setloading(false);
    }
  }, []);
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);
  return { movies: sortedMovies, getMovies, loading };
}
