const DateBox = ({
	date,
	className = '',
	disabled = false,
	selected = false,
	isToday = false,
	inRange = true,
	onClick,
}: {
	date: number;
	className?: string;
	disabled?: boolean;
	selected?: boolean;
	isToday?: boolean;
	inRange?: boolean;
	onClick?: () => void;
}) => {
	return (
		<div
			className={[
				'h-28pxr w-38pxr text-center text-14pxr leading-28pxr transition-all ',
				disabled
					? 'cursor-default'
					: 'cursor-pointer hover:bg-inherit hover:before:absolute hover:before:w-28pxr hover:before:rounded-full hover:before:bg-Blue_C_Default hover:before:text-white hover:before:content-[""]',
				selected ? 'rounded-14pxr bg-Blue_C_Default font-bold text-white' : '',
				isToday && !selected
					? 'relative before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:border before:border-Grey_Lighten-3 before:content-[""]'
					: '',
				inRange ? 'bg-Blue_C_Lighten-5' : '',

				className,
			].join(' ')}
			onClick={() => onClick?.()}
		>
			{date}
		</div>
	);
};

export default DateBox;
