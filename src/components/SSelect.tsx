import { useSelect } from '../hooks/useSelect';
import { BaseSelect } from './BaseSelect';
import DropdownItem from './DropdownItem';
import { type Option } from './DropdownOptions';
import { type Dispatch } from 'react';

interface SelectProps {
 value: Option;
 options: Option[];
 disable?: boolean;
 label?: string;
 optionLabel?: string;
 optionValue?: string;
 placeholder?: string;
 className?: string;
 setValue: Dispatch<Option>;
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
 const { isOpen, selectRef, displayLabel, handleClick } = useSelect({
  value,
  options,
  optionLabel,
  optionValue,
  placeholder,
  setValue,
 });

 return (
  <BaseSelect
   isOpen={isOpen}
   selectRef={selectRef}
   displayLabel={displayLabel}
   className={className}
   label={label}
   handleClick={handleClick}
   options={options}
  >
   {options.map((opt, idx) => (
    <DropdownItem
     key={idx}
     option={opt}
     idx={idx}
     handleClick={() => handleClick(opt)}
    />
   ))}
  </BaseSelect>
 );
};

export default Select;