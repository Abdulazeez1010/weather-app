import React from 'react';

import './UnitSelector.css'

const UnitsSelector: React.FC = () => {
	return (
		<>
			<div className='text-white'>
				<select name="units" id="units" className='bg-[hsl(243,27%,20%)] text-white py-2 px-4 rounded'>
					<option value="">Celsius</option>
					<option value="">Fahrenheit</option>
				</select>
			</div>
		</>
	)
}

export default UnitsSelector;