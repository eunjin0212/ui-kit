import { useState } from 'react';
import DateInput from './DateInput';

interface SDatePickerProps {
 onChange: (date: Date) => void;
}

const SDatePicker = ({ onChange }: SDatePickerProps) => {
 const [selectedDate, setSelectedDate] = useState<Date | null>(null);

 const handleDateChange = (value: string) => {
  const date = new Date(value);
  setSelectedDate(date);
  onChange(date);
 };

 return (
  <div>
   <DateInput  
    value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''} 
    onChange={handleDateChange} 
   />
   <input 
    type="date" 
   />
  </div>
 );
};

export default SDatePicker;