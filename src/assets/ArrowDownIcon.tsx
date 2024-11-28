import { SVGProps } from 'react';

export const ArrowDown12 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		width='12'
		height='12'
		viewBox='0 0 12 12'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M10.6001 3.75L6.08751 8.16449C6.03893 8.21202 5.96127 8.21202 5.91269 8.16449L1.4001 3.75'
			stroke='currentColor'
			strokeLinecap='round'
		/>
	</svg>
);

export const ArrowDown24 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M21.2 7.5L12.1748 16.329C12.0777 16.424 11.9224 16.424 11.8252 16.329L2.80001 7.5'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
		/>
	</svg>
);
