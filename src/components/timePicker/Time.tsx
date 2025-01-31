import { type FormEvent, type KeyboardEvent, useEffect, useState } from 'react';
import { ArrowDown12 } from '../../assets/ArrowDownIcon';
import { ArrowUp12 } from '../../assets/ArrowUpIcon';
import timeStamp from '../../assets/time_stamp.svg';
import { addZero } from '../../utils/time';
import TimeSwitcher from './TimeSwitcher';

const Time = ({
	value = '00:00',
	timeFormat = '24',
	setValue,
	isAm = true,
	setIsAm,
}: {
	value: string;
	timeFormat: '12' | '24';
	setValue: (arg: string) => void;
	isAm: boolean;
	setIsAm: (arg: boolean) => void;
}) => {
	const [hours, setHours] = useState(value.split(':')[0]);
	const [minutes, setMinutes] = useState(value.split(':')[1]);

	const handleHours = (val: string) => {
		if (+val >= (timeFormat === '12' ? 13 : 25)) {
			setHours('01');
   if (timeFormat === '12') setIsAm(!isAm);
		} else if (+val < 1) {
			setHours(timeFormat === '12' ? '12' : '24');
   if (timeFormat === '12') setIsAm(!isAm);
		} else {
			setHours(addZero(val));
		}
	};

	const handleMinutes = (minute: string) => {
		if (+minute >= 60) {
			setMinutes('00');
			handleHourClick('next');
		} else if (+minute < 0) {
			setMinutes('59');
			handleHourClick('prev');
		} else {
			setMinutes(addZero(minute));
		}
	};

	const handleHourClick = (arg: 'prev' | 'next') => {
		const hour = arg === 'prev' ? +hours - 1 : +hours + 1;
		handleHours(String(hour));
	};

	const handleMinuteClick = (arg: 'prev' | 'next') => {
		const minute = arg === 'prev' ? +minutes - 1 : +minutes + 1;
		handleMinutes(String(minute));
	};

	useEffect(() => {
		setValue(`${hours}:${minutes}`);
	}, [hours, minutes, isAm]);

	return (
		<div className='flex items-center justify-center'>
			{timeFormat === '12' && (
				<TimeSwitcher
					isAm={isAm}
					setIsAm={setIsAm}
				/>
			)}
			<div
				className={[
					'inline-flex items-center justify-center',
					timeFormat === '12' && 'p-24pxr',
				].join(' ')}
			>
				<Time.ClockSelector
					value={hours}
					max={timeFormat === '24' ? 25 : 13}
					setValue={handleHours}
					onClick={handleHourClick}
				/>
				<img
					src={timeStamp}
					alt='time_stamp'
					className='mx-9pxr'
				/>
				<Time.ClockSelector
					value={minutes}
					setValue={handleMinutes}
					onClick={handleMinuteClick}
				/>
			</div>
		</div>
	);
};
export default Time;

interface ClockSelectorProps {
	value: string;
	setValue: (value: string) => void;
	max?: number;
	onClick: (arg: 'prev' | 'next') => void;
}

Time.ClockSelector = ({
	value,
	setValue,
	max = 60,
	onClick,
}: ClockSelectorProps) => {
	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		let newValue = target.value.replace(/[^0-9]/g, '');
		if (newValue.length > 2) newValue = newValue.slice(0, 2);
		target.value = newValue;
		setValue(newValue);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === '-' || e.key === 'e') {
			e.preventDefault();
		}
	};

	const iconClass = 'text-Grey_Lighten-2 cursor-pointer';

	return (
		<label className='inline-flex flex-col items-center justify-center gap-12pxr'>
			<ArrowUp12
				className={iconClass}
				onClick={() => onClick('next')}
			/>
			<input
				value={value}
				type='number'
				inputMode='numeric'
				max={max}
				min='0'
				onInput={handleChange}
				onKeyDown={handleKeyDown}
				className='h-28pxr w-38pxr rounded-4pxr border border-Grey_Lighten-1 px-10pxr py-4pxr text-center text-12pxr text-Grey_Darken-2 focus-within:outline-none focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
			/>
			<ArrowDown12
				className={iconClass}
				onClick={() => onClick('prev')}
			/>
		</label>
	);
};
