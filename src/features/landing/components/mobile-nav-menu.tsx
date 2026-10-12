import {AnimatePresence, motion} from "motion/react";

import {NAV_LINKS} from "../data";

/**
 * The dark dropdown card the hamburger reveals on mobile. Stays mounted only
 * while open because the height animation needs a measured `auto` target —
 * AnimatePresence plays the exit on unmount.
 */
export function MobileNavMenu({open, onNavigate}: {open: boolean; onNavigate: () => void}) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.nav
          id="mobile-nav"
          aria-label="Main"
          initial={{height: 0, opacity: 0}}
          animate={{height: "auto", opacity: 1}}
          exit={{height: 0, opacity: 0}}
          transition={{duration: 0.24, ease: "easeOut"}}
          className="overflow-hidden md:hidden"
        >
          <ul className="flex flex-col rounded-xl border-hairline border-black/10 bg-grey">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={onNavigate}
                  className="flex h-[54px] items-center px-6 text-sm text-soft transition-colors hover:text-white active:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
