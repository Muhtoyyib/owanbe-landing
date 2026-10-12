import {useMemo, useState} from "react";
import {SearchIcon} from "lucide-react";
import {BlogCard} from "@/features/blog/components/blog-card";
import {BlogHero} from "@/features/blog/components/blog-hero";
import {CategoryFilter} from "@/features/blog/components/category-filter";
import {Pagination} from "@/features/blog/components/pagination";
import {BlogLayout} from "@/features/blog/layout";
import {Container} from "@/features/landing/components/container";
import type {BlogPostSummary} from "@/lib/blog/source.server";
import {defaultLandingLocale} from "@/lib/locale";
import {getLocale, t} from "@/lib/i18n";

const POSTS_PER_PAGE = 12;

interface BlogListViewProps {
  posts: BlogPostSummary[];
}

export function BlogListView({posts}: BlogListViewProps) {
  const {featuredPost, pagePosts, totalPages, currentPage, setCurrentPage, query, setQuery, activeCategory, setActiveCategory} =
    useFilteredPosts(posts);

  return (
    <BlogLayout>
      <Container>
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{t("site.blog.eyebrow")}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-6xl">
            {t("site.blog.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-7 text-muted-foreground md:text-lg">
            {t("site.blog.description")}
          </p>
        </header>

        <div className="mt-10 flex flex-col items-center gap-6">
          <label className="relative w-full max-w-md">
            <SearchIcon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("site.blog.search_placeholder")}
              className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
            />
          </label>
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        {featuredPost ? <BlogHero post={featuredPost} /> : null}

        {pagePosts.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pagePosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : !featuredPost ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">{t("site.blog.empty")}</p>
        ) : null}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </Container>
    </BlogLayout>
  );
}

function useFilteredPosts(posts: BlogPostSummary[]) {
  const locale = getLocale();
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const localizedPosts = posts.filter((post) => post.locale === locale);
  const displayedPosts = localizedPosts.length > 0 ? localizedPosts : posts.filter((post) => post.locale === defaultLandingLocale);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return displayedPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLocaleLowerCase();
      return matchesCategory && (normalizedQuery.length === 0 || haystack.includes(normalizedQuery));
    });
  }, [activeCategory, displayedPosts, query]);

  const featuredPost = filteredPosts.find((post) => post.featured) ?? filteredPosts[0];
  const nonFeatured = filteredPosts.filter((post) => post !== featuredPost);

  const totalPages = Math.max(1, Math.ceil(nonFeatured.length / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const pagePosts = nonFeatured.slice(start, start + POSTS_PER_PAGE);

  const handleCategoryChange = (category: string): void => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleQueryChange = (value: string): void => {
    setQuery(value);
    setCurrentPage(1);
  };

  return {
    featuredPost,
    pagePosts,
    totalPages,
    currentPage: safePage,
    setCurrentPage,
    query,
    setQuery: handleQueryChange,
    activeCategory,
    setActiveCategory: handleCategoryChange,
  };
}
