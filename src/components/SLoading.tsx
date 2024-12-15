import InnerCircle, { type InnerCircleProps } from './InnerCircle';

interface LoadingProps extends InnerCircleProps {
	label?: string;
	labelClass?: string;
}

const SLoading = ({
	percentage = 0,
	size = 80,
	strokeWidth = 12,
	label = '',
	labelClass = '',
}: LoadingProps) => {
	return (
		<div className='flex flex-col items-center justify-center gap-4pxr'>
			<InnerCircle
				size={size}
				strokeWidth={strokeWidth}
				percentage={percentage}
				indeterminate={true}
    color='#0075FF'
			/>

			{label && (
				<span className={['text-14pxr text-Grey_Darken-5', labelClass].join(' ')}>
					{label}
				</span>
			)}
		</div>
	);
};

export default SLoading;
