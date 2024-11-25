import type { Meta, StoryObj } from '@storybook/react';
import SSelect from '../components/SSelect';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
 title: 'SSelect',
  component: SSelect,
  parameters: {
   // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
   layout: 'centered',
 },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args

} satisfies Meta<typeof SSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
 { label: 'option 1', value: 1 },
 { label: 'option 2', value: 2 },
]

export const Disabled: Story = {
 args: {
   label: 'label',
   options,
   disable: true,
   value: '',
   setValue: () => {},
 },
};
