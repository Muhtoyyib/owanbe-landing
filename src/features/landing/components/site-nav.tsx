import {useRef, useState} from "react";

import {MobileNavMenu} from "./mobile-nav-menu";
import {NavBar} from "./nav-bar";
import {useOutsideDismiss} from "../hooks/use-outside-dismiss";

/**
 * Floating pill nav. On desktop it is a single centered row (logo · links ·
 * CTA). On mobile the links and CTA collapse into a hamburger that reveals a
 * dark dropdown card beneath the bar, per the mobile design.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  /** Escape and taps outside the nav dismiss the mobile dropdown. */
  useOutsideDismiss(navRef, open, () => setOpen(false));

  // The bar spans the viewport to stay centered, but only the pill itself takes
  // pointer events so the empty strip never swallows taps on the hero below.
  return (
    <header className="pointer-events-none fixed inset-x-0 top-6 z-50 md:top-10">
      <div ref={navRef} className="pointer-events-auto mx-auto flex w-full flex-col gap-1 px-6 md:w-3/5 md:max-w-5xl">
        <NavBar open={open} onToggle={() => setOpen((value) => !value)} />
        <MobileNavMenu open={open} onNavigate={() => setOpen(false)} />
      </div>
    </header>
  );
}
