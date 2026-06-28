---
title: BrowserWorkerRunner.ts
nav_order: 9
parent: "@effect/platform-browser"
---

## BrowserWorkerRunner.ts overview

Runner-side browser platform for Effect worker handlers.

`make` builds a `WorkerRunnerPlatform` over a `MessagePort` or `Window`.
`layer` provides the platform from the global worker `self`, and
`layerMessagePort` provides it from an explicit endpoint. The platform
receives parent or client messages, runs Effect handlers, and posts responses
back through the browser messaging channel.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerMessagePort](#layermessageport)

---

# constructors

## make

Creates a `WorkerRunnerPlatform` service that runs worker handlers over a `MessagePort` or `Window`.

**Signature**

```ts
declare const make: (self: MessagePort | Window) => WorkerRunner.WorkerRunnerPlatform["Service"]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserWorkerRunner.ts#L38)

Since v4.0.0

# layers

## layer

Layer that provides a browser `WorkerRunnerPlatform` using the global `self` worker context.

**When to use**

Use when you need a browser worker entry point to use the ambient `self`
object as the worker transport.

**Details**

Delegates to `make(self)` and provides the runner-side platform used by
protocols such as `RpcServer.layerProtocolWorkerRunner`.

**Gotchas**

This layer depends on the browser worker global `self`. Use
`layerMessagePort` when the transport is an explicit `MessagePort` or
`Window`.

**See**

- `make` for constructing a runner platform from an explicit endpoint
- `layerMessagePort` for providing a platform from an explicit endpoint

**Signature**

```ts
declare const layer: Layer.Layer<WorkerRunner.WorkerRunnerPlatform, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserWorkerRunner.ts#L188)

Since v4.0.0

## layerMessagePort

Layer that provides a `WorkerRunnerPlatform` using the supplied `MessagePort` or `Window`.

**Signature**

```ts
declare const layerMessagePort: (port: MessagePort | Window) => Layer.Layer<WorkerRunner.WorkerRunnerPlatform>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserWorkerRunner.ts#L198)

Since v4.0.0
