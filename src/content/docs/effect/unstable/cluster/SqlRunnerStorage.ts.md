---
title: SqlRunnerStorage.ts
nav_order: 209
parent: "effect"
---

## SqlRunnerStorage.ts overview

Stores cluster runner registration and shard ownership in SQL.

The SQL-backed `RunnerStorage` records runners, health flags, machine ids,
and shard locks so multiple processes can coordinate which runner owns each
shard. This module creates the required runner and lock tables, supports an
optional table prefix, uses advisory locks for PostgreSQL and MySQL when
enabled, and provides constructors and layers for the storage service.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerWith](#layerwith)

---

# constructors

## make

Creates a SQL-backed `RunnerStorage` implementation for registered runners and
shard locks, using the configured table prefix and advisory locks where
supported and enabled.

**When to use**

Use to create a SQL-backed `RunnerStorage` value directly when building
custom service or layer composition around the storage implementation.

**Details**

When `prefix` is omitted, `make` uses the `cluster` prefix, creating
`cluster_runners` and `cluster_locks`. PostgreSQL and MySQL use advisory
locks unless `ShardingConfig.shardLockDisableAdvisory` is enabled; other
dialects use rows in the locks table.

**Gotchas**

Changing `prefix` changes both generated table names, so runners using
different prefixes do not share registrations or shard locks.

**See**

- `layer` for the default SQL-backed storage layer
- `layerWith` for a SQL-backed storage layer with a custom table prefix

**Signature**

```ts
declare const make: (options: {
  readonly prefix?: string | undefined
}) => Effect.Effect<
  {
    readonly register: (runner: Runner, healthy: boolean) => Effect.Effect<MachineId, PersistenceError>
    readonly unregister: (address: RunnerAddress) => Effect.Effect<void, PersistenceError>
    readonly getRunners: Effect.Effect<Array<readonly [runner: Runner, healthy: boolean]>, PersistenceError>
    readonly setRunnerHealth: (address: RunnerAddress, healthy: boolean) => Effect.Effect<void, PersistenceError>
    readonly acquire: (
      address: RunnerAddress,
      shardIds: Iterable<ShardId.ShardId>
    ) => Effect.Effect<Array<ShardId.ShardId>, PersistenceError>
    readonly refresh: (
      address: RunnerAddress,
      shardIds: Iterable<ShardId.ShardId>
    ) => Effect.Effect<Array<ShardId.ShardId>, PersistenceError>
    readonly release: (address: RunnerAddress, shardId: ShardId.ShardId) => Effect.Effect<void, PersistenceError>
    readonly releaseAll: (address: RunnerAddress) => Effect.Effect<void, PersistenceError>
  },
  SqlError,
  Scope.Scope | SqlClient.SqlClient | ShardingConfig.ShardingConfig
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlRunnerStorage.ts#L56)

Since v4.0.0

# layers

## layer

Layer that provides SQL-backed `RunnerStorage` using the default table prefix.

**Signature**

```ts
declare const layer: Layer.Layer<
  RunnerStorage.RunnerStorage,
  SqlError,
  SqlClient.SqlClient | ShardingConfig.ShardingConfig
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlRunnerStorage.ts#L685)

Since v4.0.0

## layerWith

Layer that provides SQL-backed `RunnerStorage` using a custom table prefix.

**Signature**

```ts
declare const layerWith: (options: {
  readonly prefix?: string | undefined
}) => Layer.Layer<RunnerStorage.RunnerStorage, SqlError, SqlClient.SqlClient | ShardingConfig.ShardingConfig>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlRunnerStorage.ts#L697)

Since v4.0.0
