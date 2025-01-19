import { useEffect, useState } from 'react';

export const useYear = (year: number) => {
 const [yearValue, setYearValue] = useState(year);

 useEffect(() => {
  setYearValue(() => year);
 }, [year]);

 const handleYear = (target: 'prev' | 'next') => {
  setYearValue((prev) => (target === 'next' ? prev + 1 : prev - 1));
 };

 return { yearValue, handleYear };
};

export const useMonth = (year: number, month: number) => {
 const [monthData, setMonthData] = useState({
  year,
  month,
 });

 useEffect(() => {
  setMonthData(() => ({ year, month }));
 }, [year, month]);

 const handleMonth = (type: 'next' | 'prev') => {
  setMonthData((prev) => {
   const currentDate = new Date(prev.year, prev.month - 1);
   currentDate.setMonth(currentDate.getMonth() + (type === 'next' ? 1 : -1));
   return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
   };
  });
 };

 return { monthData, handleMonth };
};
