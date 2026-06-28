---
title: OtlpTracer.ts
nav_order: 289
parent: "effect"
---

## OtlpTracer.ts overview

Exports Effect tracing spans over OTLP/HTTP.

This module creates a `Tracer.Tracer` backed by the shared OTLP batch
exporter, so spans created by Effect tracing APIs can be sent to an
OpenTelemetry Collector, vendor endpoint, or local collector. Exported spans
include identifiers, parent links, attributes, events, timing, kind, and
status information. Use the constructor directly or install it through the
provided layer.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerFromConfig](#layerfromconfig)
- [models](#models)
  - [ResourceSpan (interface)](#resourcespan-interface)
  - [ScopeSpan (interface)](#scopespan-interface)
  - [TraceData (interface)](#tracedata-interface)

---

# constructors

## make

Creates a `Tracer` that exports ended sampled spans to an OTLP traces endpoint.

**Details**

Spans are batched using the configured interval and batch size, serialized
with `OtlpSerialization`, and flushed when the surrounding `Scope` closes.

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
  readonly context?: (<X>(primitive: Tracer.EffectPrimitive<X>, span: Tracer.AnySpan) => X) | undefined
  readonly shutdownTimeout?: Duration.Input | undefined
}) => Effect.Effect<Tracer.Tracer, never, OtlpSerialization | HttpClient.HttpClient | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpTracer.ts#L46)

Since v4.0.0

# layers

## layer

Provides `Tracer.Tracer` using the OTLP tracer created by `make`.

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
  readonly context?: (<X>(primitive: Tracer.EffectPrimitive<X>, span: Tracer.AnySpan) => X) | undefined
  readonly shutdownTimeout?: Duration.Input | undefined
}) => Layer.Layer<never, never, OtlpSerialization | HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpTracer.ts#L126)

Since v4.0.0

## layerFromConfig

Creates an OTLP traces layer from OpenTelemetry configuration.

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
  readonly context?: (<X>(primitive: Tracer.EffectPrimitive<X>, span: Tracer.AnySpan) => X) | undefined
}) => Layer.Layer<never, never, HttpClient.HttpClient | OtlpSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpTracer.ts#L146)

Since v4.0.0

# models

## ResourceSpan (interface)

Group of OTLP scope spans associated with a single resource.

**Signature**

```ts
export interface ResourceSpan {
  readonly resource: Resource
  readonly scopeSpans: Array<ScopeSpan>
  readonly schemaUrl?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpTracer.ts#L366)

Since v4.0.0

## ScopeSpan (interface)

Group of OTLP spans emitted by a single instrumentation scope.

**Signature**

```ts
export interface ScopeSpan {
  readonly scope: Scope
  readonly spans: Array<OtlpSpan>
  readonly schemaUrl?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpTracer.ts#L378)

Since v4.0.0

## TraceData (interface)

Root OTLP traces payload containing spans grouped by resource.

**Signature**

```ts
export interface TraceData {
  readonly resourceSpans: Array<ResourceSpan>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpTracer.ts#L356)

Since v4.0.0
