import { useEffect, useState } from 'react';
import { formatDateToObject, formatDateToString } from '../../utils/date';
import { useMonth } from '../../hooks/useDate';
import DateComponent, { type DateDisable } from './DateComponent';
import MoveButton from './MoveButton';
import YearButton from './YearButton';

interface SingDateProps {
	date: string;
	onChange: (date: string) => void;
 disable?: DateDisable
}

const SingleDate = ({
	date,
	onChange,
 disable
}: SingDateProps) => {
	const [dateObject, setDateObject] = useState(formatDateToObject(date));

	const { monthData, handleMonth } = useMonth(dateObject.year, dateObject.month);

	useEffect(() => {
		setDateObject(formatDateToObject(date));
	}, [date]);

	const handleYear = (val: string) => {
		setDateObject((prev) => ({
			...prev,
			year: +val,
		}));
	};

	useEffect(() => {
		setDateObject((prev) => ({
			...prev,
			...monthData,
		}));
	}, [monthData]);

	const handleChange = (d: number) => {
		onChange(formatDateToString({ ...dateObject, day: d }));
	};

	return (
		<>
			<div className='mb-8pxr flex items-center gap-20pxr'>
				<YearButton
					year={`${dateObject.year}`}
					updateYear={handleYear}
				/>
				<MoveButton
					text={`${monthData.month}월`}
					onClick={handleMonth}
					className='w-2/3'
				/>
			</div>
			<DateComponent
				viewDate={`${dateObject.year}-${dateObject.month}-${dateObject.day}`}
				onclick={handleChange}
				currentDate={date}
    disable={disable}
			/>
		</>
	);
};

export default SingleDate;
