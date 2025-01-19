import { getDaysInMonth, today } from '../utils/date';

const useDatePicker = () => {
	const formatDate = (year: number, month: number, day: number) => {
		return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
	};

	const createCalendar = (year: number, month: number) => {
		const days = getDaysInMonth(today);
		const firstDayIndex = new Date(year, month - 1, 1).getDay();
		const prevMonthDays = Array.from({ length: firstDayIndex });
		const remainingDays = (7 - ((days.length + firstDayIndex) % 7)) % 7;
		const afterMonthDays = Array.from({ length: remainingDays });

		return { days, prevMonthDays, afterMonthDays };
	};

	const calculateYearMonth = (
		year: number,
		month: number,
		type: 'prev' | 'next'
	) => {
		let newYear = year;
		let newMonth = type === 'prev' ? month - 1 : month + 1;
		if (newMonth < 1) {
			newYear = year - 1;
			newMonth = 12;
		} else if (newMonth > 12) {
			newYear = year + 1;
			newMonth = 1;
		}
		return { newYear, newMonth };
	};

	return { formatDate, createCalendar, calculateYearMonth };
};

export default useDatePicker;
