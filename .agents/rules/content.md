---
trigger: always_on
description: Blog content rules for posts rendered by the OwanbeSpace landing app.
---

# Blog Content Rules

## Frontmatter contract

Every post in `content/blog` is an MDX file whose frontmatter must satisfy
`source.config.ts` exactly (the schema is `.strict()` — an extra key fails the build):

```yaml
---
title: "Post title"
author: "Name or team"
date: "YYYY-MM-DD" # must match the YYYY/MM/DD folder
image: "" # public/ path or full URL; empty allowed for now
category: "Planning" # one of: Planning | Vendors | Industry | Product
featured: false # optional; newest featured post wins the hero slot
excerpt: "One-sentence teaser shown on cards and social previews."
---
```

`schema.json` in the blog-posts repo mirrors this — the two must change together.

## Filing and slugs

- File every post under `<locale>/YYYY/MM/DD/` matching its frontmatter `date`.
- The date folders never appear in the URL — the slug is the filename alone, so
  filenames must be unique across every folder and **never renamed after publish**.
- Write the body without an `# H1` repeating the title — the frontmatter title
  renders as the page `<h1>`.

## Voice

- Write like a person who has actually planned a Nigerian event. No invented
  metrics, no fake testimonials, no features that are not live.
- `All` is a filter chip in the UI, not a category you can file under.
