const DateBox = ({
	date,
	className = '',
	disabled = false,
	selected = false,
	isToday = false,
	onClick,
}: {
	date: number;
	className?: string;
	disabled?: boolean;
	selected?: boolean;
	isToday?: boolean;
	onClick?: () => void;
}) => {
	return (
		<div
			className={[
				'h-28pxr w-28pxr text-center text-14pxr leading-28pxr transition-all',
				disabled
					? 'cursor-default'
					: 'cursor-pointer hover:rounded-full hover:bg-Blue_C_Default hover:text-white',
				selected ? 'rounded-14pxr bg-Blue_C_Default font-bold text-white' : '',
				isToday && !selected
					? 'relative before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:border before:border-Grey_Lighten-3 before:content-[""]'
					: '',

				className,
			].join(' ')}
			onClick={() => onClick?.()}
		>
			{date}
		</div>
	);
};

export default DateBox;
