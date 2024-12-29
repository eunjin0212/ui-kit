import { useMemo } from 'react';
import { CalendarIcon16 } from '../assets/CalenderIcon';
import { Close12 } from '../assets/CloseIcon';

interface DateInputProps {
	value: string;
	label?: string;
	placeholder?: string;
	disable?: boolean;
	onClick: () => void;
	onChange: (date: string) => void;
}

const DateInput = ({
	value,
	onChange,
	label,
	disable = false,
	placeholder = '',
	onClick,
}: DateInputProps) => {
	const handleClear = () => {
		onChange('');
	};

	const labelClass = useMemo(
		() =>
			[
				label
					? 'before:rounded-l-2pxr before:absolute before:w-full before:h-full before:top-0 before:left-0 before:contents-[""] before:border before:border-r-0 px-12pxr py-4pxr bg-Grey_Lighten-5'
					: 'mr-12pxr',
				disable
					? 'before:border-Grey_Lighten-2 cursor-not-allowed'
					: 'before:border-Grey_Lighten-1',
			].join(' '),
		[disable, label]
	);

	return (
		<div
			className={[
				'inline-flex max-h-28pxr min-w-134pxr items-center rounded-2pxr border border-Grey_Lighten-1 px-7pxr py-5pxr',
			].join(' ')}
		>
			{label && (
				<label
					htmlFor={label}
					className={['relative text-center leading-20pxr', labelClass].join(' ')}
				>
					{label}
				</label>
			)}
			<div className='inline-flex h-full w-full cursor-pointer items-center justify-between'>
				<CalendarIcon16 onClick={onClick} />
				<span
					className={[!value && 'flex flex-1 h-16pxr'].join(' ')}
					onClick={onClick}
				>
					{value || placeholder}
				</span>
				{value && (
					<Close12
						className='cursor-pointer text-Grey_Default'
						onClick={handleClear}
					/>
				)}
			</div>
		</div>
	);
};

export default DateInput;
