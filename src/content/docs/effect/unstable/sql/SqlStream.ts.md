---
title: SqlStream.ts
nav_order: 338
parent: "effect"
---

## SqlStream.ts overview

Low-level helpers for adapting push-based SQL row sources into Effect
streams.

SQL drivers often expose large query results through cursors, event emitters,
or driver-specific streams that push rows as they arrive. This module
provides the small interop layer used by SQL integrations to turn those
producers into `Stream` values for `Statement.stream` and
`Connection.executeStream`, so callers can process large result sets
incrementally instead of materializing every row in memory.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [asyncPauseResume](#asyncpauseresume)

---

# constructors

## asyncPauseResume

Creates a stream from a callback-style producer with pause and resume
callbacks that are triggered when the internal queue applies backpressure.

**Signature**

```ts
declare const asyncPauseResume: <A, E = never, R = never>(
  register: (emit: {
    readonly single: (item: A) => void
    readonly array: (arr: ReadonlyArray<A>) => void
    readonly fail: (error: E) => void
    readonly end: () => void
  }) => Effect.Effect<{ onPause(): void; onResume(): void }, E, R | Scope.Scope>,
  bufferSize?: number
) => Stream.Stream<A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlStream.ts#L27)

Since v4.0.0
