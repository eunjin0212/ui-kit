import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import SInput from './SInput';
import { DateIcon16 } from '../assets/DateIcon';
import { Close12 } from '../assets/CloseIcon';
import { getDaysInMonth, today } from '../utils/date';
import Icon from './Icon';
import DateBox from './datePicker/DateBox';
import DatePickerPortal from './datePicker/DatePickerPortal';

interface SDateRangePickerProps {
	value: [string, string];
	label?: string;
	deleted?: boolean;
	setDate?: (date: [string, string]) => void;
}

const SDateRangePicker = ({
	value,
	label,
	deleted = false,
	setDate,
}: SDateRangePickerProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [currentStartDate, setCurrentStartDate] = useState<string>(value[0]);
	const [currentEndDate, setCurrentEndDate] = useState<string>(value[1]);
	const [currentYear, setCurrentYear] = useState<number>(
		new Date().getFullYear()
	);
	const [currentMonth, setCurrentMonth] = useState<number>(
		new Date().getMonth() + 1
	);

	const datePickerRef = useRef<HTMLDivElement>(null);

	const calendar = useMemo(() => {
		const days = getDaysInMonth(today);
		const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay();
		const prevMonthDays =
			firstDayIndex === 0 ? [] : getDaysInMonth(today).slice(-firstDayIndex);
		const remainingDays = (7 - ((days.length + firstDayIndex) % 7)) % 7;
		const afterMonthDays = Array.from({ length: remainingDays }, (_, i) => i + 1);

		return { days, prevMonthDays, afterMonthDays };
	}, [currentYear, currentMonth]);

	const getNewMonth = (type: 'prev' | 'next') => {
		if (type === 'prev') {
			setCurrentMonth(currentMonth === 1 ? 12 : currentMonth - 1);
			if (currentMonth === 1) setCurrentYear(currentYear - 1);
		} else {
			setCurrentMonth(currentMonth === 12 ? 1 : currentMonth + 1);
			if (currentMonth === 12) setCurrentYear(currentYear + 1);
		}
	};

	// const formatDate = (year: number, month: number, day: number) => {
	// 	return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
	// };

	const handleDateClick = (day: number) => {
		console.log(day);
		// const date = formatDate(currentYear, currentMonth, day);
		// setCurrentDate(date);
		// setDate?.(date);
	};

	const handleDeleteDate = (event: MouseEvent) => {
		event.stopPropagation();
		// setCurrentDate('');
	};

	useEffect(() => {
		setCurrentStartDate(value[0]);
		setCurrentEndDate(value[1]);

		console.log(value);
	}, [value]);
	return (
		<>
			<div
				title='datePickerButton'
				ref={datePickerRef}
				className='w-fit'
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<SInput
					useInsideLabel
					label={label}
					value={`${currentStartDate} ~ ${currentEndDate}`}
					readonly
					prepend={<DateIcon16 className='text-Grey_Darken-1' />}
					inputContainerClassName='px-8pxr'
					inputClassName='w-210pxr text-center'
					append={
						deleted ? (
							<button
								type='button'
								title='closeButton'
								onClick={(event) => handleDeleteDate(event)}
							>
								<Close12 className='text-Grey_Default' />{' '}
							</button>
						) : (
							''
						)
					}
				/>
			</div>
			<DatePickerPortal
				parentRef={datePickerRef}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			>
				<div className='rounded-8pxr p-24pxr shadow-dropdownOptions'>
					<div className='flex flex-nowrap items-center'>
						{/* Start Date Picker */}
						<div className='w-fit'>
							<div className='flex flex-nowrap items-center gap-x-20pxr text-14pxr'>
								{/* Year Navigation */}
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

								{/* Month Navigation */}
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
										onClick={() => getNewMonth('next')}
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
										className='text-Grey_Lighten-2'
									/>
								))}
								{calendar.days.map((day) => (
									<DateBox
										key={day}
										date={day}
										selected={
											currentStartDate ===
											`${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
										}
										isToday={
											today.split('-')[0] === String(currentYear) &&
											today.split('-')[1] === String(currentMonth).padStart(2, '0') &&
											today.split('-')[2] === String(day).padStart(2, '0')
										}
										onClick={() => handleDateClick(day)}
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

						<div className='mx-24pxr h-full w-1pxr bg-Grey_Lighten-3'></div>

						{/* End Date Picker */}
						<div className='w-fit'>
							<div className='flex flex-nowrap items-center gap-x-20pxr text-14pxr'>
								{/* Year Navigation */}
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

								{/* Month Navigation */}
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
										onClick={() => getNewMonth('next')}
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
										className='text-Grey_Lighten-2'
									/>
								))}
								{calendar.days.map((day) => (
									<DateBox
										key={day}
										date={day}
										selected={
											currentEndDate ===
											`${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
										}
										isToday={
											today.split('-')[0] === String(currentYear) &&
											today.split('-')[1] === String(currentMonth).padStart(2, '0') &&
											today.split('-')[2] === String(day).padStart(2, '0')
										}
										onClick={() => handleDateClick(day)}
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
					</div>
				</div>
			</DatePickerPortal>
		</>
	);
};

export default SDateRangePicker;
