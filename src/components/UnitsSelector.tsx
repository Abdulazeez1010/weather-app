import React, { useEffect, useRef, useState } from 'react';

import './UnitSelector.css'

import CheckMark from '../assets/images/icon-checkmark.svg'
import SettingsIcon from '../assets/images/icon-units.svg'
import DropdownIcon from '../assets/images/icon-dropdown.svg'

import type {
  UnitsSelectorProps,
} from '../types/weather'

const UnitsSelector: React.FC<UnitsSelectorProps> = ({
	units,
	onUnitsChange
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const baseOptionClass =
		'flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-xs transition sm:py-2 sm:text-sm ';
	const activeOptionClass = 'bg-[hsl(243,27%,20%)] text-white';
	const inactiveOptionClass = 'text-white/70 hover:bg-white/10';

	const sections = [
		{
			title: 'Temperature',
			key: 'temperature',
			options: [
				{label: 'Celsius (°C)', value: 'celsius'},
				{label: 'Fahrenheit (°F)', value: 'fahrenheit'},
			],
		},
		{
			title: 'Wind Speed',
			key: 'windspeed',
			options: [
				{label: 'km/h', value: 'kmh'},
				{label: 'mph', value: 'mph'},
			],
		},
		{
			title: 'Precipitation',
			key: 'precipitation',
			options: [
				{label: 'Millimeters (mm)', value: 'mm'},
				{label: 'Inches (in)', value: 'inch'},
			],
		},
	] as const;

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
		<>
			<div 
				ref={containerRef}
				className='relative'
			>
				<button
					type='button'
					onClick={() => setIsOpen((prev) => !prev)}
					className='flex items-center gap-1.5 rounded bg-[hsl(243,27%,20%)] px-2 py-1 text-xs text-white sm:gap-2 sm:px-2.5 sm:py-1.5 sm:text-sm'
				>
					<img src={SettingsIcon} alt="" className='h-3.5 w-3.5 sm:h-4 sm:w-4'/>
					<span>Units</span>
					<img
						src={DropdownIcon}
						alt=""
						className={`h-2.5 w-2.5 sm:h-3 sm:w-3 transition-transform ${
							isOpen ? 'rotate-180' : ''
						}`}
					/>
				</button>

				{isOpen && (
					<div className='absolute right-0 z-20 mt-2 w-44 rounded-lg bg-[hsl(243,27%,16%)] p-3 text-white shadow-lg sm:w-48 sm:rounded-xl sm:p-4'>
						<p className='mb-1 text-xs font-semibold sm:mb-2 sm:text-sm'>
							Switch to Imperial
						</p>

						{sections.map((section) => (
							<div key={section.title} className='mb-2 last:mb-0'>
								<h4 className='mb-1.5 text-[11px] tracking-wide text-white/60 sm:mb-2 sm:text-xs'>
									{section.title}
								</h4>

								<div className='grid'>
									{section.options.map((option) => {
										const isActive = units[section.key] === option.value;

										return (
											<button
												key={option.value}
												type='button'
												onClick={() =>
													onUnitsChange((prev) => ({
														...prev,
														[section.key]: option.value,
													}))
												}
												className={`${baseOptionClass} ${
													isActive ? activeOptionClass : inactiveOptionClass
												}`}
											>
												<span>{option.label}</span>
												{isActive && (
													<img
														src={CheckMark} 
														alt=""
														className='h-2.5 w-2.5 sm:h-3 sm:w-3'
													/>
												)}
											</button>
										);
									})}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default UnitsSelector;