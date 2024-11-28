import type { Meta, StoryObj } from '@storybook/react';

import SSelectCheckbox from '../components/SSelectCheckbox';

const meta = {
 title: 'SSelectCheckbox',
 component: SSelectCheckbox,
 parameters: {
  // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  layout: 'centered',
  tags: ['autodocs'],
  argTypes: {
  },
 },
} satisfies Meta<typeof SSelectCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
 { label: 'option 1', value: 1 },
 { label: 'option 2', value: 2 },
]

export const Default: Story = {
 args: {
  options,
  disable: false,
  value: [],
  setValue: () => {},
},
};

export const Disable: Story = {
 args: {
  options,
  disable: true,
  value: [],
  setValue: () => {},
},
};