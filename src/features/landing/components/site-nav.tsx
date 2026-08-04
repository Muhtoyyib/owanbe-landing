import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Menu, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { BrandLogo } from "./brand-logo"
import { NAV_LINKS } from "../data"

/**
 * Floating pill nav. On desktop it is a single centered row (logo · links ·
 * CTA). On mobile the links and CTA collapse into a hamburger that reveals a
 * dark dropdown card beneath the bar, per the mobile design.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  /** Escape and taps outside the nav dismiss the mobile dropdown. */
  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open])

  // The bar spans the viewport to stay centered, but only the pill itself takes
  // pointer events so the empty strip never swallows taps on the hero below.
  return (
    <header className="pointer-events-none fixed inset-x-0 top-6 z-50 md:top-10">
      <div
        ref={navRef}
        className="pointer-events-auto mx-auto flex w-full flex-col gap-1 px-6 md:w-3/5 md:max-w-5xl"
      >
        <div className="flex h-[54px] items-stretch gap-1.5 md:h-[50px] md:justify-center md:gap-2">
          <a
            href="#hero"
            aria-label="Owambe Space home"
            className="flex flex-1 items-center rounded-l-xl border-[0.5px] border-black/10 bg-grey px-4 md:flex-none"
          >
            <BrandLogo tone="dark" />
          </a>

          <nav
            aria-label="Main"
            className="hidden h-full items-center gap-8 border-y-[0.5px] border-black/10 bg-grey px-5 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-soft transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#waitlist"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-full rounded-l-none rounded-r-xl border-brand bg-white text-brand hover:bg-grey md:inline-flex"
            )}
          >
            Join the waitlist
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex w-14 shrink-0 cursor-pointer items-center justify-center rounded-r-xl border-[0.5px] border-black/10 bg-white transition-colors active:bg-muted md:hidden"
          >
            {open ? (
              <X className="size-6 text-sub" />
            ) : (
              <Menu className="size-6 text-brand" />
            )}
          </button>
        </div>

        {/* Height animation needs a measured `auto` target, so the panel stays
            mounted only while open and AnimatePresence plays it back out. */}
        <AnimatePresence initial={false}>
          {open ? (
            <motion.nav
              id="mobile-nav"
              aria-label="Main"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col rounded-xl border-[0.5px] border-black/10 bg-grey">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
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
      </div>
    </header>
  )
}
