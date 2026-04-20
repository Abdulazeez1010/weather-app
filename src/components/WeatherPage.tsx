import React from 'react';

import SearchBar from './SearchBar';

import './WeatherPage.css';

const WeatherPage: React.FC = () => {
  return (
    <>
      <div className="WeatherPage-greetings">
        <h1>How's the sky looking today?</h1>
      </div>
      <SearchBar />
    </>
  );
};

export default WeatherPage;