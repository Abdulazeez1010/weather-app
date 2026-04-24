import React from 'react'
import type { DailyForecastItem } from '../types/weather';
import InfoCard from './InfoCard';

type DailyForecastCardProps = {
  dailyForecast: DailyForecastItem[];
};

const DailyForecastCard: React.FC<DailyForecastCardProps> = ({ dailyForecast }) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
      {dailyForecast.map((day) => (
        <InfoCard key={day.day} className='text-center'>
          <p className='text-xs opacity-80'>{day.day}</p>
          <h3 className='mt-2 text-lg'>{day.temp}</h3>
        </InfoCard>
      ))}
    </div>
  )
}

export default DailyForecastCard;