---
title: OtlpMetrics.ts
nav_order: 286
parent: "effect"
---

## OtlpMetrics.ts overview

Exports Effect metrics over OTLP/HTTP.

This module periodically snapshots metrics from the current Effect context,
serializes them as OTLP resource metrics, and posts them to a metrics
endpoint such as an OpenTelemetry Collector or vendor intake. It is meant for
long-running services that already update `Metric` counters, gauges,
histograms, frequencies, or summaries. The exporter supports cumulative
reporting from a fixed start time and delta reporting from the previous
export.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerFromConfig](#layerfromconfig)
- [models](#models)
  - [AggregationTemporality (type alias)](#aggregationtemporality-type-alias)
  - [MetricsData (interface)](#metricsdata-interface)

---

# constructors

## make

Starts a scoped OTLP metrics exporter.

**Details**

The exporter snapshots registered Effect metrics on the configured interval, serializes them with the selected aggregation temporality, and flushes during scope finalization up to `shutdownTimeout`.

**Signature**

```ts
declare const make: (options: {
  readonly url: string
  readonly resource?:
    | {
        readonly serviceName?: string | undefined
        readonly serviceVersion?: string | undefined
        readonly attributes?: Record<string, unknown>
      }
    | undefined
  readonly headers?: Headers.Input | undefined
  readonly exportInterval?: Duration.Input | undefined
  readonly shutdownTimeout?: Duration.Input | undefined
  readonly temporality?: AggregationTemporality | undefined
}) => Effect.Effect<void, never, HttpClient.HttpClient | OtlpSerialization | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpMetrics.ts#L74)

Since v4.0.0

# layers

## layer

Layer that starts the OTLP metrics exporter created by `make`.

**Signature**

```ts
declare const layer: (options: {
  readonly url: string
  readonly resource?:
    | {
        readonly serviceName?: string | undefined
        readonly serviceVersion?: string | undefined
        readonly attributes?: Record<string, unknown>
      }
    | undefined
  readonly headers?: Headers.Input | undefined
  readonly exportInterval?: Duration.Input | undefined
  readonly shutdownTimeout?: Duration.Input | undefined
  readonly temporality?: AggregationTemporality | undefined
}) => Layer.Layer<never, never, HttpClient.HttpClient | OtlpSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpMetrics.ts#L456)

Since v4.0.0

## layerFromConfig

Creates an OTLP metrics layer from OpenTelemetry configuration.

**Signature**

```ts
declare const layerFromConfig: (options?: {
  readonly resource?:
    | {
        readonly serviceName?: string | undefined
        readonly serviceVersion?: string | undefined
        readonly attributes?: Record<string, unknown>
      }
    | undefined
  readonly headers?: Headers.Input | undefined
}) => Layer.Layer<never, never, HttpClient.HttpClient | OtlpSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpMetrics.ts#L475)

Since v4.0.0

# models

## AggregationTemporality (type alias)

Determines how metric values relate to the time interval over which they are aggregated.

**Details**

`"cumulative"` reports total since a fixed start time. Each data point depends on all previous measurements. This is the default behavior.

`"delta"` reports changes since the last export. Each interval is independent with no dependency on previous measurements.

**Example** (Configuring aggregation temporality)

```ts
import { OtlpMetrics } from "effect/unstable/observability"

// Use delta temporality for backends that prefer it (e.g., Datadog, Dynatrace)
const metricsLayer = OtlpMetrics.layer({
  url: "http://localhost:4318/v1/metrics",
  temporality: "delta"
})

// Use cumulative temporality for backends like Prometheus
const cumulativeLayer = OtlpMetrics.layer({
  url: "http://localhost:4318/v1/metrics",
  temporality: "cumulative" // This is the default
})
```

**Signature**

```ts
type AggregationTemporality = "cumulative" | "delta"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpMetrics.ts#L62)

Since v4.0.0

## MetricsData (interface)

OTLP metrics payload serialized by `OtlpMetrics`.

**Signature**

```ts
export interface MetricsData {
  readonly resourceMetrics: ReadonlyArray<IResourceMetrics>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpMetrics.ts#L527)

Since v4.0.0
