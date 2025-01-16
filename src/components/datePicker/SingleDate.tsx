import DateComponent from './Date';
import {
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import MoveButton from './MoveButton';
import YearButton from './YearButton';
import DateWrapper from './DateWrapper';
import { formatDateToObject, formatDateToString } from '../../utils/date';
import { useMonth } from '../../hooks/useDate';

const SingleDate = ({
	date,
	open,
	setDate,
	setOpen,
	parentRef,
}: {
	date: string;
	open: boolean;
	setDate: Dispatch<SetStateAction<string>>;
	setOpen: Dispatch<SetStateAction<boolean>>;
	parentRef: RefObject<HTMLElement>;
}) => {
	const [dateObject, setDateObject] = useState(formatDateToObject(date));

 const { monthData, handleMonth } = useMonth(
  dateObject.year,
  dateObject.month
);

	useEffect(() => {
		setDateObject(formatDateToObject(date));
	}, [date]);

	const handleYear = (val: string) => {
		setDateObject((prev) => ({
   ...prev,
   year: +val,
  }));
	};

 useEffect(() => {
  setDateObject((prev) => ({
   ...prev,
   ...monthData,
  }));
 }, [monthData])

	const handleChange = (d: number) => {
		setDate(formatDateToString({ ...dateObject, day: d }));
	};

	return (
		<DateWrapper
			open={open}
			setOpen={setOpen}
			parentRef={parentRef}
		>
			<>
				<div className='mb-8pxr flex items-center gap-20pxr'>
					<YearButton
						year={`${dateObject.year}`}
						updateYear={handleYear}
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
				/>
			</>
		</DateWrapper>
	);
};

export default SingleDate;
