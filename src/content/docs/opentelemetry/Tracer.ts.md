---
title: Tracer.ts
nav_order: 6
parent: "@effect/opentelemetry"
---

## Tracer.ts overview

Bridges Effect tracing into OpenTelemetry by installing an Effect `Tracer`
that creates OpenTelemetry spans, records attributes, events, links, errors,
and status, and keeps OpenTelemetry context active while traced effects run.
Use this module when an application already has an OpenTelemetry
`TracerProvider`, or when the Node and Web SDK layers should expose Effect
spans to OTLP, console, or other OpenTelemetry-compatible exporters.

The layer constructors wire Effect's tracer service to either the global
OpenTelemetry tracer provider or an explicitly provided `OtelTracer`. This
module does not create exporters or span processors by itself, so spans are
exported only when the provider has been configured by the application or by
the Node/Web SDK layers. Parentage is taken from Effect spans first and can
also attach to the active OpenTelemetry context, while `makeExternalSpan` and
`withSpanContext` are the entry points for continuing an incoming remote
trace. Preserve `traceFlags` and `traceState` when building external spans;
otherwise sampling defaults to sampled and trace state cannot be propagated.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [currentOtelSpan](#currentotelspan)
- [constructors](#constructors)
  - [make](#make)
  - [makeExternalSpan](#makeexternalspan)
- [layers](#layers)
  - [layer](#layer)
  - [layerGlobal](#layerglobal)
  - [layerGlobalProvider](#layerglobalprovider)
  - [layerGlobalTracer](#layerglobaltracer)
  - [layerTracer](#layertracer)
  - [layerWithoutOtelTracer](#layerwithoutoteltracer)
- [propagation](#propagation)
  - [withSpanContext](#withspancontext)
- [services](#services)
  - [OtelTraceFlags (class)](#oteltraceflags-class)
  - [OtelTraceState (class)](#oteltracestate-class)
  - [OtelTracer (class)](#oteltracer-class)
  - [OtelTracerProvider (class)](#oteltracerprovider-class)

---

# accessors

## currentOtelSpan

Gets the current OpenTelemetry span.

**Details**

This accessor works with both the official OpenTelemetry API, such as
`Tracer.layer` and `NodeSdk.layer`, and the lightweight OTLP module, such as
`OtlpTracer.layer`. When using OTLP, the returned span is a wrapper that
conforms to the OpenTelemetry `Span` interface.

**Signature**

```ts
declare const currentOtelSpan: Effect.Effect<Otel.Span, Cause.NoSuchElementError, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L261)

Since v4.0.0

# constructors

## make

Creates an Effect `Tracer` implementation backed by the configured OpenTelemetry tracer.

**Signature**

```ts
declare const make: Effect.Effect<Tracer.Tracer, never, OtelTracer>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L94)

Since v4.0.0

## makeExternalSpan

Creates an Effect external span from an OpenTelemetry span context, preserving trace flags and trace state when provided.

**Signature**

```ts
declare const makeExternalSpan: (options: {
  readonly traceId: string
  readonly spanId: string
  readonly traceFlags?: number | undefined
  readonly traceState?: string | Otel.TraceState | undefined
}) => Tracer.ExternalSpan
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L127)

Since v4.0.0

# layers

## layer

Layer that creates an OpenTelemetry tracer from a provider and resource, then installs it as the Effect tracer.

**When to use**

Use when you already provide an `OtelTracerProvider` and a `Resource`, and
want Effect spans backed by a tracer derived from them.

**See**

- `layerTracer` for creating only the OpenTelemetry tracer service
- `layerGlobal` for installing the Effect tracer from the global provider
- `layerWithoutOtelTracer` for installing an already-provided `OtelTracer`

**Signature**

```ts
declare const layer: Layer.Layer<OtelTracer, never, OtelTracerProvider | Resource>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L237)

Since v4.0.0

## layerGlobal

Layer that installs an Effect tracer backed by the global OpenTelemetry tracer provider.

**Signature**

```ts
declare const layerGlobal: Layer.Layer<OtelTracer, never, Resource>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L210)

Since v4.0.0

## layerGlobalProvider

Layer that provides the current global OpenTelemetry tracer provider.

**Signature**

```ts
declare const layerGlobalProvider: Layer.Layer<OtelTracerProvider, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L171)

Since v4.0.0

## layerGlobalTracer

Layer that creates an OpenTelemetry tracer from the global tracer provider and the current resource.

**Signature**

```ts
declare const layerGlobalTracer: Layer.Layer<OtelTracer, never, Resource>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L200)

Since v4.0.0

## layerTracer

Layer that creates an OpenTelemetry tracer from the provided tracer provider and resource metadata.

**Signature**

```ts
declare const layerTracer: Layer.Layer<OtelTracer, never, OtelTracerProvider | Resource>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L182)

Since v4.0.0

## layerWithoutOtelTracer

Layer that installs the Effect tracer using an `OtelTracer` already provided in the environment.

**Signature**

```ts
declare const layerWithoutOtelTracer: Layer.Layer<never, never, OtelTracer>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L220)

Since v4.0.0

# propagation

## withSpanContext

Sets an effect's parent span from the given OpenTelemetry `SpanContext`.

**When to use**

Use when you need an effect to continue a trace from a parent span context
produced by OpenTelemetry instrumentation outside Effect.

**Signature**

```ts
declare const withSpanContext: {
  (
    spanContext: Otel.SpanContext
  ): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, Exclude<R, Tracer.ParentSpan>>
  <A, E, R>(
    self: Effect.Effect<A, E, R>,
    spanContext: Otel.SpanContext
  ): Effect.Effect<A, E, Exclude<R, Tracer.ParentSpan>>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L366)

Since v4.0.0

# services

## OtelTraceFlags (class)

Context service containing OpenTelemetry trace flags used when constructing external span contexts.

**Signature**

```ts
declare class OtelTraceFlags
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L68)

Since v4.0.0

## OtelTraceState (class)

Context service containing OpenTelemetry trace state used when constructing external span contexts.

**Signature**

```ts
declare class OtelTraceState
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L79)

Since v4.0.0

## OtelTracer (class)

Context service containing the OpenTelemetry `Tracer` used to create spans for Effect tracing.

**Signature**

```ts
declare class OtelTracer
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L46)

Since v4.0.0

## OtelTracerProvider (class)

Context service containing the OpenTelemetry `TracerProvider` used to obtain tracers.

**Signature**

```ts
declare class OtelTracerProvider
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/opentelemetry/src/Tracer.ts#L57)

Since v4.0.0
