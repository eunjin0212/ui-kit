import { TimeIcon16 } from '../../assets/TimeIcon';

interface TimeInputProps {
	value?: string | string[];
	label?: string;
	placeholder?: string;
	disable?: boolean;
	onClick: (idx?: number) => void;
	isAm?: boolean | boolean[];
}

const TimeInput = ({
	value,
	label,
	disable = false,
	placeholder = '',
	isAm,
	onClick,
}: TimeInputProps) => {
	const DateNumber = (index = 0, className?: string) => {
  const val = Array.isArray(value) ? value[index] : value;
  const format = Array.isArray(isAm) ? isAm[index] : isAm;

  return (<span
			className={[
				disable
					? 'text-Grey_Default'
					: !val
						? 'flex h-16pxr flex-1'
						: 'text-Grey_Darken-4',
				'px-8pxr',
				className,
			].join(' ')}
			onClick={() => onClick(index)}
		>
			{val || placeholder} {format !== undefined ? (format ? 'AM' : 'PM') : ''}
		</span>)
 };
	return (
		<div
			className={[
				'box-border inline-flex max-h-28pxr w-fit items-center rounded-2pxr border',
				disable
					? 'border-Grey_Lighten-2 bg-Grey_Lighten-4'
					: 'border-Grey_Lighten-1',
				Array.isArray(value)
					? label
						? (isAm ? 'min-w-236pxr' : 'min-w-180pxr')
						: (isAm ? 'min-w-182pxr' : 'min-w-128pxr') 
					: label
						? 'min-w-178pxr'
						: (isAm ? 'min-w-127pxr' : 'min-w-128pxr'),
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
					'inline-flex h-full w-full items-center px-7pxr py-5pxr',
					disable ? 'cursor-not-allowed' : 'cursor-pointer',
					Array.isArray(value) ? 'justify-start' : 'justify-between',
				].join(' ')}
			>
				<TimeIcon16 />
				{value && value.length ? (
					Array.isArray(value) ? (
						<>
							{DateNumber(0, 'pr-0')}
							<span className='mx-4pxr'>~</span>
							{DateNumber(1, 'pl-0')}
						</>
					) :(
      <>
						{DateNumber()}
      </>
					) 
				) : (
					<span>{placeholder}</span>
				)}
				<span></span>
			</div>
		</div>
	);
};

export default TimeInput;
