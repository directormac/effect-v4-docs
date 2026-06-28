---
title: BunWorker.ts
nav_order: 21
parent: "@effect/platform-bun"
---

## BunWorker.ts overview

Parent-side worker support for Bun applications.

`layerPlatform` provides the `WorkerPlatform` used to communicate with
`globalThis.Worker` instances through Effect's worker protocol. `layer`
combines that platform with a `Spawner` built from a callback that creates a
worker for each worker id. The platform forwards worker messages and errors,
asks workers to close on scope finalization, and terminates them if graceful
shutdown times out.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerPlatform](#layerplatform)

---

# layers

## layer

Provides the Bun `WorkerPlatform` together with a `Worker.Spawner` created
from the supplied worker spawning function.

**Signature**

```ts
declare const layer: (spawn: (id: number) => globalThis.Worker) => Layer.Layer<Worker.WorkerPlatform | Worker.Spawner>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunWorker.ts#L28)

Since v4.0.0

## layerPlatform

Provides the Bun `WorkerPlatform`, wiring worker messages and errors into
Effect workers and requesting graceful worker shutdown during scope
finalization before terminating on timeout.

**Signature**

```ts
declare const layerPlatform: Layer.Layer<Worker.WorkerPlatform, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunWorker.ts#L44)

Since v4.0.0
