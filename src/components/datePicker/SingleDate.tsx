import { useEffect, useState } from 'react';
import { formatDateToObject, formatDateToString } from '../../utils/date';
import { useMonth, useYear } from '../../hooks/useDate';
import DateComponent, { type DateDisable } from './DateComponent';
import MoveButton from './MoveButton';

interface SingDateProps {
 date: string;
 onChange: (date: string) => void;
 disable?: DateDisable
}

const SingleDate = ({
 date,
 onChange,
 disable
}: SingDateProps) => {
 const [dateObject, setDateObject] = useState(formatDateToObject(date));

 const { monthData, handleMonth } = useMonth(dateObject.year, dateObject.month);
 const { yearValue, handleYear } = useYear(dateObject.year)

 useEffect(() => {
  setDateObject(formatDateToObject(date));
 }, [date]);

 useEffect(() => {
  setDateObject((prev) => ({
   ...prev,
   year: yearValue,
  }));
 }, [yearValue])

 useEffect(() => {
  setDateObject((prev) => ({
   ...prev,
   year: monthData.year,
   month: monthData.month,
  }));
 }, [monthData.year, monthData.month]);

 const handleChange = (d: number) => {
  onChange(formatDateToString({ ...dateObject, day: d }));
 };

 return (
  <>
   <div className='mb-8pxr flex items-center gap-20pxr'>
    <MoveButton
     text={`${dateObject.year}`}
     onClick={handleYear}
    />
    <MoveButton
     text={`${monthData.month}월`}
     onClick={handleMonth}
     className='w-2/3'
    />
   </div>
   <DateComponent
    viewDate={`${dateObject.year}-${dateObject.month}-${dateObject.day}`}
    onclick={handleChange}
    currentDate={date}
    disable={disable}
   />
  </>
 );
};

export default SingleDate;
