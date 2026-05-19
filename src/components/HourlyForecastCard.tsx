import React from "react";
import type { HourlyForecastItem } from "../types/weather";
import InfoCard from "./InfoCard";
import { weatherIcons } from "../utils/weatherIcons";

type HourlyForecastCardProps = {
  hourlyForecast: HourlyForecastItem[];
};

const HourlyForecastCard: React.FC <HourlyForecastCardProps> = ({ hourlyForecast }) => {
	return (
		<div className="grid gap-2 md:p-2">
			{hourlyForecast.map((time) => (
				<InfoCard 
					key={time.hour}
					className="flex items-center justify-between rounded-sm bg-[hsl(243,27%,30%)] px-3 py-2"
				>
					<div className="flex items-center gap-2">
						<img
							src={weatherIcons[time.condition]}
							alt={time.condition}
							className="h-6 w-6"
						/>
						<span className="text-sm">{time.hour}</span>
					</div>
					<span className="text-sm">{time.temp}</span>
				</InfoCard>
			))}
		</div>
	)
}

export default HourlyForecastCard;