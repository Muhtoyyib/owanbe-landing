import {createFileRoute} from "@tanstack/react-router";
import {BlogListView} from "@/features/blog/list-view";
import {listBlogPosts} from "@/lib/blog/loader";
import {getPageTitle, siteConfig} from "@/lib/site-config";
import {t} from "@/lib/i18n";

export const Route = createFileRoute("/blog/")({
  component: BlogIndexRoute,
  loader: () => listBlogPosts(),
  head: () => ({
    meta: [
      {title: getPageTitle(t("site.blog.title"))},
      {name: "description", content: t("site.blog.description")},
      {property: "og:title", content: getPageTitle(t("site.blog.title"))},
      {property: "og:description", content: t("site.blog.description")},
      {property: "og:type", content: "website"},
      {property: "og:site_name", content: siteConfig.name},
    ],
  }),
});

function BlogIndexRoute() {
  const posts = Route.useLoaderData();
  return <BlogListView posts={posts} />;
}
