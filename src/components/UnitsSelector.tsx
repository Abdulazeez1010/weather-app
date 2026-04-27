import React, { useEffect, useRef, useState } from 'react';

import './UnitSelector.css'

import CheckMark from '../assets/images/icon-checkmark.svg'
import SettingsIcon from '../assets/images/icon-units.svg'
import DropdownIcom from '../assets/images/icon-dropdown.svg'

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
		'flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition';
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
				className='relative bg-[hsl(243,27%,20%)]'
			>
				<button
					type='button'
					onClick={() => setIsOpen((prev) => !prev)}
					className='flex items-center gap-2 rounded px-2 py-1 text-white'
				>
					<img src={SettingsIcon} alt="" className='h-4 w-4'/>
					<span>Units</span>
					<img
						src={DropdownIcom}
						alt=""
						className={`h-3 w-3 transition-transform ${
							isOpen ? 'rotate-180' : ''
						}`}
					/>
				</button>

				{isOpen && (
					<div className='absolute right-0 z-20 mt-2 w-72 rounded-xl bg-[hsl(243,27%,16%)] p-4 text-white shadow-lg'>
						<p className='mb-4 text-sm font-semibold'>Switch to Imperial</p>

						{sections.map((section) => (
							<div key={section.title} className='mb-4 last:mb-0'>
								<h4 className='mb-2 text-xs tracking-wide text-white/60'>
									{section.title}
								</h4>

								<div className='grid gap-2'>
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
														className='w-3 h-3'
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