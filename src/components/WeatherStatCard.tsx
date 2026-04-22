import React from "react";
import type { CurrentWeather } from "../types/weather";
import InfoCard from "./InfoCard";

type WeatherStatCardProps = {
  currentWeather: CurrentWeather;
}
const WeatherStatCard: React.FC<WeatherStatCardProps> = ({ currentWeather }) => {
  const stats = [
    {label: 'Feels like', value: currentWeather.feelsLike},
    {label: 'Humidity', value: currentWeather.humidity},
    {label: 'Wind', value: currentWeather.wind},
    {label: 'Precipitation', value: currentWeather.precipitation},
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {stats.map((stat) => (
        <InfoCard key={stat.label}>
          <p className="text-sm opacity-80">{stat.label}</p>
          <h3 className="mt-2 text-lg font-semibold">{stat.value}</h3>
        </InfoCard>
      ))}
    </div>
  )
}

export default WeatherStatCard;