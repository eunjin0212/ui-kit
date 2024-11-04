import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Icon from './Icon';
import Pagination, { type PaginationType } from './Pagination';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = any;

export interface Column {
	label: string;
	name: string;
	field?: ((row: Row) => string) | string;
	headerClasses?: string;
	classes?: string | void;
	format?: (val: string, row: Row) => string;
	align?: 'center' | 'left' | 'right';
	style?: string;
	headerStyle?: string;
	sortable?: boolean;
}

export interface TableProps {
	columns: Column[];
	rows: Row[];
	resizable?: boolean;
	stickyHeader?: boolean;
	loading?: boolean;
	className?: string;
	noDataLabel?: string;
	tableClasses?: string;
 pagination: PaginationType;
 rowsPerPageOptions?: number[];
	setPagination: Dispatch<SetStateAction<PaginationType>>;
}

const STable = ({
	columns = [],
	rows = [],
	className = '',
	noDataLabel = '데이터가 없습니다.',
	resizable = false,
	stickyHeader = false,
	loading = false,
	tableClasses = '',
 pagination,
 setPagination,
}: TableProps) => {
	const [colWidths, setColWidths] = useState<number[]>([]);
	const [sortDirections, setSortDirections] = useState<string[]>([]);
	const [sortedRows, setSortedRows] = useState<Row[]>(rows);
	const [paginationValue] = useState<PaginationType>(pagination);

	const handleSort = (index: number) => {
		const newDirection = sortDirections[index] === 'asc' ? 'desc' : 'asc';
		setSortDirections((prevDirections) =>
			prevDirections.map((direction, idx) =>
				idx === index ? newDirection : direction
			)
		);

		const column = columns[index];
		const sortedData = [...sortedRows].sort((a, b) => {
			const field = column.field || column.name;
			const aValue = typeof field === 'function' ? field(a) : a[field];
			const bValue = typeof field === 'function' ? field(b) : b[field];

			if (newDirection === 'asc') return aValue > bValue ? 1 : -1;
			return aValue < bValue ? 1 : -1;
		});

		setSortedRows(sortedData);
	};

	const handleResize = (index: number, event: React.MouseEvent) => {
		const startX = event.clientX;
		const startWidth = colWidths[index];

		const handleMouseMove = (moveEvent: MouseEvent) => {
			const newWidth = Math.max(startWidth + moveEvent.clientX - startX, 50);
			setColWidths(
				(prevWidths) =>
					prevWidths.map((width, idx) => (idx === index ? newWidth : width)) // 최소 너비 50px
			);
		};

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	useEffect(() => {
		setColWidths(columns.map(() => 100));
		setSortDirections(columns.map((col) => (col.sortable ? 'asc' : '')));
		setSortedRows(rows);
	}, [columns, rows]);

	const loadingStyle = {
		'--_m':
			'conic-gradient(#0000 10%,#000),linear-gradient(#000 0 0) content-box',
		WebkitMask: 'var(--_m)',
		mask: 'var(--_m)',
		WebkitMaskComposite: 'source-out',
		maskComposite: 'subtract',
	};

	const alignClass = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right',
	};

	const alignFlexClass = {
		left: 'justify-start',
		center: 'justify-center',
		right: 'justify-end',
	};

	const renderLoading = () => (
		<div className='s-table__loading absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40'>
			<div
				className='loading aspect-square w-50pxr animate-spin rounded-full bg-positive p-8pxr transition-all'
				style={loadingStyle}
			></div>
		</div>
	);

	const renderNoData = () => (
		<tr>
			<td
				colSpan={columns.length}
				className='before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-white before:bg-opacity-40 before:content-[""]'
			>
				<div className='relative z-50 flex min-h-100pxr items-center justify-center text-Grey_Default '>
					{noDataLabel}
				</div>
			</td>
		</tr>
	);

	const renderCell = (row: Row, column: Column, rowIndex: number) => {
		const rowData = column.field
			? typeof column.field === 'string'
				? row[column.field]
				: column.field(row)
			: row[column.name];
		const formatTd = column.format ? column.format(rowData, row) : rowData;

		return (
			<td
				key={column.label}
				className={[
					'h-48pxr bg-white px-16pxr py-0',
					alignClass[column.align || 'left'],
					rowIndex > 0 ? 'border-t border-t-Grey_Lighten-3' : '',
				].join(' ')}
			>
				{formatTd}
			</td>
		);
	};

	const renderRows = () =>
		sortedRows.map((row, rowIndex) => (
			<tr
				key={rowIndex}
				className='hover:bg-Grey_Lighten-6'
			>
				{columns.map((column) => renderCell(row, column, rowIndex))}
			</tr>
		));

	const renderHeader = () =>
		columns.map((column, colIdx) => (
			<th
				key={column.label}
				className={[
					'relative h-36pxr border-b border-b-Grey_Lighten-3 bg-Blue_C_Lighten-8 px-16pxr py-0 font-medium',
					stickyHeader ? 'sticky top-0' : '',
				].join(' ')}
				style={{
					minWidth: `${(colWidths[colIdx] as number) / 12}rem`,
					maxWidth: `${(colWidths[colIdx] as number) / 12}rem`,
					width: `${(colWidths[colIdx] as number) / 12}rem`,
				}}
			>
				<div
					className={[
						'flex flex-nowrap items-center',
						alignFlexClass[column.align || 'left'],
					].join(' ')}
				>
					<span className='truncate'>{column.label}</span>
					{column.sortable && (
						<button
							className='ml-4pxr'
							onClick={() => handleSort(colIdx)}
						>
							<Icon
								name={sortDirections[colIdx] === 'asc' ? 'LineDown_12' : 'LineUp_12'}
								color='Grey_Default'
							/>
						</button>
					)}
				</div>
				{resizable && colIdx !== columns.length - 1 && (
					<div
						className='absolute right-0 top-1/2 z-50 h-16pxr w-4pxr -translate-y-1/2 cursor-col-resize border-l border-r border-Grey_Lighten-2'
						onMouseDown={(evt) => handleResize(colIdx, evt)}
					/>
				)}
			</th>
		));

	return (
		<div className={`s-table ${className}`}>
			<div
				className={[
					'relative w-full rounded-8pxr border border-Grey_Lighten-3',
					stickyHeader ? 'overflow-auto' : 'overflow-hidden',
					tableClasses,
				].join(' ')}
			>
				{loading && renderLoading()}
				<table
					className={[
						's-table__container min-w-full table-fixed border-separate border-spacing-0',
					].join(' ')}
				>
					<thead>
						<tr className='border-b border-b-Grey_Lighten-3'>{renderHeader()}</tr>
					</thead>

					<tbody>{rows.length === 0 ? renderNoData() : renderRows()}</tbody>
				</table>
			</div>
			{paginationValue.lastPage > 0 && <Pagination
				pagination={paginationValue}
				total={sortedRows.length}
				setPagination={setPagination}
				rowsPerPageOptions={[10, 20, 50]}
			/>}
		</div>
	);
};

export default STable;
