import React from 'react';

import Logo from '../assets/images/logo.svg';
import SearchBar from './SearchBar';
import UnitsSelector from './UnitsSelector';

import './WeatherPage.css';

const WeatherPage: React.FC = () => {
  return (
    <>
    {/* <div className="bg-blue-500 text-white p-4">Hello Tailwind!</div>.     */}
      <nav>
        <img src={Logo} alt="Weather App Logo" />
        <UnitsSelector />
      </nav>
      <div className="WeatherPage-greetings">
        <h1>How's the sky looking today?</h1>
      </div>
      <SearchBar />
    </>
  );
};

export default WeatherPage;