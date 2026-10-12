# OwanbeSpace Landing

## Project Overview

The public marketing site for OwanbeSpace, built with TanStack Start, Vite+, React, and Bun.

This app owns `owanbespace.com` and covers:

- the waitlist landing page and conversion surfaces
- the blog experience rendered with Fumadocs/MDX inside the landing site's own navbar/footer
- SEO surfaces: sitemap.xml, robots.txt, Open Graph meta

This app is **not** the product app. The user-facing platform (hosts, venue owners, planners,
vendors) is a separate app repo that will own `app.owanbespace.com`.

## Repository Structure

- `src/routes`
  - TanStack Router route files for marketing pages, blog routes, and SEO routes
- `src/features`
  - Feature-scoped UI: `landing/` (waitlist page sections) and `blog/` (list + post views)
- `src/components`
  - Reusable presentational components (`ui/`, `mdx/`, shared primitives)
- `src/lib`
  - Site configuration, i18n, locale, blog source/loader, utilities
- `src/styles`
  - Global styles and token-level CSS (`app.css`)
- `content/blog`
  - Blog posts as `<locale>/YYYY/MM/DD/<slug>.mdx`. Will become a git submodule pointing at
    the `blog-posts` content repo; do not restructure the layout — the submodule contract depends on it.
- `scripts`
  - Build, prerender, and blog-preview helpers
- `.agents/rules`
  - Local implementation rules for anti-slop, code style, content, TDD, testing, and commits

## Technology Stack

- TypeScript (strict mode)
- Bun for package management, driven through the `vp` (Vite+) CLI
- React 19 (React Compiler enabled)
- TanStack Start + TanStack Router (static prerender, SPA fallback)
- Tailwind CSS 4
- Fumadocs + MDX for blog/article rendering
- Paraglide JS / inlang for i18n (en now; pcm, yo, ig, ha planned)
- Oxlint + Oxfmt via `vp lint` / `vp fmt`
- Vitest + Testing Library for unit/component tests
- Stryker for mutation testing on scoped primitives
- Cloudflare Workers for hosting (`wrangler versions upload` + gradual rollout)

## Available Commands

Use `vp` for everything; don't call `bun`, `npm`, or `npx` directly.

```bash
vp install                  # Install dependencies (runs codegen via prepare/postinstall)
vp dev                      # Dev server (http://localhost:5177)
vp run build                # Generate MDX + Paraglide sources, then production build
vp run ci:build             # Full gate: generate, lint, test, build
vp run generate             # Regenerate .source (fumadocs) and src/paraglide (i18n)
vp run lint                 # Oxlint (zero warnings)
vp run lint:fix             # Auto-fix lint issues
vp fmt                      # Format with Oxfmt
vp test --run               # Vitest single pass
vp run test:coverage        # Vitest with coverage
vp run serve                # Serve the production build locally
vp run cf:upload            # Upload a tagged Worker version (CI deploy step)
```

## Product And Design Rules

- Treat this app as the source of truth for the public OwanbeSpace brand.
- Keep blog/article rendering under the landing site's own shell rather than letting
  Fumadocs define the product surface.
- The waitlist page is the conversion surface — changes to it are marketing changes.
- Avoid placeholders, demo copy, and temporary product messaging in committed code.

## Styling

- Merge classes with `cn` imported from `cn` (`import {cn} from "cn";`). Do not add or
  use a local `/lib/cn` or `/lib/utils` helper.
- Brand tokens live in `src/styles/app.css` (`--color-brand`, `--color-coral`,
  `--color-grey`, `--color-soft`, Gayathri display font). Use them, not raw hex values.

## Waitlist API

The waitlist form posts to the OwanbeSpace API (`VITE_API_BASE_URL`, default
`https://owanbespace.onrender.com`). The envelope contract (`{success, statusCode,
data?, message}`), the `whoYouAre` enum values, and the cold-start timeout behavior
are documented in `src/features/landing/api/waitlist.ts` — read it before touching the form.

## Content And The Blog Layout

Posts are filed as `<locale>/YYYY/MM/DD/<slug>.mdx`, but the date folders never reach
the URL — the slug is the filename alone. `resolveLocaleAndSlug`
(`src/lib/blog/source.server.ts`) and `collectBlogPrerenderPages`
(`scripts/lib/prerender-pages.ts`) both implement that and must stay in agreement.

Blog frontmatter is defined by `source.config.ts` here and `schema.json` in the
blog-posts repo — they must change together. Categories are `Planning`, `Vendors`,
`Industry`, `Product`; `All` is a filter chip, not a category.

When the `blog-posts` repo exists, mount it as a submodule at `content/blog` and add a
`blog-update.yml` workflow (see the rixl org for the reference implementation).

## Agent Entry Points

This project uses `AGENTS.md` and `.agents/rules/` as the local guidance surface.

## Rule Files

- `.agents/rules/anti-slop.md`
- `.agents/rules/code-style.md`
- `.agents/rules/content.md`
- `.agents/rules/tdd.md`
- `.agents/rules/testing.md`
- `.agents/rules/commits.md`

Always follow these rules before adding new structure, content rendering logic, or
marketing-facing UI.
