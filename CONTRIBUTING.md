# Contributing to OwanbeSpace Landing

## Setup

```bash
vp install        # installs deps and runs codegen (fumadocs sources, paraglide)
vp dev            # http://localhost:5177
```

Requires the `vp` (Vite+) CLI — it manages Bun and Node versions for you.

## Commit gate

The Vite+ pre-commit hook (`vp staged`) runs `vp check --fix` (format, lint,
typecheck) plus related tests on staged files. You can run the full gate manually:

```bash
vp run ci:build   # generate + lint + test + build
```

Commits use conventional commit messages (`feat:`, `fix:`, `chore:`, …).

## Where things live

- Marketing page sections: `src/features/landing/`
- Blog views: `src/features/blog/`; routes in `src/routes/blog/`
- Shared primitives: `src/components/` (`ui/` for form-level controls, `mdx/` for
  blog body components)
- Site constants (name, URLs, meta, categories): `src/lib/site-config.ts`
- Blog posts: `content/blog/<locale>/YYYY/MM/DD/<slug>.mdx`

## Blog posts

Frontmatter rules live in `.agents/rules/content.md` and are enforced by
`source.config.ts` at build time. To preview a post from a local `blog-posts`
checkout without copying files around:

```bash
vp run blog:preview ../blog-posts
```

## Localization

UI strings go through Paraglide (`t("some.key")` from `@/lib/i18n`). Add keys to
`messages/en.json`. The project is `en`-only today; `pcm`, `yo`, `ig`, `ha` are
planned — add the locale to `project.inlang/settings.json` and `src/lib/locale.ts`
when a language lands.

## Deploying

The repo is connected to the `owanbespace-landing` Worker via **Workers
Builds** (Cloudflare dashboard → Workers & Pages → the Worker → Settings →
Build). Pushes to `main` build and run `cf:upload`, which uploads a tagged
Worker version at 0% traffic; promote it in the dashboard (Workers → Versions).
Pull requests get a preview URL (`preview_urls: true` in `wrangler.jsonc`).

There is intentionally no GitHub Actions deploy workflow — Workers Builds owns
build+upload so versions and previews come from one place. A `rollout.yml` for
automated traffic ramps can come later.
