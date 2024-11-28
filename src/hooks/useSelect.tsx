import {
	useMemo,
	useRef,
	useState,
	type Dispatch,
	type SetStateAction,
} from 'react';
import { Option } from '../components/DropdownItem';

export interface UseSelectProps {
	value: Option | Option[];
	options: Option[];
	placeholder?: string;
	optionValue?: string;
	optionLabel?: string;
	setValue?: Dispatch<SetStateAction<Option>>;
}

export const useSelect = ({
	value,
	options,
	optionLabel = 'label',
	optionValue = 'value',
	placeholder = '',
	setValue,
}: UseSelectProps) => {
	const [open, setOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement | null>(null);

	const displayLabel = useMemo<string>(() => {
		if (Array.isArray(value)) {
			return value.length
				? value.map((val) => val[optionLabel]).join(', ')
				: placeholder;
		}

		const foundOption = options.find(
			(opt) => String(value[optionValue]) === String(opt[optionValue])
		);

		return foundOption ? (foundOption[optionLabel] as string) : placeholder;
	}, [optionLabel, optionValue, options, placeholder, value]);

	const handleClick = (arg?: Option) => {
		setOpen((prev) => !prev);
		if (arg && setValue) setValue(arg);
	};

	return { open, setOpen, selectRef, displayLabel, handleClick };
};
