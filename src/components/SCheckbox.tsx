import {
	type ChangeEvent,
	type InputHTMLAttributes,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from 'react';
import { Check12 } from '../assets/CheckIcon';
import { Minus12 } from '../assets/MinusIcon';

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
	onChange?: (arg: Checked) => void;
}
const SCheckbox = ({
	label,
	disabled = false,
	checked,
	value,
	onChange,
 className = ''
}: CheckboxProps) => {
	const checkType = useCallback(
		(checkValue: Checked) =>
			Array.isArray(checkValue) ? checkValue.includes(value!) : checkValue,
		[value]
	);

	const [internalChecked, setInternalChecked] = useState<
		CheckboxProps['checked']
	>(checkType(checked));

	useEffect(() => {
		if (disabled) return;

		setInternalChecked(checkType(checked));
	}, [checked, value, disabled, checkType]);

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (disabled) return;

		const targetChecked = event.target.checked;
		let newChecked: boolean | (string | number)[] = targetChecked;

		if (value !== undefined) {
			if (Array.isArray(checked)) {
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

	return (
		<label
			className={[
				's-checkbox inline-flex items-center',
				disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    className,
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
					`relative mr-8pxr inline-flex h-16pxr w-16pxr items-center justify-center 
     rounded-2pxr before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-2pxr before:border 
     aria-disabled:bg-Grey_Lighten-4 aria-disabled:before:border-Grey_Lighten-2`,
					isCheckedInIcon
						? 'bg-Blue_C_Default before:border-Blue_C_Default'
						: 'bg-white before:border-Grey_Default hover:bg-Blue_B_Lighten-5 hover:before:border hover:before:border-Blue_C_Default',
				].join(' ')}
				aria-disabled={disabled}
			>
				{internalChecked === null ? (
					<Minus12 className={iconClass} />
				) : (
					<Check12 className={iconClass} />
				)}
			</span>
			<span>{label}</span>
		</label>
	);
};

export default SCheckbox;
