export type Type = 'start' | 'end' | '';
interface DateBoxProps {
	date: number | string;
	className?: string;
	disabled?: boolean;
	selected?: boolean;
	isStartDate?: boolean;
	isEndDate?: boolean;
	isToday?: boolean;
	inRange?: boolean;
	type?: Type;
	onClick?: (date: number) => void;
	onMouseOver?: (date: number) => void;
}

const DateBox = ({
	date,
	className = '',
	disabled = false,
	selected = false,
	isStartDate = false,
	isEndDate = false,
	isToday = false,
	inRange = false,
	type,
	onClick,
	onMouseOver,
}: DateBoxProps) => {
	function handleClickDate() {
		if (disabled) return;
		if (typeof date === 'string') return;

		onClick?.(date);
	}

	function handleHoverDate() {
		if (typeof date === 'string') return;

		onMouseOver?.(date);
	}
	return (
		<div
			className={[
				'relative flex h-28pxr w-38pxr items-center justify-center text-center text-14pxr leading-28pxr transition-all ',
				disabled ? 'cursor-default text-Grey_Lighten-2' : 'cursor-pointer ',

				!disabled && !isStartDate && !isEndDate && !selected
					? 'hover:before:absolute hover:before:top-0 hover:before:h-full hover:before:w-full hover:before:bg-Blue_C_Lighten-5'
					: '',
				!disabled && inRange
					? 'before:absolute  before:top-0 before:h-full before:w-full before:bg-Blue_C_Lighten-5'
					: '',
				type === 'start'
					? 'before:right-0 before:w-14pxr'
					: type === 'end'
						? 'before:left-0 before:w-14pxr'
						: '',
				className,
			].join(' ')}
			onClick={() => handleClickDate()}
			onMouseOver={() => handleHoverDate()}
		>
			<div
				className={[
					'z-10 w-28pxr',
					selected || isStartDate || isEndDate
						? 'rounded-14pxr bg-Blue_C_Default font-bold text-white'
						: '',
					isToday && !selected
						? 'relative before:absolute before:left-1/2 before:top-0 before:h-full before:w-28pxr before:-translate-x-1/2 before:rounded-full before:border before:border-Grey_Lighten-3 before:content-[""]'
						: '',
					className,
				].join(' ')}
			>
				{date}
			</div>
		</div>
	);
};

export default DateBox;
