import React, { useEffect, useRef, useState} from 'react';

import DropdownIcon from '../assets/images/icon-dropdown.svg';

import type { DailyForecastItem } from '../types/weather';

type HourlyDaySelectorProps = {
	dailyForecast: DailyForecastItem[];
	selectedDay: string;
	onSelectedDayChange: (day: string) => void;
};

const HourlyDaySelector: React.FC<HourlyDaySelectorProps> = ({
	dailyForecast,
	selectedDay,
	onSelectedDayChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLElement | null>(null);

	const selectedForecstDay = dailyForecast.find(
		(day) => day.date === selectedDay
	);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!containerRef.current) return;

			if (!containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div ref={containerRef} className='relative'>
			<button
				type='button'
				onClick={() => setIsOpen((prev) => !prev)}
				className='flex items-center gap-2 rounded bg-[hsl(243,27%,30%)] px-3 py-2 text-sm text-white'
			>
				<span>{selectedForecstDay?.fullDay ?? 'Select day'}</span>
				<img
					src={DropdownIcon}
					alt=""
					className={`h-3 w-3 transition-transform ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>

			{isOpen && (
				<div className='absolute right-0 z-20 mt-2 w-40 rounded-xl bg-[hsl(243,27%,16%)] p-2 text-white shadow-lg'>
					<div className='grid gap-1'>
						{dailyForecast.map((day) => {
							const isActive = selectedDay === day.date;

							return (
								<button
									key={day.date}
									type='button'
									onClick={() => {
										onSelectedDayChange(day.date);
										setIsOpen(false);
									}}
									className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition ${
										isActive
											? 'bg-[hsl(243,27%,20%)] text-white'
											: 'text-white/70 hover:bg-white/10'
									}`}
								>
									<span>{day.fullDay}</span>
								</button>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

export default HourlyDaySelector;