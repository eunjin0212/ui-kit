import type { Meta, StoryObj } from '@storybook/react';
import { Question24 } from '../assets/QuestionIcon'
import STooltip, { type TooltipProps } from '../components/STooltip';
import SButton from '../components/SButton';

const meta = {
 title: 'STooltip',
 component: STooltip,
 tags: ['autodocs'],
 parameters: {
  layout: 'centered',
 },

} satisfies Meta<typeof STooltip>;

export default meta;

type Story = StoryObj<TooltipProps>;

const contents = <ul>
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
export const Default: Story = {
 args: {
  location: 'top',
  useToggle: false,
  children: contents,
  button: <Question24 />,
 },
};

export const CloseButton: Story = {
 args: {
  location: 'top',
  useToggle: true,
  children: contents,
  button: <Question24 />,
 },
};

export const Title: Story = {
 args: {
  location: 'top',
  useToggle: true,
  children: contents,
  title: 'title',
  button: <Question24 />,
 },
};

export const ActionButton: Story = {
 args: {
  location: 'top',
  useToggle: true,
  title: 'title',
  children: contents,
  actions: [<a>secondary button</a>, <SButton color='Blue_B_Lighten-2' label='Main Action' />],
  button: <Question24 />,
 },
};