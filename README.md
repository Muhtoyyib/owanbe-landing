# OwanbeSpace Landing

The public marketing site for [OwanbeSpace](https://owanbespace.com) — the waitlist
page, marketing surfaces, and the blog. Built with TanStack Start, Vite+, React 19,
Tailwind 4, and Fumadocs/MDX. Deploys to Cloudflare Workers.

## Quick start

```bash
vp install   # deps + codegen
vp dev       # http://localhost:5177
```

## Project structure

```
src/routes/          TanStack Router file routes (/, /blog, sitemap, robots)
src/features/        landing/ (waitlist page) and blog/ (list + post views)
src/components/      ui/, mdx/, shared primitives
src/lib/             site-config, i18n, blog source/loader
src/styles/          app.css — design tokens + Tailwind
content/blog/        MDX posts (will become the blog-posts submodule)
scripts/             codegen + preview helpers
messages/            Paraglide translation sources
```

See `CONTRIBUTING.md` for the commit gate and authoring guide, and `AGENTS.md` for
the durable rules agents follow.
