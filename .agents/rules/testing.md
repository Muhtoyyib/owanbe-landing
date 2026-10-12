---
trigger: always_on
description: Testing standards for the OwanbeSpace landing app.
---

# Testing Standards

## Tools

- Vitest for unit and lightweight component tests
- Testing Library for React rendering assertions
- Stryker for scoped mutation testing on stable primitives

## File locations

- `src/lib/__tests__/*` for utility/config tests
- `src/components/**/__tests__/*` or a colocated `*.test.tsx` for component tests
- `src/features/**` tests next to the behavior they cover

## Rules

- Test behavior, not implementation trivia
- Keep presentational tests focused and fast
- Scope mutation testing to intentionally chosen files, not the entire app
- Generated files (routeTree.gen.ts, src/paraglide, .source) are never test or mutation scope
