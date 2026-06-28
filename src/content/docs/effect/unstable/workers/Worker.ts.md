---
title: Worker.ts
nav_order: 342
parent: "effect"
---

## Worker.ts overview

Client-side worker primitives shared by browser, Node, and Bun adapters.

This module defines the platform-neutral `Worker` client, the `WorkerPlatform`
service that creates workers by numeric id, and the `Spawner` service used to
find platform-specific worker instances. `makePlatform` wraps platform setup
and listen hooks into a `WorkerPlatform`, buffers outgoing messages until the
worker is ready, runs incoming messages with Effect handlers, and ties worker
cleanup to scope lifetime.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [makePlatform](#makeplatform)
- [layers](#layers)
  - [layerSpawner](#layerspawner)
- [models](#models)
  - [PlatformMessage (type alias)](#platformmessage-type-alias)
  - [Spawner (interface)](#spawner-interface)
  - [SpawnerFn (interface)](#spawnerfn-interface)
  - [Worker (interface)](#worker-interface)
  - [WorkerPlatform (class)](#workerplatform-class)
  - [makeUnsafe](#makeunsafe)
- [services](#services)
  - [Spawner](#spawner)

---

# constructors

## makePlatform

Creates a `WorkerPlatform` from platform-specific setup and listen hooks,
buffering sent messages until the worker is ready and scoping port cleanup to
the worker run.

**Signature**

```ts
declare const makePlatform: <W>() => <
  P extends { readonly postMessage: (message: any, transfers?: any | undefined) => void }
>(options: {
  readonly setup: (options: { readonly worker: W; readonly scope: Scope.Scope }) => Effect.Effect<P, WorkerError>
  readonly listen: (options: {
    readonly port: P
    readonly emit: (data: any) => void
    readonly deferred: Deferred.Deferred<never, WorkerError>
    readonly scope: Scope.Scope
  }) => Effect.Effect<void>
}) => WorkerPlatform["Service"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Worker.ts#L145)

Since v4.0.0

# layers

## layerSpawner

Creates a layer that provides a worker `Spawner` service from a `SpawnerFn`.

**Signature**

```ts
declare const layerSpawner: <W = unknown>(spawner: SpawnerFn<W>) => Layer.Layer<Spawner>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Worker.ts#L133)

Since v4.0.0

# models

## PlatformMessage (type alias)

Internal worker platform protocol message: `[0]` signals readiness and
`[1, payload]` carries data.

**Signature**

```ts
type PlatformMessage = readonly [ready: 0] | readonly [data: 1, unknown]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Worker.ts#L92)

Since v4.0.0

## Spawner (interface)

Phantom identifier for the service that maps worker ids to platform-specific
worker instances.

**Signature**

```ts
export interface Spawner {
  readonly _: unique symbol
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Worker.ts#L101)

Since v4.0.0

## SpawnerFn (interface)

Function that creates or locates a platform-specific worker instance for a
numeric worker id.

**Signature**

```ts
export interface SpawnerFn<W = unknown> {
  (id: number): W
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Worker.ts#L123)

Since v4.0.0

## Worker (interface)

Effect-based worker abstraction that can send input messages and run a
long-lived handler for output messages, failing with `WorkerError` or handler
errors.

**Signature**

```ts
export interface Worker<O = unknown, I = unknown> {
  readonly send: (message: I, transfers?: ReadonlyArray<unknown>) => Effect.Effect<void, WorkerError>
  readonly run: <A, E, R>(
    handler: (message: O) => Effect.Effect<A, E, R>,
    options?:
      | {
          readonly onSpawn?: Effect.Effect<void> | undefined
        }
      | undefined
  ) => Effect.Effect<never, E | WorkerError, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Worker.ts#L43)

Since v4.0.0

## WorkerPlatform (class)

Service that spawns effect `Worker` instances for numeric worker ids using
the configured `Spawner`.

**Signature**

```ts
declare class WorkerPlatform
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Worker.ts#L29)

Since v4.0.0

## makeUnsafe

Wraps platform-specific send and run functions into a `Worker`, translating
platform ready/data messages and running the optional `onSpawn` effect when
the worker reports readiness.

**Signature**

```ts
declare const makeUnsafe: (options: {
  readonly send: (message: unknown, transfers?: ReadonlyArray<unknown>) => Effect.Effect<void, WorkerError>
  readonly run: <A, E, R>(
    handler: (message: PlatformMessage) => Effect.Effect<A, E, R>
  ) => Effect.Effect<never, E | WorkerError, R>
}) => Worker<any, any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Worker.ts#L66)

Since v4.0.0

# services

## Spawner

Service tag for the worker `SpawnerFn`.

**Signature**

```ts
declare const Spawner: Context.Service<Spawner, SpawnerFn<unknown>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Worker.ts#L111)

Since v4.0.0
