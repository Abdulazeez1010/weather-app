import React from "react";
import type { HourlyForecastItem } from "../types/weather";
import InfoCard from "./InfoCard";

type HourlyForecastCardProps = {
  hourlyForecast: HourlyForecastItem[];
};

const HourlyForecastCard: React.FC <HourlyForecastCardProps> = ({ hourlyForecast }) => {
	return (
		<div className="grid gap-2 p-2">
			{hourlyForecast.map((time) => (
				<InfoCard 
					key={time.hour}
					className="flex items-center justify-between rounded bg-[hsl(243,27%,30%)] px-4 py-3"
				>
					<span>{time.hour}</span>
					<span className="font-medium">{time.temp}</span>
				</InfoCard>
			))}
		</div>
	)
}

export default HourlyForecastCard;