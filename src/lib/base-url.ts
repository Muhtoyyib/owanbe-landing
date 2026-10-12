import {siteConfig} from "./site-config.ts";

/**
 * Absolute origin of the public site. Used by server-rendered SEO routes
 * (robots.txt, sitemap.xml) where `window` is unavailable.
 */
export function getBaseUrl(): string {
  const override = process.env.VITE_SITE_URL ?? process.env.SITE_URL;
  return override?.trim() ? override.trim() : siteConfig.urls.site;
}
