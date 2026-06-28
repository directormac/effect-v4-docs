---
title: Metrics.ts
nav_order: 3
parent: "@effect/opentelemetry"
---

## Metrics.ts overview

OpenTelemetry support for Effect metrics.

This module exposes Effect metrics as an OpenTelemetry `MetricProducer`.
`makeProducer` creates the producer, `registerProducer` attaches it to one
or more SDK `MetricReader`s, and `layer` manages that setup in a scoped
layer. The `TemporalityPreference` type lets callers choose cumulative or
delta metric values.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [makeProducer](#makeproducer)
  - [registerProducer](#registerproducer)
- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [TemporalityPreference (type alias)](#temporalitypreference-type-alias)

---

# constructors

## makeProducer

Creates an OpenTelemetry metric producer from Effect metrics.

**When to use**

Use when you need a `MetricProducer` for manually wiring Effect metrics into
OpenTelemetry instead of using the scoped `layer` helper.

**Details**

Requires the current OpenTelemetry `Resource`, captures the current Effect
context, and uses cumulative temporality by default. Pass `"delta"` for
interval-based values.

**See**

- `registerProducer` for attaching a producer to metric readers
- `layer` for creating and registering a producer in a scoped layer

**Signature**

```ts
declare const makeProducer: (temporality?: TemporalityPreference) => Effect.Effect<MetricProducer, never, Resource>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Metrics.ts#L58)

Since v4.0.0

## registerProducer

Registers a metric producer with one or more metric readers.

**Signature**

```ts
declare const registerProducer: (
  self: MetricProducer,
  metricReader: LazyArg<MetricReader | Arr.NonEmptyReadonlyArray<MetricReader>>,
  options?: { readonly shutdownTimeout?: Duration.Input | undefined }
) => Effect.Effect<Array<any>, never, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Metrics.ts#L71)

Since v4.0.0

# layers

## layer

Creates a Layer that registers a metric producer with metric readers.

**Example** (Creating a metrics layer with temporality)

```ts
import { Metrics } from "@effect/opentelemetry"
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics"
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http"

const metricExporter = new OTLPMetricExporter({ url: "<your-otel-url>" })

// Use delta temporality for backends like Datadog or Dynatrace
const metricsLayer = Metrics.layer(
  () =>
    new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 10000
    }),
  { temporality: "delta" }
)

// Use cumulative temporality for backends like Prometheus (default)
const cumulativeLayer = Metrics.layer(() => new PeriodicExportingMetricReader({ exporter: metricExporter }), {
  temporality: "cumulative"
})
```

**Signature**

```ts
declare const layer: (
  evaluate: LazyArg<MetricReader | Arr.NonEmptyReadonlyArray<MetricReader>>,
  options?: {
    readonly shutdownTimeout?: Duration.Input | undefined
    readonly temporality?: TemporalityPreference | undefined
  }
) => Layer.Layer<never, never, Resource>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Metrics.ts#L128)

Since v4.0.0

# models

## TemporalityPreference (type alias)

Determines how metric values relate to the time interval over which they
are aggregated.

**Details**

`cumulative` reports total since a fixed start time. Each data point depends
on all previous measurements. This is the default behavior. `delta` reports
changes since the last export. Each interval is independent with no
dependency on previous measurements.

**Signature**

```ts
type TemporalityPreference = "cumulative" | "delta"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Metrics.ts#L36)

Since v4.0.0
