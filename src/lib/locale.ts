export const landingLocales = ["en"] as const;

export const defaultLandingLocale = "en" as const;
export const landingLanguageStorageKey = "app-language";
export type LandingLocale = (typeof landingLocales)[number];

const landingLocaleSet = new Set<string>(landingLocales);

export function isLandingLocale(value: string | undefined): value is LandingLocale {
  return value !== undefined && landingLocaleSet.has(value);
}

export function resolveLandingLocale(value?: string): LandingLocale {
  return isLandingLocale(value) ? value : defaultLandingLocale;
}

export function isDefaultLandingLocale(locale: LandingLocale): boolean {
  return locale === defaultLandingLocale;
}

function normalizePathname(pathname: string): string {
  const pathOnly = pathname.split(/[?#]/u, 1)[0] ?? "/";
  const ensured = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;

  if (ensured === "/") return ensured;
  return ensured.replace(/\/+$/u, "") || "/";
}

export function getPathLocale(pathname: string): LandingLocale {
  const normalizedPath = normalizePathname(pathname);
  const [maybeLocale] = normalizedPath.split("/").filter(Boolean);

  return isLandingLocale(maybeLocale) ? maybeLocale : defaultLandingLocale;
}

/**
 * Prefixes a pathname with the locale when the locale is not the default.
 * With a single `en` locale this is currently a pass-through; it exists so
 * adding locales later (`pcm`, `yo`, `ig`, `ha`) doesn't change call sites.
 */
export function buildLocalizedPath(pathname: string, locale: LandingLocale = defaultLandingLocale): string {
  const normalized = normalizePathname(pathname);
  if (isDefaultLandingLocale(locale)) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = normalizePathname(pathname);
  const [maybeLocale, ...rest] = normalized.split("/").filter(Boolean);
  if (!isLandingLocale(maybeLocale)) return normalized;
  const stripped = `/${rest.join("/")}`;
  return stripped === "/" ? "/" : stripped;
}
