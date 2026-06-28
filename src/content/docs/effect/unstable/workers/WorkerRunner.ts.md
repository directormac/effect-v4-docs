---
title: WorkerRunner.ts
nav_order: 344
parent: "effect"
---

## WorkerRunner.ts overview

Worker-side primitives for worker-like runtimes.

A `WorkerRunner` receives messages tagged by a numeric port id, sends replies
back through the same transport, and can expose disconnect notifications. The
module also defines the small platform message shape and the
`WorkerRunnerPlatform` service that starts a platform-specific runner.

Since v4.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [PlatformMessage (type alias)](#platformmessage-type-alias)
  - [WorkerRunner (interface)](#workerrunner-interface)
  - [WorkerRunnerPlatform (class)](#workerrunnerplatform-class)

---

# models

## PlatformMessage (type alias)

Wire protocol message used by worker platforms: a request carrying input or a
close signal.

**Signature**

```ts
type PlatformMessage<I> = readonly [request: 0, I] | readonly [close: 1]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerRunner.ts#L47)

Since v4.0.0

## WorkerRunner (interface)

Platform-neutral worker runner that receives inbound messages by port ID,
sends outbound messages, and optionally exposes disconnect notifications.

**Signature**

```ts
export interface WorkerRunner<O = unknown, I = unknown> {
  readonly run: <A, E, R>(
    handler: (portId: number, message: I) => Effect.Effect<A, E, R> | void
  ) => Effect.Effect<void, WorkerError, R>
  readonly send: (portId: number, message: O, transfers?: ReadonlyArray<unknown>) => Effect.Effect<void>
  readonly sendUnsafe: (portId: number, message: O, transfers?: ReadonlyArray<unknown>) => void
  readonly disconnects?: Queue.Dequeue<number> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerRunner.ts#L23)

Since v4.0.0

## WorkerRunnerPlatform (class)

Context service that starts a platform-specific `WorkerRunner`.

**Signature**

```ts
declare class WorkerRunnerPlatform
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerRunner.ts#L55)

Since v4.0.0
