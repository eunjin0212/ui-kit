import { useEffect, useState } from 'react';

const useGenerateWeeks = (currentDate: string) => {
	const [weeks, setWeeks] = useState<(number | null)[][]>([]);

	useEffect(() => {
		const today = currentDate ? new Date(currentDate) : new Date();
		const year = today.getFullYear();
		const month = today.getMonth();

		const getDaysInMonth = (year: number, month: number) => {
			return new Date(year, month + 1, 0).getDate();
		};

		const firstDayOfMonth = new Date(year, month, 1).getDay();
		const daysInMonth = getDaysInMonth(year, month);

		const newWeeks: (number | null)[][] = [];
		let days: (number | null)[] = [];

		for (let i = 0; i < firstDayOfMonth; i++) {
			days.push(null);
		}

		const WEEK_DAY = 7;
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(day);

			if ((day + firstDayOfMonth) % WEEK_DAY === 0 || day === daysInMonth) {
				newWeeks.push(days);
				days = [];
			}
		}

		setWeeks(newWeeks); // Update weeks state
	}, [currentDate]);

	return { weeks };
};

export default useGenerateWeeks;
