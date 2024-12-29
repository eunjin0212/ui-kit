import { useState } from 'react';
import { CalendarIcon12 } from '../assets/CalenderIcon';
import { Close12 } from '../assets/CloseIcon';

interface DateInputProps {
 value: string;
 onChange: (date: string) => void;
}

const DateInput = ({ value, onChange }: DateInputProps) => {
 const [isFocused, setIsFocused] = useState(false);

 const handleClear = () => {
  onChange('');
 };

 const handleFocus = () => {
  setIsFocused(true);
 };

 const handleBlur = () => {
  setIsFocused(false);
 };

 const formatDate = (date: string | null) => {
  if (!date) return '';
  const d = new Date(date)
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
 };

 return (
  <div className={`date-input ${isFocused ? 'focused' : ''}`}>
   <CalendarIcon12 />
   <input
    type="text"
    value={formatDate(value)}
    onFocus={handleFocus}
    onBlur={handleBlur}
    readOnly
   />
   {value && <Close12 className="clear-icon" onClick={handleClear} />}
  </div>
 );
};

export default DateInput;