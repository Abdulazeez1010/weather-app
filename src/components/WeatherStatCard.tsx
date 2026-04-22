import React from "react";
import type { CurrentWeather } from "./WeatherPage";

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
        <div
          key={stat.label}
          className="rounded-xl bg-[hsl(243,27%,20%)] p-4 text-white"
        >
          <p className="text-sm opacity-80">{stat.label}</p>
          <h3 className="mt-2 text-lg font-semibold">{stat.value}</h3>
        </div>
      ))}
    </div>
  )
}

export default WeatherStatCard;