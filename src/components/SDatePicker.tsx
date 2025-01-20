import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import SInput from './SInput';
import { DateIcon16 } from '../assets/DateIcon';
import { Close12 } from '../assets/CloseIcon';
import { today } from '../utils/date';
import Icon from './Icon';
import DateBox from './datePicker/DateBox';
import DatePickerPortal from './datePicker/DatePickerPortal';
import useDatePicker from '../hooks/useDatePicker';

interface SDatePickerProps {
	date: string;
	label?: string;
	deleted?: boolean;
	disabled?: boolean;
	selectable?: [string, string];
	onChange?: (date: string) => void;
}

const SDatePicker = ({
	date,
	label,
	deleted = false,
	disabled = false,
	selectable = ['', ''],
	onChange,
}: SDatePickerProps) => {
	const { formatDate, createCalendar, calculateYearMonth } = useDatePicker();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentDate, setCurrentDate] = useState<string>(date);
	const [currentYear, setCurrentYear] = useState<number>(
		Number(date.split('-')[0])
	);
	const [currentMonth, setCurrentMonth] = useState<number>(
		Number(date.split('-')[1])
	);

	const datePickerRef = useRef<HTMLDivElement>(null);
	const [datePickerRect, setDatePickerRect] = useState<DOMRect | null>(null);

	const calendar = useMemo(() => {
		return createCalendar(currentYear, currentMonth);
	}, [createCalendar, currentYear, currentMonth]);

	function handleUpdateMonth(type: 'prev' | 'next') {
		const { newYear, newMonth } = calculateYearMonth(
			currentYear,
			currentMonth,
			type
		);
		setCurrentYear(newYear);
		setCurrentMonth(newMonth);
	}

	const handleDateClick = (day: number) => {
		const date = formatDate(currentYear, currentMonth, day);
		setCurrentDate(date);
		setIsOpen(false);
		onChange?.(date);
	};

	const handleDeleteDate = (event: MouseEvent) => {
		event.stopPropagation();
		setCurrentDate('');
		onChange?.('');
	};

	const isDisabledDate = (date: string): boolean => {
		const [startSelectable, endSelectable] = selectable;

		if (startSelectable && endSelectable) {
			return date < startSelectable || date > endSelectable;
		}

		if (startSelectable) {
			return date < startSelectable;
		}

		if (endSelectable) {
			return date > endSelectable;
		}

		return false;
	};

	useEffect(() => {
		if (datePickerRef.current) {
			setDatePickerRect(datePickerRef.current.getBoundingClientRect());
		}
	}, [currentDate, isOpen]);

	useEffect(() => {
		setCurrentDate(date || today);
		const [year, month] = (date || today).split('-');
		setCurrentYear(Number(year));
		setCurrentMonth(Number(month));
	}, [date]);
	return (
		<>
			<div
				ref={datePickerRef}
				className='w-fit'
				onClick={() => {
					if (disabled) return;
					setIsOpen((prev) => !prev);
					setCurrentDate('');
				}}
			>
				<SInput
					useInsideLabel
					label={label}
					value={date}
					readonly
					disable={disabled}
					prepend={<DateIcon16 className='text-Grey_Darken-1' />}
					inputContainerClassName='px-8pxr'
					inputClassName='w-106pxr text-center'
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
				<div className='w-302pxr rounded-8pxr p-24pxr shadow-dropdownOptions'>
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
								onClick={() => handleUpdateMonth('prev')}
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
								onClick={() => handleUpdateMonth('next')}
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
						{calendar.prevMonthDays.map((_, idx) => (
							<DateBox
								key={`before-${idx}`}
								date={''}
								className='text-Grey_Lighten-2'
							/>
						))}
						{calendar.days.map((day) => (
							<DateBox
								key={day}
								date={day}
								selected={currentDate === formatDate(currentYear, currentMonth, day)}
								isToday={today === formatDate(currentYear, currentMonth, day)}
								onClick={() => handleDateClick(day)}
								disabled={isDisabledDate(formatDate(currentYear, currentMonth, day))}
							/>
						))}
						{calendar.afterMonthDays.map((_, idx) => (
							<DateBox
								key={`after-${idx}`}
								date={''}
								className='text-Grey_Lighten-2'
							/>
						))}
					</div>
				</div>
			</DatePickerPortal>
		</>
	);
};

export default SDatePicker;
