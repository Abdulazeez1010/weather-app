import React from 'react';

const SearchBar: React.FC = () => {
    return (
        <div>
        <form action="search">
          <input type="text" name="" id="" placeholder="Search for a place"/>
          <button type='submit'>Search</button>
        </form>
      </div>
    )
}

export default SearchBar;