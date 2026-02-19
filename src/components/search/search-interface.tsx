import {useState, useCallback} from 'react';
import SearchResultsView from './search-results-view.tsx';
import SearchForm from './search-form.tsx';
import './search-interface.scss'

export default function SeachInterface() {
  const name: string = "search-interface";
  const [query, setQuery] = useState(null);
  const setQueryCallback = useCallback(
    (queryJSON) => {
      setQuery(queryJSON);
    }, [setQuery]);
  if (query == null) {
    return (
      <div className={name}>
        <SearchForm setQueryCallback={setQueryCallback} />
      </div>
    );
  } else {
    return (
      <div className={name}>
        <SearchForm setQueryCallback={setQueryCallback} />
        <SearchResultsView query={query} setQueryCallback={setQueryCallback} />
      </div>
    );
  }
}
