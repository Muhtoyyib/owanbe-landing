---
trigger: always_on
description: Commit workflow rules for incremental development.
---

# Commit Workflow Rules

- Make step-by-step commits as coding work progresses.
- Keep each commit scoped to one logical change.
- Use conventional commit messages.
- Let the Vite+ pre-commit hook (`vp staged`) enforce formatting and linting before the commit lands.
- Run `vp dlx react-doctor@latest . --diff` before committing until a repo-local wrapper is introduced.
- Run the relevant tests for touched code when they add value.
- Do not commit placeholder UI, inaccurate metadata, or dead scaffolding "for later."
