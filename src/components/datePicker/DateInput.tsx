import { CalendarIcon16 } from '../../assets/CalenderIcon';
import { Close12 } from '../../assets/CloseIcon';

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

	return (
		<div
			className={[
				'inline-flex max-h-28pxr items-center rounded-2pxr border box-border',
    disable ? 'bg-Grey_Lighten-4 border-Grey_Lighten-2' :'border-Grey_Lighten-1',
    label ? 'min-w-188pxr' : 'min-w-134pxr'
			].join(' ')}
		>
			{label && (
				<label
					htmlFor={label}
					className={[
      'text-center inline-block h-26pxr bg-Grey_Lighten-5 py-4pxr px-12pxr border-r',
      disable ? 'border-r-Grey_Lighten-2' : 'border-r-Grey_Lighten-1'

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
				<CalendarIcon16 onClick={onClick} />
				<span
					className={[disable ? 'text-Grey_Default' : !value ? 'flex h-16pxr flex-1' : 'text-Grey_Darken-4'].join(' ')}
					onClick={onClick}
				>
					{value || placeholder}
				</span>
				{value && (
					<Close12
						className={['text-Grey_Default', disable ? 'cursor-not-allowed' : 'cursor-pointer'].join(
							' '
						)}
						onClick={handleClear}
					/>
				)}
			</div>
		</div>
	);
};

export default DateInput;
