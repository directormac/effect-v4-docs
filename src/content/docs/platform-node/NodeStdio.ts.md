---
title: NodeStdio.ts
nav_order: 21
parent: "@effect/platform-node"
---

## NodeStdio.ts overview

Node.js `Stdio` layer for the current process.

The exported layer reuses the shared Node stdio implementation. It satisfies
the platform-independent `Stdio` service by reading command-line arguments
from `process.argv`, consuming input from `process.stdin`, and writing output
streams to `process.stdout` and `process.stderr`.

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

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStdio.ts#L22)

Since v4.0.0
