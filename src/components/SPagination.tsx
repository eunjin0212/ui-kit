import { useMemo } from 'react';
import Icon from './Icon';

export interface PaginationType {
 lastPage: number;
 page: number;
 perPage: number;
}

interface PaginationProps {
 pagination: PaginationType;
 perPageOpts?: number[];
 className?: string;
}

const SPagination = ({
 pagination = {
  page: 1,
  perPage: 10,
  lastPage: 1,
 },
 className = '',
 perPageOpts = [20, 50, 100, 150],
}: PaginationProps) => {
 const displayedPageNumber = useMemo(() => {
  const { lastPage, page, perPage } = pagination
  const pages = [];
  const startPage = Math.floor((page - 1) / perPage) * perPage + 1; // 현재 페이지 그룹의 시작 페이지
  const endPage = Math.min(startPage + perPage - 1, lastPage); // 현재 페이지 그룹의 끝 페이지

  // 페이지 번호 생성
  for (let i = startPage; i <= endPage; i++) {
   pages.push(i);
  }

  return pages;
 }, [pagination]);
 return (
  <div
   className={['s-pagination justify-center flex flex-nowrap items-center gap-x-8pxr text-Grey_Darken-2', className].join(
    ' '
   )}
  >
   <div>
    <button>
     <Icon name='ArrowLeftEnd_12' />
    </button>
    <button>
     <Icon name='ArrowLeft_12' />
    </button>
   </div>
    {displayedPageNumber.map((pageNumber: number) => (
     <button className='h-26pxr' key={pageNumber}>{pageNumber}</button>
    ))}
   <div>
    <button>
     <Icon name='ArrowRight_12' />
    </button>
    <button>
     <Icon name='ArrowRightEnd_12' />
    </button>
   </div>
  </div>
 );
};
export default SPagination;
