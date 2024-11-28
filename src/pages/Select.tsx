import { useState } from 'react';
import type { Option } from '../components/DropdownItem';
import SSelect from '../components/SSelect';

const Select = () => {
 const options = [
  { label: 'item1', value: 1 },
		{ label: 'item2', value: 2 },
		{ label: 'item3', value: 3 },
		{ label: 'item4', value: 4 },
		{ label: 'item5', value: 5, disable: true },
	];

 const [selected, setSelected] = useState<Option>(options[0]);

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>SSelect</b>
			</div>
			<SSelect
				value={selected}
				setValue={setSelected}
				options={options}
				className='w-150pxr min-w-150pxr'
			/>
		</div>
	);
};

export default Select;
