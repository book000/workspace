# Copilot code review instructions

This repository is a collection of small, standalone one-off tools (see each
top-level directory). There is no shared build, no TypeScript, no test suite, and
no linter configured. Keep review feedback proportionate to that scope: these are
personal utility scripts, not a production service.

## What to prioritize

- **Leaked secrets**: flag any hard-coded GitHub token, credential, or personal
  access token. Tokens must come from a git-ignored file (`github-token.txt`) or an
  environment variable, never from source or committed fixtures.
- **Committed generated data / secrets**: flag additions under any `data/` directory
  or a committed `github-token.txt` — both are git-ignored on purpose and must not
  enter the tree.
- **Unhandled API failures**: these scripts call the GitHub GraphQL/REST API. Flag
  missing error handling on network/API calls and unbounded pagination loops that
  could silently drop results.
- **Correctness of the script pipeline**: in `github-transfer-ruleset/`, scripts are
  numbered and run in sequence, each reading the JSON the previous one wrote under
  `data/`. Flag changes that break that input/output contract (renamed output files,
  mismatched paths).

## Known non-issues — do not flag

- **No tests / no CI**: absence of unit tests or a lint/format config is expected;
  do not request adding a test suite or CI for these one-off scripts.
- **ESM `.mjs` run directly with `node`**: there is intentionally no build step,
  bundler, or `scripts` entry in `package.json`. Do not suggest adding one.
- **`package.json` without `name`/`version`/`scripts`**: these tools are not
  published packages; a minimal manifest is intentional.
- **Numeric filename prefixes** (`1.`, `2.`, …): they encode run order, not a lint
  violation. Do not suggest renaming.
- **`4.register-ruleset.mjs` is a known incomplete stub**: it is work-in-progress
  and not yet runnable. Do not report it as a bug unless the PR itself claims to
  complete it.

## Conventions

- Package manager is **pnpm**; keep `pnpm-lock.yaml` in sync when dependencies change.
- Read secrets from a git-ignored file or environment variable.
- Comments and existing docs are written in Japanese; match the surrounding language.
