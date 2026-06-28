---
title: OtlpLogger.ts
nav_order: 285
parent: "effect"
---

## OtlpLogger.ts overview

Exports Effect log entries over OTLP/HTTP.

The logger turns Effect log entries into OTLP log records and sends them to a
logs endpoint, such as an OpenTelemetry Collector or vendor OTLP endpoint. It
includes log levels, messages, annotations, causes, fiber ids, optional log
spans, and current trace/span ids when they are present.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerFromConfig](#layerfromconfig)
- [models](#models)
  - [LogsData (interface)](#logsdata-interface)

---

# constructors

## make

Creates an Effect `Logger` that exports log records through OTLP.

**Details**

The logger serializes records with the configured resource, sends them
through the OTLP exporter, and requires `Scope` so pending records can be
flushed on shutdown.

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
  readonly maxBatchSize?: number | undefined
  readonly shutdownTimeout?: Duration.Input | undefined
  readonly excludeLogSpans?: boolean | undefined
}) => Effect.Effect<Logger.Logger<unknown, void>, never, OtlpSerialization | HttpClient.HttpClient | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpLogger.ts#L43)

Since v4.0.0

# layers

## layer

Layer that installs the OTLP logger created by `make`.

**Details**

By default the OTLP logger is merged with any existing loggers.

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
  readonly maxBatchSize?: number | undefined
  readonly shutdownTimeout?: Duration.Input | undefined
  readonly excludeLogSpans?: boolean | undefined
  readonly mergeWithExisting?: boolean | undefined
}) => Layer.Layer<never, never, HttpClient.HttpClient | OtlpSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpLogger.ts#L106)

Since v4.0.0

## layerFromConfig

Creates an OTLP logs layer from OpenTelemetry configuration.

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
  readonly excludeLogSpans?: boolean | undefined
  readonly mergeWithExisting?: boolean | undefined
}) => Layer.Layer<never, never, HttpClient.HttpClient | OtlpSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpLogger.ts#L130)

Since v4.0.0

# models

## LogsData (interface)

OTLP logs payload serialized by `OtlpLogger`.

**Signature**

```ts
export interface LogsData {
  resourceLogs: ReadonlyArray<IResourceLogs>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpLogger.ts#L182)

Since v4.0.0
