import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

export interface Column {
	label: string;
	name: string;
	field?: ((row: Row) => string) | string;
	headerClass?: string;
	cellClass?: string;
	format?: (val: string, row: Row) => string;
	align?: 'center' | 'left' | 'right';
}

export interface TableProps {
	columns: Column[];
	rows: Row[];
	resizable?: boolean;
	stickyHeader?: boolean;
	className?: string;
	noDataLabel?: string;
}

const STable = ({
	columns = [],
	rows = [],
	className = '',
	noDataLabel = '데이터가 없습니다.',
	resizable = false,
	stickyHeader = false,
}: TableProps) => {
 const [colWidths, setColWidths] = useState<number[]>(columns.map(() => 100));
	const tdClass = 'py-12pxr px-16pxr leading-20pxr';
	const align = {
		center: 'text-center justify-center',
		left: 'text-left justify-start',
		right: 'text-right justify-end',
	};

	const tableBorder = 'border-b border-b-Grey_Lighten-3';

const handleMouseDown = (e: React.MouseEvent, index: number) => {
 const startX = e.clientX;
 const startWidth = colWidths[index];

 const onMouseMove = (e: MouseEvent) => {
   const newWidth = startWidth + (e.clientX - startX);
   setColWidths((prevWidths) => {
     const updatedWidths = [...prevWidths];
     const MIN_WIDTH = 50
     updatedWidths[index] = Math.max(newWidth, MIN_WIDTH);
     return updatedWidths;
   });
 };

 const onMouseUp = () => {
   document.removeEventListener('mousemove', onMouseMove);
   document.removeEventListener('mouseup', onMouseUp);
 };

 document.addEventListener('mousemove', onMouseMove);
 document.addEventListener('mouseup', onMouseUp);
};
	return (
		<div
			className={[
				'relative w-full rounded-8pxr border border-Grey_Lighten-3',
				stickyHeader ? 'overflow-auto' : 'overflow-hidden',
				className,
			].join(' ')}
		>
			<table
				className={['w-full border-collapse'].join(' ')}
			>
				<thead
					className={[
						'bg-Blue_C_Lighten-8',
						tableBorder,
						stickyHeader ? 'sticky top-0' : '',
					].join(' ')}
				>
					<tr>
						{columns.map((col, colIdx) => (
							<th
								key={col.name}
								className={[
									'px-16pxr py-8pxr font-medium leading-20pxr text-Grey_Darken-5',
									col.headerClass,
									!rows.length && 'opacity-40',
								].join(' ')}
        style={{ width: `${colWidths[colIdx]}px` }}
							>
								<div className={['inline-flex w-full relative', align[col.align || 'center']].join(' ')}>
								{colIdx !== columns.length - 1	&& resizable && <div
										className={[
											'absolute cursor-pointer h-16pxr w-4pxr rounded-8pxr border-x border-x-Grey_Lighten-2 right-0 transform translate-x-2',
										].join(' ')}
          onMouseDown={(e) => handleMouseDown(e, colIdx)}
									></div>}
									{col.label}
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.length ? (
						rows.map((row, rowIdx) => (
							<tr
								key={rowIdx}
								className={[tableBorder, 'last-of-type:border-b-0'].join(' ')}
							>
								{columns.map((col) => {
									const rowData = col.field
										? typeof col.field === 'string'
											? row[col.field]
											: col.field(row)
										: row[col.name];
									const formatTd = col.format ? col.format(rowData, row) : rowData;
									return (
										<td
											key={col.name}
											className={[
												col.cellClass,
												align[col.align || 'center'],
												tdClass,
											].join(' ')}
										>
											{formatTd}
										</td>
									);
								})}
							</tr>
						))
					) : (
						<tr className='h-150pxr'>
							<td
								colSpan={columns.length}
								className='text-center text-Grey_Default'
							>
								{noDataLabel}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default STable;
