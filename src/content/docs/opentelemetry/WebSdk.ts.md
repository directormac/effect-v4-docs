---
title: WebSdk.ts
nav_order: 7
parent: "@effect/opentelemetry"
---

## WebSdk.ts overview

Browser OpenTelemetry setup for Effect applications.

This module exports a `Configuration` type and layers for installing
tracing, metrics, and logging in browser runtimes. The main `layer` builds
the shared OpenTelemetry resource from explicit service metadata, then
enables only the signal types that have processors or readers configured.
`layerTracerProvider` creates a scoped `WebTracerProvider`.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerTracerProvider](#layertracerprovider)
- [models](#models)
  - [Configuration (interface)](#configuration-interface)

---

# layers

## layer

Creates a Web OpenTelemetry layer from configuration, providing the resource and enabling tracing, metrics, and logging when configured.

**When to use**

Use to install browser OpenTelemetry support when service metadata is
configured in code and telemetry processors or readers are supplied directly.

**Details**

The configuration can be provided lazily or effectfully. The layer always
provides `Resource.Resource`; tracing, metrics, and logging are installed only
when the corresponding processors or readers are non-empty.

**Gotchas**

Browser resource metadata is explicit; this layer does not read
OpenTelemetry environment variables. Empty processor or reader arrays are
treated as not configured.

**Signature**

```ts
declare const layer: {
  (evaluate: LazyArg<Configuration>): Layer.Layer<Resource.Resource>
  <E, R>(evaluate: Effect.Effect<Configuration, E, R>): Layer.Layer<Resource.Resource, E, R>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/WebSdk.ts#L102)

Since v4.0.0

## layerTracerProvider

Creates a scoped Web OpenTelemetry tracer provider from one or more span processors and shuts it down when the layer is released.

**Signature**

```ts
declare const layerTracerProvider: (
  processor: SpanProcessor | NonEmptyReadonlyArray<SpanProcessor>,
  config?: Omit<TracerConfig, "resource">
) => Layer.Layer<Tracer.OtelTracerProvider, never, Resource.Resource>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/WebSdk.ts#L54)

Since v4.0.0

# models

## Configuration (interface)

Configuration for the Web OpenTelemetry layer, including resource metadata and optional tracing, metrics, and logging settings.

**Signature**

```ts
export interface Configuration {
  readonly spanProcessor?: SpanProcessor | ReadonlyArray<SpanProcessor> | undefined
  readonly tracerConfig?: Omit<TracerConfig, "resource">
  readonly metricReader?: MetricReader | ReadonlyArray<MetricReader> | undefined
  readonly metricTemporality?: Metrics.TemporalityPreference | undefined
  readonly logRecordProcessor?: LogRecordProcessor | ReadonlyArray<LogRecordProcessor> | undefined
  readonly loggerProviderConfig?: Omit<LoggerProviderConfig, "resource"> | undefined
  readonly loggerMergeWithExisting?: boolean | undefined
  readonly resource: {
    readonly serviceName: string
    readonly serviceVersion?: string
    readonly attributes?: Otel.Attributes
  }
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/WebSdk.ts#L33)

Since v4.0.0
