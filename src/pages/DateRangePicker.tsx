import { useState } from 'react';
import SDateRangePicker from '../components/SDateRangePicker';
import { today, yesterday } from '../utils/date';

const DatePicker = () => {
	const [date, setDate] = useState<[string, string]>([yesterday, '2025-03-01']);
	return (
		<div className='flex flex-col gap-y-12pxr'>
			{date[0]} ~ {date[1]}
			<SDateRangePicker
				date={date}
				selectable={['', today]}
			/>
			<SDateRangePicker
				label='label'
				date={date}
				onChange={(newDate) => setDate(newDate)}
				selectable={['2025-01-05', '2025-03-20']}
				limit={10}
			/>
			<SDateRangePicker
				label='deleted'
				date={date}
				deleted
				selectable={['', '2025-03-20']}
				disabled
			/>
		</div>
	);
};

export default DatePicker;
