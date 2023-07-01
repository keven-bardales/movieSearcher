import { useState, useEffect, useRef } from 'react';

export function useSearch() {
  const [search, setsearch] = useState('');
  const [error, seterror] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === '') {
      seterror('Empty field');
      return;
    }

    if (search.match(/^\d+$/)) {
      seterror('You cannot find a movie with a number');
      return;
    }

    if (search.length < 3) {
      seterror('The search length should be longer than 3');
      return;
    }

    seterror(null);
  }, [search]);

  return { search, setsearch, error, isFirstInput };
}
