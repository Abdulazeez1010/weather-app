import React from 'react';

import SearchIcon from '../assets/images/icon-search.svg';

import './SearchBar.css';

type SearchBarProps = {
    query: string;
    onQueryChange: (value: string) => void;
    onSearch: () => void;
    isSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onSearch,
  isSearching,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch();
  };

    return (
      <div className='flex justify-center text-white'>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <div className='relative w-full sm:w-auto'>
            <img
              src={SearchIcon}
              alt=""
              className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2'
            />
            <input
              type="text"
              name={query}
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search for a place..."
              className="h-11 w-full rounded-lg bg-[hsl(243,27%,20%)] px-4 pl-11 sm:w-75"
            />
          </div>
          
          <button
            type='submit'
            disabled={isSearching}
            className="h-11 w-full rounded-lg px-4 bg-[hsl(233,67%,56%)] px-4 text-white disabled:opacity-70 sm:w-auto"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
    )
}

export default SearchBar;