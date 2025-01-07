import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import SInput from './SInput';
import { DateIcon16 } from '../assets/DateIcon';
import { Close12 } from '../assets/CloseIcon';
import { getDaysInMonth, oneMonthAgo, today } from '../utils/date';
import Icon from './Icon';
import DateBox from './datePicker/DateBox';
import DatePickerPortal from './datePicker/DatePickerPortal';

interface SDatePickerProps {
	date: string;
	label?: string;
	deleted?: boolean;
	onChange?: (date: string) => void;
}

const SDatePicker = ({
	date,
	label,
	deleted = false,
	onChange,
}: SDatePickerProps) => {
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
		const days = getDaysInMonth(today);

		const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay();

		const prevMonthDays =
			firstDayIndex === 0 ? [] : getDaysInMonth(oneMonthAgo).slice(-firstDayIndex);

		const remainingDays = (7 - ((days.length + firstDayIndex) % 7)) % 7;

		const afterMonthDays = Array.from({ length: remainingDays }, (_, i) => i + 1);

		return { days, prevMonthDays, afterMonthDays };
	}, [currentYear, currentMonth]);

	function updateMonth(type: 'prev' | 'next') {
		setCurrentMonth((prevMonth) => {
			let newMonth = type === 'prev' ? prevMonth - 1 : prevMonth + 1;
			if (newMonth < 1) {
				setCurrentYear((prevYear) => prevYear - 1);
				newMonth = 12;
			} else if (newMonth > 12) {
				setCurrentYear((prevYear) => prevYear + 1);
				newMonth = 1;
			}
			return newMonth;
		});
	}

	const formatDate = (year: number, month: number, day: number) => {
		return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
	};

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
					setIsOpen((prev) => !prev);
					setCurrentDate('');
				}}
			>
				<SInput
					useInsideLabel
					label={label}
					value={date}
					readonly
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
								onClick={() => updateMonth('prev')}
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
								onClick={() => updateMonth('next')}
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
									currentYear === Number(currentDate.split('-')[0]) &&
									currentMonth === Number(currentDate.split('-')[1]) &&
									day === Number(currentDate.split('-')[2])
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
			</DatePickerPortal>
		</>
	);
};

export default SDatePicker;
