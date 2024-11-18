import Icon from './Icon';
import { useState, ChangeEvent, useEffect, useMemo } from 'react';

export interface Rule {
	message: string;
	validate: (value: string) => boolean;
}

export interface SInputProps {
	value: string;
	type?: string;
	placeholder?: string;
	name?: string;
	label?: string;
	rules?: Rule[];
	useRealTimeRules?: boolean;
	errorMessage?: string;
	hint?: string;
	disable?: boolean;
	readonly?: boolean;
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (value: string) => void;
}

const SInput = ({
	value = '',
	type = 'text',
	placeholder,
	name,
	label,
	rules = [],
	useRealTimeRules = false,
	hint,
	disable = false,
	readonly = false,
	className = '',
	labelClassName = '',
	inputClassName = '',
	onChange,
	onBlur,
}: SInputProps) => {
	const [inputValue, setInputValue] = useState<string>(value);
	const [inputType, setInputType] = useState<string>(type);
	const [internalError, setInternalError] = useState<string | null>(null);
	const [inputStatus, setInputStatus] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	// Validation function
	const validateInput = (inputValue: string) => {
		for (const rule of rules) {
			if (!rule.validate(inputValue)) {
				setInternalError(rule.message);
				setInputStatus('error');
				return false;
			}
		}
		setInputStatus('pass');
		setInternalError(null);
		return true;
	};

	const handleBlur = () => {
		onBlur?.(inputValue);
		if (!useRealTimeRules && rules.length > 0) {
			validateInput(inputValue);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setInputValue(value);
		onChange?.(event);
		if (useRealTimeRules && rules.length > 0) {
			validateInput(value);
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	useEffect(() => {
		setInputType(type);
	}, [type]);

	useEffect(() => {
		if (type === 'password') {
			setInputType(showPassword ? 'text' : 'password');
		}
	}, [showPassword, type]);

	// Memoized class names
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

	const inputWrapperClass = useMemo(
		() =>
			[
				"s-input__inner before:contents-[''] relative flex h-full flex-nowrap items-center px-12pxr py-4pxr before:absolute before:left-0 before:top-0 before:h-full before:w-full before:border",
				label ? 'before:rounded-r-2pxr' : 'before:rounded-2pxr',
				disable
					? 'cursor-not-allowed bg-Grey_Lighten-5 text-Grey_Default before:border-Grey_Lighten-2'
					: 'before:pointer-events-none before:border-Grey_Lighten-1 focus-within:before:border-positive focus-within:before:shadow-input hover:before:border-positive hover:before:shadow-input',
				inputStatus === 'error' ? 'before:border-Red_Default' : '',
				inputStatus === 'pass' ? 'before:border-Green_Lighten-2' : '',
			].join(' '),
		[label, disable, inputStatus]
	);

	const inputClass = useMemo(
		() =>
			[
				'h-full border-none leading-20pxr placeholder:text-Grey_Lighten-1 focus:outline-none',
				inputClassName,
			].join(' '),
		[inputClassName]
	);

	const messageClass = useMemo(
		() =>
			[
				'pt-8pxr',
				internalError ? 'text-Red_Default' : '',
				hint && !internalError ? 'text-Grey_Darken-1' : '',
			].join(' '),
		[internalError, hint]
	);

	return (
		<div className={['s-input', className].join(' ')}>
			<div className='flex items-center s-input__inner h-28pxr'>
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

				<div className={inputWrapperClass}>
					<input
						id={label || name}
						type={inputType}
						value={inputValue}
						placeholder={placeholder}
						disabled={disable}
						readOnly={readonly}
						className={inputClass}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{type === 'password' && (
						<button data-testid='password-visible-button'>
							<Icon
								name={showPassword ? 'VisibilityOn_16' : 'VisibilityOff_16'}
								color='Grey_Darken-1'
								className='cursor-pointer text-Grey_Darken-1'
								onClick={togglePasswordVisibility}
							/>
						</button>
					)}
				</div>
			</div>

			{(hint || internalError) && (
				<p className={messageClass}>{internalError || hint}</p>
			)}
		</div>
	);
};

export default SInput;
