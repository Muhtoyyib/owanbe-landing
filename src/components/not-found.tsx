import {ChevronLeftIcon, HomeIcon} from "lucide-react";
import {Link, useRouter} from "@tanstack/react-router";
import {cn} from "cn";
import {t} from "@/lib/i18n";

export function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand">{t("site.not_found.eyebrow")}</p>
      <h1 className="mt-4 font-display text-7xl font-semibold tracking-[-0.04em] text-foreground md:text-9xl">404</h1>
      <p className="mt-4 max-w-lg text-balance text-lg leading-8 text-muted-foreground md:text-xl">{t("site.not_found.description")}</p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          to="/"
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5",
            "text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
          )}
        >
          <HomeIcon className="size-4" />
          {t("site.not_found.home")}
        </Link>
        <button
          type="button"
          onClick={() => router.history.back()}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5",
            "text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          )}
        >
          <ChevronLeftIcon className="size-4" />
          {t("site.not_found.back")}
        </button>
      </div>
    </main>
  );
}
