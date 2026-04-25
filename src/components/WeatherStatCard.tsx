import React from "react";
import type { CurrentWeather } from "../types/weather";
import InfoCard from "./InfoCard";

type WeatherStatCardProps = {
  currentWeather: CurrentWeather;
}
const WeatherStatCard: React.FC<WeatherStatCardProps> = ({ currentWeather }) => {
  const stats = [
    {label: 'Feels like', value: currentWeather?.feelsLike},
    {label: 'Humidity', value: currentWeather?.humidity},
    {label: 'Wind', value: currentWeather?.wind},
    {label: 'Precipitation', value: currentWeather?.precipitation},
  ];
  // console.log(currentWeather)

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {stats.map((stat) => (
        <InfoCard key={stat.label}>
          <p className="text-xs opacity-80">{stat.label}</p>
          <div className="mt-2 flex items-center gap-2">
            <h3 className="text-lg">{stat.value}</h3>
          </div>
          
        </InfoCard>
      ))}
    </div>
  )
}

export default WeatherStatCard;