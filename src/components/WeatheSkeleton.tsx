import React from 'react';
import InfoCard from './InfoCard';

const SkeletonBlock = ({ className = '' }: { className?: string}) => (
    <div className={`animate-pulse rounded bg-white/10 ${className}`} />
);

const WeatherSkeleton: React.FC = () => {
	return (
		<section className='mt-4 grid gap-6 lg:grid-cols-[2fr_1fr]'>
			<div className='grid gap-6'>
				<InfoCard className='relative overflow-hidden'>
					<div className='flex items-start justify-between px-2 py-16'>
						<div className='space-y-3'>
							<SkeletonBlock className='h-6 w-40'/>
							<SkeletonBlock className='h-6 w-28'/>
						</div>
						<div className='flex items-center gap-2'>
							<SkeletonBlock className='h-16 w-16 rounded-full'/>
							<SkeletonBlock className='h-12 w-20'/>
						</div>
					</div>
				</InfoCard>

				<div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
					{Array.from({ length: 4}).map((_, index) => (
						<InfoCard key={index}>
							<SkeletonBlock className='h-4 w-20'/>
							<SkeletonBlock className='mt-3 h-6 w-16'/>
						</InfoCard>
					))}
				</div>

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

			<InfoCard className='grid'>
				<div className='flex items-center justify-between gap-4 p-4'>
					<SkeletonBlock className='h-4 w-24'/>
					<SkeletonBlock className='h-10 w-32'/>
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