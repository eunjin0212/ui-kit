const TimeSwitcher = ({
	isAm,
	setIsAm,
}: {
	isAm: boolean;
	setIsAm: (arg: boolean) => void;
}) => {
 const activeButtonClass = 'border-Blue_C_Default text-Blue_C_Default';
	const buttonClass =
		'border rounded-4pxr py-4pxr px-12pxr text-12pxr text-nowrap';
	const handleAm = (value: 'am' | 'pm') => {
  setIsAm(value === 'am');
	};
	return (
		<div className='flex h-full flex-col items-center justify-center gap-8pxr border-r border-r-Grey_Lighten-4 py-30pxr pl-24pxr pr-26pxr'>
			<button
				onClick={() => handleAm('am')}
				className={[buttonClass, isAm ? activeButtonClass : 'border-Grey_Default text-Grey_Darken-2'].join(' ')}
			>
				오전
			</button>
			<button
				onClick={() => handleAm('pm')}
				className={[buttonClass, !isAm ? activeButtonClass : 'border-Grey_Default text-Grey_Darken-2'].join(' ')}
			>
				오후
			</button>
		</div>
	);
};

export default TimeSwitcher;
