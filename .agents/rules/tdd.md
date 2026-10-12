---
trigger: always_on
description: TDD workflow for changes inside the OwanbeSpace landing app.
---

# TDD Workflow

## Core protocol

1. Write or update a failing test first when introducing behavior
2. Implement the smallest change that makes the test pass
3. Refactor only after the test passes
4. Run the relevant quality checks before committing

## Rules

- Utility and config behavior should be covered with Vitest
- Presentational components should get Testing Library coverage
- Avoid writing implementation-shaped tests that lock in unimportant markup details
- If a change has no practical assertion yet, keep it out of this step
