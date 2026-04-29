import React, { useEffect, useState } from 'react';

import Logo from '../assets/images/logo.svg';
import SearchBar from './SearchBar';
import UnitsSelector from './UnitsSelector';
import WeatherStatCard from './WeatherStatCard.tsx';
import DailyForecastCard from './DailyForecastCard.tsx';
import HourlyForecastCard from './HourlyForecastCard.tsx';
import InfoCard from './InfoCard.tsx';
import ErrorState from './ErrorState.tsx';

import BgTodayLarge from '../assets/images/bg-today-large.svg';
import { weatherIcons } from '../utils/weatherIcons.ts';

import type {
  CurrentWeather,
  DailyForecastItem,
  HourlyForecastItem,
  WeatherCondition,
  UnitsState,
} from '../types/weather'

import './WeatherPage.css';

const mapWeatherCodeToCondition = (code: number): WeatherCondition => {
  if (code === 0) return 'sunny';
  if ([1, 2, 3].includes(code)) return 'cloudy';
  if ([45, 48].includes(code)) return 'fog';
  if ([51, 53, 55].includes(code)) return 'drizzle';
  if ([61, 63, 65, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'storm';

  return 'cloudy';
};

const WeatherPage: React.FC = () => {

  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<null | {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  }>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [weatherData, setWeatherData] = useState<null | {
    current: CurrentWeather;
    daily: DailyForecastItem[];
    hourly: HourlyForecastItem[];
  }>(null);

  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  const [selectedDay, setSelectedDay] = useState('');

  const [units, setUnits] = useState<UnitsState>({
    temperature: 'celsius',
    windspeed: 'kmh',
    precipitation: 'mm',
  });

  const temperatureSymbol = units.temperature === 'celsius' ? '°C' : '°F';
  const windUnitLabel = units.windspeed === 'kmh' ? 'km/h' : 'mph';
  const precipitationUnitLabel = units.precipitation === 'mm' ? 'mm' : 'in';

  const mapWeatherData = (
    data: any,
    location: {name: string; country: string}
  ): {
    current: CurrentWeather;
    daily: DailyForecastItem[];
    hourly: HourlyForecastItem[];
  } => {
    const current: CurrentWeather = {
      city: location.name,
      country: location.country,
      date: new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
      temp: `${Math.round(data.current.temperature_2m)}${temperatureSymbol}`,
      feelsLike: `${Math.round(data.current.apparent_temperature)}${temperatureSymbol}`,
      humidity: `${data.current.relative_humidity_2m}%`,
      wind: `${Math.round(data.current.wind_speed_10m)} ${windUnitLabel}`,
      precipitation: `${data.current.precipitation} ${precipitationUnitLabel}`,
      condition: mapWeatherCodeToCondition(data.current.weather_code),
    };

    const daily: DailyForecastItem[] = data.daily.time.map(
      (day: string, index: number) => ({
        date: day,
        day: new Date(day).toLocaleDateString('en-GB', {weekday: 'short'}),
        fullDay: new Date(day).toLocaleDateString('en-GB', {weekday: 'long'}),
        condition: mapWeatherCodeToCondition(data.daily.weather_code[index]),
        high: `${Math.round(data.daily.temperature_2m_max[index])}${temperatureSymbol}`,
        low: `${Math.round(data.daily.temperature_2m_min[index])}${temperatureSymbol}`,
      })
    );

    const hourly: HourlyForecastItem[] = data.hourly.time.map(
      (time: string, index: number) => ({
        date: time.split('T')[0],
        dateTime: time,
        hour: new Date(time).toLocaleTimeString('en-GB', {
          hour: 'numeric',
          hour12: true,
        }).toUpperCase(),
        condition: mapWeatherCodeToCondition(data.hourly.weather_code[index]),
        temp: `${Math.round(data.hourly.temperature_2m[index])}${temperatureSymbol}`,
      }));
    
    return {current, daily, hourly};
  };


  const fetchWeather = async (
    latitude: number,
    longitude: number,
    location: {name: string; country: string}
  ) => {
    try {
      setIsLoadingWeather(true);
      setWeatherError('');

      const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: [
          'temperature_2m',
          'apparent_temperature',
          'relative_humidity_2m',
          'precipitation',
          'weather_code',
          'wind_speed_10m',
        ].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
        ].join(','),
        hourly: [
          'temperature_2m',
          'weather_code',
        ].join(','),
        forecast_days: '7',
        timezone: 'auto',
        temperature_unit: units.temperature,
        wind_speed_unit: units.windspeed,
        precipitation_unit: units.precipitation,
      });

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`
      );

      // const response = await fetch(
      //   `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code,temperature_2m&current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&past_days=0&forecast_days=7`
      // );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      
      // console.log(data);
      if (!selectedLocation) return;

      const mapped = mapWeatherData(data, location);

      setWeatherData(mapped);
      // console.log(mapped);

    } catch (error) {
      setWeatherError('Unable to load weather data.');
      console.log(error);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const handleSearch = async () => {
    const trimmed = query.trim();

    if (!trimmed) return;

    try {
      setIsSearching(true);
      setSearchError('');
      setWeatherError('');
      setWeatherData(null);
      setSelectedDay('');

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=1&language=en&format=json`
      );

      if (!response.ok) {
        throw new Error('Failed to search location')
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setSelectedLocation(null);
        setWeatherData(null);
        setSelectedDay('');
        setWeatherError('');
        setSearchError('No search result found!');
        return;
      }

      const location = data.results[0];

      setSelectedLocation({
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch (error) {
      setSearchError('Something went wrong while searching.');
      // console.log(error);
      setSelectedLocation(null);
      setWeatherData(null);
      setSelectedDay('');
      setWeatherError('');
    } finally {
      setIsSearching(false);
    }
  };

  const handleRetryWeather = () => {
    if (!selectedLocation) return;

    fetchWeather(selectedLocation.latitude, selectedLocation.longitude, {
      name: selectedLocation.name,
      country: selectedLocation.country,
    });
  };


  useEffect(() => {
    if (!selectedLocation) return;

    fetchWeather(
      selectedLocation.latitude,
      selectedLocation.longitude,
      {
        name: selectedLocation.name,
        country: selectedLocation.country,
      }
    );
  }, [selectedLocation, units]);

  useEffect(() => {
    if (!weatherData?.daily.length) return;
    setSelectedDay(weatherData.daily[0].date);
  }, [weatherData])

  const currentWeather = weatherData?.current;
  const dailyForecast = weatherData?.daily ?? [];
  const hourlyForecast = weatherData?.hourly ?? [];

  // const dayHourlyForecast = hourlyForecast.filter(
  //   (item) => item.date === selectedDay
  // );

  const getVisibleHourlyForecast = () => {
    const dayHourlyForecast = hourlyForecast.filter(
      (item) => item.date === selectedDay
    );

    if (!dayHourlyForecast.length) return [];

    const today = new Date().toISOString().split('T')[0];

    if (selectedDay !== today) {
      return dayHourlyForecast.slice(0, 8);
    }

    const now = new Date();

    const startIndex = dayHourlyForecast.findIndex((item) => {
      const itemDate = new Date(item.dateTime);
      return itemDate >= now;
    });

    if (startIndex === -1) {
      return dayHourlyForecast.slice(-8);
    }

    return dayHourlyForecast.slice(startIndex, startIndex + 8);
  }

  const visibleHourlyForecast = getVisibleHourlyForecast();

  // if (weatherError && selectedLocation){
  //   return (
  //     <ErrorState
  //       title="Something went wrong"
  //       message="We couldn't connect to the server (API error). Please try again in a few moments."
  //       actionLabel="Retry"
  //       onAction={handleRetryWeather}
  //     />
  //   )
  // }
  return (
    <div className='p-4 md:p-6 lg:px-20'>
      <nav className="flex items-center justify-between p-4">
        <img src={Logo} alt="Weather App Logo" />

        <UnitsSelector units={units} onUnitsChange={setUnits} />
      </nav>
      <header className="m-10 text-center text-4xl text-white ">
        <h1>How&apos;s the sky looking today?</h1>
      </header>

      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        isSearching={isSearching}
      />

      {searchError && (
        <p className='mt-6 font-semibold text-white text-center'>
          {searchError}
        </p>
      )}
      {/* {weatherError && <p className='mt-6 font-semibold text-white text-center'>{weatherError}</p>} */}
      {isLoadingWeather ? (
        <p className='mt-6 text-white'>
          Loading weather...
        </p>
      ) : weatherError && selectedLocation ? (
        <div className='mt-16 flex justify-center'>
          <ErrorState
            title="Something went wrong"
            message="We couldn't connect to the server (API error). Please try again in a few moments."
            actionLabel="Retry"
            onAction={handleRetryWeather}
          />
        </div>
      ) : currentWeather ? (
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
                  {/* <p className='text-lg font-bold opacity-80'>{currentWeather.city}, {currentWeather.country}</p> */}
                  <p className='text-lg font-bold opacity-80'>{currentWeather?.city}, {currentWeather?.country}</p>
                  <p className='text-xs opacity-70'>{currentWeather?.date}</p>
                </div>
                <div className='flex items-center'>
                  <img
                    src={weatherIcons[currentWeather.condition]}
                    alt={currentWeather.condition}
                    className='w-20 h-20'
                  />
                  <h2 className='text-5xl font-semibold leading-none italic'>
                    {currentWeather?.temp}
                  </h2>
                </div>
              </div>
              
            </InfoCard>

            <WeatherStatCard currentWeather={currentWeather} />
            <DailyForecastCard dailyForecast={dailyForecast} />
          </div>

          {/* Hourly forecast grid */}
          <InfoCard className="grid">
            <div className='flex items-center justify-between gap-4 p-4'>
              <h3 className='text-sm font-semibold'>Hourly forecast</h3>
              <select
                value={selectedDay}
                onChange={(event) => setSelectedDay(event.target.value)}
                className="rounded bg-[hsl(243,27%,30%)] p-2 text-white"
              >
                {dailyForecast.map((day) => (
                  <option key={day.date} value={day.date}>
                    {day.fullDay}
                  </option>
                ))}
              </select>
            </div>

            <HourlyForecastCard hourlyForecast={visibleHourlyForecast} />
          </InfoCard>
        </section>
      ) : null}
    </div>
  );
};

export default WeatherPage;