import { useState } from 'react';
import STimePicker from '../components/STimePicker';

const FilePicker = () => {
 const [time, setTime] = useState<string>('16:00');
 return (
  <div className='flex flex-col gap-y-12pxr'>
   single 12
   <STimePicker
    timeFormat='12'
    value={time}
    onChange={setTime}
    /> 
   single 24
   <STimePicker
    value={time}
    onChange={setTime}
    placeholder='Select a Time'
   />
   disable
   <STimePicker
    value={time}
    disable
    onChange={setTime}
   />
   disable + label
   <STimePicker
    value={time}
    label='label'
    disable
    onChange={setTime}
   />
  </div>
 );
};

export default FilePicker;
