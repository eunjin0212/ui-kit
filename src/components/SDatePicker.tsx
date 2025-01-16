import { useRef, useState } from 'react';
import DateInput from './datePicker/DateInput';
import SingleDate from './datePicker/SingleDate';

interface SDatePickerProps {
	onChange: (date: string) => void;
}

const SDatePicker = ({ onChange }: SDatePickerProps) => {
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
 const datePickerRef = useRef<HTMLDivElement | null>(null)

	const handleDateChange = (value: string) => {
		setSelectedDate(value);
		onChange(value);
	};

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<div ref={datePickerRef} className='relative'>
			<DateInput
				value={selectedDate}
				onChange={handleDateChange}
				onClick={handleClick}
			/>
			<SingleDate
    parentRef={datePickerRef}
				open={open}
    setOpen={setOpen}
				date={selectedDate}
				setDate={setSelectedDate}
			/>
		</div>
	);
};

export default SDatePicker;
