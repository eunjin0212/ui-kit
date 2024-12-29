import { createPortal } from 'react-dom';
import DateComponent from './Date';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ArrowLeft12 } from '../assets/ArrowLeftIcon';
import { ArrowRight12 } from '../assets/ArrowRightIcon';

const SingleDate = ({ date, open, setDate }: { date: string; open: boolean; setDate:Dispatch<SetStateAction<string>> }) => {
	const formatDate = (beforeDate: string) => {
		const d = beforeDate ? new Date(beforeDate) : new Date();
		const year = String(d.getFullYear());
		const month = String(d.getMonth() + 1);
		const day = String(d.getDate());
		return { year, month, date: day };
	};

	const [dateObject, setDateObject] = useState({
		year: '',
		month: '',
		date: '',
	});

	useEffect(() => {
		setDateObject(formatDate(date));
	}, [date]);

 const handleYear = (type: 'next' | 'prev') => {
  setDateObject((prev) => {
    const year = parseInt(prev.year, 10);
    return {
      ...prev,
      year: String(type === 'next' ? year + 1 : year - 1),
    };
  });
};

const handleMonth = (type: 'next' | 'prev') => {
 setDateObject((prev) => {
   const currentDate = new Date(parseInt(prev.year), parseInt(prev.month) - 1);
   currentDate.setMonth(currentDate.getMonth() + (type === 'next' ? 1 : -1));

   return {
     ...prev,
     year: String(currentDate.getFullYear()),
     month: String(currentDate.getMonth() + 1),
   };
 });
};

const handleChange = (d: number) => {
  setDate(`${dateObject.year}-${dateObject.month.padStart(2, '0')}-${String(d).padStart(2, '0')}`)
} 

	return (
		open &&
		createPortal(
			<div className='h-292pxr w-302pxr rounded-8pxr px-23pxr py-24pxr shadow-[2px_2px_12px_2px_#00000033]'>
				<ul className='flex items-center gap-20pxr mb-8pxr'>
					<li className='inline-flex items-center gap-12pxr w-1/3'>
						<ArrowLeft12 className='cursor-pointer text-Grey_Lighten-2' onClick={() => handleYear('prev')} />
						<span className='text-14pxr text-Grey_Darken-4'>{dateObject.year}</span>
						<ArrowRight12 className='cursor-pointer text-Grey_Lighten-2' onClick={() => handleYear('next')} />
					</li>
					<li className='inline-flex items-center gap-12pxr w-2/3'>
						<ArrowLeft12 className='cursor-pointer text-Grey_Lighten-2' onClick={() => handleMonth('prev')} />
						<span className='flex-1 text-center text-14pxr text-Grey_Darken-4'>{dateObject.month}</span>
						<ArrowRight12 className='cursor-pointer text-Grey_Lighten-2' onClick={() => handleMonth('next')} />
					</li>
				</ul>
				<DateComponent
					date={`${dateObject.year}-${dateObject.month}-${dateObject.date}`}
					onclick={handleChange}
				/>
			</div>,
			document.body
		)
	);
};

export default SingleDate;
