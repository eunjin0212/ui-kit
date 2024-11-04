import type { ReactNode } from 'react';

export interface STabPanelProps {
	value: string;
	children: ReactNode;
	className?: string;
}

const STabPanel = ({ value, children, className = '' }: STabPanelProps) => {
	return (
		<div className={`s-tab-panel s-tab-panel__${value} ${className}`}>
			{children}
		</div>
	);
};

export default STabPanel;
