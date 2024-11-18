import { Dispatch, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import DropdownOptions, { type Option } from './DropdownOptions';

export interface SelectProps {
	value: Option;
	options: Option[];
	disable?: boolean;
	label?: string;
	optionLabel?: string;
	optionValue?: string;
	labelClassName?: string;
	placeholder?: string;
	className?: string;
	setValue: Dispatch<Option>;
}

const SSelect = ({
	value,
	options = [],
	disable = false,
	label = '',
	labelClassName = '',
	optionLabel = 'label',
	optionValue = 'value',
	placeholder = '선택',
	className = '',
	setValue,
}: SelectProps) => {
	const [isOpen, setOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement | null>(null);
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

	const displayLabel = useMemo(() => {
		const foundOption = options.find((opt) => {
			if (opt && typeof opt === 'object' && optionValue in opt) {
				return String(opt[optionValue]) === String(value);
			}

			return opt === value;
		});

		if (
			foundOption &&
			typeof foundOption === 'object' &&
			optionLabel in foundOption
		) {
			return foundOption[optionLabel] as string;
		}

		return placeholder;
	}, [optionLabel, optionValue, options, placeholder, value]);

	const handleClick = (arg?: Option) => {
		setOpen((prev) => !prev);
		if (arg) setValue(arg);
	};

	return (
		<div className={['s-select', className].join(' ')}>
			<>
				{label && (
					<label
						htmlFor={label}
						className={[
							'relative text-center leading-20pxr',
							labelClass,
							labelClassName,
						].join(' ')}
					>
						{label}
					</label>
				)}
				<div
					ref={selectRef}
     onClick={() => handleClick()}
					className='flex items-center justify-between bg-white border cursor-pointer flex-nowrap rounded-2pxr border-Grey_Lighten-1 px-8pxr py-4pxr text-Grey_Darken-4'
				>
					{displayLabel}
					<Icon
						name='ArrowDown_12'
						className='text-Grey_Default'
					/>
				</div>
			</>
			{isOpen &&
				createPortal(
					<DropdownOptions
						onClick={handleClick}
						options={options}
						parentRef={selectRef}
						open={isOpen}
					/>,
					document.body
				)}
		</div>
	);
};

export default SSelect;
