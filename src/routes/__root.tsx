import {HeadContent, Scripts, createRootRoute} from "@tanstack/react-router";

import appCss from "@/styles/app.css?url";
import {siteConfig} from "@/lib/site-config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {charSet: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {title: siteConfig.defaultMeta.title},
      {name: "description", content: siteConfig.defaultMeta.description},
      {name: "theme-color", content: siteConfig.defaultMeta.themeColor},
      {property: "og:site_name", content: siteConfig.name},
      {property: "og:title", content: siteConfig.defaultMeta.title},
      {property: "og:description", content: siteConfig.defaultMeta.description},
      {name: "twitter:card", content: "summary_large_image"},
    ],
    links: [{rel: "stylesheet", href: appCss}],
  }),
  shellComponent: RootDocument,
});

function RootDocument({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
