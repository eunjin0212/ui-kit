import { useState, ChangeEvent } from 'react';
import { Setting24 } from './assets/SettingIcon';
import './css/App.css';
import SDropdown from './components/SDropdown';
import SCheckbox from './components/SCheckbox';
import SButton from './components/SButton';
import SRadio from './components/SRadio';
import STabs from './components/STabs';
import STabPanel from './components/STabPanel';
import SChip from './components/SChip';
import STag from './components/STag';
import STooltip from './components/STooltip';
import SToggle from './components/SToggle';
import SCaution from './components/SCaution';
import SInput from './components/SInput';
import STable from './components/STable';

function App() {
	const [checked, setChecked] = useState(false);
	const [toggle, setToggle] = useState(false);
	const [selectedValue, setSelectedValue] = useState<string | number>('item3');
	const [tabValue, setTabValue] = useState('tab1');
	const [inputValue, setInputValue] = useState('');

	const handleClick = () => {
		setChecked(!checked);
	};

	const items = [
		{ label: 'item1', value: 'item1', disabled: false },
		{ label: 'item2', value: 'item2', disabled: false },
		{ label: 'item3', value: 'item3', disabled: false },
	];

	const handleRadioChange = (model: string | number) => {
		setSelectedValue(model);
	};

	const handleTabChange = (val: string) => {
		console.log(val);
		setTabValue(val);
	};

	const chipItems = [
		{ label: 'item1', value: true },
		{ label: 'item2', value: true },
		{ label: 'item3', value: true },
		{ label: 'item4', value: true },
	];

	const [showTooltip, setShowTooltip] = useState<boolean>(false);

	const [formData, setFormData] = useState<any[]>([
		{
			label: 'AAA',
			useInsideLabel: true,
			value: '',
			rules: [
				{ message: 'AAA is required.', validate: (value: string) => !!value },
			],
			hint: 'aaa',
			labelClassName: 'w-50pxr',
			placeholder: 'AAA',
			error: '',
		},
		{
			label: 'BBB',
			useInsideLabel: true,
			value: '',
			rules: [
				{ message: 'BBB is required.', validate: (value: string) => !!value },
			],
			hint: 'bbb',
			labelClassName: 'w-50pxr',
			placeholder: 'BBB',
			error: '',
		},
		{
			label: 'CCC',
			useInsideLabel: true,
			value: '',
			rules: [
				{ message: 'CCC is required.', validate: (value: string) => !!value },
			],
			hint: 'ccc',
			labelClassName: 'w-50pxr',
			placeholder: 'CCC',
			error: '',
		},
	]);

	function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
		evt.preventDefault();
		console.log('handleSubmit');

		formData.forEach((data) => {
			data.rules.forEach(
				(rule: { validate: (arg0: any) => any; message: any }) => {
					if (!rule.validate(data.value)) {
						data.error = rule.message;
					} else {
						data.error = '';
					}
				}
			);
		});

		console.log('Submitted Data:', formData);
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
		const newFormData = [...formData]; // 기존 상태 복사
		newFormData[idx].value = e.target.value; // 특정 인덱스의 value 업데이트
		setFormData(newFormData); // 상태 업데이트
	};

	const columns = [
		{
			label: '이름',
			name: 'name',
		},
		{
			label: '품목',
			name: 'itemName',
		},
		{
			label: '속성',
			name: 'itemProperty',
		},
	];

	const rows = [
		{
			name: 'name',
			itemName: 'itemName',
			itemProperty: 'itemProperty',
		},
  {
			name: 'name',
			itemName: 'itemName',
			itemProperty: 'itemProperty',
		},
  {
			name: 'name',
			itemName: 'itemName',
			itemProperty: 'itemProperty',
		},
  {
			name: 'name',
			itemName: 'itemName',
			itemProperty: 'itemProperty',
		},
  {
			name: 'name',
			itemName: 'itemName',
			itemProperty: 'itemProperty',
		},
  {
			name: 'name',
			itemName: 'itemName',
			itemProperty: 'itemProperty',
		},
  {
			name: 'name',
			itemName: 'itemName',
			itemProperty: 'itemProperty',
		},
	];
	return (
		<>
			<main>
				<div className='flex flex-col gap-12pxr p-16pxr'>
					<div>
						<b>Input</b>
					</div>
					<form onSubmit={handleSubmit}>
						{formData.map((data, idx) => (
							<SInput
								key={idx}
								value={data.value}
								label={data.label}
								useInsideLabel={data.useInsideLabel}
								labelClassName={data.labelClassName}
								placeholder={data.placeholder}
								onChange={(e) => handleInputChange(e, idx)}
							/>
						))}
						<SButton
							label='submit'
							type='submit'
						/>
					</form>

					<SInput
						value={inputValue}
						placeholder='키워드를 입력해주세요.'
						onChange={(evt) => setInputValue(evt.target.value)}
						useInsideLabel
						label='useRealTimeRules'
						useRealTimeRules
						hint='최소 5글자 이상'
						rules={[
							{
								validate: (value) => !!value,
								message: '키워드를 입력해주세요.',
							},
							{
								validate: (value) => value.length >= 5,
								message: 'Must be at least 5 characters',
							},
						]}
					/>

					<SInput
						value={inputValue}
						placeholder='키워드를 입력해주세요.'
						onChange={(evt) => setInputValue(evt.target.value)}
						useInsideLabel
						label='label'
						hint='최소 5글자 이상'
						rules={[
							{
								validate: (value) => !!value,
								message: '키워드를 입력해주세요.',
							},
							{
								validate: (value) => value.length >= 5,
								message: 'Must be at least 5 characters',
							},
						]}
					/>

					<SInput
						value={inputValue}
						type='password'
						placeholder='키워드를 입력해주세요.'
						onChange={(evt) => setInputValue(evt.target.value)}
					/>
				</div>

				<div className='flex flex-col gap-12pxr p-16pxr'>
					<STable
						columns={columns}
						rows={rows}
						stickyHeader
      resizable
      className='h-200pxr'
					/>
				</div>

				<div className='flex flex-col gap-12pxr p-16pxr'>
					<div className='h-100pxr'></div>
					<div>
						<b>Tooltip</b>
					</div>
					<div className='flex items-center justify-center gap-8pxr'>
						<STooltip
							placement='top'
							icon='HelpOutline_24'
							className='text-info'
						>
							<STooltip.Body>
								<div>이것은 위쪽 툴팁입니다.</div>
								<div>이것은 위쪽 툴팁입니다.</div>
								<div>이것은 위쪽 툴팁입니다.</div>
								<div>이것은 위쪽 툴팁입니다.</div>
							</STooltip.Body>
						</STooltip>
						<STooltip
							placement='top'
							label='top Tooltip'
						>
							<STooltip.Body>
								<div>이것은 위쪽 툴팁입니다.</div>
							</STooltip.Body>
						</STooltip>
						<STooltip
							label='bottom Tooltip'
							color='info'
							buttonOptions={{ outline: true }}
						>
							<STooltip.Body>bottom</STooltip.Body>
						</STooltip>
						<STooltip
							placement='right'
							label='right Tooltip'
						>
							<STooltip.Body>
								<div>이것은 오른쪽 툴팁입니다.</div>
								<div>이것은 오른쪽 툴팁입니다.</div>
								<div>이것은 오른쪽 툴팁입니다.</div>
								<div>이것은 오른쪽 툴팁입니다.</div>
								<div>이것은 오른쪽 툴팁입니다.</div>
							</STooltip.Body>
						</STooltip>

						<STooltip
							placement='left'
							label='left Tooltip'
						>
							<STooltip.Body>
								<div>left</div>
							</STooltip.Body>
						</STooltip>

						<STooltip
							trigger='click'
							placement='left'
							icon='HelpOutline_24'
							label='click left Tooltip'
							color='warning'
							useClose
							buttonOptions={{ outline: true }}
						>
							<STooltip.Body>
								<div>이것은 왼쪽 툴팁입니다.</div>
								<div>이것은 왼쪽 툴팁입니다.</div>
								<div>이것은 왼쪽 툴팁입니다.</div>
								<div>이것은 왼쪽 툴팁입니다.</div>
								<div>이것은 왼쪽 툴팁입니다.</div>
							</STooltip.Body>
						</STooltip>
					</div>

					<div className='flex items-center justify-center gap-8pxr'>
						<STooltip
							trigger='click'
							usePopover
							label='usePopover'
							tooltipClassName='max-w-230pxr'
						>
							<STooltip.Body>
								Popovers allow you to provide users with more information in a composite
								way.
							</STooltip.Body>
							<STooltip.Footer className='flex items-center justify-between'>
								<SButton
									color='Blue_B_Darken-2'
									label='button'
									className='!px-0'
								/>{' '}
								<SButton
									color='positive'
									label='Main Button'
								/>
							</STooltip.Footer>
						</STooltip>

						<STooltip
							trigger='click'
							usePopover
							icon='HelpOutline_24'
							label='click trigger@@'
							placement='right'
							useClose
							tooltipClassName='max-w-230pxr'
						>
							<STooltip.Body>
								Popovers allow you to provide users with more information in a composite
								way.
							</STooltip.Body>
							<STooltip.Title>sss</STooltip.Title>
							<STooltip.Footer className='flex items-center justify-between'>
								<SButton
									color='Blue_B_Darken-2'
									label='button'
									className='!px-0'
								/>{' '}
								<SButton
									color='positive'
									label='Main Button'
								/>
							</STooltip.Footer>
						</STooltip>

						<div className='inline-flex items-center'>
							<SButton
								label='show hide tooltip'
								onClick={() => setShowTooltip(!showTooltip)}
							/>

							<STooltip
								trigger='click'
								usePopover
								label='tooltip'
								placement='right'
								value={showTooltip}
							>
								<STooltip.Body>
									이것은 아래쪽 툴팁입니다. 이것은 아래쪽 툴팁입니다. 이것은 아래쪽
									툴팁입니다.이것은 아래쪽 툴팁입니다.
								</STooltip.Body>
							</STooltip>
						</div>
					</div>
				</div>

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

				<div className='p-12'>
					<div className='font-bold'>chip</div>
					<SChip value={true}>chip</SChip>
					<SChip
						value={true}
						rounded
					>
						rounded chip
					</SChip>

					{/* {inputValue}
					<SChip
						value={true}
						removable
						useInput
						inputValue={inputValue}
						onInput={handleInput}
					/> */}

					<div className='flex flex-nowrap gap-12pxr'>
						{chipItems.map((item) => (
							<SChip
								key={item.label}
								value={item.value}
								removable
							>
								{item.label}
							</SChip>
						))}
					</div>
				</div>

				<div className='flex flex-col gap-12pxr p-16pxr'>
					<div>
						<b>Radio</b>
					</div>
					value : {selectedValue}
					<div className='inline-flex items-center gap-8pxr'>
						{items.map((item) => (
							<SRadio
								key={item.value}
								name='item'
								label={item.label}
								value={item.value}
								disabled={item.disabled}
								checked={selectedValue}
								className='mx-2 my-1'
								onChange={handleRadioChange}
							/>
						))}
					</div>
				</div>

				<div className='flex flex-col gap-12pxr p-16pxr'>
					<div>
						<b>Checkbox</b>
					</div>
					<div>
						<SButton
							onClick={handleClick}
							label='toggle button'
						/>
					</div>
					<div className='inline-flex items-center gap-8pxr'>
						<SCheckbox
							label='aaa'
							checked={checked}
							className='m-11'
						/>
						<SCheckbox
							label='aaa'
							className='m-11'
							checked={checked}
						/>
						<SCheckbox
							label='aaa'
							className='m-11'
							checked={checked}
							disabled
						/>
					</div>
				</div>

				<div className='flex flex-col gap-12pxr p-16pxr'>
					<div>
						<b>Dropdown Button</b>
					</div>
					<div className='inline-flex items-center gap-8pxr'>
						<SDropdown
							options={[
								{ label: 'option 1', value: 1 },
								{ label: 'option 2', value: 2 },
							]}
							onClick={() => ''}
							size='xs'
							label='dropdown'
						/>
						<SDropdown
							options={[
								{ label: 'option 1', value: 1, disable: true },
								{ label: 'option 2', value: 2 },
							]}
							onClick={() => ''}
							size='sm'
							label='dropdown'
						/>
						<SDropdown
							options={[
								{ label: `<span style="color: red">option 1</span>`, value: 1 },
								{ label: 'option 2', value: 2, display: false },
							]}
							onClick={() => ''}
							size='md'
							label='dropdown'
						/>
					</div>
					<div className='inline-flex items-center gap-8pxr'>
						<SDropdown
							options={[
								{ label: 'option 1', value: 1 },
								{ label: 'option 2', value: 2 },
							]}
							onClick={() => ''}
							outline
							size='xs'
							label='dropdown'
						/>
						<SDropdown
							options={[
								{ label: 'option 1', value: 1, disable: true },
								{ label: 'option 2', value: 2 },
							]}
							onClick={() => ''}
							outline
							size='sm'
							label='dropdown'
						/>
						<SDropdown
							options={[
								{ label: `<span style="color: red">option 1</span>`, value: 1 },
								{ label: 'option 2', value: 2, display: false },
							]}
							onClick={() => ''}
							outline
							size='md'
							label='dropdown'
						/>
					</div>
					<div className='inline-flex items-center gap-8pxr'>
						<SDropdown
							options={[
								{ label: 'option 1', value: 1 },
								{ label: 'option 2', value: 2 },
							]}
							onClick={() => ''}
							disabled
							size='xs'
							label='dropdown'
						/>
						<SDropdown
							options={[
								{ label: 'option 1', value: 1, disable: true },
								{ label: 'option 2', value: 2 },
							]}
							onClick={() => ''}
							disabled
							size='sm'
							label='dropdown'
						/>
					</div>
				</div>

				<div className='flex flex-col gap-12pxr p-16pxr'>
					<div>
						<b>Button</b>
					</div>
					<div className='inline-flex items-center gap-8pxr'>
						<SButton
							outline
							label='xs button'
						/>
						<SButton
							disabled
							label='sm button'
						/>
						<SButton
							outline
							icon={<Setting24 />}
							label='md button'
						/>
						<SButton
							outline
							disabled
							icon='HelpOutline_16'
							label='lg button'
						/>
					</div>
					<div className='inline-flex items-center gap-8pxr'>
						<SButton
							size='xs'
							label='xs button'
						/>
						<SButton
							size='sm'
							label='sm button'
						/>
						<SButton
							size='md'
							label='md button'
						/>
						<SButton
							size='lg'
							label='lg button'
						/>
					</div>
				</div>
				<div className='flex flex-col gap-12pxr p-16pxr'>
					<div>
						<b>Tag</b>
					</div>

					<div className='inline-flex items-center gap-8pxr'>
						<STag
							label='grey'
							color='grey'
						/>
						<STag
							label='red'
							color='red'
						/>
						<STag
							label='orange'
							color='orange'
						/>
						<STag
							label='yellow'
							color='yellow'
						/>
						<STag
							label='green'
							color='green'
							size='sm'
						/>
						<STag
							label='blue'
							color='blue'
							size='sm'
						/>
						<STag
							label='darkblue'
							color='darkblue'
							size='sm'
						/>
						<STag
							label='indigo'
							color='indigo'
							size='sm'
							textClass='font-bold'
						/>
					</div>
				</div>
				<div className='flex flex-col gap-12pxr p-16pxr'>
					<div>
						<b>Toggle</b>
					</div>
					<div className='inline-flex items-center gap-8pxr'>
						<SToggle
							value={toggle}
							onChange={setToggle}
							disabled
							label='label'
						/>
						<SToggle
							type='button'
							buttonLabel='toggle'
							value={toggle}
							onChange={setToggle}
							disabled
							label='label'
						/>
					</div>
				</div>
				<div className='flex flex-col gap-12pxr p-16pxr'>
					<div>
						<b>Caution</b>
					</div>
					<div className='inline-flex items-center gap-8pxr'>
						<SCaution
							messages={[
								'Pizza ipsum dolor meat lovers buffalo.',
								'Platter pork NY pizza pizza steak beef dolor sautéed fresh.',
								'Extra Philly green platter red pork ipsum broccoli bbq Chicago.',
								'Party ham and string pepperoni pineapple broccoli extra.',
								'Pork tomato chicken bacon ham anchovies.',
								'Bacon mouth personal pineapple pork extra.',
								'Pineapple fresh pie bbq fresh pizza pizza meat.',
								'Style Hawaiian ricotta spinach burnt ham wing green mayo.',
							]}
						/>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
