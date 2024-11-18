import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';

type Option = {
 [x: string]: string | number; 
 label: string; 
 value: string | number
} | string | number;

export interface SelectProps {
	value: Option;
	options: Option[];
	disable?: boolean;
	label?: string;
	optionLabel?: string;
	optionValue?: string;
	labelClassName?: string;
	placeholder?: string;
 className?: string
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
 className = ''
}: SelectProps) => {
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
     console.log(String(opt[optionValue]) === String(value), value)
      return String(opt[optionValue]) === String(value);
    }

    return opt === value;
  });

  if (foundOption && typeof foundOption === 'object' && optionLabel in foundOption) {
    return foundOption[optionLabel] as string;
  }

  return placeholder;
}, [optionLabel, optionValue, options, placeholder, value]);

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
				<div className='flex items-center justify-between bg-white border cursor-pointer rounded-2pxr flex-nowrap border-Grey_Lighten-1 py-4pxr px-8pxr text-Grey_Darken-4'>
					{displayLabel}
					<Icon
						name='ArrowDown_12'
						className='text-Grey_Default'
					/>
				</div>
			</>
		</div>
	);
};

export default SSelect;
