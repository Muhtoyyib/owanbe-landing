import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {cn} from "cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({currentPage, totalPages, onPageChange}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-2">
      <PaginationButton disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} label="Previous page">
        <ChevronLeftIcon className="size-4" />
      </PaginationButton>
      {Array.from({length: totalPages}, (_, index) => index + 1).map((page) => (
        <PaginationButton key={page} active={page === currentPage} onClick={() => onPageChange(page)} label={`Page ${page}`}>
          {page}
        </PaginationButton>
      ))}
      <PaginationButton disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)} label="Next page">
        <ChevronRightIcon className="size-4" />
      </PaginationButton>
    </nav>
  );
}

function PaginationButton({
  children,
  active,
  disabled,
  onClick,
  label,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex size-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
        active ? "border-brand bg-brand text-brand-foreground" : "border-border bg-background text-muted-foreground",
        disabled ? "cursor-not-allowed opacity-40" : "hover:border-brand/40 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
