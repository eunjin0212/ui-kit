import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SDropdown from '../components/SDropdown';
import colors from '../css/colors';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'SDropdown',
	component: SDropdown,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		color: { control: 'select', options: Object.keys(colors) },
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: { onClick: fn() },
} satisfies Meta<typeof SDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const options = [
	{ label: 'option 1', value: 1 },
	{ label: 'option 2', value: 2 },
];
export const Color: Story = {
	args: {
		color: 'Blue_B_Default',
		label: 'Button',
		options,
	},
};

export const Disabled: Story = {
	args: {
		color: 'Blue_B_Default',
		label: 'Button',
		options,
		disabled: true,
	},
};

export const Outline: Story = {
	args: {
		color: 'Blue_B_Default',
		label: 'Button',
		options,
		outline: true,
	},
};
