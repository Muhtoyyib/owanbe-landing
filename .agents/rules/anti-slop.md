---
trigger: always_on
description: Prevent placeholder-heavy, over-abstracted, or misleading code in the OwanbeSpace landing app.
---

# Anti-Slop Rules

## What counts as slop here

- placeholder UI committed as if it were production-ready
- abstractions created before a second real use case exists
- unused helpers, dead files, and "just in case" wrappers
- marketing copy or structure that no longer matches the real product
- features advertised on the page that are not live in the product

## Rules

- Do not add new placeholder pages, placeholder copy, or `Hello world` marketing sections.
- Do not build abstractions for components that have not been used twice.
- Keep product truth centralized in config instead of duplicating URLs, names, and metadata.
- Prefer removing inherited complexity over adapting it forever.
- Every new file should have a clear landing-specific purpose.
- Do not add hover "lift" or "jump" motion to buttons, cards, icons, or CTAs. Avoid `translate`,
  `scale`, and similar bounce-like micro-interactions on marketing UI unless the motion is
  explicitly product-driven.
- Do not claim or screenshot product features that are not live — the waitlist page describes
  the marketplace honestly; marketing shows what ships, not what is planned.
