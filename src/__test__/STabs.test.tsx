import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import STabs from '../components/STabs';
import STabPanel from '../components/STabPanel';
import { useState } from 'react';
import '@testing-library/jest-dom';

describe('STabs', () => {
	const tabs = [
		{ label: 'Tab1', value: 'tab1' },
		{ label: 'Tab2', value: 'tab2' },
		{ label: 'Tab3', value: 'tab3' },
	];

	const TestComponent = () => {
		const [selectedTab, setSelectedTab] = useState('tab1');

		return (
			<STabs
				tabs={tabs}
				value={selectedTab}
				onChange={setSelectedTab}
			>
				<STabPanel value='tab1'>Tab1 Content</STabPanel>
				<STabPanel value='tab2'>Tab2 Content</STabPanel>
				<STabPanel value='tab3'>Tab3 Content</STabPanel>
			</STabs>
		);
	};

	it('renders the tabs correctly', () => {
		render(<TestComponent />);

		// Check if all tabs are rendered
		tabs.forEach((tab) => {
			expect(screen.getByText(tab.label)).toBeInTheDocument();
		});

		// Check if the correct tab panel is displayed
		expect(screen.getByText('Tab1 Content')).toBeInTheDocument();
	});

	it('calls onChange when a tab is clicked', () => {
		const handleChange = vi.fn();

		render(
			<STabs
				tabs={tabs}
				value='tab1'
				onChange={handleChange}
			>
				<STabPanel value='tab1'>Tab1 Content</STabPanel>
				<STabPanel value='tab2'>Tab2 Content</STabPanel>
				<STabPanel value='tab3'>Tab3 Content</STabPanel>
			</STabs>
		);

		// Click on the 'Tab2'
		fireEvent.click(screen.getByText('Tab2'));

		// Check if the handleChange function was called with the correct value
		expect(handleChange).toHaveBeenCalledWith('tab2');
	});

	it('displays the correct tab content when a tab is selected', () => {
		render(<TestComponent />);

		// Initially display 'Tab1 Content'
		expect(screen.getByText('Tab1 Content')).toBeInTheDocument();

		// Click on the 'Tab3'
		fireEvent.click(screen.getByText('Tab3'));

		// Check if the correct content is displayed
		expect(screen.getByText('Tab3 Content')).toBeInTheDocument();
		expect(screen.queryByText('Tab1 Content')).not.toBeInTheDocument();
	});
});
