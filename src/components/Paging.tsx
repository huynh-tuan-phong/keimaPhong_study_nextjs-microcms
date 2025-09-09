// components/Paging.tsx
import "../styles/component/paging.css";

type Props = {
  totalCount: number;
  currentPage: number;
  perPage?: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export default function Paging({ totalCount, currentPage, perPage = 12, onPageChange, disabled = false }: Props) {
  const totalPages = Math.ceil(totalCount / perPage);
  if (totalPages <= 1) return null;

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

  const buildRange = (total: number, current: number, siblingCount = 1) => {
    const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2 siblings, 2 ellipsis
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

  const range = buildRange(totalPages, currentPage, 1);

  const goto = (page: number) => {
    if (disabled) return;
    const p = clamp(page, 1, totalPages);
    if (p !== currentPage) onPageChange(p);
  };

  return (
    <nav className="paging" aria-label="Pagination">
      <button
        type="button"
        className={`nav ${currentPage === 1 ? 'is-disabled' : ''}`}
        onClick={() => goto(1)}
        aria-label="First page"
        disabled={disabled || currentPage === 1}
      >
        « First
      </button>
      <button
        type="button"
        className={`nav ${currentPage === 1 ? 'is-disabled' : ''}`}
        onClick={() => goto(currentPage - 1)}
        aria-label="Previous page"
        disabled={disabled || currentPage === 1}
      >
        ‹ Prev
      </button>

      {range.map((item, idx) =>
        item === '…' ? (
          <span key={`dots-${idx}`} className="ellipsis" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={item as number}
            type="button"
            onClick={() => goto(item as number)}
            className={`page ${currentPage === item ? 'is-active' : ''}`}
            aria-current={currentPage === item ? 'page' : undefined}
            disabled={disabled}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        className={`nav ${currentPage === totalPages ? 'is-disabled' : ''}`}
        onClick={() => goto(currentPage + 1)}
        aria-label="Next page"
        disabled={disabled || currentPage === totalPages}
      >
        Next ›
      </button>
      <button
        type="button"
        className={`nav ${currentPage === totalPages ? 'is-disabled' : ''}`}
        onClick={() => goto(totalPages)}
        aria-label="Last page"
        disabled={disabled || currentPage === totalPages}
      >
        Last »
      </button>
    </nav>
  );
}
