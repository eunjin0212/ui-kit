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
import { addZero, formatDate } from '../../utils/date';

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
	const [dateObject, setDateObject] = useState({
		year: '',
		month: '',
		date: '',
	});

	useEffect(() => {
		setDateObject(formatDate(date));
	}, [date]);

	const handleYear = (val: string) => {
		setDateObject((prev) => ({
			...prev,
			year: val,
		}));
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
		setDate(
			`${dateObject.year}-${addZero(dateObject.month)}-${addZero(String(d))}`
		);
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
						year={dateObject.year}
						updateYear={handleYear}
					/>
					<MoveButton
						text={`${dateObject.month}월`}
						onClick={handleMonth}
						className='w-2/3'
					/>
				</div>
				<DateComponent
					date={`${dateObject.year}-${dateObject.month}-${dateObject.date}`}
					onclick={handleChange}
				/>
			</>
		</DateWrapper>
	);
};

export default SingleDate;
