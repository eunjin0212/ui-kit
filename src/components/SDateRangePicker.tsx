import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import SInput from './SInput';
import { DateIcon16 } from '../assets/DateIcon';
import { Close12 } from '../assets/CloseIcon';
import { getDaysInMonth, oneMonthAgo, today } from '../utils/date';
import Icon from './Icon';
import DateBox from './datePicker/DateBox';
import DatePickerPortal from './datePicker/DatePickerPortal';

interface SDateRangePickerProps {
	date: [string, string];
	label?: string;
	deleted?: boolean;
	onChange?: (date: [string, string]) => void;
}

const SDateRangePicker = ({
	date,
	label,
	deleted = false,
	onChange,
}: SDateRangePickerProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [dateRange, setDateRange] = useState<[string, string]>(date);

	// Date states for left and right calendars
	const [leftYear, setLeftYear] = useState<number>(
		Number(dateRange[0].split('-')[0])
	);
	const [leftMonth, setLeftMonth] = useState<number>(
		Number(dateRange[0].split('-')[1])
	);

	const [rightYear, setRightYear] = useState<number>(
		Number(dateRange[1].split('-')[0])
	);
	const [rightMonth, setRightMonth] = useState<number>(
		Number(dateRange[1].split('-')[1])
	);

	const datePickerRef = useRef<HTMLDivElement>(null);
	const [datePickerRect, setDatePickerRect] = useState<DOMRect | null>(null);

	// Calendar generation for both calendars
	const createCalendar = (year: number, month: number) => {
		const days = getDaysInMonth(today);
		const firstDayIndex = new Date(year, month - 1, 1).getDay();

		const prevMonthDays =
			firstDayIndex === 0 ? [] : getDaysInMonth(oneMonthAgo).slice(-firstDayIndex);

		const remainingDays = (7 - ((days.length + firstDayIndex) % 7)) % 7;
		const afterMonthDays = Array.from({ length: remainingDays }, (_, i) => i + 1);

		return { days, prevMonthDays, afterMonthDays };
	};

	const leftCalendar = useMemo(
		() => createCalendar(leftYear, leftMonth),
		[leftYear, leftMonth]
	);
	const rightCalendar = useMemo(
		() => createCalendar(rightYear, rightMonth),
		[rightYear, rightMonth]
	);

	// Month navigation
	const updateMonth = (type: 'prev' | 'next', side: 'left' | 'right') => {
		if (side === 'left') {
			setLeftMonth((prev) => {
				let newMonth = type === 'prev' ? prev - 1 : prev + 1;
				if (newMonth < 1) {
					setLeftYear((prev) => prev - 1);
					newMonth = 12;
				} else if (newMonth > 12) {
					setLeftYear((prev) => prev + 1);
					newMonth = 1;
				}
				return newMonth;
			});
		} else {
			setRightMonth((prev) => {
				let newMonth = type === 'prev' ? prev - 1 : prev + 1;
				if (newMonth < 1) {
					setRightYear((prev) => prev - 1);
					newMonth = 12;
				} else if (newMonth > 12) {
					setRightYear((prev) => prev + 1);
					newMonth = 1;
				}
				return newMonth;
			});
		}
	};

	// Date formatting
	const formatDate = (year: number, month: number, day: number) => {
		return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
	};

	const handleDateClick = (year: number, month: number, day: number) => {
		const selectedDate = formatDate(year, month, day);

		if (!dateRange[0] || selectedDate < dateRange[0]) {
			setDateRange((prev) => (prev[0] = selectedDate));
			// setCurrentStartDate(selectedDate);
		} else {
			setDateRange((prev) => (prev[1] = selectedDate));

			// setCurrentEndDate(selectedDate);
			onChange?.(dateRange);
		}
	};

	const handleDeleteDate = (event: MouseEvent) => {
		event.stopPropagation();
		setDateRange(['', '']);
		onChange?.(dateRange);
	};

	// const calendar = useMemo(() => {
	// 	const days = getDaysInMonth(today);
	// 	const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay();
	// 	const prevMonthDays =
	// 		firstDayIndex === 0 ? [] : getDaysInMonth(today).slice(-firstDayIndex);
	// 	const remainingDays = (7 - ((days.length + firstDayIndex) % 7)) % 7;
	// 	const afterMonthDays = Array.from({ length: remainingDays }, (_, i) => i + 1);

	// 	return { days, prevMonthDays, afterMonthDays };
	// }, [currentYear, currentMonth]);

	useEffect(() => {
		if (datePickerRef.current) {
			setDatePickerRect(datePickerRef.current.getBoundingClientRect());
		}
	}, [isOpen]);

	useEffect(() => {
		setDateRange([date[0], date[1]]);
	}, [date]);
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
					value={`${dateRange[0]} ~ ${dateRange[1]}`}
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
				parentRect={datePickerRect}
				parentRef={datePickerRef}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			>
				<div className='rounded-8pxr p-24pxr shadow-dropdownOptions'>
					<div className='flex flex-nowrap items-start'>
						{/* Start Date Picker */}
						<div className='w-fit'>
							<div className='relative w-full text-center text-14pxr'>
								<button
									type='button'
									name='prev'
									title='Previous'
									// onClick={() => setCurrentYear(currentYear - 1)}
									className='absolute left-0 top-1/2 -translate-y-1/2'
								>
									<Icon
										name={'ArrowLeft_12'}
										className='text-Grey_Lighten-2'
									/>
								</button>
								{leftYear}.{leftMonth}
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
								{leftCalendar.prevMonthDays.map((day, idx) => (
									<DateBox
										key={idx}
										date={day}
										className='text-Grey_Lighten-2'
									/>
								))}
								{leftCalendar.days.map((day) => (
									<DateBox
										key={day}
										date={day}
										selected={
											dateRange[0] ===
											`${leftYear}-${String(leftMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
										}
										isToday={
											today.split('-')[0] === String(leftYear) &&
											today.split('-')[1] === String(leftMonth).padStart(2, '0') &&
											today.split('-')[2] === String(day).padStart(2, '0')
										}
										// onClick={() => handleDateClick(day)}
									/>
								))}
								{leftCalendar.afterMonthDays.map((day, idx) => (
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
							<div className='relative w-full text-center text-14pxr'>
								{rightYear}.{rightMonth}
								<button
									type='button'
									name='next'
									title='Next'
									// onClick={() => setCurrentYear(currentYear + 1)}
									className='absolute right-0 top-1/2 -translate-y-1/2'
								>
									<Icon
										name={'ArrowRight_12'}
										className='text-Grey_Lighten-2'
									/>
								</button>
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
								{rightCalendar.prevMonthDays.map((day, idx) => (
									<DateBox
										key={idx}
										date={day}
										className='text-Grey_Lighten-2'
									/>
								))}
								{rightCalendar.days.map((day) => (
									<DateBox
										key={day}
										date={day}
										selected={
											dateRange[1] ===
											`${rightYear}-${String(rightMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
										}
										isToday={
											today.split('-')[0] === String(rightYear) &&
											today.split('-')[1] === String(rightMonth).padStart(2, '0') &&
											today.split('-')[2] === String(day).padStart(2, '0')
										}
										// onClick={() => handleDateClick(day)}
									/>
								))}
								{rightCalendar.afterMonthDays.map((day, idx) => (
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
