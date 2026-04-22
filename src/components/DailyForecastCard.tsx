import React from 'react'
import type { DailyForecastItem } from './WeatherPage';

type DailyForecastCardProps = {
  dailyForecast: DailyForecastItem[];
};

const DailyForecastCard: React.FC<DailyForecastCardProps> = ({ dailyForecast }) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
      {dailyForecast.map((day) => (
        <div
          key={day.day}
          className="rounded-xl bg-[hsl(243,27%,20%)] p-4 text-center text-white"
        >
          <p className='text-sm opacity-80'>{day.day}</p>
          <h3 className='mt-2 text-lg font-semibold'>{day.temp}</h3>
        </div>
      ))}
    </div>
  )
}

export default DailyForecastCard;