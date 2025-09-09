import Link from 'next/link';
import "../styles/component/paging.css";

export default function Paging({ totalCount, currentPage }: { totalCount: number; currentPage: number }) {
  const PER_PAGE = 12;
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  if (totalPages <= 1) return null;

  const buildRange = (total: number, current: number, siblingCount = 1) => {
    const totalNumbers = siblingCount * 2 + 5;
    if (total <= totalNumbers) return Array.from({ length: total }, (_, i) => i + 1);
    const left = Math.max(2, current - siblingCount);
    const right = Math.min(total - 1, current + siblingCount);
    const showLeftDots = left > 2;
    const showRightDots = right < total - 1;
    const range: Array<number | string> = [1];
    if (showLeftDots) range.push('…');
    for (let i = left; i <= right; i++) range.push(i);
    if (showRightDots) range.push('…');
    range.push(total);
    return range;
  };

  const hrefFor = (page: number) => `/blog_param${page > 1 ? `?page=${page}` : ''}`;

  const range = buildRange(totalPages, currentPage, 1);

  return (
    <nav className="paging" aria-label="Pagination">
      <Link href={hrefFor(1)} className={`nav ${currentPage === 1 ? 'is-disabled' : ''}`} replace scroll={false} aria-label="First page">
        « First
      </Link>
      <Link href={hrefFor(Math.max(1, currentPage - 1))} className={`nav ${currentPage === 1 ? 'is-disabled' : ''}`} replace scroll={false} aria-label="Previous page">
        ‹ Prev
      </Link>

      {range.map((item, idx) =>
        item === '…' ? (
          <span key={`dots-${idx}`} className="ellipsis" aria-hidden>
            …
          </span>
        ) : (
          <Link
            key={item as number}
            href={hrefFor(item as number)}
            replace
            scroll={false}
            className={`page ${currentPage === item ? 'is-active' : ''}`}
            aria-current={currentPage === item ? 'page' : undefined}
          >
            {item}
          </Link>
        )
      )}

      <Link href={hrefFor(Math.min(totalPages, currentPage + 1))} className={`nav ${currentPage === totalPages ? 'is-disabled' : ''}`} replace scroll={false} aria-label="Next page">
        Next ›
      </Link>
      <Link href={hrefFor(totalPages)} className={`nav ${currentPage === totalPages ? 'is-disabled' : ''}`} replace scroll={false} aria-label="Last page">
        Last »
      </Link>
    </nav>
  );
}
