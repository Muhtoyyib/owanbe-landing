import {notFound} from "@tanstack/react-router";
import {createServerFn} from "@tanstack/react-start";
import {staticFunctionMiddleware} from "@tanstack/start-static-server-functions";
import {getAllBlogPosts, getBlogPostVariantsBySlug} from "@/lib/blog/source.server";

export const listBlogPosts = createServerFn({
  method: "GET",
})
  .middleware([staticFunctionMiddleware])
  .handler(() => {
    return getAllBlogPosts();
  });

export const loadBlogPost = createServerFn({
  method: "GET",
})
  .middleware([staticFunctionMiddleware])
  .validator((params: {slug: string}) => params)
  .handler(({data: {slug}}) => {
    const variants = getBlogPostVariantsBySlug(slug);
    if (variants.length === 0) throw notFound();

    const post = variants[0];
    return {
      postVariants: variants,
      relatedPosts: getAllBlogPosts(post.locale)
        .filter((candidate) => candidate.slug !== post.slug && candidate.category === post.category)
        .slice(0, 3),
    };
  });
