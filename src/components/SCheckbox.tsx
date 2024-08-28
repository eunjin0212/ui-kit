import {
	type ChangeEvent,
	type InputHTMLAttributes,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from 'react';
import { Check12 } from '../assets/CheckIcon';
import { MinusIcon12 } from '../assets/MinusIcon';

type Checked = null | boolean | (string | number)[];
export interface CheckboxProps {
	/**
	 * Checkbox disable
	 */
	disabled?: boolean;
	/**
	 * Checkbox className
	 */
	className?: string;
	/**
	 * Checkbox text
	 */
	label?: string;
	/**
	 * Checkbox value
	 */
	value?: string;
	/**
	 * Checkbox checked
	 */
	checked: Checked;
	/**
	 * Checkbox name
	 */
	name?: InputHTMLAttributes<HTMLInputElement>['name'];
	/**
	 * Click handler
	 */
	onChange?: (arg: boolean | null | (string | number)[]) => void;
}
const SCheckbox = ({
	label,
	disabled = false,
	checked,
	value,
	onChange,
}: CheckboxProps) => {
	const checkType = useCallback(
		(checkValue: Checked) =>
			Array.isArray(checkValue) ? checkValue.includes(value!) : checkValue,
		[value]
	);

	const [internalChecked, setInternalChecked] = useState<Checked>(
		checkType(checked)
	);

	useEffect(() => {
		if (disabled) return;

		setInternalChecked(checkType(disabled));
	}, [checkType, disabled]);

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (disabled) return;

		const targetChecked = event.target.checked;
		const isArrayChecked = (checkValue: Checked) => Array.isArray(checkValue);

		let newChecked: boolean | (string | number)[] = targetChecked;

		if (value !== undefined) {
			if (isArrayChecked(checked)) {
				newChecked = targetChecked
					? [...new Set([...checked, value])]
					: checked.filter((item) => item !== value);
			} else {
				newChecked = targetChecked ? [value] : [];
			}
		}

		setInternalChecked(checkType(newChecked));
		onChange?.(newChecked);
	};

	// const checkboxClass = clsx(
	// 	's-checkbox flex items-center',
	// 	disabled ? '!cursor-not-allowed' : 'cursor-pointer',
	// 	className
	// );
	const isCheckedInIcon = useMemo(
		() => internalChecked !== false,
		[internalChecked]
	);
	const iconClass = useMemo(
		() =>
			isCheckedInIcon && !disabled
				? 'text-white'
				: isCheckedInIcon && disabled
					? 'text-Grey_Default'
					: !isCheckedInIcon
						? 'text-transparent'
						: '',
		[isCheckedInIcon, disabled]
	);
	// const checkmarkClass = clsx(
	// 	'bg-white bw-1 relative mr-8 flex h-16 w-16 items-center justify-center rounded-2 border-1 border-Grey_Default transition-all duration-200',
	// 	internalChecked && !disabled && 'border-positive bg-positive text-white',
	// 	disabled && '!border-Grey_Lighten-2 !bg-Grey_Lighten-4 !text-Grey_Default',
	// 	!internalChecked && !disabled && 'hover:!border-positive hover:!bg-Blue_B_Lighten-5'
	// );

	return (
		<label
			className={[
				's-checkbox inline-flex items-center',
				disabled ? 'cursor-not-allowed' : 'cursor-pointer',
			].join(' ')}
		>
			<input
				type='checkbox'
				checked={!!internalChecked}
				disabled={disabled}
				className='hidden'
				onChange={handleCheckboxChange}
			/>
			<span
				className={[
					`before:rounded-2 relative mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center 
     rounded-0.5 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-0.5 before:border 
     aria-disabled:bg-Grey_Lighten-4 aria-disabled:before:border-Grey_Lighten-2`,
					isCheckedInIcon
						? 'bg-Blue_C_Default before:border-Blue_C_Default'
						: 'bg-white before:border-Grey_Default hover:bg-Blue_B_Lighten-5 hover:before:border hover:before:border-Blue_C_Default',
				].join(' ')}
				aria-disabled={disabled}
			>
				{internalChecked === null ? (
					<MinusIcon12 className={iconClass} />
				) : (
					<Check12 className={iconClass} />
				)}
			</span>
			<span>{label}</span>
		</label>
	);
};

export default SCheckbox;
