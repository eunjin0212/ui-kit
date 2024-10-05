import { useState } from 'react';
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
import SToggle from './components/SToggle';
import SCaution from './components/SCaution';
import STooltip from './components/STooltip';

function App() {
 const [checked, setChecked] = useState(false);
 const [toggle, setToggle] = useState(false);
 const [selectedValue, setSelectedValue] = useState<string | number>('item3');
 const [tabValue, setTabValue] = useState('tab1');
 const [inputValue, setInputValue] = useState('aaa');

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

 const handleInput = (val: string) => {
  setInputValue(val);
 };

 return (
  <>
   <main>
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

     {inputValue}
     <SChip
      value={true}
      removable
      useInput
      inputValue={inputValue}
      onInput={handleInput}
     />

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
    <div className='flex flex-col items-center gap-12pxr p-16pxr'>
     <div>
      <b>Tooltip</b>
     </div>
     <div className='inline-flex items-center gap-8pxr'>
      <STooltip location='right' button={<Setting24 />} useToggle>
       <ul>
        {[
         'Pizza ipsum dolor meat lovers buffalo.',
         'Mouth ipsum parmesan Hawaiian spinach.',
         'NY bell pan bbq crust lovers green rib Hawaiian.',
         'Party Chicago personal tomatoes pan rib rib rib',
         'peppers sauce broccoli and.',
         'Pizza ham broccoli large pan platter thin tossed.',
         'Personal party hand sauce pesto wing.',
        ].map((text) => <li key={text}>{text}</li>)}
       </ul>
      </STooltip>
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
       disable
      />
      <SToggle
       type='button'
       buttonLabel='toggle'
       value={toggle}
       onChange={setToggle}
       disable
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
