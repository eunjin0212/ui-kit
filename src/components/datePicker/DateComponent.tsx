import useGenerateWeeks from '../../hooks/useGenerateWeeks';
import { formatDateToObject } from '../../utils/date';
import Weeks from './Weeks';

export type DateDisable = [string | null, string | null];

interface DateProps {
	currentDate: string;
	viewDate: string;
	onclick: (date: number) => void;
	disable?: DateDisable;
}

const DateComponent = ({
	viewDate = '',
	currentDate = '',
	onclick,
	disable,
}: DateProps) => {
	const { weeks } = useGenerateWeeks(viewDate);

	const isTodayAtCalendar = (date: string) => {
		const dateObj = formatDateToObject(date);
		const today = new Date();

		return +dateObj.year !== today.getFullYear() ||
			+dateObj.month !== today.getMonth() + 1
			? 0
			: today.getDate();
	};

	const isDisable = (viewDate: string, day: null | number) => {
		if (!disable || !day) return false;

		const [disableStart, disableEnd] = disable;
		const view = new Date(viewDate);
		view.setDate(day);

		const isBeforeStart = disableStart ? new Date(disableStart) > view : false;
		const isAfterEnd = disableEnd ? new Date(disableEnd) < view : false;

		return isBeforeStart || isAfterEnd;
	};

	const className = (day: number | null) => {
		let styleClass = '';
		if (isDisable(viewDate, day)) {
			styleClass = 'cursor-not-allowed text-Grey_Lighten-2';
		}
  
  if (isTodayAtCalendar(viewDate) === day) {
   styleClass =
    'cursor-pointer before:rounded-full before:border before:border-Grey_Lighten-3';
  }

		if (
			formatDateToObject(currentDate).year === formatDateToObject(viewDate).year &&
   formatDateToObject(currentDate).month === formatDateToObject(viewDate).month &&
			+formatDateToObject(currentDate).day === day
		) {
			styleClass =
				'cursor-pointer font-bold text-white before:rounded-full before:border-none before:bg-Blue_C_Default';
		}

		return styleClass;
	};

	return (
		<ul className='flex flex-col'>
			<Weeks />
			{weeks.map((weekDate, index) => (
				<li
					className={[
						'grid grid-cols-7 gap-x-10pxr py-4pxr text-center',
						`grid-rows-${weekDate.length}`,
					].join(' ')}
					key={`date-${index}`}
				>
					{weekDate.map((day, idx) => (
						<div
							onClick={() =>
								isDisable(viewDate, day) || (day !== null && onclick(day))
							}
							className={[
								'relative z-0 h-28pxr w-28pxr text-center leading-28pxr before:absolute before:left-0 before:-z-10 before:h-full before:w-full',
								day === null ? 'cursor-default' : 'cursor-pointer hover:before:rounded-none hover:before:border-none hover:before:bg-Blue_C_Lighten-5',
        className(day),
							].join(' ')}
							key={`day-${day}-${idx}`}
						>
       {day}
						</div>
					))}
				</li>
			))}
		</ul>
	);
};

export default DateComponent;
