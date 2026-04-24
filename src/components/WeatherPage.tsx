import React from 'react';

import Logo from '../assets/images/logo.svg';
import SearchBar from './SearchBar';
import UnitsSelector from './UnitsSelector';
import WeatherStatCard from './WeatherStatCard.tsx';
import DailyForecastCard from './DailyForecastCard.tsx';
import HourlyForecastCard from './HourlyForecastCard.tsx';
import InfoCard from './InfoCard.tsx';

import BgTodayLarge from '../assets/images/bg-today-large.svg';
import { weatherIcons } from '../utils/weatherIcons.ts';

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
    temp: '29°',
    feelsLike: '31°',
    humidity: '84%',
    wind: '12 mph',
    precipitation: '20 in',
  };

  const dailyForecast: DailyForecastItem[] = [
    {day: 'Sun', condition: 'sunny', high: '28°', low: '20°'},
    {day: 'Mon', condition: 'sunny', high: '28°', low: '21°'},
    {day: 'Tue', condition: 'sunny', high: '27°', low: '22°'},
    {day: 'Wed', condition: 'sunny', high: '30°', low: '23°'},
    {day: 'Thu', condition: 'sunny', high: '29°', low: '24°'},
    {day: 'Fri', condition: 'sunny', high: '32°', low: '25°'},
    {day: 'Sat', condition: 'sunny', high: '30°', low: '26°'},
  ]

  const hourlyForecast: HourlyForecastItem[] = [
    {hour: '3 PM', condition:'sunny', temp: '34°'},
    {hour: '4 PM', condition:'sunny', temp: '34°'},
    {hour: '5 PM', condition:'sunny', temp: '35°'},
    {hour: '6 PM', condition:'sunny', temp: '36°'},
    {hour: '7 PM', condition:'sunny', temp: '36°'},
    {hour: '8 PM', condition:'sunny', temp: '37°'},
    {hour: '9 PM', condition:'sunny', temp: '38°'},
    {hour: '10 PM', condition:'sunny', temp: '38°'},
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
              <div className='flex items-center'>
                <img src={weatherIcons.sunny} alt="sunny icon" className='w-20 h-20'/>
                <h2 className='text-5xl font-semibold leading-none italic'>{currentWeather.temp}</h2>
              </div>
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