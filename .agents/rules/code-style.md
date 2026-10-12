---
trigger: always_on
description: Frontend code style rules for the OwanbeSpace landing app.
---

## TypeScript

- Keep strict typing.
- Do not use `any`.
- Use generics only when they improve correctness.
- Use `@/*` for `src/*` imports.

## Structure & Components

- Co-locate feature helpers and tests with the smallest meaningful unit.
- Keep components small and focused.
- Prefer composition over large components.
- Keep one exported component or hook per file.
- Keep props minimal.
- Extract non-trivial logic into hooks or pure helpers.
- Do not mix heavy content loading and presentation in the same component without a clear reason.

## Data

- Keep content/config loading out of presentational components.
- Handle errors by code or state, not message text.
- Keep loading, empty, error, and success states explicit when behavior exists.

## Styling

- Use Tailwind utilities.
- Merge classes with `cn` imported from `cn` (`import {cn} from "cn";`); do not use a local
  `/lib/cn` or `/lib/utils` helper.
- Avoid inline styles unless needed.
- Reuse existing landing primitives before creating new ones.

## Product truth

- Keep site URLs, metadata, and brand constants inside `src/lib/site-config.ts`.
- Do not hardcode `app.owanbespace.com`, the waitlist API URL, or brand strings throughout the UI.
