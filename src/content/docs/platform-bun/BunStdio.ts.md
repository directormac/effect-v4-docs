---
title: BunStdio.ts
nav_order: 18
parent: "@effect/platform-bun"
---

## BunStdio.ts overview

Process stdio for Bun applications.

This module provides the Bun layer for Effect's `Stdio` service by using the
shared Node stdio implementation. Arguments come from `process.argv`, input
is read from `process.stdin`, and output and error output write to
`process.stdout` and `process.stderr`.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Provides the `Stdio` service backed by the current process arguments,
stdin, stdout, and stderr streams.

**Signature**

```ts
declare const layer: Layer.Layer<Stdio, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunStdio.ts#L22)

Since v4.0.0
