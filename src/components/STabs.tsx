import { Children, useEffect, useState, type ReactElement } from 'react';

export interface Option {
	label: string;
	value: string | number;
}
type Child = ReactElement;

interface TabsProps {
	/**
	 * Tabs size
	 */
	size?: 'sm' | 'lg';
	/**
	 * Tab Options
	 * @description Option's value is the same as Tab's value
	 */
	options: Option[];
	/**
	 * Tab panels
	 * @description Depending on the tab value, panels with the same value will be shown. Require 'data-value' attribute
	 * @example <div data-value='value'>...</div>
	 */
	children?: Child[];
	value: Option['value'];
	onChange: (arg: Option['value']) => void;
}

const STabs = ({
	size = 'lg',
	options = [],
	children,
	onChange,
	value,
}: TabsProps) => {
	const tabPanels = Children.toArray(children) as Child[];
	const [tab, setTab] = useState(value);

	const tabSize = {
		sm: 'py-2.5 px-6.5',
		lg: 'py-4 px-10.5',
	};

	useEffect(() => {
		setTab(() => value);
	}, [value]);

	const handleChange = (optValue: Option['value']) => {
		setTab(() => optValue);
		onChange(optValue);
	};
	return (
		<section className='flex flex-col'>
			<div className='relative flex w-full items-center justify-start gap-1.5 before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-Blue_C_Default'>
				{options.map((opt) => (
					<div
						onClick={() => handleChange(opt.value)}
						className={[
							'cursor-pointer rounded-t-1.5 border-x border-t',
							tabSize[size],
							opt.value === tab
								? 'border-Blue_C_Default bg-white font-bold text-Blue_C_Default'
								: 'border-Grey_Lighten-2 bg-Grey_Lighten-5 text-Grey_Default',
						].join(' ')}
						key={`tab_${opt.value}`}
					>
						{opt.label}
					</div>
				))}
			</div>
			{tabPanels.map((child, idx) => {
				return (
					child.props['data-value'] === tab && (
						<aside key={`tab-panel__${idx}`} className='mt-4'>{child}</aside>
					)
				);
			})}
		</section>
	);
};

export default STabs;
