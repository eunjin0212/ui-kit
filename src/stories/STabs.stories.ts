import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Stabs from '../components/STabs';

const options = [
	{ label: 'tab 1', value: 1 },
	{ label: 'tab 2', value: 2 },
];

const meta = {
	title: 'Stabs',
	component: Stabs,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
  value: { control: 'select', options: options.map((opt) => opt.value) },
		size: { control: 'select', options: ['sm', 'lg'] },
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: { onChange: fn() },
} satisfies Meta<typeof Stabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
	args: {
		value: 1,
		options,
	},
};

export const Sm: Story = {
	args: {
		value: 1,
		options,
  size: 'sm'
	},
};

export const Lg: Story = {
	args: {
		value: 1,
		options,
  size: 'lg'
	},
};
// https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
// export const WithPanels: Story = {
// 	args: {
// 		value: 1,
// 		options,
//   size: 'lg',
//   children: {
//    <>
//      <div value='1'>Content for Tab 1</div>
//      <div value='2'>Content for Tab 2</div>
//    </>

//   }
// 	},
// };