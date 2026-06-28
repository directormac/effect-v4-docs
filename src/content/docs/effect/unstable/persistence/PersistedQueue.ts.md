---
title: PersistedQueue.ts
nav_order: 295
parent: "effect"
---

## PersistedQueue.ts overview

Stores schema-encoded queue work in persistent storage.

A `PersistedQueue<A>` keeps JSON-encoded values in a named queue and lets
workers take one value at a time inside a scoped processing window. It is
useful for durable handoffs, background jobs, outbox-style integrations, and
work that should retry across fibers, process restarts, or multiple workers.
This module includes a queue factory, store service, id-based de-duplication,
retry handling, and in-memory, Redis, and SQL-backed store layers.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [make](#make)
- [constructors](#constructors)
  - [makeFactory](#makefactory)
- [errors](#errors)
  - [PersistedQueueError (class)](#persistedqueueerror-class)
    - [[ErrorTypeId] (property)](#errortypeid-property)
- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [PersistedQueue (interface)](#persistedqueue-interface)
- [services](#services)
  - [PersistedQueueFactory (class)](#persistedqueuefactory-class)
- [store](#store)
  - [PersistedQueueStore (class)](#persistedqueuestore-class)
  - [layerStoreMemory](#layerstorememory)
  - [layerStoreRedis](#layerstoreredis)
  - [layerStoreSql](#layerstoresql)
  - [makeStoreRedis](#makestoreredis)
  - [makeStoreSql](#makestoresql)
- [type IDs](#type-ids)
  - [ErrorTypeId](#errortypeid)
  - [ErrorTypeId (type alias)](#errortypeid-type-alias)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# accessors

## make

Accesses `PersistedQueueFactory` to create a named persisted queue for a
schema.

**Signature**

```ts
declare const make: <S extends Schema.Constraint>(options: {
  readonly name: string
  readonly schema: S
}) => Effect.Effect<
  PersistedQueue<S["Type"], S["EncodingServices"] | S["DecodingServices"]>,
  never,
  PersistedQueueFactory
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L121)

Since v4.0.0

# constructors

## makeFactory

Creates a `PersistedQueueFactory` from the current `PersistedQueueStore`.

**Details**

Values are encoded and decoded with the supplied schema, automatically
assigned an id when needed, and acknowledged or retried according to the
`take` handler's exit.

**Signature**

```ts
declare const makeFactory: Effect.Effect<
  {
    readonly make: <S extends Schema.Constraint>(options: {
      readonly name: string
      readonly schema: S
    }) => Effect.Effect<PersistedQueue<S["Type"], S["EncodingServices"] | S["DecodingServices"]>>
  },
  never,
  PersistedQueueStore
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L142)

Since v4.0.0

# errors

## PersistedQueueError (class)

Error raised by persisted queue store operations.

**Signature**

```ts
declare class PersistedQueueError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L226)

Since v4.0.0

### [ErrorTypeId] (property)

Marks this value as a persisted queue error for runtime guards.

**Signature**

```ts
readonly [ErrorTypeId]: "~@effect/experimental/PersistedQueue/PersistedQueueError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L238)

Since v4.0.0

# layers

## layer

Provides `PersistedQueueFactory` using the current `PersistedQueueStore`.

**Signature**

```ts
declare const layer: Layer.Layer<PersistedQueueFactory, never, PersistedQueueStore>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L198)

Since v4.0.0

# models

## PersistedQueue (interface)

Persistent queue of schema-encoded values.

**Details**

`offer` enqueues values by id, and `take` processes one value at a time,
marking it complete on success or retrying it until the maximum attempts is
reached.

**Signature**

```ts
export interface PersistedQueue<in out A, out R = never> {
  readonly [TypeId]: TypeId

  /**
   * Adds an element to the queue and returns the id of the enqueued element.
   *
   * **Details**
   *
   * If an element with the same id already exists in the queue, it will not be
   * added again.
   */
  readonly offer: (
    value: A,
    options?: {
      readonly id: string | undefined
    }
  ) => Effect.Effect<string, PersistedQueueError | Schema.SchemaError, R>

  /**
   * Takes an element from the queue, waiting until one is available when the
   * queue is empty.
   *
   * **Details**
   *
   * If the returned effect succeeds, the element is marked as processed;
   * otherwise it will be retried according to the provided options. By default,
   * max attempts is set to 10.
   */
  readonly take: <XA, XE, XR>(
    f: (
      value: A,
      metadata: {
        readonly id: string
        readonly attempts: number
      }
    ) => Effect.Effect<XA, XE, XR>,
    options?: {
      readonly maxAttempts?: number | undefined
    }
  ) => Effect.Effect<XA, XE | PersistedQueueError | Schema.SchemaError, R | XR>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L62)

Since v4.0.0

# services

## PersistedQueueFactory (class)

Service for constructing named `PersistedQueue` instances from schemas.

**Signature**

```ts
declare class PersistedQueueFactory
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L104)

Since v4.0.0

# store

## PersistedQueueStore (class)

Defines the low-level backing store service used by `PersistedQueue`.

**When to use**

Use to provide the persistence backend that stores queued elements, scoped
takes, retry attempts, and acknowledgements.

**Details**

The store persists offered elements and returns taken elements in a scope so
the finalizer can complete or retry them based on the processing exit.

**Signature**

```ts
declare class PersistedQueueStore
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L257)

Since v4.0.0

## layerStoreMemory

Provides an in-memory `PersistedQueueStore`.

**Details**

The store is process-local and volatile; failed takes are requeued until the
configured maximum attempts is reached.

**Signature**

```ts
declare const layerStoreMemory: Layer.Layer<PersistedQueueStore, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L295)

Since v4.0.0

## layerStoreRedis

Provides a Redis-backed `PersistedQueueStore` using `makeStoreRedis`.

**Signature**

```ts
declare const layerStoreRedis: (
  options?:
    | {
        readonly prefix?: string | undefined
        readonly pollInterval?: Duration.Input | undefined
        readonly lockRefreshInterval?: Duration.Input | undefined
        readonly lockExpiration?: Duration.Input | undefined
      }
    | undefined
) => Layer.Layer<PersistedQueueStore, never, Redis.Redis>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L730)

Since v4.0.0

## layerStoreSql

Provides a SQL-backed `PersistedQueueStore` using `makeStoreSql`.

**Signature**

```ts
declare const layerStoreSql: (
  options?:
    | {
        readonly tableName?: string | undefined
        readonly pollInterval?: Duration.Input | undefined
        readonly lockRefreshInterval?: Duration.Input | undefined
        readonly lockExpiration?: Duration.Input | undefined
      }
    | undefined
) => Layer.Layer<PersistedQueueStore, SqlError, SqlClient.SqlClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L1185)

Since v4.0.0

## makeStoreRedis

Creates a Redis-backed `PersistedQueueStore`.

**Details**

The store uses Redis lists and hashes with worker locks, periodically
refreshes locks while items are being processed, and moves exhausted items
to a failed queue.

**Signature**

```ts
declare const makeStoreRedis: (
  options?:
    | {
        readonly prefix?: string | undefined
        readonly pollInterval?: Duration.Input | undefined
        readonly lockRefreshInterval?: Duration.Input | undefined
        readonly lockExpiration?: Duration.Input | undefined
      }
    | undefined
) => Effect.Effect<
  {
    readonly offer: (options: {
      readonly name: string
      readonly id: string
      readonly element: unknown
      readonly isCustomId: boolean
    }) => Effect.Effect<void, PersistedQueueError>
    readonly take: (options: {
      readonly name: string
      readonly maxAttempts: number
    }) => Effect.Effect<
      { readonly id: string; readonly attempts: number; readonly element: unknown },
      PersistedQueueError,
      Scope.Scope
    >
  },
  never,
  Scope.Scope | Redis.Redis
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L369)

Since v4.0.0

## makeStoreSql

Creates a SQL-backed `PersistedQueueStore`.

**Details**

The store creates the queue table and indexes, acquires rows with
per-worker locks, refreshes active locks while scoped takes are running, and
retries or completes rows according to the processing exit.

**Signature**

```ts
declare const makeStoreSql: (
  options?:
    | {
        readonly tableName?: string | undefined
        readonly pollInterval?: Duration.Input | undefined
        readonly lockRefreshInterval?: Duration.Input | undefined
        readonly lockExpiration?: Duration.Input | undefined
      }
    | undefined
) => Effect.Effect<PersistedQueueStore["Service"], SqlError, SqlClient.SqlClient | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L755)

Since v4.0.0

# type IDs

## ErrorTypeId

Runtime type identifier for `PersistedQueueError`.

**Signature**

```ts
declare const ErrorTypeId: "~@effect/experimental/PersistedQueue/PersistedQueueError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L210)

Since v4.0.0

## ErrorTypeId (type alias)

Type-level identifier used to brand `PersistedQueueError` values.

**Signature**

```ts
type ErrorTypeId = "~@effect/experimental/PersistedQueue/PersistedQueueError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L218)

Since v4.0.0

## TypeId

Runtime type identifier for `PersistedQueue` values.

**Signature**

```ts
declare const TypeId: "~effect/persistence/PersistedQueue"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L40)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to brand `PersistedQueue` values.

**Signature**

```ts
type TypeId = "~effect/persistence/PersistedQueue"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedQueue.ts#L48)

Since v4.0.0
