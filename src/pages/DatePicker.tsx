import { useState } from 'react';
import SDatePicker from '../components/SDatePicker';
import { today } from '../utils/date';

const DatePicker = () => {
	const [date, setDate] = useState<string>('');
	return (
		<div className='flex flex-col gap-y-12pxr'>
			{date}
			<SDatePicker
				date={date}
				onChange={(newDate) => setDate(newDate)}
				disabled
			/>
			<SDatePicker
				label='label'
				date={date}
				onChange={(newDate) => setDate(newDate)}
				selectable={['', today]}
			/>
			<SDatePicker
				label='deleted'
				date={date}
				deleted
				disabled
				onChange={(newDate) => setDate(newDate)}
			/>
		</div>
	);
};

export default DatePicker;
