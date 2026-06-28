---
title: BunWorkerRunner.ts
nav_order: 22
parent: "@effect/platform-bun"
---

## BunWorkerRunner.ts overview

Worker-entrypoint support for Bun worker runners.

This module exports a `layer` that provides `WorkerRunnerPlatform` for code
already running inside a Bun `Worker`. The platform receives request messages
from the parent-side `BunWorker` platform, runs the registered handler, sends
responses through the worker `postMessage` channel, and closes when the
parent sends the close message.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Provides the `WorkerRunnerPlatform` for code running inside a Bun worker,
routing parent messages to the registered handler and sending responses back
through the worker port.

**Signature**

```ts
declare const layer: Layer.Layer<WorkerRunner.WorkerRunnerPlatform, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunWorkerRunner.ts#L33)

Since v4.0.0
