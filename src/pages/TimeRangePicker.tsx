import { useState } from 'react';
import STimeRangePicker from '../components/STimeRangePicker';

const FilePicker = () => {
 const [time, setTime] = useState<string[]>(['09:00', '17:00']);
 return (
  <div className='flex flex-col gap-y-12pxr'>
   single 12
   <STimeRangePicker
    timeFormat='12'
    value={time}
    onChange={setTime}
    /> 
   single 24
   <STimeRangePicker
    value={time}
    onChange={setTime}
    placeholder='Select a Time'
   />
   disable
   <STimeRangePicker
    value={time}
    disable
    onChange={setTime}
   />
   disable + label
   <STimeRangePicker
    value={time}
    label='label'
    disable
    onChange={setTime}
   />
  </div>
 );
};

export default FilePicker;
