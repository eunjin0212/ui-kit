import { useMemo, useRef, useState, Dispatch } from 'react';
import { Option } from '../components/DropdownOptions';

export interface UseSelectProps {
  value: Option | string | number;
  options: Option[];
  optionLabel: string;
  optionValue: string;
  placeholder: string;
  setValue: Dispatch<Option>;
}

export const useSelect = ({
  value,
  options,
  optionLabel,
  optionValue,
  placeholder,
  setValue,
}: UseSelectProps) => {
  const [isOpen, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

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

  return { isOpen, setOpen, selectRef, displayLabel, handleClick };
};