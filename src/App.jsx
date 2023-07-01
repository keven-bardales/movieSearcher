import './App.css';
import { useCallback, useState } from 'react';
import { Movies } from './Components/Movies';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import debounce from 'just-debounce-it';

function App() {
  const [sort, setsort] = useState(false);
  const { search, setsearch, error, isFirstInput } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debouncedMovies = useCallback(
    debounce((search) => {
      getMovies({ search: search });
    }),
    [getMovies]
  );

  const handleSort = () => {
    setsort(!sort);
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    if (newQuery.startsWith(' ')) return;
    setsearch(newQuery);
    debouncedMovies(newQuery);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies(search);
  };

  return (
    <>
      <section className='page'>
        <header>
          <h1>Movie Searcher</h1>
          <form className='form' onSubmit={handleSubmit}>
            <label htmlFor='searchMovie'></label>
            <input
              onChange={handleChange}
              value={search}
              name='search'
              placeholder='Avengers, Matrix...'
            ></input>
            <input type='checkbox' onChange={handleSort} checked={sort} />

            <button type='submit'>Search</button>
          </form>
          {error && <p className='error'>{error}</p>}
        </header>

        <main>
          {loading ? (
            'Loading...'
          ) : (
            <Movies isFirstInput={isFirstInput} movies={movies}></Movies>
          )}
        </main>
        <footer>Footer goes here</footer>
      </section>
    </>
  );
}

export default App;

/**+
 * FORMA NO CONTROLADA POR REACT DE CONTROLAR EL FORMULARIO USANDO EL DOM DIRECTAMENTE
 *   const handleSubmit = (e) => {
    e.preventDefault();
      const inputEl = inputRef.current;
    const value = inputEl.value;
    console.log(value); 
    const data = new window.FormData(e.target); // we get the values in a new formData
     let query = data.get('query'); // we can use the method get of formData to get the value of query or any other key in the formdata
    const formValues = Object.fromEntries(data); // we convert the form data using the Object.fromEntries method in order to use them as an accessible object
    const { query } = formValues;
  
 * 
 */
