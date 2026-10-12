import {cn} from "cn";
import {SiteFooter} from "@/features/landing/components/site-footer";
import {SiteNav} from "@/features/landing/components/site-nav";

/**
 * Blog pages render inside the landing site's own shell — the same floating
 * nav and footer as the marketing pages, with top padding to clear the
 * fixed-position nav.
 */
export function BlogLayout({children, className}: {children: React.ReactNode; className?: string}) {
  return (
    <div className="min-h-svh bg-background">
      <SiteNav />
      <main className={cn("pb-24 pt-32 md:pt-40", className)}>{children}</main>
      <SiteFooter />
    </div>
  );
}
