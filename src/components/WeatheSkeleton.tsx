import React from 'react';
import InfoCard from './InfoCard';

const SkeletonBlock = ({ className = '' }: { className?: string}) => (
    <div className={`animate-pulse rounded bg-white/10 ${className}`} />
);

const weatherStats = ['Feels like', 'Humidity', 'Wind', 'Precipitation'];

const WeatherSkeleton: React.FC = () => {
	return (
		<section className='mt-4 grid gap-6 lg:grid-cols-[2fr_1fr]'>
			<div className='grid gap-6'>
				<InfoCard className='relative overflow-hidden'>
					<div className='flex flex-col items-center justify-center px-2 py-16 text-center'>
						<div className='mb-3 flex gap-1'>
							<span className='h-2 w-2 animate-bounce rounded-full bg-white/70'/>
							<span className='h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:150ms]'/>
							<span className='h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:300ms]'/>
						</div>

						<p className='text-sm font-semibold text-white/80'>Loading...</p>
					</div>
				</InfoCard>

				<div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
					{weatherStats.map((stat) => (
						<InfoCard key={stat}>
							<p className='text-xs opacity-80'>{stat}</p>
							<div className='mt-2 flex items-center gap-2'>
								<h3 className='text-lg'>-</h3>
							</div>
							{/* <SkeletonBlock className='h-4 w-20'/> */}
							{/* <SkeletonBlock className='mt-3 h-6 w-16'/> */}
						</InfoCard>
					))}
				</div>

				<div>
					<h3 className='text-sm font-semibold text-white' >Daily forecast</h3>
					<div className='grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7'>
						{Array.from({ length: 7}).map((_, index) => (
							<InfoCard key={index} className='text-center'>
								<SkeletonBlock className='mx-auto h-4 w-10'/>
								<SkeletonBlock className='mx-auto my-3 h-10 w-10 rounded-full'/>
								<div className='flex items-center justify-between gap-2'>
									<SkeletonBlock className='h-4 w-10'/>
									<SkeletonBlock className='h-4 w-10'/>
								</div>
							</InfoCard>
						))}
					</div>
				</div>
			</div>

			<InfoCard className='grid'>
				<div className='flex items-center justify-between gap-4 p-4'>
					<h3 className='text-sm font-semibold text-white' >Hourly forecast</h3>
					<select className="rounded bg-[hsl(243,27%,30%)] p-2 text-white">
						<option value="">-</option>
					</select>
				</div>

				<div className='grid gap-2 p-2'>
					{Array.from({ length: 8}).map((_, index) => (
						<InfoCard
							key={index}
							className='flex items-center justify-between bg-[hsl(243,27%,30%)] px-4 py-3'
						>
							<div className='flex items-center gap-2'>
								<SkeletonBlock className='h-6 w-6 rounded-full'/>
								<SkeletonBlock className='h-4 w-12'/>
							</div>
							<SkeletonBlock className='h-4 w-10'/>
						</InfoCard>
					))}
				</div>
			</InfoCard>
		</section>
	);
};

export default WeatherSkeleton;