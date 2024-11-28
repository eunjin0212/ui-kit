import { Meta, StoryObj } from '@storybook/react';
import SInput from '../components/SInput';

const meta = {
	title: 'SInput',
	component: SInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SInput>;

export default meta;

type Story = StoryObj<typeof SInput>;

export const Default: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
	},
};

export const LabelInput: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		label: 'keyword',
	},
};

export const InsideLabelInput: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		label: 'inside label',
	},
};

export const DisableInput: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		label: 'disable',
		disable: true,
	},
};

export const ReadonlyInput: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		label: 'label',
		readonly: true,
	},
};

export const PasswordInput: Story = {
	args: {
		placeholder: '비밀번호를 입력해주세요.',
		type: 'password',
	},
};

export const Validation: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		rules: [
			{
				message: '키워드를 입력해주세요.',
				validate: (value) => !!value,
			},
			{
				message: '5글자 이상 입력해주세요.',
				validate: (value) => value.length >= 5,
			},
		],
	},
};

export const WithRealTimeValidation: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		useRealTimeRules: true,
		rules: [
			{
				message: '키워드를 입력해주세요.',
				validate: (value) => !!value,
			},
			{
				message: '5글자 이상 입력해주세요.',
				validate: (value) => value.length >= 5,
			},
		],
	},
};

export const WithHint: Story = {
	args: {
		placeholder: '키워드를 입려해주세요.',
		hint: '힌트가 위치합니다.',
	},
};
