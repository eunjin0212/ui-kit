import useGenerateWeeks from '../../hooks/useGenerateWeeks';
import Weeks from './Weeks';

const DateComponent = ({
	date = '',
	onclick,
}: {
	date: string;
	onclick: (date: number) => void;
}) => {
	const { weeks } = useGenerateWeeks(date);

 const dateStateClass = {
  disable: 'text-Grey_Lighten-2'
 }
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
							onClick={() => day !== null && onclick(day)}
							className={[
								'text-center leading-28pxr',
								day !== null ? 'cursor-pointer' : '',
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
