import { type RefObject, useRef, useState } from 'react';
import type { SInputProps } from './SInput';
import { set12Hour } from '../utils/time';
import TimeInput from './timePicker/TimeInput';
import TimeWrapper from './timePicker/TimeWrapper';
import Time from './timePicker/Time';

type TimePicker = Pick<SInputProps, 'placeholder' | 'disable' | 'label'>;

export interface STimePickerProps extends TimePicker {
	onChange: (arg: string) => void;
	timeFormat?: '12' | '24';
	value: string;
}

const STimePicker = ({
	onChange,
	placeholder,
	disable,
	label,
	value = '12:00',
	timeFormat = '24',
}: STimePickerProps) => {
	const [isAm, setIsAm] = useState(+value.split(':')[0] < 12);

	const [time, setTime] = useState<string>(
		timeFormat === '12'
			? `${set12Hour(value.split(':')[0], isAm)}:${value.split(':')[1]}`
			: value
	);
	const [open, setOpen] = useState<boolean>(false);
	const parentRef = useRef<HTMLInputElement | null>(null);

	const handleChange = (value: string) => {
		const hours = value.split(':')[0];
		const minutes = value.split(':')[1];
		const formatHours =
			timeFormat === '12' ? (isAm ? hours : +hours + 12) : hours;
		const clockValue = `${formatHours}:${minutes}`;
		onChange(clockValue);
		setTime(value);
	};

	return (
		<div ref={parentRef}>
			<TimeInput
				placeholder={placeholder}
				disable={disable}
				label={label}
				value={time}
				onClick={() => setOpen(!open)}
    isAm={timeFormat === '12' ? isAm : undefined}

			/>
			<TimeWrapper
				open={open}
				onChange={setOpen}
				timeFormat={timeFormat}
				parentRef={parentRef as RefObject<HTMLDivElement>}
			>
				<Time
					setValue={handleChange}
					value={time}
					timeFormat={timeFormat}
					isAm={isAm}
					setIsAm={setIsAm}
				/>
			</TimeWrapper>
		</div>
	);
};

export default STimePicker;
