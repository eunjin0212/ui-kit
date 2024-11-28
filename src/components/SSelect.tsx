import type { Dispatch, SetStateAction } from 'react';
import type { Option } from './DropdownItem';
import { useSelect } from '../hooks/useSelect';
import { BaseSelect } from './BaseSelect';

interface SelectProps {
 value: Option;
 options: Option[];
 setValue: Dispatch<SetStateAction<Option>>;
 disable?: boolean;
 label?: string;
 optionLabel?: string;
 optionValue?: string;
 placeholder?: string;
 className?: string;
}

const Select = ({
 value,
 options,
 disable = false,
 label = '',
 optionLabel = 'label',
 optionValue = 'value',
 placeholder = '선택',
 className = '',
 setValue,
}: SelectProps) => {
 const { open, setOpen, selectRef, displayLabel, handleClick } = useSelect({
  value,
  options,
  optionLabel,
  optionValue,
  placeholder,
  setValue,
 });

 return (
  <BaseSelect
   open={open}
   selectRef={selectRef}
   displayLabel={displayLabel}
   className={className}
   label={label}
   setOpen={setOpen}
   handleClick={handleClick}
   options={options}
   disable={disable}
  />
 );
};

export default Select;
