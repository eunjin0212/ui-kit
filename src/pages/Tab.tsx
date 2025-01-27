import { useState } from 'react';
import STabs from '../components/STabs';
import STabPanel from '../components/STabPanel';

const Tab = () => {
	const [tabValue, setTabValue] = useState('tab1');

	const handleTabChange = (val: string) => {
		setTabValue(val);
	};

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Tabs</b>
			</div>
			<div className='flex flex-col gap-8pxr'>
				<STabs
					tabs={[
						{ label: 'tab1', value: 'tab1', badge: 'tab1' },
						{ label: 'tab2', value: 'tab2', badge: 'tab2' },
						{ label: 'tab3', value: 'tab3' },
						{ label: 'tab4', value: 'tab4' },
					]}
					value={tabValue}
					onChange={handleTabChange}
				>
					<STabPanel value='tab1'>
						<p>Tab 1 Content</p>
					</STabPanel>
					<STabPanel value='tab2'>
						<p>Tab 2 Content</p>
					</STabPanel>
					<STabPanel value='tab3'>
						<p>Tab 3 Content</p>
					</STabPanel>
					<STabPanel value='tab4'>
						<p>Tab 4 Content</p>
					</STabPanel>
				</STabs>

				<STabs
					tabs={[
						{ label: 'tab1', value: 'tab1', badge: 'tab1' },
						{ label: 'tab2', value: 'tab2', badge: 'tab2' },
						{ label: 'tab3', value: 'tab3' },
						{ label: 'tab4', value: 'tab4' },
					]}
					size='sm'
					value={tabValue}
					onChange={handleTabChange}
				>
					<STabPanel value='tab1'>
						<p>Tab 1 Content</p>
					</STabPanel>
					<STabPanel value='tab2'>
						<p>Tab 2 Content</p>
					</STabPanel>
					<STabPanel value='tab3'>
						<p>Tab 3 Content</p>
					</STabPanel>
					<STabPanel value='tab4'>
						<p>Tab 4 Content</p>
					</STabPanel>
				</STabs>
			</div>
		</div>
	);
};

export default Tab;
