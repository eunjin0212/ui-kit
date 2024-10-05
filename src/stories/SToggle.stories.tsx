import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SToggle, { type ToggleProps } from '../components/SToggle';

const meta = {
 title: 'SToggle',
 component: SToggle,
 parameters: {
  layout: 'centered',
 },
 tags: ['autodocs'],
 args: { onChange: fn() },

} satisfies Meta<typeof SToggle>;

export default meta;

type Story = StoryObj<ToggleProps>;

export const Default: Story = {
 args: {
  label: '메시지 자동 전송',
  value: false,
  type: 'switch',
  disabled: false,
  onChange: (arg) => {
   console.log('storybook', arg)
  },
 },
 // render: function Render(args: ToggleProps) {
 //  const [value, setValue] = useState(args.value);

 //  useEffect(() => {
 //   setValue(args.value)
 //  }, [args.value])

 //  const handleChange = (value: ToggleProps['value']) => {
 //   setValue(value);
 //   args.onChange(value);
 //  };

 //  return (
 //   <>
 //    <SToggle
 //     {...args}
 //     value={value}
 //     onChange={handleChange}
 //    />
 //    <SToggle
 //     {...args}
 //     className='mt-12pxr'
 //     value={value}
 //     buttonLabel='Toggle'
 //     type='button'
 //     onChange={handleChange}
 //    />
 //   </>
 //  );
 // },
};


export const Button: Story = {
 args: {
  value: false,
  type: 'button',
  buttonLabel: 'Toggle'
 },
};

export const DisableSwitchTrue: Story = {
 args: {
  value: false,
  disabled: true,
 },
};

export const DisableSwitchFalse: Story = {
 args: {
  value: true,
  disabled: true,
 },
};

export const DisableButtonTrue: Story = {
 args: {
  value: true,
  disabled: true,
  type: 'button',
  buttonLabel: 'Toggle'
 },
};

export const DisableButtonFalse: Story = {
 args: {
  value: false,
  disabled: true,
  type: 'button',
  buttonLabel: 'Toggle'
 },
};
