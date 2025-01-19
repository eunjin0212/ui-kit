import { useEffect, useState } from 'react';
import { formatDateToObject, formatDateToString } from '../../utils/date';
import { useMonth, useYear } from '../../hooks/useDate';
import DateComponent, { type DateDisable } from './DateComponent';
import MoveButton from './MoveButton';

interface RangeDateProps {
	date: string[];
	onChange: (date: string[]) => void;
	disable?: DateDisable;
}

const RangeDate = ({ date, onChange, disable }: RangeDateProps) => {
	const [startDateObject, setStartDateObject] = useState(
		formatDateToObject(date[0])
	);
	const [endDateObject, setEndDateObject] = useState({
		...formatDateToObject(date[1]),
		month: formatDateToObject(date[1]).month + 1,
	});

	const { monthData: startMonth, handleMonth: handleStartMonth } = useMonth(
		startDateObject.year,
		startDateObject.month
	);
	const { monthData: endMonth, handleMonth: handleEndMonth } = useMonth(
		endDateObject.year,
		endDateObject.month
	);
	const { yearValue, handleYear } = useYear(startDateObject.year);

	const handleStartChange = (d: number) => {
		onChange([formatDateToString({ ...startDateObject, day: d }), date[1]]);
	};

	const handleEndChange = (d: number) => {
		onChange([date[0], formatDateToString({ ...endDateObject, day: d })]);
	};

	const handleToday = () => {
		const today = new Date();
		setStartDateObject(() => ({
			year: today.getFullYear(),
			month: today.getMonth() + 1,
			day: today.getDate(),
		}));

		setEndDateObject(() => ({
			year:
				today.getMonth() + 2 === 13 ? today.getFullYear() + 1 : today.getFullYear(),
			month: today.getMonth() + 2,
			day: today.getDate(),
		}));
	};

	useEffect(() => {
		setStartDateObject((prev) => ({
			...prev,
			year: startMonth.year,
			month: startMonth.month,
		}));
	}, [startMonth.year, startMonth.month]);

	useEffect(() => {
		setEndDateObject((prev) => ({
			...prev,
			year: endMonth.year,
			month: endMonth.month,
		}));
	}, [endMonth.year, endMonth.month]);

	const monthClass =
		'inline-flex flex-col items-center first:pr-20pxr first:border-r first:border-r-Grey_Lighten-8 last:pl-20pxr [&>*:first-child]:w-full [&>*:first-child]:mb-8pxr';

	return (
		<>
			<div className='relative mb-16pxr flex items-center justify-center'>
				<MoveButton
					text={`${yearValue}`}
					onClick={handleYear}
					className='w-88pxr'
				/>
				<button
					className='absolute right-0 top-0 text-14pxr text-Grey_Darken-4 underline'
					onClick={handleToday}
				>
					오늘
				</button>
			</div>
			<div className='flex items-start'>
				<div className={monthClass}>
					<MoveButton
						text={`${startMonth.month}월`}
						onClick={(target) => {
							handleStartMonth(target);
							handleEndMonth('prev');
						}}
						hide='next'
					/>
					<DateComponent
						viewDate={`${startDateObject.year}-${startDateObject.month}-${startDateObject.day}`}
						onclick={handleStartChange}
						currentDate={date[0]}
						disable={disable}
					/>
				</div>
				<div className={monthClass}>
					<MoveButton
						text={`${endMonth.month}월`}
						onClick={(target) => {
							handleEndMonth(target);
							handleStartMonth('next');
						}}
						hide='prev'
					/>
					<DateComponent
						viewDate={`${endDateObject.year}-${endDateObject.month}-${endDateObject.day}`}
						onclick={handleEndChange}
						currentDate={date[1]}
						disable={disable}
					/>
				</div>
			</div>
		</>
	);
};

export default RangeDate;
