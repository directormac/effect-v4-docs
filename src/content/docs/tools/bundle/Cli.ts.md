---
title: Cli.ts
nav_order: 1
parent: "@effect/bundle"
---

## Cli.ts overview

Command definitions for the `effect-bundle` bundle-size CLI.

This module wires the top-level `bundle` command to the reporting service and
exposes the workflows used when maintaining fixture bundle sizes. `compare`
builds the package's local fixtures and compares them with matching fixture
files from another checkout, `report` bundles an explicit list of entrypoints
and prints a Markdown table, `compare-selected` compares explicit entrypoints
against a base checkout, `visualize-selected` analyzes explicit entrypoints,
and `visualize` prompts for local fixtures before producing visualization
output for inspection.

Command output is intentionally split by workflow. `compare` requires an
existing `--base-dir` (`-b`) and writes its Markdown report to `--output-path`
(`-o`), defaulting to `stats.txt` resolved from the current working directory.
`report` accepts one or more existing files and writes to stdout. `visualize`
uses `--output-dir` (`-o`) for generated bundle artifacts, so `-o` names a
file for `compare` but a directory for `visualize`.

Since v4.0.0

---

## Exports Grouped by Category

- [commands](#commands)
  - [cli](#cli)

---

# commands

## cli

Bundle analysis CLI command with subcommands for comparing fixture bundle sizes, reporting selected fixtures, and generating visualizations.

**Signature**

```ts
declare const cli: Command.Command<"bundle", {}, {}, PlatformError | RollupError | ReporterError | QuitError, never>
```

[Source](https://effect.website/blob/main/src/Cli.ts#L121)

Since v4.0.0
