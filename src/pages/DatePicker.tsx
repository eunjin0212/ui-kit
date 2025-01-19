import SDatePicker from '../components/SDatePicker';

const DatePicker = () => {
 const handleChange = () => {
  //
 }

 return (
  <div className='flex flex-col gap-12pxr p-16pxr'>
   <div>
    <b>DatePicker</b>
   </div>
   <div className='inline-flex items-center gap-8pxr'>
    <SDatePicker
     onChange={handleChange}
    />
    <SDatePicker
     onChange={handleChange}
     disable
    />
    <SDatePicker
     label="label"
     onChange={handleChange}
    />
    <SDatePicker
     label="label"
     onChange={handleChange}
     disable
    />
    <SDatePicker
     onChange={handleChange}
     disableDates={[null, '2025-01-20']}
    />
    <SDatePicker
     onChange={handleChange}
     disableDates={['2025-01-01', '2025-01-20']}
    />
   </div>
  </div>
 );
};

export default DatePicker;
