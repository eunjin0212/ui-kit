import { useState } from 'react';
import SDateRangePicker from '../components/SDateRangePicker';
import { today, yesterday } from '../utils/date';

const DatePicker = () => {
	const [date, setDate] = useState<[string, string]>([yesterday, today]);
	return (
		<div className='flex flex-col gap-y-12pxr'>
			<SDateRangePicker value={date} />
			{date}
			<SDateRangePicker
				label='label'
				value={date}
				setDate={(newDate) => setDate(newDate)}
			/>
			<SDateRangePicker
				label='deleted'
				value={date}
				deleted
			/>
		</div>
	);
};

export default DatePicker;
