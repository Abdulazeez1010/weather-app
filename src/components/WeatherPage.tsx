import React from 'react';

import Logo from '../assets/images/logo.svg';
import SearchBar from './SearchBar';
import UnitsSelector from './UnitsSelector';

import './WeatherPage.css';

const WeatherPage: React.FC = () => {

  const currentWeather = {
    country: 'Nigeria',
    city: 'Ibadan',
    date: 'Tuesday, 21 April',
    temp: '29°C',
    feelsLike: '31°C',
    humidity: '84%',
    wind: '12 km/h',
    precipitation: '20%',
  };

  const dailyForecast = [
    {day: 'Sun', temp: 20},
    {day: 'Mon', temp: 21},
    {day: 'Tue', temp: 22},
    {day: 'Wed', temp: 23},
    {day: 'Thu', temp: 24},
    {day: 'Fri', temp: 25},
    {day: 'Sat', temp: 26},
  ]

  const hourlyForecast = [
    {hour: '3 PM', temp: 34},
    {hour: '4 PM', temp: 34},
    {hour: '5 PM', temp: 35},
    {hour: '6 PM', temp: 36},
    {hour: '7 PM', temp: 36},
    {hour: '8 PM', temp: 37},
    {hour: '9 PM', temp: 38},
    {hour: '10 PM', temp: 38},
  ]

  return (
    <>
    {/* <div className="bg-blue-500 text-white p-4">Hello Tailwind!</div>.     */}
      <nav className="flex items-center justify-between p-4">
        <img src={Logo} alt="Weather App Logo" />
        <UnitsSelector />
      </nav>
      <header className="text-white text-4xl text-center m-10">
        <h1>How's the sky looking today?</h1>
      </header>

      <SearchBar />

      <section className="flex gap-4 mt-4">
        {/* Main weather grid */}
        <div className="grid gap-6">
          <div className='bg-blue-500 rounded-2xl p-6 text-center text-white'>
            <p>{currentWeather.city}, {currentWeather.country}</p>
            <p>{currentWeather.date}</p>
            <h2>{currentWeather.temp}</h2>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <div className="rounded-xl p-4 bg-[hsl(243,27%,20%)] text-white">
              <p>Feels like</p>
              <h3>28°C</h3>
            </div>
            <div className="rounded-xl p-4 bg-[hsl(243,27%,20%)] text-white">
              <p>Humidity</p>
              <h3>75%</h3>
            </div>
            <div className="rounded-xl p-4 bg-[hsl(243,27%,20%)] text-white">
              <p>Wind</p>
              <h3>10 km/h</h3>
            </div>
            <div className="rounded-xl p-4 bg-[hsl(243,27%,20%)] text-white">
              <p>Precipitation</p>
              <h3>20%</h3>
            </div>
          </div>
          <div className='grid grid-cols-7 gap-2'>
            {dailyForecast.map((day) => (
              <div key={day.day} className="rounded-xl p-4 text-center bg-[hsl(243,27%,20%)] text-white">
                <p>{day.day}</p>
                <h3>{day.temp}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly forecast grid */}
        <div className="grid rounded-xl bg-[hsl(243,27%,20%)] text-white">
          <div className='flex justify-between items-center p-4 gap-4'>
            <h3>Hourly forecast</h3>
            <select className="bg-[hsl(243,27%,30%)] text-white rounded p-2">
              <option value="sun">Sunday</option>
              <option value="mon">Monday</option>
              <option value="tue">Tuesday</option>
              <option value="wed">Wednesday</option>
              <option value="thu">Thursday</option>
              <option value="fri">Friday</option>
              <option value="sat">Saturday</option>
            </select>
          </div>
          <div className="grid">
            {hourlyForecast.map((time) => (
              <div className="flex justify-between px-4 bg-[hsl(243,27%,30%)] rounded m-1">
              <span>{time.hour}</span>
              <span>{time.temp}</span>
            </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WeatherPage;