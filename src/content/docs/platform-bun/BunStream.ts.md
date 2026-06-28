---
title: BunStream.ts
nav_order: 19
parent: "@effect/platform-bun"
---

## BunStream.ts overview

Bun stream interoperability for Effect streams.

This module is the Bun entry point for adapting runtime streams into Effect's
streaming model. It re-exports the shared Node stream adapters for Bun's
Node-compatible stream APIs and adds `fromReadableStream`, a Web
`ReadableStream` adapter that uses Bun's `readMany` reader method to pull
batches of values into an Effect `Stream`.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [fromReadableStream](#fromreadablestream)
- [utils](#utils)
  - ["@effect/platform-node-shared/NodeStream" (namespace export)](#effectplatform-node-sharednodestream-namespace-export)

---

# constructors

## fromReadableStream

Creates a stream from a `ReadableStream` using Bun's optimized `.readMany`
API.

**Signature**

```ts
declare const fromReadableStream: <A, E>(options: {
  readonly evaluate: LazyArg<ReadableStream<A>>
  readonly onError: (error: unknown) => E
  readonly releaseLockOnEnd?: boolean | undefined
}) => Stream.Stream<A, E>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunStream.ts#L33)

Since v4.0.0

# utils

## "@effect/platform-node-shared/NodeStream" (namespace export)

Re-exports all named exports from the "@effect/platform-node-shared/NodeStream" module.

**Signature**

```ts
export * from "@effect/platform-node-shared/NodeStream"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunStream.ts#L24)

Since v4.0.0
