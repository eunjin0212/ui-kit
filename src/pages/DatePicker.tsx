import { useState } from 'react';
import SDatePicker from '../components/SDatePicker';

const DatePicker = () => {
	const [date, setDate] = useState<string>('');
	return (
		<div className='flex flex-col gap-y-12pxr'>
			{date}
			<SDatePicker
				date={date}
				onChange={(newDate) => setDate(newDate)}
			/>
			{/* <SDatePicker
				label='label'
				date={date}
				onChange={(newDate) => setDate(newDate)}
			/>
			<SDatePicker
				label='deleted'
				date={date}
				deleted
				onChange={(newDate) => setDate(newDate)}
			/> */}
		</div>
	);
};

export default DatePicker;
