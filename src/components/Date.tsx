import { ReactNode, useEffect, useState } from 'react';

const DateComponent = ({
	date = '',
	onclick,
}: {
	date: string;
	onclick: (date: number) => void;
}) => {
 const [weeks, setWeeks] = useState<ReactNode[][]>([])
 useEffect(() => {
  const today = date ? new Date(date) : new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);

  const newWeeks: ReactNode[][] = [];
  let days: ReactNode[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(
      <div
        className="h-pxr w-28pxr text-center leading-28pxr"
        key={`empty-${i}`}
      ></div>
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <div
        key={day}
        onClick={() => onclick(day)}
        className="h-pxr text-center leading-28pxr cursor-pointer"
      >
        {day}
      </div>
    );
    if ((day + firstDayOfMonth) % 7 === 0 || day === daysInMonth) {
      newWeeks.push(days);
      days = [];
    }
  }

  setWeeks(newWeeks); // Update weeks state
}, [date]);

	return (
		<ul className='flex flex-col'>
			<li className='grid grid-cols-7 gap-x-10pxr text-center justify-center items-center mb-12pxr'>
				<div className='h-20pxr leading-20pxr text-center'>Sun</div>
				<div className='h-20pxr leading-20pxr text-center'>Mon</div>
				<div className='h-20pxr leading-20pxr text-center'>Tue</div>
				<div className='h-20pxr leading-20pxr text-center'>Wed</div>
				<div className='h-20pxr leading-20pxr text-center'>Thu</div>
				<div className='h-20pxr leading-20pxr text-center'>Fri</div>
				<div className='h-20pxr leading-20pxr text-center'>Sat</div>
			</li>
			{weeks.map((week, index) => (
				<li
					className={[
						'grid grid-cols-7 text-center gap-x-10pxr py-4pxr',
						`grid-rows-${week.length}`,
					].join(' ')}
					key={index}
				>
					{week}
				</li>
			))}
		</ul>
	);
};

export default DateComponent;
