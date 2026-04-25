import React from 'react';
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
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            name={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search for a place..."
            className="h-11 flex-1 rounded-lg px-4 w-75 bg-[hsl(243,27%,20%)]"
          />
          <button
            type='submit'
            disabled={isSearching}
            className="h-11 rounded-lg px-4 bg-[hsl(233,67%,56%)] text-white"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
    )
}

export default SearchBar;