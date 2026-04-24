import React from 'react';

import Logo from '../assets/images/logo.svg';
import SearchBar from './SearchBar';
import UnitsSelector from './UnitsSelector';
import WeatherStatCard from './WeatherStatCard.tsx';
import DailyForecastCard from './DailyForecastCard.tsx';
import HourlyForecastCard from './HourlyForecastCard.tsx';
import InfoCard from './InfoCard.tsx';

import BgTodayLarge from '../assets/images/bg-today-large.svg';

import type {
  CurrentWeather,
  DailyForecastItem,
  HourlyForecastItem,
} from '../types/weather'

import './WeatherPage.css';

const WeatherPage: React.FC = () => {

  const currentWeather: CurrentWeather = {
    country: 'Nigeria',
    city: 'Ibadan',
    date: 'Tuesday, 21 April',
    temp: '29°C',
    feelsLike: '31°C',
    humidity: '84%',
    wind: '12 km/h',
    precipitation: '20%',
  };

  const dailyForecast: DailyForecastItem[] = [
    {day: 'Sun', temp: '20°C'},
    {day: 'Mon', temp: '21°C'},
    {day: 'Tue', temp: '22°C'},
    {day: 'Wed', temp: '23°C'},
    {day: 'Thu', temp: '24°C'},
    {day: 'Fri', temp: '25°C'},
    {day: 'Sat', temp: '26°C'},
  ]

  const hourlyForecast: HourlyForecastItem[] = [
    {hour: '3 PM', temp: '34°C'},
    {hour: '4 PM', temp: '34°C'},
    {hour: '5 PM', temp: '35°C'},
    {hour: '6 PM', temp: '36°C'},
    {hour: '7 PM', temp: '36°C'},
    {hour: '8 PM', temp: '37°C'},
    {hour: '9 PM', temp: '38°C'},
    {hour: '10 PM', temp: '38°C'},
  ]

  return (
    <div className='p-4 md:p-6 lg:px-20'>
      <nav className="flex items-center justify-between p-4">
        <img src={Logo} alt="Weather App Logo" />
        <UnitsSelector />
      </nav>
      <header className="m-10 text-center text-4xl text-white ">
        <h1>How&apos;s the sky looking today?</h1>
      </header>

      <SearchBar />

      <section className="mt-4 grid gap-6 lg:grid-cols-[2fr_1fr]">

        {/* Main weather grid */}
        <div className="grid gap-6">
          <InfoCard className='relative overflow-hidden text-center text-white'>
            <img
              src={BgTodayLarge}
              alt=""
              className='absolute inset-0 h-full w-full object-cover'
            />
            <div className='relative z-10 flex items-start justify-between py-16 px-2'>
              <div>
                <p className='text-lg font-bold opacity-80'>{currentWeather.city}, {currentWeather.country}</p>
                <p className='text-xs opacity-70'>{currentWeather.date}</p>
              </div>
              <h2 className='text-4xl font-semibold leading-none'>{currentWeather.temp}</h2>
            </div>
            
          </InfoCard>

          <WeatherStatCard currentWeather={currentWeather} />
          <DailyForecastCard dailyForecast={dailyForecast} />
        </div>

        {/* Hourly forecast grid */}
        <InfoCard className="grid">
          <div className='flex items-center justify-between gap-4 p-4'>
            <h3 className='text-lg font-semibold'>Hourly forecast</h3>
            <select className="rounded bg-[hsl(243,27%,30%)] p-2 text-white">
              <option value="sun">Sunday</option>
              <option value="mon">Monday</option>
              <option value="tue">Tuesday</option>
              <option value="wed">Wednesday</option>
              <option value="thu">Thursday</option>
              <option value="fri">Friday</option>
              <option value="sat">Saturday</option>
            </select>
          </div>

          <HourlyForecastCard hourlyForecast={hourlyForecast} />
        </InfoCard>
      </section>
    </div>
  );
};

export default WeatherPage;