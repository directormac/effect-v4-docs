---
title: NodeWorkerRunner.ts
nav_order: 25
parent: "@effect/platform-node"
---

## NodeWorkerRunner.ts overview

Node.js runtime support for workers that serve Effect worker requests.

`NodeWorkerRunner` supplies the Node implementation of the Effect worker
runner platform. The exported `layer` runs inside a `node:worker_threads`
worker through `parentPort`, or inside a child process through
`process.send`. It listens for parent messages, runs handlers registered with
`WorkerRunner`, sends replies over the same channel, and closes when the
parent sends the close message.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Provides the `WorkerRunnerPlatform` for code running inside a Node worker
thread or child process, routing parent messages to the registered handler
and sending responses back through the parent channel.

**Signature**

```ts
declare const layer: Layer.Layer<WorkerRunner.WorkerRunnerPlatform, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeWorkerRunner.ts#L31)

Since v4.0.0
