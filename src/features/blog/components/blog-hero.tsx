import {Link} from "@tanstack/react-router";
import {ArrowRightIcon} from "lucide-react";
import type {BlogPostSummary} from "@/lib/blog/source.server";
import {t} from "@/lib/i18n";
import {formatDate} from "./blog-card";

/** Featured post slot — the newest `featured: true` post, or newest overall. */
export function BlogHero({post}: {post: BlogPostSummary}) {
  return (
    <Link
      to={post.href}
      className="group mt-10 grid overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/40 md:grid-cols-2"
    >
      {post.image ? (
        <div className="overflow-hidden bg-muted">
          <img src={post.image} alt={post.title} className="aspect-[16/9] h-full w-full object-cover" loading="lazy" />
        </div>
      ) : null}
      <div className="flex flex-col justify-center p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{post.category}</p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground transition-colors group-hover:text-brand md:text-4xl">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground md:text-base">{post.excerpt}</p>
        <div className="mt-5 flex items-center gap-3 text-xs font-medium text-muted-foreground">
          <span>{post.author}</span>
          <span className="size-1 rounded-full bg-brand" />
          <span>{formatDate(post.date)}</span>
        </div>
        <p className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
          {t("site.blog.read_more")}
          <ArrowRightIcon className="size-3.5" />
        </p>
      </div>
    </Link>
  );
}
