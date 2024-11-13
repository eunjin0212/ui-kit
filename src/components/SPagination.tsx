import { Dispatch, type ReactNode, useMemo } from 'react';
import Icon from './Icon';

export interface PaginationType {
	lastPage: number;
	page: number;
	perPage: number;
}

export interface PaginationProps {
	pagination: PaginationType;
	perPageOpts?: number[];
	className?: string;
	setPagination: Dispatch<PaginationType>;
}

const PaginationButton = ({
	children,
	pageDigits = 1,
	className = '',
	onClick,
	active = false,
}: {
	children: ReactNode | number;
	pageDigits?: number;
	className?: string;
	active?: boolean;
	onClick?: () => void;
}) => {
	const checkTotalPageDigits = () => Math.abs(pageDigits).toString().length;
	const buttonSize = {
		1: 'w-26pxr',
		2: 'w-36pxr',
		3: 'w-42pxr',
		4: 'w-50pxr',
		5: 'w-58pxr',
	} as Record<number, string>;

	return (
		<button
			onClick={onClick}
			className={[
				'relative inline-flex h-26pxr items-center justify-center rounded-14pxr',
				'before:hover:absolute before:hover:h-full before:hover:w-full before:hover:rounded-14pxr before:hover:border before:hover:border-Blue_B_Lighten-1',
				active
					? 'bg-Blue_B_Lighten-1 text-white hover:!text-white'
					: `text-Grey_Darken-2 ${typeof children === 'number' && 'hover:text-Blue_B_Lighten-1'}`,
				className,
				buttonSize[checkTotalPageDigits()],
			].join(' ')}
		>
			{children}
		</button>
	);
};

const SPagination = ({
	pagination = {
		page: 1,
		perPage: 50,
		lastPage: 1,
	},
	className = '',
	setPagination,
	// perPageOpts = [20, 50, 100, 150],
}: PaginationProps) => {
	const pages = useMemo(() => {
		const { lastPage, page, perPage } = pagination;
		const startPage = Math.floor((page - 1) / perPage) * perPage + 1; // 현재 페이지 그룹의 시작 페이지
		const endPage = Math.min(startPage + perPage - 1, lastPage); // 현재 페이지 그룹의 끝 페이지

		// 페이지 번호 생성
		return Array.from(
			{ length: endPage - startPage + 1 },
			(_, index) => startPage + index
		);
	}, [pagination]);

	const handlePage = (type: 'next' | 'prev' | 'last' | 'first') => {
		const { page, perPage, lastPage } = pagination;

		let newPage = page;

		switch (type) {
			case 'next':
				newPage = Math.min(
					Math.floor((page - 1) / perPage) * perPage + perPage + 1,
					lastPage
				);
				break;
			case 'prev':
				newPage = Math.max(
					Math.floor((page - 1) / perPage) * perPage - perPage + 1,
					1
				);
				break;
			case 'last':
				newPage = lastPage;
				break;
			case 'first':
				newPage = 1;
				break;
			default:
				break;
		}

		setPagination({ ...pagination, page: newPage });
	};

	const handleCurrentPage = (page: number) => {
		setPagination({ ...pagination, page });
	};

	const iconClass = 'w-60pxr h-26pxr inline-flex items-center justify-center gap-x-8pxr';
	return (
		<div
			className={[
				's-pagination flex flex-nowrap items-center justify-center gap-x-8pxr text-Grey_Darken-2',
				className,
			].join(' ')}
		>
			<div className={iconClass}>
				{pagination.page !== 1 && (
					<>
						<PaginationButton onClick={() => handlePage('first')}>
							<Icon name='ArrowLeftEnd_12' />
						</PaginationButton>
						<PaginationButton onClick={() => handlePage('prev')}>
							<Icon name='ArrowLeft_12' />
						</PaginationButton>
					</>
				)}
			</div>
			{pagination.perPage !== 1 ? (
				pages.map((page) => (
					<PaginationButton
						key={page}
						pageDigits={pages[pages.length - 1]}
						active={pagination.page === page}
						onClick={() => handleCurrentPage(page)}
					>
						{page}
					</PaginationButton>
				))
			) : (
				<div className='flex items-center gap-x-8pxr'>
					<span className='h-20pxr w-30pxr text-center leading-20pxr'>
						{pagination.page}
					</span>
					<span>/</span>
					<span className='h-20pxr w-30pxr text-center leading-20pxr'>
						{pagination.lastPage}
					</span>
				</div>
			)}
			<div className={iconClass}>
				{pagination.page !== pagination.lastPage && (
					<>
						<PaginationButton onClick={() => handlePage('next')}>
							<Icon name='ArrowRight_12' />
						</PaginationButton>
						<PaginationButton onClick={() => handlePage('last')}>
							<Icon name='ArrowRightEnd_12' />
						</PaginationButton>
					</>
				)}
			</div>
		</div>
	);
};
export default SPagination;
