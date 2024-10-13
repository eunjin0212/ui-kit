import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SInput from '../components/SInput';

const meta = {
	title: 'SInput',
	component: SInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onChange: fn() },
} satisfies Meta<typeof SInput>;

export default meta;

type Story = StoryObj<typeof SInput>;

export const Default: Story = {
 args: {
		value: 'Text Value',
	},
};

export const Label: Story = {
 args: {
		value: 'Text Value',
  label: 'Label'
	},
};

export const InsideLabel: Story = {
 args: {
		value: 'Text Value',
  insideLabel: 'Label'
	},
};

export const DefaultDisabled: Story = {
 args: {
		value: 'Text Value',
  disabled: true,
	},
};

export const LabelDisabled: Story = {
 args: {
		value: 'Text Value',
  label: 'Label',
  disabled: true,
	},
};

export const InsideLabelDisabled: Story = {
 args: {
		value: 'Text Value',
  insideLabel: 'Label',
  disabled: true,
	},
};

export const ErrorStatus: Story = {
 args: {
		value: 'Text Value',
  status: 'error'
	},
};

export const SuccessStatus: Story = {
 args: {
		value: 'Text Value',
  status: 'success'
	},
};

export const FocusStatus: Story = {
 args: {
		value: 'Text Value',
  status: 'focus'
	},
};


