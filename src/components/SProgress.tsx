import { useMemo } from 'react';
import InnerCircle, { type InnerCircleProps } from './InnerCircle';

const statusColor = {
	standby: '#AAAAAA',
	progress: '#0075FF',
	error: '#FB4444',
	success: '#01BB4B',
};

interface ProgressProps extends InnerCircleProps {
	linear?: boolean;
	label?: string;
	labelClass?: string;
	className?: string;
	usePercentage?: boolean;
	percentageClass?: string;
	status?: keyof typeof statusColor;
}

const SProgress = ({
	percentage = 0,
	size = 80,
	strokeWidth = 12,
	status = 'progress',
	linear = false,
	label = '',
	labelClass = '',
	className = '',
	percentageClass = '',
	usePercentage = true,
}: ProgressProps) => {
	const progressStatus = useMemo(() => {
		if (status === 'error') return status;
		if (percentage === 0) return 'standby';
		if (percentage === 100) return 'success';
		return 'progress';
	}, [percentage, status]);
	return (
		<div
			className={[
				'flex flex-col items-center justify-center gap-4pxr',
				className,
			].join(' ')}
		>
			{linear ? (
				<div className='relative h-20pxr w-full overflow-hidden rounded-4pxr bg-gray-200 text-center'>
					<div
						className={[
							'h-full rounded-l-4pxr bg-Blue_C_Default transition-all duration-500',
							percentage < 100 ? '!rounded-r-full' : 'rounded-r-4pxr',
						].join(' ')}
						style={{
							width: `${percentage}%`,
							backgroundColor: statusColor[progressStatus],
						}}
					></div>
					<div
						className='absolute left-0 top-0 h-20pxr w-full bg-gray-200 leading-21pxr'
						style={{
							color: statusColor[progressStatus],
							zIndex: 1,
							clipPath: `inset(0 0 0 ${percentage}%)`,
						}}
					>
						{percentage}%
					</div>
					<div
						className='absolute left-0 top-0 h-20pxr w-full leading-21pxr text-white'
						style={{
							backgroundColor: statusColor[progressStatus],
							zIndex: 1,
							clipPath: `inset(0 ${100 - percentage}% 0 0)`,
						}}
					>
						{percentage}%
					</div>
				</div>
			) : (
				<InnerCircle
					size={size}
					strokeWidth={strokeWidth}
					percentage={percentage}
					color={statusColor[progressStatus]}
				/>
			)}

			{!linear && usePercentage && (
				<strong
					className={['mt-4pxr text-16pxr', percentageClass].join(' ')}
					style={{ color: statusColor[progressStatus] }}
				>
					{percentage} %
				</strong>
			)}

			{label && (
				<span className={['text-14pxr text-Grey_Darken-5', labelClass].join(' ')}>
					{label}
				</span>
			)}
		</div>
	);
};

export default SProgress;
