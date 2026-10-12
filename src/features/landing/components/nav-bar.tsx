import {buttonVariants} from "@/components/ui/button";
import {cn} from "cn";

import {BrandLogo} from "./brand-logo";
import {NavToggle} from "./nav-toggle";
import {NAV_LINKS} from "../data";

interface NavBarProps {
  open: boolean;
  onToggle: () => void;
}

/** The pill bar itself: logo · desktop links · CTA · mobile hamburger. */
export function NavBar({open, onToggle}: NavBarProps) {
  return (
    <div className="flex h-[54px] items-stretch gap-1.5 md:h-[50px] md:justify-center md:gap-2">
      <a
        href="/#hero"
        aria-label="Owambe Space home"
        className="flex flex-1 items-center rounded-l-xl border-hairline border-black/10 bg-grey px-4 md:flex-none"
      >
        <BrandLogo tone="dark" />
      </a>

      <nav aria-label="Main" className="hidden h-full items-center gap-8 border-y-hairline border-black/10 bg-grey px-5 md:flex">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="text-sm text-soft transition-colors hover:text-white">
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="/#waitlist"
        className={cn(
          buttonVariants({size: "lg"}),
          "hidden h-full rounded-l-none rounded-r-xl border-brand bg-white text-brand hover:bg-grey md:inline-flex"
        )}
      >
        Join the waitlist
      </a>

      <NavToggle open={open} onToggle={onToggle} />
    </div>
  );
}
