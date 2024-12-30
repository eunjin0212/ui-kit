import { useState } from 'react';
import SDatePicker from '../components/SDatePicker';

const DatePicker = () => {
	const [date, setDate] = useState<string>('');
	return (
		<>
			<SDatePicker value={date} />
			<SDatePicker
				label='label'
				value={date}
			/>
			<SDatePicker
				label='label'
				value={date}
				deleted
			/>
		</>
	);
};

export default DatePicker;
