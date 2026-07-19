import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Container } from "./container"
import { BrandLogo } from "./brand-logo"
import { NAV_LINKS } from "../data"


export function SiteNav() {
  return (
    <header className="fixed top-10 left-1/2 z-50 mx-auto w-3/5 -translate-x-1/2">
      <Container className="flex h-[50px] items-center justify-center gap-2">
        <a
          href="#"
          aria-label={"Owambe Space home"}
          className={cn(
            "flex h-full items-center justify-center gap-2 rounded-l-xl bg-grey px-4"
          )}
        >
          <BrandLogo tone="dark" />
        </a>

        <nav className="hidden items-center gap-8 bg-grey md:flex h-full px-5">
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
            "h-full rounded-r-xl rounded-l-none bg-white text-brand hover:bg-grey border-brand"
          )}
        >
          Join the waitlist
        </a>
      </Container>
    </header>
  )
}
