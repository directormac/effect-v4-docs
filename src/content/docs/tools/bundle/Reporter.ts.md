---
title: Reporter.ts
nav_order: 4
parent: "@effect/bundle"
---

## Reporter.ts overview

Bundle report generation for the Effect bundle-size tooling.

The reporter coordinates fixture discovery with the Rollup service to turn
measured fixture bundles into Markdown tables or visualization output. It is
used by the bundle CLI to compare the current workspace against a checked-out
base directory, to print a one-off report for selected entry files, and to
generate visualizations when a size change needs inspection.

Reports compare files by basename and display gzipped Rollup output sizes in
decimal kilobytes. Base fixtures are bundled only when the matching file
exists; if a current fixture has no matching basename in the base directory it
is reported as unchanged. Visualization artifacts are named from entry file
stems in the requested output directory, so duplicate names can make the
output misleading.

Since v4.0.0

---

## Exports Grouped by Category

- [errors](#errors)
  - [ReporterError (class)](#reportererror-class)
- [options](#options)
  - [ReportOptions (interface)](#reportoptions-interface)
  - [ReportSelectedComparisonOptions (interface)](#reportselectedcomparisonoptions-interface)
  - [ReportSelectedOptions (interface)](#reportselectedoptions-interface)
  - [VisualizeOptions (interface)](#visualizeoptions-interface)
- [services](#services)
  - [Reporter (class)](#reporter-class)

---

# errors

## ReporterError (class)

Error raised when generating a bundle size report or visualization fails.

**Signature**

```ts
declare class ReporterError
```

[Source](https://effect.website/blob/main/src/Reporter.ts#L37)

Since v4.0.0

# options

## ReportOptions (interface)

Options for generating a bundle size comparison report against fixture files from a base directory.

**Signature**

```ts
export interface ReportOptions {
  readonly baseDirectory: string
}
```

[Source](https://effect.website/blob/main/src/Reporter.ts#L47)

Since v4.0.0

## ReportSelectedComparisonOptions (interface)

Options for generating a bundle size comparison report for explicit entry files against a base checkout.

**Signature**

```ts
export interface ReportSelectedComparisonOptions {
  readonly baseDirectory: string
  readonly paths: ReadonlyArray<string>
}
```

[Source](https://effect.website/blob/main/src/Reporter.ts#L78)

Since v4.0.0

## ReportSelectedOptions (interface)

Options for generating a bundle size report for an explicit list of entry files.

**Signature**

```ts
export interface ReportSelectedOptions {
  readonly paths: ReadonlyArray<string>
}
```

[Source](https://effect.website/blob/main/src/Reporter.ts#L68)

Since v4.0.0

## VisualizeOptions (interface)

Options for generating bundle visualizations for selected entry files into an output directory.

**Signature**

```ts
export interface VisualizeOptions {
  readonly paths: ReadonlyArray<string>
  readonly outputDirectory: string
}
```

[Source](https://effect.website/blob/main/src/Reporter.ts#L57)

Since v4.0.0

# services

## Reporter (class)

Context service for producing bundle size reports and visualizations from Rollup-generated fixture stats.

**Signature**

```ts
declare class Reporter
```

[Source](https://effect.website/blob/main/src/Reporter.ts#L89)

Since v4.0.0
