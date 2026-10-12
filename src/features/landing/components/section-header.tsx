import {cn} from "cn";

interface SectionHeaderProps {
  /** Small uppercase eyebrow label above the title (e.g. "WHY JOIN EARLY"). */
  eyebrow: string;
  /** Main section heading, rendered in the Gayathri display font. */
  title: string;
  /** Optional supporting paragraph below the title. */
  subtitle?: string;
  /** Color theme — dark sections invert the text colors. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

/**
 * Shared eyebrow + title + subtitle block used by every content section
 * (Why, Glimpse, Waitlist, FAQ) so heading rhythm stays consistent.
 */
export function SectionHeader({eyebrow, title, subtitle, tone = "light", align = "left", className}: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      <span className={cn("text-xs font-medium tracking-[0.25em] uppercase", dark ? "text-brand-light" : "text-brand")}>{eyebrow}</span>
      <h2
        className={cn(
          "trim-cap font-display text-4xl leading-tight font-normal tracking-tight md:text-5xl",
          dark ? "text-white" : "text-strong"
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("max-w-2xl text-base", align === "center" && "mx-auto", dark ? "text-white/70" : "text-muted-foreground")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
