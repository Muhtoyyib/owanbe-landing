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

Merges to `main` run `.github/workflows/deploy.yml`, which uploads a tagged
Cloudflare Worker version (`owanbespace-landing`). Traffic promotion is handled
in Cloudflare. Required repo secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.
