const DateBox = ({
	date,
	className = '',
	disabled = false,
	selected = false,
	type = '',
	isToday = false,
	inRange = false,
	onClick,
	onMouseOver,
}: {
	date: number | string;
	className?: string;
	disabled?: boolean;
	selected?: boolean;
	type?: 'start' | 'end' | '';
	isToday?: boolean;
	inRange?: boolean;
	onClick?: (date: number) => void;
	onMouseOver?: (date: number) => void;
}) => {
	function handleClickDate() {
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
				'flex h-28pxr w-38pxr items-center justify-center text-center text-14pxr leading-28pxr transition-all',
				disabled ? 'cursor-default' : 'cursor-pointer',

				inRange
					? 'relative before:absolute  before:top-0 before:h-full before:w-full before:bg-Blue_C_Lighten-5'
					: '',
				type === 'start' && inRange && selected
					? 'before:right-0 before:w-14pxr'
					: '',
				type === 'end' && inRange && selected ? 'before:left-0 before:w-14pxr' : '',

				className,
			].join(' ')}
			onClick={() => handleClickDate()}
			onMouseOver={() => handleHoverDate()}
		>
			<div
				className={[
					'z-10 w-28pxr',
					selected ? 'rounded-14pxr bg-Blue_C_Default font-bold text-white' : '',
					isToday && !selected
						? 'relative before:absolute before:left-1/2 before:top-0 before:h-full before:w-28pxr before:-translate-x-1/2 before:rounded-full before:border before:border-Grey_Lighten-3 before:content-[""]'
						: '',
				].join(' ')}
			>
				{date}
			</div>
		</div>
	);
};

export default DateBox;
