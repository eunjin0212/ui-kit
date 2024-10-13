import { ChangeEvent, useEffect, useId, useState } from 'react';

export interface InputProps {
	value: string;
	insideLabel?: string;
	label?: string;
	status?: 'error' | 'success' | 'focus' | 'normal';
	description?: string;
	placeholder?: string;
	disabled?: boolean;
 name?: string;
 readOnly?: boolean;
	onChange?: (arg: ChangeEvent<HTMLInputElement>['target']['value']) => void;
 type?: HTMLInputElement['type']
 className?: string;
 inputClassName?: string;
}

const SInput = ({
	value,
	label,
	insideLabel,
	description,
	onChange,
	disabled,
 name,
 readOnly,
 type = 'text',
	status = 'normal',
	placeholder = '',
 className = '',
 inputClassName = '',
}: InputProps) => {
 const id = useId()
	const [inputValue, setInputValue] = useState(value);
 const [inputStatus, setInputStatus] = useState(status)
	const statusClass = {
		error: 'shadow-0px_0px_4px_0px_[#E30000] border-Red_Default',
		success: 'shadow-0px_0px_4px_0px_[#05D358] border-Green_Lighten-2',
		focus: 'shadow-0px_0px_4px_0px_[#0071FF66] border-Blue_C_Default',
		normal: 'border-Grey_Lighten-1',
	};

	useEffect(() => {
		setInputValue(value);
	}, [value]);

 useEffect(() => {
		setInputStatus(status);
	}, [status]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!onChange || disabled) return;
		onChange(e.target.value);
	};

 const handleFocus = () => {
  setInputStatus('focus')
 }

	return (
		<fieldset className={['s-input outline-none focus-visible:outline-none', className].join(' ')}>
			<div className='inline-flex items-center'>
				{label && <span className='mr-12pxr text-Grey_Darken-4'>{label}</span>}
				{insideLabel && <label
					className={[
						'inline-flex items-center h-28pxr text-Grey_Darken-4 rounded-bl-2pxr rounded-tl-2pxr border  border-r-0 px-12pxr',
      disabled ? 'bg-Grey_Lighten-5 border-Grey_Lighten-2' : 'bg-Grey_Lighten-5 border-Grey_Lighten-1',
					].join(' ')}
				>
					{insideLabel}
				</label>}
					<input
      id={`s-input--${id}`}
      name={name}
						className={[
							'outline-none focus-visible:outline-none',
							'border px-12pxr py-4pxr text-Grey_Darken-4 h-28pxr placeholder:text-Grey_Lighten-1',
							insideLabel ? 'rounded-br-2pxr rounded-tr-2pxr' : 'rounded-2pxr',
							disabled
								? 'border-Grey_Lighten-2 bg-Grey_Lighten-4 text-Grey_Default'
								: statusClass[inputStatus],
        inputClassName,
						].join(' ')}
      type={type}
						value={inputValue}
      disabled={disabled}
      readOnly={readOnly}
						placeholder={placeholder}
      onFocus={handleFocus}
						onChange={handleChange}
					/>
			</div>
			{description && <span className='mt-8pxr'>{description}</span>}
		</fieldset>
	);
};

export default SInput;
