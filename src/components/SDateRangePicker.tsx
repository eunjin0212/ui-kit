import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import SInput from './SInput';
import { DateIcon16 } from '../assets/DateIcon';
import { Close12 } from '../assets/CloseIcon';
import { getCalculateDate, today } from '../utils/date';
import Icon from './Icon';
import DateBox, { Type } from './datePicker/DateBox';
import DatePickerPortal from './datePicker/DatePickerPortal';
import useDatePicker from '../hooks/useDatePicker';

interface SDateRangePickerProps {
	date: [string, string];
	label?: string;
	deleted?: boolean;
	disabled?: boolean;
	selectable?: [string, string];
	limit?: number;
	onChange?: (date: [string, string]) => void;
}

const SDateRangePicker = ({
	date,
	label,
	deleted = false,
	disabled = false,
	selectable = ['', ''],
	limit,
	onChange,
}: SDateRangePickerProps) => {
	const { formatDate, createCalendar, calculateYearMonth } = useDatePicker();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [dateRange, setDateRange] = useState<[string, string]>(date);
	const [hoverDate, setHoverDate] = useState<string>('');

	const [prevYear, setPrevYear] = useState<number>(
		Number(dateRange[0].split('-')[0])
	);
	const [prevMonth, setPrevMonth] = useState<number>(
		Number(dateRange[0].split('-')[1])
	);

	const nextYear = prevMonth + 1 === 13 ? prevYear + 1 : prevYear;
	const nextMonth = prevMonth + 1 === 13 ? 1 : prevMonth + 1;

	const datePickerRef = useRef<HTMLDivElement>(null);
	const [datePickerRect, setDatePickerRect] = useState<DOMRect | null>(null);

	const prevCalendar = useMemo(
		() => createCalendar(prevYear, prevMonth),
		[createCalendar, prevYear, prevMonth]
	);
	const nextCalendar = useMemo(
		() => createCalendar(nextYear, nextMonth),
		[createCalendar, nextYear, nextMonth]
	);

	function updateYearMonth(type: 'prev' | 'next') {
		const { newYear, newMonth } = calculateYearMonth(prevYear, prevMonth, type);

		setPrevYear(newYear);
		setPrevMonth(newMonth);
	}

	const handleDateClick = (year: number, month: number, day: number) => {
		setHoverDate('');
		const selectedDate = formatDate(year, month, day);

		if (!dateRange[0] || !!dateRange[1] || selectedDate < dateRange[0]) {
			setDateRange([selectedDate, '']);
			onChange?.([selectedDate, '']);
		} else {
			setDateRange([dateRange[0], selectedDate]);
			onChange?.([dateRange[0], selectedDate]);
		}
	};

	const handleDateHover = (year: number, month: number, day: number) => {
		setHoverDate(formatDate(year, month, day));
	};

	const isDateInRange = (date: string): boolean => {
		// 1. 날짜 범위가 완전히 선택된 경우
		if (dateRange[0] && dateRange[1]) {
			return date >= dateRange[0] && date <= dateRange[1];
		}

		// 2. hover 상태의 날짜 범위를 확인
		if (!hoverDate || !dateRange[0] || dateRange[1]) {
			return false;
		}

		// 3. dateRange[0]과 hoverDate를 기준으로 범위 계산
		const [start, end] =
			dateRange[0] <= hoverDate
				? [dateRange[0], hoverDate]
				: [hoverDate, dateRange[0]];

		return date >= start && date <= end;
	};

	const handleDeleteDate = (event: MouseEvent) => {
		event.stopPropagation();
		const clearedRange: [string, string] = ['', ''];
		setDateRange(clearedRange);
		onChange?.(clearedRange);
	};

	const isDisabledDate = (date: string): boolean => {
		if (limit && dateRange[0] && !dateRange[1]) {
			const minDate = getCalculateDate(dateRange[0], -limit);
			const maxDate = getCalculateDate(dateRange[0], limit);
			return !(minDate <= date && date <= maxDate);
		}

		return !(date >= selectable[0] && date <= selectable[1]);
	};

	const getDateBoxType = (date: string): Type => {
		if (date === dateRange[0])
			return dateRange[1] ? 'start' : hoverDate < dateRange[0] ? 'end' : 'start';
		if (date === dateRange[1]) return 'end';
		return '';
	};

	useEffect(() => {
		if (datePickerRef.current) {
			setDatePickerRect(datePickerRef.current.getBoundingClientRect());
		}
	}, [isOpen]);

	useEffect(() => {
		setDateRange(date);
	}, [date]);

	return (
		<>
			<div
				title='datePickerButton'
				ref={datePickerRef}
				className='w-fit'
				onClick={() => {
					if (disabled) return;
					setIsOpen((prev) => !prev);
				}}
			>
				<SInput
					useInsideLabel
					label={label}
					value={`${dateRange[0]} ~ ${dateRange[1]}`}
					readonly
					disable={disabled}
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
				parentRect={datePickerRect}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			>
				<div className='rounded-8pxr p-24pxr shadow-dropdownOptions'>
					<div className='mb-16pxr flex flex-nowrap items-center justify-center'>
						<button
							type='button'
							name='prev'
							title='Previous'
							onClick={() => setPrevYear((prev) => prev - 1)}
						>
							<Icon
								name={'ArrowLeft_12'}
								className='text-Grey_Lighten-2'
							/>
						</button>

						<div className='mx-12pxr w-40pxr text-center text-14pxr leading-24pxr'>
							{prevYear}
						</div>

						<button
							type='button'
							name='next'
							title='Next'
							onClick={() => setPrevYear((prev) => prev + 1)}
						>
							<Icon
								name={'ArrowRight_12'}
								className='text-Grey_Lighten-2'
							/>
						</button>
					</div>

					<div className='flex flex-nowrap items-start'>
						{/* Start Date Picker */}
						<div className='w-fit'>
							<div className='relative w-full text-center text-14pxr'>
								<button
									type='button'
									name='prev'
									title='Previous'
									className='absolute left-0 top-1/2 -translate-y-1/2'
									onClick={() => updateYearMonth('prev')}
								>
									<Icon
										name={'ArrowLeft_12'}
										className='text-Grey_Lighten-2'
									/>
								</button>
								{prevYear}.{String(prevMonth).padStart(2, '0')}
							</div>

							<div className='mt-8pxr grid grid-cols-7'>
								{['일', '월', '화', '수', '목', '금', '토'].map((day) => (
									<DateBox
										key={day}
										date={day}
										className='h-20pxr text-center text-12pxr leading-20pxr text-Grey_Default'
									/>
								))}
							</div>

							<div className='mt-16pxr grid grid-cols-7 gap-y-8pxr'>
								{prevCalendar.prevMonthDays.map((_, idx) => (
									<DateBox
										key={`before-${idx}`}
										date={''}
										disabled
									/>
								))}
								{prevCalendar.days.map((day) => (
									<DateBox
										key={day}
										date={day}
										selected={dateRange.some(
											(date) => date === formatDate(prevYear, prevMonth, day)
										)}
										type={getDateBoxType(formatDate(prevYear, prevMonth, day))}
										isToday={today === formatDate(prevYear, prevMonth, day)}
										disabled={isDisabledDate(formatDate(prevYear, prevMonth, day))}
										inRange={isDateInRange(formatDate(prevYear, prevMonth, day))}
										onClick={() => handleDateClick(prevYear, prevMonth, day)}
										onMouseOver={() => handleDateHover(prevYear, prevMonth, day)}
									/>
								))}
								{prevCalendar.afterMonthDays.map((_, idx) => (
									<DateBox
										key={`after-${idx}`}
										date={''}
										disabled
									/>
								))}
							</div>
						</div>

						<div className='mx-24pxr h-full w-1pxr bg-Grey_Lighten-3'></div>

						{/* End Date Picker */}
						<div className='w-fit'>
							<div className='relative w-full text-center text-14pxr'>
								{nextYear}.{String(nextMonth).padStart(2, '0')}
								<button
									type='button'
									name='next'
									title='Next'
									onClick={() => updateYearMonth('next')}
									className='absolute right-0 top-1/2 -translate-y-1/2'
								>
									<Icon
										name={'ArrowRight_12'}
										className='text-Grey_Lighten-2'
									/>
								</button>
							</div>

							<div className='mt-8pxr grid grid-cols-7'>
								{['일', '월', '화', '수', '목', '금', '토'].map((day) => (
									<DateBox
										date={day}
										key={day}
										className='h-20pxr text-center text-12pxr leading-20pxr text-Grey_Default'
									/>
								))}
							</div>

							<div className='mt-16pxr grid grid-cols-7 gap-y-8pxr'>
								{nextCalendar.prevMonthDays.map((_, idx) => (
									<DateBox
										key={idx}
										date={''}
										disabled
									/>
								))}
								{nextCalendar.days.map((day) => (
									<DateBox
										key={day}
										date={day}
										selected={dateRange.some(
											(date) => date === formatDate(nextYear, nextMonth, day)
										)}
										isToday={today === formatDate(nextYear, nextMonth, day)}
										inRange={isDateInRange(formatDate(nextYear, nextMonth, day))}
										type={getDateBoxType(formatDate(nextYear, nextMonth, day))}
										onClick={() => handleDateClick(nextYear, nextMonth, day)}
										onMouseOver={() => handleDateHover(nextYear, nextMonth, day)}
										disabled={isDisabledDate(formatDate(nextYear, nextMonth, day))}
									/>
								))}
								{nextCalendar.afterMonthDays.map((_, idx) => (
									<DateBox
										key={`after-${idx}`}
										date={''}
										disabled
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
