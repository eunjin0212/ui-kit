import { useEffect, useState } from 'react';
import MoveButton from './MoveButton';

interface YearButtonProps {
	year: string;
	updateYear: (arg: string) => void;
}

const YearButton = ({ year, updateYear }: YearButtonProps) => {
	const [yearValue, setYearValue] = useState(year);

	useEffect(() => {
		setYearValue(year);
	}, [year]);

	const handleYear = (target: 'prev' | 'next') => {
		const prevYear = parseInt(year, 10);
		const nextYear = String(target === 'next' ? prevYear + 1 : prevYear - 1);
		setYearValue(() => nextYear);
		updateYear(nextYear);
	};
	return (
		<MoveButton
			text={yearValue}
			onClick={handleYear}
		/>
	);
};

export default YearButton;
