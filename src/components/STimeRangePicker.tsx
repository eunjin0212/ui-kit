import { type RefObject, useRef, useState } from 'react';
import type { SInputProps } from './SInput';
import { set12Hour } from '../utils/time';
import TimeInput from './timePicker/TimeInput';
import TimeWrapper from './timePicker/TimeWrapper';
import Time from './timePicker/Time';

type TimePicker = Pick<SInputProps, 'placeholder' | 'disable' | 'label'>;

export interface STimePickerProps extends TimePicker {
	onChange: (arg: string[]) => void;
	timeFormat?: '12' | '24';
	value: string[];
}

const STimeRangePicker = ({
	onChange,
	placeholder,
	disable,
	label,
	value = ['12:00', '12:00'],
	timeFormat = '24',
}: STimePickerProps) => {
 const setAm = (index: number) => +value[index].split(':')[0] < 12
 const setTime = (index: number, isAm: boolean) => timeFormat === '12'
 ? `${set12Hour(value[index].split(':')[0], isAm)} : ${value[index].split(':')[1]}`
 : value[index] 
	const [isStartAm, setIsStartAm] = useState(setAm(0));
	const [isEndAm, setIsEndAm] = useState(setAm(1));

	const [startTime, setStartTime] = useState<string>(setTime(0, isStartAm));
 const [endTime, setEndTime] = useState<string>(setTime(1, isEndAm));
	const [open, setOpen] = useState<boolean[]>([false, false]);
	const parentRef = useRef<HTMLInputElement | null>(null);

	const handleChange = (val: string, isAm: boolean) => {
		const hours = val.split(':')[0];
		const minutes = val.split(':')[1];
		const formatHours =
			timeFormat === '12' ? (isAm ? hours : +hours + 12) : hours;
		return `${formatHours} : ${minutes}`;
	};

 const handleStartChange = (val: string) => {
  setStartTime(val);
		onChange([handleChange(val, isStartAm), value[1]]);
 }

 const handleEndChange = (val: string) => {
  setEndTime(val);
		onChange([value[0], handleChange(val, isEndAm)]);
 }

	return (
		<div ref={parentRef}>
			<TimeInput
				placeholder={placeholder}
				disable={disable}
				label={label}
				value={[startTime, endTime]}
				onClick={(idx?: number) => setOpen([idx === 0, idx === 1])}
    isAm={timeFormat === '12' ? [isStartAm, isEndAm] : undefined}
			/>
			<TimeWrapper
				open={open[0]}
				onChange={(val: boolean) => setOpen([val, open[1]])}
				timeFormat={timeFormat}
				parentRef={parentRef as RefObject<HTMLDivElement>}
			>
				<Time
					setValue={handleStartChange}
					value={startTime}
					timeFormat={timeFormat}
					isAm={isStartAm}
					setIsAm={setIsStartAm}
				/>
			</TimeWrapper>
   <TimeWrapper
				open={open[1]}
				onChange={(val: boolean) => setOpen([open[0], val])}
				timeFormat={timeFormat}
				parentRef={parentRef as RefObject<HTMLDivElement>}
			>
				<Time
					setValue={handleEndChange}
					value={endTime}
					timeFormat={timeFormat}
					isAm={isEndAm}
					setIsAm={setIsEndAm}
				/>
			</TimeWrapper>
		</div>
	);
};

export default STimeRangePicker;
