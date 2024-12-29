import SDatePicker from '../components/SDatePicker';

const DatePicker = () => {
 const handleChange = () => {
  //
 }
	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Caution</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SDatePicker
     onChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default DatePicker;
