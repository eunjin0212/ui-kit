const DateBox = ({
	date,
	className = '',
	disabled = false,
	selected = false,
	onClick,
}: {
	date: number;
	className?: string;
	disabled?: boolean;
	selected?: boolean;
	onClick?: () => void;
}) => {
	return (
		<div
			className={[
				'h-28pxr w-28pxr text-center text-14pxr leading-28pxr',
				disabled ? 'cursor-default' : 'cursor-pointer',
				selected ? 'rounded-14pxr bg-Blue_C_Default font-bold text-white' : '',
				className,
			].join(' ')}
			onClick={() => onClick?.()}
		>
			{date}
		</div>
	);
};

export default DateBox;
