import {cn} from "cn";
import {blogCategories} from "@/lib/site-config";

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({active, onChange}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {blogCategories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          aria-pressed={active === category}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
            active === category
              ? "border-brand bg-brand text-brand-foreground"
              : "border-border bg-background text-muted-foreground hover:border-brand/40 hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
