import { TimeIcon16 } from '../../assets/TimeIcon';

interface TimeInputProps {
	value?: string | string[];
	label?: string;
	placeholder?: string;
	disable?: boolean;
	onClick: () => void;
	clearable?: boolean;
}

const TimeInput = ({
	value,
	label,
	disable = false,
	placeholder = '',
	onClick,
	clearable = true,
}: TimeInputProps) => {
	const DateNumber = (val?: string, className?: string) => (
		<span
			className={[
				disable
					? 'text-Grey_Default'
					: !val
						? 'flex h-16pxr flex-1'
						: 'text-Grey_Darken-4',
     'px-8pxr',
     className,
			].join(' ')}
			onClick={onClick}
		>
			{val || placeholder}
		</span>
	);

	const showClearButton = () =>
		clearable && (Array.isArray(value) ? !!value.length : value);
	return (
		<div
			className={[
				'box-border inline-flex max-h-28pxr items-center rounded-2pxr border w-fit',
				disable
					? 'border-Grey_Lighten-2 bg-Grey_Lighten-4'
					: 'border-Grey_Lighten-1',
				Array.isArray(value)
					? label && showClearButton()
						? 'min-w-260pxr'
						: label && !showClearButton()
							? 'min-w-250pxr'
							: !label && showClearButton()
								? 'min-w-208pxr'
								: 'min-w-196pxr'
					: label && showClearButton()
						? 'min-w-204pxr'
						: label && !showClearButton()
							? 'min-w-188pxr'
							: !label && showClearButton()
								? 'min-w-150pxr'
								: 'min-w-134pxr',
			].join(' ')}
		>
			{label && (
				<label
					htmlFor={label}
					className={[
						'inline-block h-26pxr border-r bg-Grey_Lighten-5 px-12pxr py-4pxr text-center',
						disable ? 'border-r-Grey_Lighten-2' : 'border-r-Grey_Lighten-1',
					].join(' ')}
				>
					{label}
				</label>
			)}
			<div
				className={[
					'inline-flex h-full w-full items-center justify-between px-7pxr py-5pxr',
					disable ? 'cursor-not-allowed' : 'cursor-pointer',
				].join(' ')}
			>
				<TimeIcon16 onClick={onClick} />
				{Array.isArray(value) ? (
					<>
						{DateNumber(value[0], 'pr-0')}
						<span className='mx-4pxr'>~</span>
						{DateNumber(value[1], 'pl-0')}
					</>
				) : (
					DateNumber(value)
				)}
    <span></span>
			</div>
		</div>
	);
};

export default TimeInput;