import {buildLocalizedPath, defaultLandingLocale, type LandingLocale} from "./locale.ts";

interface SiteSocialLinks {
  x: string | null;
  instagram: string | null;
  tiktok: string | null;
  linkedin: string | null;
}

interface SiteMetadataDefaults {
  title: string;
  description: string;
  themeColor: string;
  locale: string;
}

interface SiteConfig {
  name: string;
  urls: {
    site: string;
    app: string;
    waitlistApi: string;
  };
  defaultMeta: SiteMetadataDefaults;
  socials: SiteSocialLinks;
}

export interface SiteLink {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
  icon?: string;
}

export type SiteTranslator = (key: string) => string;

export const siteConfig: SiteConfig = {
  name: "OwanbeSpace",
  urls: {
    site: "https://owanbespace.com",
    app: "https://app.owanbespace.com",
    waitlistApi: "https://owanbespace.onrender.com",
  },
  defaultMeta: {
    title: "OwanbeSpace",
    description:
      "Find and book event venues, planners, and vendors in one place. Built for Nigerian events — weddings, birthdays, corporate gatherings, and every owambe in between.",
    themeColor: "#6935F0",
    locale: defaultLandingLocale,
  },
  socials: {
    x: null,
    instagram: null,
    tiktok: null,
    linkedin: null,
  },
};

const sitePrimaryLinkDefs = [
  {labelKey: "site.nav.home", pathname: "/"},
  {labelKey: "site.nav.blog", pathname: "/blog"},
] as const;

export function getSitePrimaryLinks(t: SiteTranslator, locale: LandingLocale = defaultLandingLocale): SiteLink[] {
  return sitePrimaryLinkDefs.map((item) => ({
    label: t(item.labelKey),
    href: buildLocalizedPath(item.pathname, locale),
  }));
}

export const getPageTitle = (title?: string): string => {
  return title ? `${title} | ${siteConfig.name}` : siteConfig.defaultMeta.title;
};

// Mirrors the `category` enum in source.config.ts and schema.json in blog-posts.
export const blogCategories = ["All", "Planning", "Vendors", "Industry", "Product"] as const;
