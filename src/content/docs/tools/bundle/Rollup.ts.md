---
title: Rollup.ts
nav_order: 5
parent: "@effect/bundle"
---

## Rollup.ts overview

Rollup-backed bundling and size measurement for the Effect bundle-size tools.

This module provides the service used by the bundle CLI and reporter to turn
fixture or selected TypeScript entrypoints into ESM Rollup output, optionally
write a minified artifact, and return the gzipped byte count used in
bundle-size comparisons.

Bundles are generated in memory so the emitted code can be streamed to both
gzip measurement and optional file output. Only Rollup `chunk` outputs are
included; assets are ignored, and when Rollup creates multiple chunks (for
example because of dynamic imports or shared chunks) their code is streamed
together for measurement. The optional output file is named from the
entrypoint stem, so it is best treated as an inspection artifact rather than
a complete Rollup output directory.

Since v4.0.0

---

## Exports Grouped by Category

- [errors](#errors)
  - [RollupError (class)](#rolluperror-class)
- [models](#models)
  - [BundleStats (class)](#bundlestats-class)
- [options](#options)
  - [BundleAllOptions (interface)](#bundlealloptions-interface)
  - [BundleOptions (interface)](#bundleoptions-interface)
- [services](#services)
  - [Rollup (class)](#rollup-class)

---

# errors

## RollupError (class)

Error raised when Rollup bundling, output generation, or bundle size measurement fails.

**Signature**

```ts
declare class RollupError
```

[Source](https://effect.website/blob/main/src/Rollup.ts#L39)

Since v4.0.0

# models

## BundleStats (class)

Bundle size statistics for an entry file, including its path and gzipped size in bytes.

**Signature**

```ts
declare class BundleStats
```

[Source](https://effect.website/blob/main/src/Rollup.ts#L49)

Since v4.0.0

# options

## BundleAllOptions (interface)

Options for bundling multiple entry files with shared visualization and output-directory settings.

**Signature**

```ts
export interface BundleAllOptions {
  readonly paths: ReadonlyArray<string>
  readonly visualize?: boolean | undefined
  readonly outputDirectory?: string | undefined
}
```

[Source](https://effect.website/blob/main/src/Rollup.ts#L72)

Since v4.0.0

## BundleOptions (interface)

Options for bundling one entry file, optionally writing a minified output and generating a visualization.

**Signature**

```ts
export interface BundleOptions {
  readonly path: string
  readonly visualize?: boolean | undefined
  readonly outputDirectory?: string | undefined
}
```

[Source](https://effect.website/blob/main/src/Rollup.ts#L60)

Since v4.0.0

# services

## Rollup (class)

Context service for bundling entry files with Rollup and measuring their gzipped output size.

**Signature**

```ts
declare class Rollup
```

[Source](https://effect.website/blob/main/src/Rollup.ts#L84)

Since v4.0.0
