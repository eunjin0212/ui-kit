import { createPortal } from 'react-dom';
import { useState, useRef } from 'react';
import colors from '../css/colors.ts';
import { Dropdown12 } from '../assets/DropdownIcon.tsx';
import DropdownOptions, {
	type DropdownOptionProps,
} from './DropdownOptions.tsx';

export interface SDropdownProps {
	/**
	 * Dropdown size
	 */
	size?: 'xs' | 'sm' | 'md';
	/**
	 * Dropdown color
	 * @description Changing background color without outline or text color with outline
	 */
	color?: keyof typeof colors;
	/**
	 * Dropdown text
	 */
	label: string;
	/**
	 * Click handler
	 */
	onClick: (arg: DropdownOptionProps) => void;
	/**
	 * Dropdown options
	 * @description Options can using HTML code
	 * @example [{ label: '<span style="color: red">label</span>', value: 'label' }]
	 */
	options: DropdownOptionProps[];
	/**
	 * Dropdown outline
	 * @description Outline 'true' means changing the color of the text to the color you specified.
	 */
	outline?: boolean;
	/**
	 * Dropdown disable
	 */
	disabled?: boolean;
	/**
	 * Dropdown className
	 */
	className?: string;
}

const SDropdown = ({
	label,
	size = 'sm',
	color = 'Blue_B_Default',
	outline = false,
	disabled = false,
	className = '',
	options,
	onClick,
	...props
}: SDropdownProps) => {
	const argColor = colors[color] || color;

	const labelPadding = {
		xs: 'h-24pxr py-2pxr pl-12pxr pr-8pxr',
		sm: 'h-28pxr py-4pxr pl-12pxr pr-10pxr',
		md: 'h-34pxr py-4pxr pl-20pxr pr-16pxr leading-26pxr font-medium text-16pxr',
	};

	const iconPadding = {
		xs: 'p-6pxr',
		sm: 'p-8pxr',
		md: 'py-11pxr px-12pxr',
	};

	const colorClass = outline
		? `text-[${argColor}] before:rounded-4pxr before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border before:border-[${argColor}]`
		: `bg-[${argColor}] text-white`;

	const disableClass =
		'disabled:relative disabled:bg-Grey_Lighten-3 disabled:before:rounded-4pxr disabled:before:absolute disabled:before:w-full disabled:before:h-full disabled:before:top-0 disabled:before:left-0 disabled:before:border disabled:before:border-Grey_Lighten-2 disabled:text-Grey_Default disabled:cursor-not-allowed';

	const hoverClass = outline
		? `hover:before:bg-${color}/10 hover:before:border-[${argColor}]`
		: 'hover:before:bg-black hover:before:opacity-10';

	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLButtonElement>(null);

	const handleClick = (arg?: DropdownOptionProps) => {
		setIsOpen((prev) => !prev);
		if (arg) onClick(arg);
	};

	return (
		<>
			<button
				ref={dropdownRef}
				disabled={disabled}
				onClick={() => setIsOpen((prev) => !prev)}
				className={[
					's-dropdown relative inline-flex items-center rounded-4pxr',
					colorClass,
					disabled ? disableClass : `${hoverClass}`,
					className,
				].join(' ')}
				{...props}
			>
				<div className={`flex items-center ${labelPadding[size]}`}>{label}</div>
				<div
					className={[
						iconPadding[size],
						'border-l',
						disabled
							? 'border-Grey_Lighten-2'
							: outline
								? `border-[${argColor}]`
								: 'border-dropdownInner',
					].join(' ')}
				>
					<Dropdown12
						className={
							disabled
								? 'text-Grey_Default'
								: outline
									? `text-[${argColor}]`
									: 'text-white'
						}
					/>
				</div>
			</button>
			{isOpen &&
				createPortal(
					<DropdownOptions
						onClick={handleClick}
						options={options}
      parentRef={dropdownRef}
      open={isOpen}
					/>,
					document.body
				)}
		</>
	);
};
export default SDropdown;
