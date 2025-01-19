import { useRef, useState } from 'react';
import DateInput from './datePicker/DateInput';
import SingleDate from './datePicker/SingleDate';
import DateWrapper from './datePicker/DateWrapper';
import { DateDisable } from './datePicker/DateComponent';

interface SDatePickerProps {
	onChange: (date: string) => void;
 disable?: boolean;
 disableDates?: DateDisable;
 label?: string
}

const SDatePicker = ({ onChange, disable, disableDates, label }: SDatePickerProps) => {
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const datePickerRef = useRef<HTMLDivElement | null>(null);

	const handleDateChange = (value: string) => {
		setSelectedDate(value);
		onChange(value);
	};

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<div
			ref={datePickerRef}
			className='relative'
		>
			<DateInput
				value={selectedDate}
				onChange={handleDateChange}
				onClick={handleClick}
    disable={disable}
    label={label}
			/>
			<DateWrapper
				open={open}
				onChange={setOpen}
				parentRef={datePickerRef}
			>
				<SingleDate
					date={selectedDate}
					onChange={setSelectedDate}
     disable={disableDates}
				/>
			</DateWrapper>
		</div>
	);
};

export default SDatePicker;
