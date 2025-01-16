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

	useEffect(() => {
		setDateObject(formatDateToObject(date));
	}, [date]);

	const handleYear = (val: string) => {
		setDateObject((prev) => {
			return {
				...prev,
				year: +val,
			};
		});
	};

	const handleMonth = (type: 'next' | 'prev') => {
		setDateObject((prev) => {
			const currentDate = new Date(prev.year, prev.month - 1);
			currentDate.setMonth(currentDate.getMonth() + (type === 'next' ? 1 : -1));

			return {
				...prev,
				year: currentDate.getFullYear(),
				month: currentDate.getMonth() + 1,
			};
		});
	};

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
						text={`${dateObject.month}월`}
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
