import "@tanstack/react-start/server-only";
import {blog} from "fumadocs-mdx:collections/server";
import {buildLocalizedPath, defaultLandingLocale, isLandingLocale, landingLocales, type LandingLocale} from "@/lib/locale";
import {type UntrustedRecord, type UntrustedValue} from "@/lib/untrusted";

export interface BlogPostSummary {
  locale: LandingLocale;
  slug: string;
  path: string;
  href: string;
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
  featured: boolean;
  excerpt: string;
}

function normalizeBlogSlug(value: string) {
  return value
    .replace(/^\/+/u, "")
    .replace(/\/index$/u, "")
    .replace(/\.(mdx|md)$/u, "");
}

interface BlogEntryExtras {
  author: string;
  date: string;
  image: string;
  category: string;
  featured: boolean;
  excerpt: string;
}

function extractBlogFields(entry: (typeof blog)[number]): BlogEntryExtras {
  const raw = entry as UntrustedValue as UntrustedRecord;
  return {
    author: (raw.author as string) ?? "OwanbeSpace",
    date: (raw.date as string) ?? "",
    image: (raw.image as string) ?? "",
    category: (raw.category as string) ?? "Product",
    featured: (raw.featured as boolean) ?? false,
    excerpt: (raw.excerpt as string) ?? "",
  };
}

// Content is organized as `<locale>/YYYY/MM/DD/<slug>.mdx`, but those date folders are
// filing only: the slug is the filename alone. Keeping them out of the slug is what
// lets a post be refiled without changing a URL that already appears in the sitemap
// and in sent links. Must stay in agreement with scripts/lib/prerender-pages.ts.
function resolveLocaleAndSlug(normalizedPath: string) {
  const pathSegments = normalizedPath.split("/").filter(Boolean);
  const maybeLocale = pathSegments[0];
  const locale = isLandingLocale(maybeLocale) ? maybeLocale : defaultLandingLocale;
  const slugSegments = isLandingLocale(maybeLocale) ? pathSegments.slice(1) : pathSegments;
  return {locale, slug: slugSegments.at(-1) ?? ""};
}

function toBlogPostSummary(entry: (typeof blog)[number]): BlogPostSummary {
  const {locale, slug} = resolveLocaleAndSlug(normalizeBlogSlug(entry.info.path));
  const extras = extractBlogFields(entry);

  return {
    locale,
    slug,
    path: entry.info.path,
    href: slug ? `/blog/${slug}` : "/blog",
    title: entry.title,
    ...extras,
  };
}

export function getAllBlogPosts(locale?: LandingLocale): BlogPostSummary[] {
  return blog
    .map(toBlogPostSummary)
    .filter((post) => (locale ? post.locale === locale : true))
    .sort((left, right) => right.date.localeCompare(left.date));
}

export function getBlogPostBySlug(slug: string, locale: LandingLocale = defaultLandingLocale): BlogPostSummary | undefined {
  const normalizedSlug = normalizeBlogSlug(slug);
  return getAllBlogPosts(locale).find((post) => post.slug === normalizedSlug);
}

export function getBlogPostVariantsBySlug(slug: string): BlogPostSummary[] {
  const normalizedSlug = normalizeBlogSlug(slug);

  return getAllBlogPosts()
    .filter((post) => post.slug === normalizedSlug)
    .sort((left, right) => Number(right.locale === defaultLandingLocale) - Number(left.locale === defaultLandingLocale));
}

export function getBlogSitemapRoutes(): string[] {
  const articleRoutes = Array.from(new Set(getAllBlogPosts().map((post) => `/blog/${post.slug}`)));
  return Array.from(new Set(landingLocales.flatMap((locale) => articleRoutes.map((route) => buildLocalizedPath(route, locale)))));
}
