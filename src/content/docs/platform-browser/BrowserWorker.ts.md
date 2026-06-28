---
title: BrowserWorker.ts
nav_order: 8
parent: "@effect/platform-browser"
---

## BrowserWorker.ts overview

Parent-side browser platform for Effect workers.

`layerPlatform` provides the `WorkerPlatform` used to communicate with a
browser `Worker`, `SharedWorker`, or `MessagePort` through Effect's worker
protocol. `layer` combines that platform with a `Spawner` built from a
callback that creates or returns the worker endpoint for each worker id.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerPlatform](#layerplatform)

---

# layers

## layer

Creates browser worker layers by combining the default `WorkerPlatform` with a spawner for `Worker`, `SharedWorker`, or `MessagePort` instances.

**When to use**

Use when you need both the browser `WorkerPlatform` and a `Spawner` from one
layer.

**Details**

The `spawn` callback receives the numeric worker id and may return a
`Worker`, `SharedWorker`, or `MessagePort`.

**Gotchas**

Scope finalization sends the worker close protocol over the port. Dedicated
workers created by `spawn` are not terminated by this layer.

**See**

- `layerPlatform` for providing only the browser worker platform

**Signature**

```ts
declare const layer: (
  spawn: (id: number) => Worker | SharedWorker | MessagePort
) => Layer.Layer<Worker.WorkerPlatform | Worker.Spawner>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserWorker.ts#L41)

Since v4.0.0

## layerPlatform

Layer that provides the browser `WorkerPlatform` for `Worker`, `SharedWorker`, and `MessagePort` communication.

**Signature**

```ts
declare const layerPlatform: Layer.Layer<Worker.WorkerPlatform, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserWorker.ts#L55)

Since v4.0.0
