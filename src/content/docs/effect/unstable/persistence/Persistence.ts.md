---
title: Persistence.ts
nav_order: 296
parent: "effect"
---

## Persistence.ts overview

Stores encoded results for `Persistable` requests.

The `Persistence` service creates scoped stores keyed by each request's
`PrimaryKey`. Stores read and write schema-encoded `Exit` values with
optional TTLs, letting request workflows reuse expensive or idempotent results
across fibers, process restarts, or workers that share a backing store.

Since v4.0.0

---

## Exports Grouped by Category

- [BackingPersistence](#backingpersistence)
  - [BackingPersistence (class)](#backingpersistence-class)
  - [BackingPersistenceStore (interface)](#backingpersistencestore-interface)
- [converting](#converting)
  - [unsafeTtlToExpires](#unsafettltoexpires)
- [errors](#errors)
  - [PersistenceError (class)](#persistenceerror-class)
    - [[ErrorTypeId] (property)](#errortypeid-property)
- [layers](#layers)
  - [layer](#layer)
  - [layerBackingKvs](#layerbackingkvs)
  - [layerBackingMemory](#layerbackingmemory)
  - [layerBackingRedis](#layerbackingredis)
  - [layerBackingSql](#layerbackingsql)
  - [layerBackingSqlMultiTable](#layerbackingsqlmultitable)
  - [layerKvs](#layerkvs)
  - [layerMemory](#layermemory)
  - [layerRedis](#layerredis)
  - [layerSql](#layersql)
  - [layerSqlMultiTable](#layersqlmultitable)
- [models](#models)
  - [Persistence (class)](#persistence-class)
  - [PersistenceStore (interface)](#persistencestore-interface)

---

# BackingPersistence

## BackingPersistence (class)

Service for creating raw backing stores for persistence store ids.

**Signature**

```ts
declare class BackingPersistence
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L103)

Since v4.0.0

## BackingPersistenceStore (interface)

Raw persistence backing store for JSON-compatible objects with optional
TTLs.

**Signature**

```ts
export interface BackingPersistenceStore {
  readonly get: (key: string) => Effect.Effect<object | undefined, PersistenceError>
  readonly getMany: (
    keys: Arr.NonEmptyArray<string>
  ) => Effect.Effect<Arr.NonEmptyArray<object | undefined>, PersistenceError>
  readonly set: (
    key: string,
    value: object,
    ttl: Duration.Duration | undefined
  ) => Effect.Effect<void, PersistenceError>
  readonly setMany: (
    entries: Arr.NonEmptyArray<readonly [key: string, value: object, ttl: Duration.Duration | undefined]>
  ) => Effect.Effect<void, PersistenceError>
  readonly remove: (key: string) => Effect.Effect<void, PersistenceError>
  readonly clear: Effect.Effect<void, PersistenceError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L114)

Since v4.0.0

# converting

## unsafeTtlToExpires

Converts a TTL to an absolute expiration timestamp in milliseconds.

**Details**

Returns `null` for no TTL and uses `clock.currentTimeMillisUnsafe`, so it is
intended for backing-store internals.

**Signature**

```ts
declare const unsafeTtlToExpires: (clock: Clock.Clock, ttl: Duration.Duration | undefined) => number | null
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L1070)

Since v4.0.0

# errors

## PersistenceError (class)

Error raised by persistence and backing-store operations.

**Signature**

```ts
declare class PersistenceError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L36)

Since v4.0.0

### [ErrorTypeId] (property)

Marks this value as a persistence error for runtime guards.

**Signature**

```ts
readonly [ErrorTypeId]: "~effect/persistence/Persistence/PersistenceError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L46)

Since v4.0.0

# layers

## layer

Provides `Persistence` from `BackingPersistence`.

**Details**

The layer serializes and deserializes `Persistable` exits, applies
per-entry TTLs, and skips writes whose TTL is zero or negative.

**Signature**

```ts
declare const layer: Layer.Layer<Persistence, never, BackingPersistence>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L142)

Since v4.0.0

## layerBackingKvs

Provides `BackingPersistence` using a `KeyValueStore`.

**Details**

Each store id becomes a key prefix, and values are stored as JSON with
optional expiration timestamps.

**Signature**

```ts
declare const layerBackingKvs: Layer.Layer<BackingPersistence, never, KeyValueStore.KeyValueStore>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L917)

Since v4.0.0

## layerBackingMemory

Provides an in-memory `BackingPersistence` grouped by store id.

**Details**

Entries are process-local and expire according to their stored TTL.

**Signature**

```ts
declare const layerBackingMemory: Layer.Layer<BackingPersistence, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L242)

Since v4.0.0

## layerBackingRedis

Provides Redis-backed persistence.

**Details**

Each store id is used as a key prefix, values are JSON-encoded, and finite
TTLs are stored with Redis expiration.

**Signature**

```ts
declare const layerBackingRedis: Layer.Layer<BackingPersistence, never, Redis.Redis>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L756)

Since v4.0.0

## layerBackingSql

Provides SQL-backed persistence using a shared `effect_persistence` table.

**Details**

Rows are partitioned by `store_id` and store JSON-encoded values with
optional expiration timestamps.

**Signature**

```ts
declare const layerBackingSql: Layer.Layer<BackingPersistence, never, SqlClient.SqlClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L511)

Since v4.0.0

## layerBackingSqlMultiTable

Provides SQL-backed persistence using one table per store id.

**Details**

Each table is created if needed and stores JSON-encoded values with optional
expiration timestamps.

**Signature**

```ts
declare const layerBackingSqlMultiTable: Layer.Layer<BackingPersistence, never, SqlClient.SqlClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L296)

Since v4.0.0

## layerKvs

Provides `Persistence` backed by the current `KeyValueStore`.

**Signature**

```ts
declare const layerKvs: Layer.Layer<Persistence, never, KeyValueStore.KeyValueStore>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L1015)

Since v4.0.0

## layerMemory

Provides `Persistence` backed by process-local in-memory storage.

**Signature**

```ts
declare const layerMemory: Layer.Layer<Persistence, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L1025)

Since v4.0.0

## layerRedis

Provides `Persistence` backed by the current `Redis` service.

**Signature**

```ts
declare const layerRedis: Layer.Layer<Persistence, never, Redis.Redis>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L1035)

Since v4.0.0

## layerSql

Provides `Persistence` backed by SQL using a shared persistence table.

**Signature**

```ts
declare const layerSql: Layer.Layer<Persistence, never, SqlClient.SqlClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L1055)

Since v4.0.0

## layerSqlMultiTable

Provides `Persistence` backed by SQL with one table per store id.

**Signature**

```ts
declare const layerSqlMultiTable: Layer.Layer<Persistence, never, SqlClient.SqlClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L1045)

Since v4.0.0

# models

## Persistence (class)

Service for creating scoped stores of persisted `Persistable` request
results.

**Signature**

```ts
declare class Persistence
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L56)

Since v4.0.0

## PersistenceStore (interface)

Typed store for persisted `Exit` values keyed by `Persistable` requests.

**Signature**

```ts
export interface PersistenceStore {
  readonly get: <A extends Schema.Constraint, E extends Schema.Constraint>(
    key: Persistable.Persistable<A, E>
  ) => Effect.Effect<
    Exit.Exit<A["Type"], E["Type"]> | undefined,
    PersistenceError | Schema.SchemaError,
    A["DecodingServices"] | E["DecodingServices"]
  >
  readonly getMany: <A extends Schema.Constraint, E extends Schema.Constraint>(
    keys: Iterable<Persistable.Persistable<A, E>>
  ) => Effect.Effect<
    Array<Exit.Exit<A["Type"], E["Type"]> | undefined>,
    PersistenceError | Schema.SchemaError,
    A["DecodingServices"] | E["DecodingServices"]
  >
  readonly set: <A extends Schema.Constraint, E extends Schema.Constraint>(
    key: Persistable.Persistable<A, E>,
    value: Exit.Exit<A["Type"], E["Type"]>
  ) => Effect.Effect<void, PersistenceError | Schema.SchemaError, A["EncodingServices"] | E["EncodingServices"]>
  readonly setMany: <A extends Schema.Constraint, E extends Schema.Constraint>(
    entries: Iterable<readonly [Persistable.Persistable<A, E>, Exit.Exit<A["Type"], E["Type"]>]>
  ) => Effect.Effect<void, PersistenceError | Schema.SchemaError, A["EncodingServices"] | E["EncodingServices"]>
  readonly remove: <A extends Schema.Constraint, E extends Schema.Constraint>(
    key: Persistable.Persistable<A, E>
  ) => Effect.Effect<void, PersistenceError>
  readonly clear: Effect.Effect<void, PersistenceError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistence.ts#L69)

Since v4.0.0
