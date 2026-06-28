---
title: NodeStdio.ts
nav_order: 11
parent: "@effect/platform-node-shared"
---

## NodeStdio.ts overview

Shared Node.js implementation of the Effect `Stdio` service.

`NodeStdio` provides `Stdio.Stdio` from the current Node process. The
exported `layer` reads command-line arguments from `process.argv`,
consumes input from `process.stdin`, and writes normal and error output to
`process.stdout` and `process.stderr`. Standard input remains open, and
standard output and error output are not ended unless requested.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Provides `Stdio` from `process.argv`, `process.stdin`, `process.stdout`,
and `process.stderr`; stdin remains open and stdout/stderr are not ended by
default.

**Signature**

```ts
declare const layer: Layer.Layer<Stdio.Stdio, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeStdio.ts#L27)

Since v4.0.0
