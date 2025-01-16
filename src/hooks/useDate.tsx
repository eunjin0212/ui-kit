import { useEffect, useState } from 'react';

export const useYear = (year: string) => {
 const [yearValue, setYearValue] = useState(year);

  useEffect(() => {
   setYearValue(() => year);
  }, [year]);

 const handleYear = (target: 'prev' | 'next') => {
		const prevYear = parseInt(year, 10);
		const nextYear = String(target === 'next' ? prevYear + 1 : prevYear - 1);
		setYearValue(() => nextYear);
	};

 return { yearValue, handleYear }
} 

export const useMonth = (initialYear: number, initialMonth: number) => {
  const [monthData, setMonthData] = useState({
    year: initialYear,
    month: initialMonth,
  });

  useEffect(() => {
    setMonthData(() => ({ year: initialYear, month: initialMonth }));
  }, [initialYear, initialMonth]);

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