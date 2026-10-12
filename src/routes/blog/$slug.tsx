import {createFileRoute} from "@tanstack/react-router";
import {BlogPostView} from "@/features/blog/post-view";
import {loadBlogPost} from "@/lib/blog/loader";
import {defaultLandingLocale} from "@/lib/locale";
import {getPageTitle, siteConfig} from "@/lib/site-config";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogArticleRoute,
  loader: ({params}) => loadBlogPost({data: {slug: params.slug}}),
  head: ({loaderData}) => {
    if (!loaderData) return {};
    const post = loaderData.postVariants.find((variant) => variant.locale === defaultLandingLocale) ?? loaderData.postVariants[0];
    const title = getPageTitle(post.title);
    const pageUrl = new URL(post.href, siteConfig.urls.site).toString();

    return {
      meta: [
        {title},
        {name: "description", content: post.excerpt},
        {property: "og:title", content: post.title},
        {property: "og:description", content: post.excerpt},
        {property: "og:type", content: "article"},
        {property: "og:url", content: pageUrl},
        {property: "og:site_name", content: siteConfig.name},
        {name: "twitter:card", content: "summary_large_image"},
        {name: "twitter:title", content: post.title},
        {name: "twitter:description", content: post.excerpt},
      ],
    };
  },
});

function BlogArticleRoute() {
  const {postVariants, relatedPosts} = Route.useLoaderData();
  return <BlogPostView postVariants={postVariants} relatedPosts={relatedPosts} />;
}
