import { useState } from 'react';
import DateInput from './DateInput';
import SingleDate from './SingleDate';

interface SDatePickerProps {
	onChange: (date: string) => void;
}

const SDatePicker = ({ onChange }: SDatePickerProps) => {
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);

	const handleDateChange = (value: string) => {
		setSelectedDate(value);
		onChange(value);
	};

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<div>
			<DateInput
				value={selectedDate}
				onChange={handleDateChange}
				onClick={handleClick}
			/>
			<SingleDate
				open={open}
				date={selectedDate}
    setDate={setSelectedDate}
			/>
		</div>
	);
};

export default SDatePicker;
