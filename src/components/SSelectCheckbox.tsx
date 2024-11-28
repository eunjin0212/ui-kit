import { useCallback, type Dispatch, type SetStateAction } from 'react';
import type { Option } from './DropdownItem';
import { useSelect } from '../hooks/useSelect';
import { BaseSelect } from './BaseSelect';
import SCheckbox from './SCheckbox';
import DropdownItem from './DropdownItem';

export interface CheckboxSelectProps {
	value: Option[];
	options: Option[];
	disable?: boolean;
	label?: string;
	optionLabel?: string;
	optionValue?: string;
	placeholder?: string;
	className?: string;
	setValue: Dispatch<SetStateAction<Option[]>>;
}

const SCheckboxSelect = ({
	value,
	options,
	disable = false,
	label = '',
	optionLabel = 'label',
	optionValue = 'value',
	placeholder = '선택',
	className = '',
	setValue,
}: CheckboxSelectProps) => {
	const { open, setOpen, selectRef, displayLabel } = useSelect({
		value,
		options,
		optionLabel,
		optionValue,
		placeholder,
	});

	const handleClick = (val?: Option) => {
		setOpen(() => true);
		if (!val) {
			return;
		}
		setValue((prev) => {
			const exists = prev.some((opt) => opt[optionValue] === val[optionValue]);

			return exists
				? prev.filter((opt) => opt[optionValue] !== val[optionValue])
				: [...prev, val];
		});
	};

 const checked = useCallback((opt: Option) => {
  return value.some(val => String(val[optionValue]) === String(opt[optionValue]))
 }, [optionValue, value])

	return (
		<BaseSelect
			open={open}
			setOpen={setOpen}
			selectRef={selectRef}
			displayLabel={displayLabel}
			className={className}
			label={label}
			handleClick={handleClick}
			options={options}
			disable={disable}
		>
			{options.map((opt, idx) => (
				<DropdownItem
					key={idx}
					option={opt}
					idx={idx}
					handleClick={handleClick}
				>
					<SCheckbox
						checked={checked(opt)}
						onChange={() => handleClick(opt)}
						label={opt.label}
      disabled={opt?.disable}
						className='ml-0pxr w-full'
					/>
				</DropdownItem>
			))}
		</BaseSelect>
	);
};

export default SCheckboxSelect;
