const DateBox = ({
	date,
	className = '',
	disabled = false,
	selected = false,
	isToday = false,
	inRange = false,
	onClick,
}: {
	date: number | string;
	className?: string;
	disabled?: boolean;
	selected?: boolean;
	isToday?: boolean;
	inRange?: boolean;
	onClick?: (date: number) => void;
}) => {
	function handleClickDate() {
		if (typeof date === 'string') return;

		onClick?.(date);
	}
	return (
		<div
			className={[
				'flex h-28pxr w-38pxr items-center justify-center text-center text-14pxr leading-28pxr transition-all',
				disabled ? 'cursor-default' : 'cursor-pointer',

				inRange
					? 'relative before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-Blue_C_Lighten-5'
					: '',
				inRange && selected ? 'before:w-14pxr' : '',

				className,
			].join(' ')}
			onClick={() => handleClickDate()}
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
