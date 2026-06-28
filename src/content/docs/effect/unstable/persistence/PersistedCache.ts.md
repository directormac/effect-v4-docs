---
title: PersistedCache.ts
nav_order: 294
parent: "effect"
---

## PersistedCache.ts overview

Combines in-memory caching with durable storage for `Persistable` requests.

A `PersistedCache` checks a process-local `Cache`, then a named `Persistence`
store, before running the supplied lookup. It stores the lookup `Exit`, so
expensive or idempotent results can be reused across fibers, process restarts,
or workers that share the same backing store.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [PersistedCache (interface)](#persistedcache-interface)

---

# constructors

## make

Creates a persisted cache for `Persistable` request keys.

**Details**

The cache reads persisted exits before running the lookup, stores lookup
exits with the configured persistent TTL, and also keeps a scoped in-memory
cache with its own capacity and TTL.

**Signature**

```ts
declare const make: <K extends Persistable.Any, R = never, ServiceMode extends "lookup" | "construction" = never>(
  lookup: (key: K) => Effect.Effect<Persistable.Success<K>, Persistable.Error<K>, R>,
  options: {
    readonly storeId: string
    readonly timeToLive: Persistable.TimeToLiveFn<K>
    readonly inMemoryCapacity?: number | undefined
    readonly inMemoryTTL?: Persistable.TimeToLiveFn<K> | undefined
    readonly requireServicesAt?: ServiceMode | undefined
  }
) => Effect.Effect<
  PersistedCache<K, "lookup" extends ServiceMode ? R : never>,
  never,
  ("lookup" extends ServiceMode ? never : R) | Persistence.Persistence | Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedCache.ts#L57)

Since v4.0.0

# models

## PersistedCache (interface)

Cache that combines an in-memory `Cache` with a persisted backing store.

**Signature**

```ts
export interface PersistedCache<K extends Persistable.Any, out R = never> {
  readonly [TypeId]: typeof TypeId
  readonly inMemory: Cache.Cache<
    K,
    Persistable.Success<K>,
    Persistable.Error<K> | Persistence.PersistenceError | Schema.SchemaError,
    Persistable.Services<K> | R
  >
  readonly get: (
    key: K
  ) => Effect.Effect<
    Persistable.Success<K>,
    Persistable.Error<K> | Persistence.PersistenceError | Schema.SchemaError,
    Persistable.Services<K> | R
  >
  readonly invalidate: (key: K) => Effect.Effect<void, Persistence.PersistenceError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/PersistedCache.ts#L29)

Since v4.0.0
