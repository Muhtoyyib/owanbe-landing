import {Link} from "@tanstack/react-router";
import {ArrowLeftIcon, ArrowRightIcon} from "lucide-react";
import browserCollections from "fumadocs-mdx:collections/browser";
import {Suspense, type ComponentType} from "react";
import {BlogLayout} from "@/features/blog/layout";
import {BlogCard, formatDate} from "@/features/blog/components/blog-card";
import {Container} from "@/features/landing/components/container";
import {getMDXComponents} from "@/components/mdx-components";
import type {BlogPostSummary} from "@/lib/blog/source.server";
import {defaultLandingLocale} from "@/lib/locale";
import {t, getLocale} from "@/lib/i18n";
import type {UntrustedValue} from "@/lib/untrusted";

interface LoadedBlogDoc {
  toc: UntrustedValue;
  frontmatter: {
    title?: string;
    excerpt?: string;
  };
  default: React.ComponentType<{
    components?: ReturnType<typeof getMDXComponents>;
  }>;
}

const blogClientLoader = browserCollections.blog.createClientLoader({
  component: BlogArticleContent,
});

interface BlogPostViewProps {
  postVariants: BlogPostSummary[];
  relatedPosts?: BlogPostSummary[];
}

export function BlogPostView({postVariants, relatedPosts = []}: BlogPostViewProps) {
  const locale = getLocale();
  const post =
    postVariants.find((item) => item.locale === locale) ??
    postVariants.find((item) => item.locale === defaultLandingLocale) ??
    postVariants[0];
  const Content = blogClientLoader.getComponent(post.path) as UntrustedValue as ComponentType;

  return (
    <BlogLayout>
      <Container>
        <article>
          <ArticleHeader post={post} />
          <section className="mx-auto mt-12 grid max-w-3xl gap-6">
            <Suspense fallback={null}>
              <Content />
            </Suspense>
          </section>
          <ArticleCta />
          <RelatedPosts posts={relatedPosts} />
        </article>
      </Container>
    </BlogLayout>
  );
}

function ArticleHeader({post}: {post: BlogPostSummary}) {
  return (
    <header className="mx-auto max-w-4xl space-y-8 text-center">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-brand"
      >
        <ArrowLeftIcon className="size-4" />
        {t("site.article.back")}
      </Link>
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{post.category}</p>
        <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground md:text-6xl">{post.title}</h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{post.excerpt}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <span>{post.author}</span>
          <span className="size-1 rounded-full bg-brand" />
          <span>{formatDate(post.date)}</span>
        </div>
      </div>
      {post.image ? (
        <div className="overflow-hidden rounded-2xl bg-muted">
          <img src={post.image} alt={post.title} className="aspect-[16/8] w-full object-cover" />
        </div>
      ) : null}
    </header>
  );
}

function ArticleCta() {
  return (
    <section className="mt-16 flex flex-col gap-6 overflow-hidden rounded-2xl bg-grey px-8 py-10 text-white md:flex-row md:items-center md:justify-between">
      <div className="space-y-3">
        <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">{t("site.article.cta.title")}</h2>
        <p className="max-w-xl text-sm leading-6 text-soft">{t("site.article.cta.description")}</p>
      </div>
      <Link
        to="/"
        hash="waitlist"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
      >
        {t("site.article.cta.button")}
        <ArrowRightIcon className="size-4" />
      </Link>
    </section>
  );
}

function RelatedPosts({posts}: {posts: BlogPostSummary[]}) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 border-t border-border pt-12">
      <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-foreground md:text-3xl">{t("site.blog.related")}</h2>
      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

function BlogArticleContent({default: MDX}: LoadedBlogDoc) {
  return (
    <div className="space-y-6 text-base leading-7 text-foreground/80">
      <MDX components={getMDXComponents()} />
    </div>
  );
}
