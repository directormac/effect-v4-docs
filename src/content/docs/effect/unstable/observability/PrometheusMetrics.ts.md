---
title: PrometheusMetrics.ts
nav_order: 290
parent: "effect"
---

## PrometheusMetrics.ts overview

Formats Effect metrics for Prometheus.

This module reads metrics from the current Effect context and renders them in
the Prometheus text format. It can also register a pull-based HTTP endpoint,
such as `/metrics`, for Prometheus to scrape.

Since v4.0.0

---

## Exports Grouped by Category

- [Http](#http)
  - [layerHttp](#layerhttp)
- [formatting](#formatting)
  - [format](#format)
  - [formatUnsafe](#formatunsafe)
- [models](#models)
  - [MetricNameMapper (type alias)](#metricnamemapper-type-alias)
- [options](#options)
  - [FormatOptions (interface)](#formatoptions-interface)
  - [HttpOptions (interface)](#httpoptions-interface)

---

# Http

## layerHttp

Creates a Layer that registers a `/metrics` HTTP endpoint for Prometheus
scraping.

**Details**

This layer automatically adds a GET route to your HTTP router that serves
metrics in Prometheus exposition format. By default, the endpoint is
registered at `/metrics`, but this can be customized via the `path` option.

**Example** (Serving metrics over HTTP)

```ts
import { PrometheusMetrics } from "effect/unstable/observability"

// Create a layer that adds /metrics endpoint to the router
const PrometheusLayer = PrometheusMetrics.layerHttp()

// Or customize the path and add a prefix to all metric names
const CustomPrometheusLayer = PrometheusMetrics.layerHttp({
  path: "/prometheus/metrics",
  prefix: "myapp"
})
```

**Signature**

```ts
declare const layerHttp: (options?: HttpOptions | undefined) => Layer.Layer<never, never, HttpRouter.HttpRouter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PrometheusMetrics.ts#L175)

Since v4.0.0

# formatting

## format

Formats all metrics in the registry to Prometheus exposition format.

**Example** (Formatting metrics)

```ts
import { Effect, Metric } from "effect"
import { PrometheusMetrics } from "effect/unstable/observability"

const program = Effect.gen(function* () {
  const counter = Metric.counter("api_requests_total", {
    description: "Total API requests"
  })
  const gauge = Metric.gauge("active_connections", {
    description: "Number of active connections"
  })

  yield* Metric.update(counter, 100)
  yield* Metric.update(gauge, 25)

  // Format without prefix
  const output1 = yield* PrometheusMetrics.format()

  // Format with prefix
  const output2 = yield* PrometheusMetrics.format({ prefix: "myapp" })
})
```

**Signature**

```ts
declare const format: (options?: FormatOptions | undefined) => Effect.Effect<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PrometheusMetrics.ts#L97)

Since v4.0.0

## formatUnsafe

Formats all metrics in the registry to Prometheus exposition format synchronously.

**When to use**

Use when you already have access to the context and need low-level
synchronous formatting.

**See**

- `format` for effectful formatting from the current context

**Signature**

```ts
declare const formatUnsafe: (context: Context.Context<never>, options?: FormatOptions | undefined) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PrometheusMetrics.ts#L117)

Since v4.0.0

# models

## MetricNameMapper (type alias)

A function that transforms metric names before formatting.

**Example** (Mapping metric names)

```ts
import type { PrometheusMetrics } from "effect/unstable/observability"

// Convert camelCase to snake_case
const mapper: PrometheusMetrics.MetricNameMapper = (name) => name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase()
```

**Signature**

```ts
type MetricNameMapper = (name: string) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PrometheusMetrics.ts#L33)

Since v4.0.0

# options

## FormatOptions (interface)

Options for formatting metrics.

**Signature**

```ts
export interface FormatOptions {
  /**
   * Optional prefix to prepend to all metric names.
   * The prefix will be sanitized and joined with an underscore.
   */
  readonly prefix?: string | undefined
  /**
   * Optional function to transform metric names before sanitization.
   */
  readonly metricNameMapper?: MetricNameMapper | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PrometheusMetrics.ts#L41)

Since v4.0.0

## HttpOptions (interface)

Options for exporting Prometheus metrics over HTTP.

**Signature**

```ts
export interface HttpOptions extends FormatOptions {
  /**
   * The path to the HTTP route on which Prometheus metrics should be served.
   */
  readonly path?: HttpRouter.PathInput | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PrometheusMetrics.ts#L59)

Since v4.0.0
