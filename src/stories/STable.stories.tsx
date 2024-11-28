import type { Meta, StoryObj } from '@storybook/react';

import STable, { type TableProps, Column } from '../components/STable';

const meta = {
	title: 'STable',
	component: STable,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {},
} satisfies Meta<typeof STable>;

export default meta;

type Story = StoryObj<TableProps>;

const TABLE_COLUMNS: Column[] = [
	{
		name: 'product_code',
		label: '상품코드',
		field: 'product_code',
	},
	{
		name: 'product_name',
		label: '상품명',
		field: 'product_name',
		sortable: true,
	},
	{
		name: 'option_name',
		label: '옵션명',
		field: 'option_name',
	},
	{
		name: 'option_code',
		label: '옵션코드',
		field: 'option_code',
	},
	{
		name: 'status',
		label: '상태',
		field: 'status',
		align: 'center',
		sortable: true,
	},
];

const tableRows = [
	{
		product_name: 'ㄱㄱㄱ상품1',
		product_code: 'P001',
		option_name: '옵션1',
		option_code: 'O001',
		status: '판매중',
	},
	{
		product_name: 'ㄴㄴㄴ상품2',
		product_code: 'P002',
		option_name: '옵션2',
		option_code: 'O002',
		status: '판매중',
	},
	{
		product_name: 'ㅎㅎㅎ상품2',
		product_code: 'P002',
		option_name: '옵션2',
		option_code: 'O002',
		status: '판매중',
	},
];

export const Default: Story = {
	args: {
		columns: TABLE_COLUMNS,
		rows: tableRows,
	},
};

export const LoadingState: Story = {
	args: {
		columns: TABLE_COLUMNS,
		rows: tableRows,
		loading: true,
	},
};

export const EmptyState: Story = {
	args: {
		columns: TABLE_COLUMNS,
		rows: [],
	},
};

export const ResizableColumns: Story = {
	args: {
		columns: TABLE_COLUMNS,
		rows: tableRows,
		resizable: true,
	},
};

export const StickyHeader: Story = {
	args: {
		columns: TABLE_COLUMNS,
		rows: tableRows,
		stickyHeader: true,
	},
};