---
title: NodeWorker.ts
nav_order: 24
parent: "@effect/platform-node"
---

## NodeWorker.ts overview

Parent-side Node.js support for Effect workers.

`layerPlatform` installs the `WorkerPlatform` used by a Node program that
owns workers. It supports both `node:worker_threads` workers and IPC-enabled
child processes, routing messages through Effect's worker protocol. `layer`
combines that platform with a `Spawner` callback, and the platform asks
workers to close on scope finalization before forcefully terminating them on
timeout.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerPlatform](#layerplatform)

---

# layers

## layer

Provides the Node `WorkerPlatform` together with a `Worker.Spawner` created
from the supplied worker or child-process spawning function.

**Signature**

```ts
declare const layer: (
  spawn: (id: number) => WorkerThreads.Worker | ChildProcess.ChildProcess
) => Layer.Layer<Worker.WorkerPlatform | Worker.Spawner>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeWorker.ts#L115)

Since v4.0.0

## layerPlatform

Provides the Node `WorkerPlatform` for `worker_threads` workers and child
process workers, wiring messages, errors, and exits into Effect workers and
terminating the worker if graceful shutdown times out.

**Signature**

```ts
declare const layerPlatform: Layer.Layer<Worker.WorkerPlatform, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeWorker.ts#L31)

Since v4.0.0
