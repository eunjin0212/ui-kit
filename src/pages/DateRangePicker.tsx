import { useState } from 'react';
import SDateRangePicker from '../components/SDateRangePicker';
import { yesterday } from '../utils/date';

const DatePicker = () => {
	const [date, setDate] = useState<[string, string]>([yesterday, '2025-03-01']);
	return (
		<div className='flex flex-col gap-y-12pxr'>
			{date[0]} ~ {date[1]}
			<SDateRangePicker date={date} />
			<SDateRangePicker
				label='label'
				date={date}
				onChange={(newDate) => setDate(newDate)}
			/>
			<SDateRangePicker
				label='deleted'
				date={date}
				deleted
			/>
		</div>
	);
};

export default DatePicker;
