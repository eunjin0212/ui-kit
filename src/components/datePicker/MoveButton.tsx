import { ArrowLeft12 } from '../../assets/ArrowLeftIcon';
import { ArrowRight12 } from '../../assets/ArrowRightIcon';

interface MoveButtonProps {
	onClick: (arg: 'prev' | 'next') => void;
	text: string;
	className?: string;
	hide?: 'prev' | 'next';
}

const MoveButton = ({
	text,
	onClick,
	className = '',
	hide,
}: MoveButtonProps) => {
	return (
		<div
			className={['inline-flex w-1/3 items-center gap-12pxr', className].join(' ')}
		>
			{hide !== 'prev' && (
				<ArrowLeft12
					className='cursor-pointer text-Grey_Lighten-2'
					onClick={() => onClick('prev')}
				/>
			)}
			<span className='flex-1 text-center text-14pxr text-Grey_Darken-4'>
				{text}
			</span>
			{hide !== 'next' && (
				<ArrowRight12
					className='cursor-pointer text-Grey_Lighten-2'
					onClick={() => onClick('next')}
				/>
			)}
		</div>
	);
};

export default MoveButton;
