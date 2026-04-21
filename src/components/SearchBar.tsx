import React from 'react';
import './SearchBar.css'

const SearchBar: React.FC = () => {
    return (
      <div className='flex justify-center text-white'>
        <form action="search">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for a place..."
            className="h-10 rounded-lg px-4 w-75 bg-[hsl(243,27%,20%)]"
          />
          <button
            type='submit'
            className="h-10 rounded-lg bg-[hsl(233,67%,56%)] px-4 ml-4 text-white"
          >
            Search
          </button>
        </form>
      </div>
    )
}

export default SearchBar;