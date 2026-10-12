import {Menu, X} from "lucide-react";

interface NavToggleProps {
  open: boolean;
  onToggle: () => void;
}

/** The mobile hamburger at the right end of the nav pill. */
export function NavToggle({open, onToggle}: NavToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-nav"
      aria-label={open ? "Close menu" : "Open menu"}
      className="flex w-14 shrink-0 cursor-pointer items-center justify-center rounded-r-xl border-hairline border-black/10 bg-white transition-colors active:bg-muted md:hidden"
    >
      {open ? <X className="size-6 text-sub" /> : <Menu className="size-6 text-brand" />}
    </button>
  );
}
