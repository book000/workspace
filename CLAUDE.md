# CLAUDE.md

## Overview

Tomachi's personal workspace: a collection of small, standalone one-off programs.
Each subdirectory is an independent tool with its own dependencies; there is no
shared build system, root `package.json`, or monorepo tooling at the top level.

Current tools:

- `github-transfer-ruleset/` — migrates the legacy GitHub Branch Protection rules
  of the `book000` (user) and `tomacheese` (organization) accounts into the newer
  Repository Rulesets. A pipeline of numbered ESM scripts run in order.

## Repository layout

- Each tool lives in its own top-level directory and is self-contained.
- Add a new tool as a new directory; do not couple it to sibling tools.
- Generated data and secrets are git-ignored (see below) and must never be committed.

## github-transfer-ruleset

Package manager: **pnpm** (a `pnpm-lock.yaml` is committed). Scripts are ESM
(`.mjs`) run directly with `node`; there is no `scripts` entry in `package.json`,
no build step, and no test/lint setup.

Setup and run (from inside `github-transfer-ruleset/`):

```bash
pnpm install
# Place a GitHub token in the repo root as github-token.txt (git-ignored) first.
node 1.get-all-branch-protection.mjs   # -> data/branch-protections.json
node 2.filter-rule-exist-repos.mjs     # -> data/filter-rule-exist-repos.json
node 3.generate-list.mjs               # -> data/required-status-check-contexts.tsv
node 4.register-ruleset.mjs            # WIP / incomplete — see caveat below
```

The numbered prefix defines execution order: each script consumes the JSON that
the previous one wrote under `data/`.

Dependencies: `@octokit/graphql` (used by script 1), `@octokit/rest` (dev).

### Caveats

- **Token file**: scripts read the token from `../github-token.txt` (relative to
  the tool directory, i.e. the repo root). It is git-ignored. Never hard-code a
  token or commit `github-token.txt`.
- **`data/` is generated output** and git-ignored (`github-transfer-ruleset/.gitignore`).
  Do not commit anything under `data/`.
- **`4.register-ruleset.mjs` is an unfinished stub** and is not runnable as-is.
  Treat it as work-in-progress.

## Conventions

- New scripts here are ESM (`.mjs`) run directly with Node; keep that style unless
  a tool genuinely needs a bundler or TypeScript.
- Read secrets from a git-ignored file or environment variable — never inline them.

## Testing

There are no automated tests or linters in this repository. Verify a change by
running the affected script against real data and inspecting its output under
`data/` (which is disposable and git-ignored).

## Documentation update rules

- When adding a new tool, add a short entry to the "Current tools" list above and
  give the tool its own `README.md`.
- When a tool's run steps, token/secret handling, or generated-file paths change,
  update the corresponding section here so the commands stay accurate.
