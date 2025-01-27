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

	const handleDateClick = (type: 'prev' | 'next', day: number) => {
		setHoverDate('');

		const selectedDate =
			type === 'prev'
				? formatDate(prevYear, prevMonth, day)
				: formatDate(nextYear, nextMonth, day);

		if (!dateRange[0] || !!dateRange[1] || selectedDate < dateRange[0]) {
			setDateRange([selectedDate, '']);
			onChange?.([selectedDate, '']);
		} else {
			setDateRange([dateRange[0], selectedDate]);
			onChange?.([dateRange[0], selectedDate]);
		}
	};

	const handleDateHover = (type: 'prev' | 'next', day: number) => {
		const hoverDate =
			type === 'prev'
				? formatDate(prevYear, prevMonth, day)
				: formatDate(nextYear, nextMonth, day);
		setHoverDate(hoverDate);
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
				onClick={() => !disabled && setIsOpen((prev) => !prev)}
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

					<div className='relative flex flex-nowrap items-start gap-x-48pxr'>
						{[prevCalendar, nextCalendar].map((calendar, index) => (
							<div
								key={index}
								className='w-266pxr'
							>
								<div className='relative w-full text-center text-14pxr'>
									<button
										type='button'
										name='month'
										title='Month'
										className={[
											'absolute  top-1/2 -translate-y-1/2',
											index === 0 ? 'left-0' : 'right-1',
										].join(' ')}
										onClick={() => updateYearMonth(index === 0 ? 'prev' : 'next')}
									>
										<Icon
											name={index === 0 ? 'ArrowLeft_12' : 'ArrowRight_12'}
											className='text-Grey_Lighten-2'
										/>
									</button>
									{index === 0
										? `${prevYear}.${String(prevMonth).padStart(2, '0')}`
										: `${nextYear}.${String(nextMonth).padStart(2, '0')}`}
								</div>

								<div className='mt-8pxr grid grid-cols-7'>
									{['일', '월', '화', '수', '목', '금', '토'].map((day) => (
										<DateBox
											key={day}
											date={day}
											disabled
											className='text-12pxr !text-Grey_Default'
										/>
									))}
								</div>

								<div className='mt-12pxr grid grid-cols-7 gap-y-8pxr'>
									{[
										...calendar.prevMonthDays,
										...calendar.days,
										...calendar.afterMonthDays,
									].map((day, idx) => (
										<DateBox
											key={`prev${day}_${idx}`}
											date={!day ? '' : Number(day)}
											selected={dateRange.some(
												(date) =>
													date ===
													formatDate(
														index === 0 ? prevYear : nextYear,
														index === 0 ? prevMonth : nextMonth,
														Number(day)
													)
											)}
											type={getDateBoxType(
												formatDate(
													index === 0 ? prevYear : nextYear,
													index === 0 ? prevMonth : nextMonth,
													Number(day)
												)
											)}
											isToday={
												today ===
												formatDate(
													index === 0 ? prevYear : nextYear,
													index === 0 ? prevMonth : nextMonth,
													Number(day)
												)
											}
											disabled={
												!day
													? true
													: isDisabledDate(
															formatDate(
																index === 0 ? prevYear : nextYear,
																index === 0 ? prevMonth : nextMonth,
																Number(day)
															)
														)
											}
											inRange={isDateInRange(
												formatDate(
													index === 0 ? prevYear : nextYear,
													index === 0 ? prevMonth : nextMonth,
													Number(day)
												)
											)}
											onClick={() =>
												handleDateClick(index === 0 ? 'prev' : 'next', Number(day))
											}
											onMouseOver={() =>
												handleDateHover(index === 0 ? 'prev' : 'next', Number(day))
											}
										/>
									))}
								</div>
							</div>
						))}
						<div className='absolute left-1/2 top-0 h-full w-1pxr -translate-x-1/2 bg-Grey_Lighten-8'></div>
					</div>
				</div>
			</DatePickerPortal>
		</>
	);
};

export default SDateRangePicker;
