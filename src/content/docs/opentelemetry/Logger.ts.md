---
title: Logger.ts
nav_order: 2
parent: "@effect/opentelemetry"
---

## Logger.ts overview

Connects Effect logging to the OpenTelemetry Logs SDK.

This module turns Effect log events into OpenTelemetry log records. It maps
Effect log levels to OpenTelemetry severity numbers, provides the
`OtelLoggerProvider` service, creates an Effect `Logger` with `make`, and
offers layers for installing that logger or creating a scoped SDK
`LoggerProvider` from one or more `LogRecordProcessor`s.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [converting](#converting)
  - [logLevelToSeverityNumber](#logleveltoseveritynumber)
- [layers](#layers)
  - [layer](#layer)
  - [layerLoggerProvider](#layerloggerprovider)
- [services](#services)
  - [OtelLoggerProvider (class)](#otelloggerprovider-class)

---

# constructors

## make

Creates an Effect logger that emits log records through the configured OpenTelemetry logger provider.

**Signature**

```ts
declare const make: Effect.Effect<Logger.Logger<unknown, void>, never, OtelLoggerProvider>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Logger.ts#L79)

Since v4.0.0

# converting

## logLevelToSeverityNumber

Maps an Effect `LogLevel` to the corresponding OpenTelemetry `SeverityNumber`.

**Details**

OpenTelemetry log severity numbers are in the range `1` through `24`. This
function maps from Effect's log levels instead of using
`LogLevel.getOrdinal`, whose internal sort ordinals, such as the `Info`
ordinal `20000`, fall outside the OpenTelemetry logs data model and can be
treated as `UNSPECIFIED` by validating backends.

**Signature**

```ts
declare const logLevelToSeverityNumber: (level: LogLevel.LogLevel) => SeverityNumber
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Logger.ts#L54)

Since v4.0.0

# layers

## layer

Creates a layer that installs the OpenTelemetry-backed Effect logger, merging with existing loggers by default.

**When to use**

Use to install the OpenTelemetry-backed Effect logger in an application that
has an `OtelLoggerProvider`, so standard Effect logging emits OpenTelemetry
log records.

**Details**

The layer installs the logger created by `make`. `mergeWithExisting` defaults
to `true`; set it to `false` to replace the current logger set.

**See**

- `make` for constructing the logger directly
- `layerLoggerProvider` for creating the required logger provider

**Signature**

```ts
declare const layer: (options: {
  readonly mergeWithExisting?: boolean | undefined
}) => Layer.Layer<never, never, OtelLoggerProvider>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Logger.ts#L141)

Since v4.0.0

## layerLoggerProvider

Creates a scoped OpenTelemetry logger provider from one or more log record processors, using the current `Resource` and flushing and shutting down the provider when the layer is released.

**Signature**

```ts
declare const layerLoggerProvider: (
  processor: Otel.LogRecordProcessor | NonEmptyReadonlyArray<Otel.LogRecordProcessor>,
  config?: Omit<Otel.LoggerProviderConfig, "resource"> & { readonly shutdownTimeout?: Duration.Input | undefined }
) => Layer.Layer<OtelLoggerProvider, never, Resource>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Logger.ts#L167)

Since v4.0.0

# services

## OtelLoggerProvider (class)

Context service containing the OpenTelemetry `LoggerProvider` used to emit Effect log records.

**Signature**

```ts
declare class OtelLoggerProvider
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Logger.ts#L35)

Since v4.0.0
