import {createFileRoute} from "@tanstack/react-router";
import {getBaseUrl} from "@/lib/base-url";
import {getBlogSitemapRoutes} from "@/lib/blog/source.server";

const STATIC_ROUTES = ["/", "/blog"] as const;

function buildUrlEntry(route: string, baseUrl: URL): string {
  const url = new URL(route, baseUrl).toString();
  const changefreq = route === "/" ? "daily" : "weekly";
  const priority = route === "/" ? "1.0" : "0.8";

  return `
  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const baseUrl = getBaseUrl();
        const pageRoutes = [...new Set([...STATIC_ROUTES, ...getBlogSitemapRoutes()])];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pageRoutes.map((route) => buildUrlEntry(route, new URL(baseUrl))).join("")}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
