import React from 'react'
import type { DailyForecastItem } from '../types/weather';
import InfoCard from './InfoCard';
import { weatherIcons } from '../utils/weatherIcons';

type DailyForecastCardProps = {
  dailyForecast: DailyForecastItem[];
};

const DailyForecastCard: React.FC<DailyForecastCardProps> = ({ dailyForecast }) => {
  return (
    <div>
      <h3 className='text-sm font-semibold text-white'>Daily forecast</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
        {dailyForecast.map((day) => (
          <InfoCard key={day.day} className='text-center'>
            <p className='text-xs opacity-80'>{day.day}</p>
            <img
              src={weatherIcons[day.condition]}
              alt={day.condition}
              className='mx-auto my-3 h-10 w-10'
            />
            <div className='flex items-center justify-between gap-2'>
              <span className='text-xs'>{day.high}</span>
              <span className='opacity-70 text-xs'>{day.low}</span>
            </div>
          </InfoCard>
        ))}
      </div>
    </div>
    
  )
}

export default DailyForecastCard;