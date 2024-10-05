import { useEffect, useState } from 'react';
type Value = boolean;

interface BaseToggleProps {
	label?: string;
	labelClass?: string;
	value: Value;
	onChange?: (arg: Value) => void;
	className?: string;
	disabled?: boolean;
}

interface SwitchToggleProps extends BaseToggleProps {
	type?: 'switch';
}

interface ButtonToggleProps extends BaseToggleProps {
	/**
	 * @description If you use the button type, you must need buttonLabel.
	 */
	type: 'button';
	buttonLabel: string;
}

export type ToggleProps = SwitchToggleProps | ButtonToggleProps;

const SToggle = ({
	label,
	onChange,
	value,
	className,
	type = 'switch',
	disabled = false,
	...props
}: ToggleProps) => {
	const [isToggled, setIsToggled] = useState<Value>(value);

	useEffect(() => {
		if (disabled) return;
		setIsToggled(value);
	}, [value, disabled]);

	const handleToggle = () => {
		if (disabled || !onChange) return;
		onChange(!isToggled);
	};

	return (
		<div className={['flex items-center', className].join(' ')}>
			{label && <span className='mr-16pxr'>{label}</span>}
   <input
				id='s-toggle-switch'
				type='checkbox'
				checked={isToggled}
				onChange={handleToggle}
				disabled={disabled}
				className='sr-only' // 화면에 보이지 않지만 스크린 리더가 접근할 수 있게 숨김
			/>
			{type === 'switch' ? (
				<div
					className={[
						'relative flex h-20pxr w-36pxr cursor-pointer items-center rounded-full p-2pxr transition-colors duration-300 ease-in-out',
						isToggled ? 'bg-Blue_C_Default' : 'bg-Grey_Lighten-2',
						disabled &&
							`${isToggled ? 'bg-Blue_C_Lighten-4' : 'bg-Grey_Lighten-4'} cursor-not-allowed`,
					].join(' ')}
					onClick={handleToggle}
				>
					<span
						className={[
							'h-16pxr w-16pxr transform rounded-full bg-white shadow-[0px_2px_4px_0px_#00000029] duration-300 ease-in-out',
							isToggled ? 'translate-x-16pxr' : 'translate-x-0',
							disabled ? 'bg-white' : 'bg-Grey_Lighten-5',
						].join(' ')}
					></span>
				</div>
			) : (
				(() => {
					const buttonProps = props as ButtonToggleProps;
					return (
						<button
							onClick={handleToggle}
							className={[
								'relative rounded-14pxr px-12pxr py-4pxr leading-20pxr before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-14pxr before:border',
								isToggled
									? 'text-Blue_C_Default before:border-Blue_C_Default'
									: 'text-Grey_Darken-1 before:border-Grey_Darken-1',
         disabled &&
									'cursor-not-allowed bg-Grey_Lighten-4 text-Grey_Default before:border-Grey_Lighten-2',
							].join(' ')}
						>
							{buttonProps.buttonLabel}
						</button>
					);
				})()
			)}
		</div>
	);
};

export default SToggle;
