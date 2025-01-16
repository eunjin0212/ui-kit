import MoveButton from './MoveButton';
import { useYear } from '../../hooks/useDate';

interface YearButtonProps {
	year: string;
	updateYear: (arg: string) => void;
}

const YearButton = ({ year, updateYear }: YearButtonProps) => {
 const { yearValue, handleYear } = useYear(year)

	const handleUpdateYear = (target: 'prev' | 'next') => {
  handleYear(target)
		updateYear(yearValue);
	};

	return (
		<MoveButton
			text={yearValue}
			onClick={handleUpdateYear}
		/>
	);
};

export default YearButton;
