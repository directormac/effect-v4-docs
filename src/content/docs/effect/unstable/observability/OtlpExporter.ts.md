---
title: OtlpExporter.ts
nav_order: 284
parent: "effect"
---

## OtlpExporter.ts overview

Shared batch exporter for OTLP/HTTP observability modules.

Signal modules use this exporter to buffer already-encoded telemetry and post
it to a configured OTLP endpoint. It owns the scoped transport loop, batching,
retry behavior, temporary disabling after repeated failures, and final flush
during shutdown.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)

---

# constructors

## make

Creates a scoped OTLP batch exporter.

**Details**

The exporter buffers pushed data, periodically posts encoded batches to the
configured URL, retries transient failures, temporarily disables exporting
after unhandled failures, and flushes during scope finalization up to
`shutdownTimeout`.

**Signature**

```ts
declare const make: (options: {
  readonly url: string
  readonly headers: Headers.Input | undefined
  readonly label: string
  readonly exportInterval: Duration.Input
  readonly maxBatchSize: number | "disabled"
  readonly body: (data: Array<any>) => HttpBody
  readonly shutdownTimeout: Duration.Input
}) => Effect.Effect<{ readonly push: (data: unknown) => void }, never, HttpClient.HttpClient | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/OtlpExporter.ts#L57)

Since v4.0.0
