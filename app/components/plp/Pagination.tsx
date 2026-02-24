import {Link} from 'react-router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({currentPage, totalPages, baseUrl}: PaginationProps) {
  const pages = Array.from({length: Math.min(totalPages, 6)}, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-4 py-8" aria-label="Pagination">
      {/* Previous */}
      <Link
        to={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : '#'}
        className={`text-base font-medium font-bricolage ${
          currentPage > 1 ? 'text-black hover:underline' : 'text-[#CACACA] pointer-events-none'
        }`}
      >
        Prev
      </Link>

      {/* Page numbers */}
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <Link
            key={page}
            to={`${baseUrl}?page=${page}`}
            className={`text-base font-bricolage px-2 ${
              page === currentPage
                ? 'font-medium text-black underline'
                : 'font-normal text-black hover:underline'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* Next */}
      <Link
        to={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : '#'}
        className={`text-base font-medium font-bricolage ${
          currentPage < totalPages
            ? 'text-[#C42424] hover:underline'
            : 'text-[#CACACA] pointer-events-none'
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
