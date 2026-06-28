---
title: Otlp.ts
nav_order: 283
parent: "effect"
---

## Otlp.ts overview

Configures OpenTelemetry Protocol (OTLP) HTTP export for Effect telemetry.

This module installs the OTLP logger, metrics exporter, and tracer exporter
from one shared configuration. Use it when an application sends logs, metrics,
and traces to the same OpenTelemetry Collector, vendor OTLP endpoint, or local
development collector.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerFromConfig](#layerfromconfig)
  - [layerJson](#layerjson)
  - [layerProtobuf](#layerprotobuf)

---

# layers

## layer

Creates a combined OTLP layer for logs, metrics, and traces.

**Details**

The layer sends data to `/v1/logs`, `/v1/metrics`, and `/v1/traces` below
`baseUrl` and requires an `OtlpSerialization` implementation.

**Signature**

```ts
declare const layer: (options: {
  readonly baseUrl: string
  readonly resource?:
    | {
        readonly serviceName?: string | undefined
        readonly serviceVersion?: string | undefined
        readonly attributes?: Record<string, unknown>
      }
    | undefined
  readonly headers?: Headers.Input | undefined
  readonly maxBatchSize?: number | undefined
  readonly tracerContext?: (<X>(primitive: Tracer.EffectPrimitive<X>, span: Tracer.AnySpan) => X) | undefined
  readonly loggerExportInterval?: Duration.Input | undefined
  readonly loggerExcludeLogSpans?: boolean | undefined
  readonly loggerMergeWithExisting?: boolean | undefined
  readonly metricsExportInterval?: Duration.Input | undefined
  readonly metricsTemporality?: AggregationTemporality | undefined
  readonly tracerExportInterval?: Duration.Input | undefined
  readonly shutdownTimeout?: Duration.Input | undefined
}) => Layer.Layer<never, never, HttpClient.HttpClient | OtlpSerialization.OtlpSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Otlp.ts#L35)

Since v4.0.0

## layerFromConfig

Creates a combined OTLP layer for logs, metrics, and traces from
OpenTelemetry configuration.

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
  readonly tracerContext?: (<X>(primitive: Tracer.EffectPrimitive<X>, span: Tracer.AnySpan) => X) | undefined
  readonly loggerExcludeLogSpans?: boolean | undefined
  readonly loggerMergeWithExisting?: boolean | undefined
}) => Layer.Layer<never, never, HttpClient.HttpClient | OtlpSerialization.OtlpSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Otlp.ts#L93)

Since v4.0.0

## layerJson

Creates the combined OTLP logs, metrics, and traces layer using JSON
serialization.

**Signature**

```ts
declare const layerJson: (options: {
  readonly baseUrl: string
  readonly resource?:
    | {
        readonly serviceName?: string | undefined
        readonly serviceVersion?: string | undefined
        readonly attributes?: Record<string, unknown>
      }
    | undefined
  readonly headers?: Headers.Input | undefined
  readonly maxBatchSize?: number | undefined
  readonly tracerContext?: (<X>(primitive: Tracer.EffectPrimitive<X>, span: Tracer.AnySpan) => X) | undefined
  readonly loggerExportInterval?: Duration.Input | undefined
  readonly loggerExcludeLogSpans?: boolean | undefined
  readonly loggerMergeWithExisting?: boolean | undefined
  readonly metricsExportInterval?: Duration.Input | undefined
  readonly metricsTemporality?: AggregationTemporality | undefined
  readonly tracerExportInterval?: Duration.Input | undefined
  readonly shutdownTimeout?: Duration.Input | undefined
}) => Layer.Layer<never, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Otlp.ts#L129)

Since v4.0.0

## layerProtobuf

Creates the combined OTLP logs, metrics, and traces layer using protobuf
serialization.

**Signature**

```ts
declare const layerProtobuf: (options: {
  readonly baseUrl: string
  readonly resource?:
    | {
        readonly serviceName?: string | undefined
        readonly serviceVersion?: string | undefined
        readonly attributes?: Record<string, unknown>
      }
    | undefined
  readonly headers?: Headers.Input | undefined
  readonly maxBatchSize?: number | undefined
  readonly tracerContext?: (<X>(primitive: Tracer.EffectPrimitive<X>, span: Tracer.AnySpan) => X) | undefined
  readonly loggerExportInterval?: Duration.Input | undefined
  readonly loggerExcludeLogSpans?: boolean | undefined
  readonly loggerMergeWithExisting?: boolean | undefined
  readonly metricsExportInterval?: Duration.Input | undefined
  readonly metricsTemporality?: AggregationTemporality | undefined
  readonly tracerExportInterval?: Duration.Input | undefined
  readonly shutdownTimeout?: Duration.Input | undefined
}) => Layer.Layer<never, never, HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Otlp.ts#L155)

Since v4.0.0
