import { useSelect } from '../hooks/useSelect';
import { BaseSelect } from './BaseSelect';
import SCheckbox from './SCheckbox';
import { Option } from './DropdownOptions';
import { Dispatch } from 'react';

export interface CheckboxSelectProps {
  value: (Option | number | string) [];
  options: Option[];
  disable?: boolean;
  label?: string;
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  className?: string;
  setValue: Dispatch<Option>;
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
      disable={disable}
    >
      {options.map((opt, idx) => (
        <SCheckbox
          key={idx}
          checked={String(opt[optionValue]) === String(value)}
          onChange={() => handleClick(opt)}
          label={opt.label}
          className='ml-0pxr'
        />
      ))}
    </BaseSelect>
  );
};

export default SCheckboxSelect;