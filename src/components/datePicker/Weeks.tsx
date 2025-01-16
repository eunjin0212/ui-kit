const Weeks = () => {
	const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	return (
		<li className='mb-12pxr grid grid-cols-7 items-center justify-center gap-x-10pxr text-center'>
			{WEEKS.map((week) => (
				<div
					key={week}
					className='h-20pxr text-center leading-20pxr'
				>
					{week}
				</div>
			))}
		</li>
	);
};

export default Weeks;
