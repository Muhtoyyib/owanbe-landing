import {Link} from "@tanstack/react-router";
import {ArrowRightIcon} from "lucide-react";
import type {BlogPostSummary} from "@/lib/blog/source.server";
import {t} from "@/lib/i18n";

export function BlogCard({post}: {post: BlogPostSummary}) {
  return (
    <Link
      to={post.href}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
    >
      {post.image ? (
        <div className="mb-5 overflow-hidden rounded-xl bg-muted">
          <img src={post.image} alt={post.title} className="aspect-[16/9] w-full object-cover" loading="lazy" />
        </div>
      ) : null}
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{post.category}</p>
      <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
        {post.title}
      </h2>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-3 text-xs font-medium text-muted-foreground">
        <span>{post.author}</span>
        <span className="size-1 rounded-full bg-brand" />
        <span>{formatDate(post.date)}</span>
      </div>
      <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors group-hover:text-brand">
        {t("site.blog.read_more")}
        <ArrowRightIcon className="size-3.5 text-brand" />
      </p>
    </Link>
  );
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"});
}
