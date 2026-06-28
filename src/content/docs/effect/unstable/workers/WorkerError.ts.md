---
title: WorkerError.ts
nav_order: 343
parent: "effect"
---

## WorkerError.ts overview

Typed error model for worker APIs.

This module defines the `WorkerError` wrapper, the reason variants for spawn,
send, receive, and unknown worker failures, a schema union for those reasons,
and a guard for recognizing worker errors at runtime.

Since v4.0.0

---

## Exports Grouped by Category

- [guards](#guards)
  - [isWorkerError](#isworkererror)
- [models](#models)
  - [WorkerError (class)](#workererror-class)
    - [[TypeId] (property)](#typeid-property)
  - [WorkerErrorReason](#workererrorreason)
  - [WorkerErrorReason (type alias)](#workererrorreason-type-alias)
  - [WorkerReceiveError (class)](#workerreceiveerror-class)
  - [WorkerSendError (class)](#workersenderror-class)
  - [WorkerSpawnError (class)](#workerspawnerror-class)
  - [WorkerUnknownError (class)](#workerunknownerror-class)
- [type IDs](#type-ids)
  - [TypeId (type alias)](#typeid-type-alias)

---

# guards

## isWorkerError

Returns `true` when a value is a `WorkerError`.

**Signature**

```ts
declare const isWorkerError: (u: unknown) => u is WorkerError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerError.ts#L29)

Since v4.0.0

# models

## WorkerError (class)

Error raised by worker APIs, wrapping a specific `WorkerErrorReason` and
exposing its message and cause.

**Signature**

```ts
declare class WorkerError {
  constructor(props: { readonly reason: WorkerErrorReason })
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerError.ts#L125)

Since v4.0.0

### [TypeId] (property)

Marks this value as a worker error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/workers/WorkerError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerError.ts#L143)

Since v4.0.0

## WorkerErrorReason

Schema for decoding and encoding all supported worker error reason variants.

**Signature**

```ts
declare const WorkerErrorReason: Schema.Union<
  [typeof WorkerSpawnError, typeof WorkerSendError, typeof WorkerReceiveError, typeof WorkerUnknownError]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerError.ts#L106)

Since v4.0.0

## WorkerErrorReason (type alias)

Union of the specific failure reasons that can be wrapped by a `WorkerError`.

**Signature**

```ts
type WorkerErrorReason = WorkerSpawnError | WorkerSendError | WorkerReceiveError | WorkerUnknownError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerError.ts#L94)

Since v4.0.0

## WorkerReceiveError (class)

Worker error reason for failures while receiving or handling a message from a
worker.

**Signature**

```ts
declare class WorkerReceiveError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerError.ts#L66)

Since v4.0.0

## WorkerSendError (class)

Worker error reason for failures while sending a message to a worker.

**Signature**

```ts
declare class WorkerSendError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerError.ts#L51)

Since v4.0.0

## WorkerSpawnError (class)

Worker error reason for failures while spawning or setting up a worker.

**Signature**

```ts
declare class WorkerSpawnError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerError.ts#L37)

Since v4.0.0

## WorkerUnknownError (class)

Worker error reason for an unclassified worker failure.

**Signature**

```ts
declare class WorkerUnknownError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerError.ts#L80)

Since v4.0.0

# type IDs

## TypeId (type alias)

Type-level identifier used to brand `WorkerError` values.

**Signature**

```ts
type TypeId = typeof TypeId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/WorkerError.ts#L21)

Since v4.0.0
