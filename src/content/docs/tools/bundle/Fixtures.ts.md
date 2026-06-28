---
title: Fixtures.ts
nav_order: 2
parent: "@effect/bundle"
---

## Fixtures.ts overview

Discovers the TypeScript entrypoint fixtures used by the bundle-size tools.

The bundle CLI uses these fixture names to build current bundle reports,
compare them against a base directory, and populate the visualization
selector. Fixtures are intentionally discovered from the package's local
`fixtures` directory as top-level `.ts` files and sorted by name so reports
are deterministic.

When adding or renaming fixtures, keep in mind that comparison reports match
files by basename between the current fixtures directory and the provided
base directory. New fixtures without a matching base file are reported as
unchanged. Each fixture is bundled as its own Rollup entrypoint, so it should
represent the import shape being measured and avoid depending on incidental
fixture discovery order.

Since v4.0.0

---

## Exports Grouped by Category

- [services](#services)
  - [Fixtures (class)](#fixtures-class)

---

# services

## Fixtures (class)

Context service that discovers and sorts TypeScript fixture files used by the bundle size tooling.

**Signature**

```ts
declare class Fixtures
```

[Source](https://effect.website/blob/main/src/Fixtures.ts#L32)

Since v4.0.0
