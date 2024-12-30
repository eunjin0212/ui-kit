import { useEffect, useMemo, useState } from 'react';
import SInput from './SInput';
import { DateIcon16 } from '../assets/DateIcon';
import { Close12 } from '../assets/CloseIcon';
import { getDaysInMonth, oneMonthAgo, today } from '../utils/date';
import Icon from './Icon';
import DateBox from './datePicker/DateBox';

interface SDatePickerProps {
	value: string;
	label?: string;
	deleted?: boolean;
}

const SDatePicker = ({ value, label, deleted = false }: SDatePickerProps) => {
	const [currentDate, setCurrentDate] = useState<string>('');
	const [currentYear, setCurrentYear] = useState<number>(
		new Date().getFullYear()
	);
	const [currentMonth, setCurrentMonth] = useState<number>(
		new Date().getMonth() + 1
	);

	const calendar = useMemo(() => {
		const days = getDaysInMonth(today);
		const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay();
		console.log('firstDayIndex : ', firstDayIndex);

		const prevMonthDays =
			firstDayIndex === 0 ? [] : getDaysInMonth(oneMonthAgo).slice(-firstDayIndex);

		const remainingDays = (7 - ((days.length + firstDayIndex) % 7)) % 7;
		const afterMonthDays = Array.from({ length: remainingDays }, (_, i) => i + 1);

		return { days, prevMonthDays, afterMonthDays };
	}, [currentYear, currentMonth]);

	function getNewMonth(type: 'prev | after') {}

	useEffect(() => {
		const val = value || today;
		setCurrentDate(val);
		setCurrentYear(Number(val.split('-')[0]));
		setCurrentMonth(Number(val.split('-')[1]));
	}, [value]);
	return (
		<>
			<SInput
				useInsideLabel
				label={label}
				value={currentDate}
				readonly
				prepend={<DateIcon16 className='text-Grey_Darken-1' />}
				inputContainerClassName='px-8pxr'
				inputClassName='w-106pxr text-center'
				append={
					deleted ? (
						<button>
							<Close12 className='text-Grey_Default' />{' '}
						</button>
					) : (
						''
					)
				}
			/>

			<div className='w-302pxr rounded-8pxr p-24pxr shadow-dropdownOptions'>
				<div className='flex flex-nowrap items-center gap-x-20pxr text-14pxr'>
					<div className='flex flex-nowrap items-center'>
						<button
							type='button'
							name='prev-year'
							title='Previous Year'
							onClick={() => setCurrentYear(currentYear - 1)}
						>
							<Icon
								name={'ArrowLeft_12'}
								className='text-Grey_Lighten-2'
							/>
						</button>
						<span className='mx-12pxr w-40pxr text-center'>{currentYear}</span>
						<button
							type='button'
							name='next-year'
							title='Next Year'
							onClick={() => setCurrentYear(currentYear + 1)}
						>
							<Icon
								name={'ArrowRight_12'}
								className='text-Grey_Lighten-2'
							/>
						</button>
					</div>
					<div className='flex flex-nowrap items-center'>
						<button
							type='button'
							name='prev-month'
							title='Previous       '
							onClick={() => getNewMonth('prev')}
						>
							<Icon
								name={'ArrowLeft_12'}
								className='text-Grey_Lighten-2'
							/>
						</button>
						<span className='mx-12pxr w-100pxr text-center'>{currentMonth}월</span>
						<button
							type='button'
							name='next-month'
							title='Next Month'
							onClick={() => getNewMonth('after')}
						>
							<Icon
								name={'ArrowRight_12'}
								className='text-Grey_Lighten-2'
							/>
						</button>
					</div>
				</div>

				<div className='mt-8pxr grid grid-cols-7 gap-x-10pxr'>
					{['일', '월', '화', '수', '목', '금', '토'].map((day) => (
						<div
							key={day}
							className='h-20pxr text-center text-12pxr leading-20pxr text-Grey_Default'
						>
							{day}
						</div>
					))}
				</div>

				<div className='mt-16pxr grid grid-cols-7 gap-x-10pxr gap-y-8pxr'>
					{calendar.prevMonthDays.map((day, idx) => (
						<DateBox
							key={idx}
							date={day}
						/>
					))}
					{calendar.days.map((day) => (
						<DateBox
							key={day}
							date={day}
							selected={day === Number(currentDate.split('-')[2])}
							onClick={() => setCurrentDate(`${currentYear}-${currentMonth}-${day}`)}
						/>
					))}
					{calendar.afterMonthDays.map((day, idx) => (
						<DateBox
							key={`after-${idx}`}
							date={day}
							className='text-Grey_Lighten-2'
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default SDatePicker;
