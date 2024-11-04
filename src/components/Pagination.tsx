import {
	useState,
	useEffect,
	type ChangeEvent,
	type SetStateAction,
	type Dispatch,
} from 'react';

export interface PaginationType {
	page?: number;
	rowsPerPage?: number;
	lastPage: number;
}

interface PaginationProps {
	total: number;
	rowsPerPageOptions?: number[];
	setPagination: Dispatch<SetStateAction<PaginationType>>;
	pagination: PaginationType;
}

const Pagination = ({
	total,
	rowsPerPageOptions = [10, 20, 50, 100],
	setPagination,
	pagination = {
		page: 1,
		lastPage: 0,
		rowsPerPage: 0,
	},
}: PaginationProps) => {
	const [paginationValue, setPaginationValue] =
		useState<PaginationType>(pagination);

	useEffect(() => {
		const calculatedLastPage = Math.ceil(total / pagination.rowsPerPage);
		setPagination((prev) => ({ ...prev, lastPage: calculatedLastPage }));
	}, [total, pagination.rowsPerPage, setPagination]);

	const handlePageChange = (newPage: number) => {
		setPagination((prev) => ({ ...prev, page: newPage }));
	};

	const handleRowsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const newRowsPerPage = parseInt(event.target.value, 10);
		const calculatedLastPage = Math.ceil(total / newRowsPerPage);
		setPaginationValue({
			page: 1,
			rowsPerPage: newRowsPerPage,
			lastPage: calculatedLastPage,
		});
	};

	return (
		<aside className='z-10 s-pagination relative inline-flex w-full h-60pxr items-center justify-center rounded-8pxr border border-t-0 border-Grey_Lighten-3 bg-Grey_Lighten-6 px-20pxr py-16pxr'>
			<div className='flex items-center space-x-2'>
				<button
					disabled={paginationValue.page === 1}
					onClick={() => handlePageChange(1)}
				>
					{'<<'}
				</button>
				<button
					disabled={paginationValue.page === 1}
					onClick={() => handlePageChange(paginationValue.page - 1)}
				>
					{'<'}
				</button>
				{paginationValue.lastPage > 0 && Array.from({ length: paginationValue.lastPage || 0 }).map((_, index) => (
					<button
						key={index}
						onClick={() => handlePageChange(index + 1)}
						className={
							paginationValue.page === index + 1
								? 'rounded-full bg-blue-500 px-2 text-white'
								: 'px-2'
						}
					>
						{index + 1}
					</button>
				))}

				<button
					disabled={paginationValue.page === paginationValue.lastPage}
					onClick={() => handlePageChange(paginationValue.page + 1)}
				>
					{'>'}
				</button>
				<button
					disabled={paginationValue.page === paginationValue.lastPage}
					onClick={() => handlePageChange(paginationValue.lastPage)}
				>
					{'>>'}
				</button>
			</div>

				<select
					value={paginationValue.rowsPerPage}
					onChange={handleRowsPerPageChange}
					className='absolute right-20pxr rounded border border-Grey_Lighten-3'
				>
					{rowsPerPageOptions.map((option) => (
						<option
							key={option}
							value={option}
						>
							{option}
						</option>
					))}
				</select>
		</aside>
	);
};

export default Pagination;
