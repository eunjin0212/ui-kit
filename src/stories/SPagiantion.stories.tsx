import type { Meta, StoryObj } from '@storybook/react';

import SPagination, { type PaginationProps } from '../components/SPagination';

const meta = {
	title: 'SPagination',
	component: SPagination,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
 argTypes: {
  perPageOpts: [20, 50, 100]
 },
} satisfies Meta<typeof SPagination>;

export default meta;

type Story = StoryObj<PaginationProps>;

export const Default: Story = {
	args: {
		pagination: {
			lastPage: 1000,
			page: 1,
			perPage: 10,
		},
	},
};

export const PerPage1: Story = {
	args: {
		pagination: {
			lastPage: 1000,
			page: 254,
			perPage: 10,
		},
	},
};

export const PerPageOpts: Story = {
	args: {
		pagination: {
			lastPage: 1000,
			page: 254,
			perPage: 10,
		},
  perPageOpts: [20, 50, 100]
	},
};
