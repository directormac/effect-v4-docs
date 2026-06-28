---
title: RunnerStorage.ts
nav_order: 198
parent: "effect"
---

## RunnerStorage.ts overview

Stores runner registration and shard-lock state for cluster sharding.

`RunnerStorage` records which runners are registered, whether they are
healthy, which machine id a runner receives, and which shard locks are held
by each runner. This module includes the typed storage service, a
string-encoded backend interface, an adapter from encoded storage to the typed
service, and an in-memory implementation for tests and local use.

Since v4.0.0

---

## Exports Grouped by Category

- [Encoded](#encoded)
  - [Encoded (interface)](#encoded-interface)
- [constructors](#constructors)
  - [makeMemory](#makememory)
- [layers](#layers)
  - [layerMemory](#layermemory)
  - [makeEncoded](#makeencoded)
- [models](#models)
  - [RunnerStorage (class)](#runnerstorage-class)

---

# Encoded

## Encoded (interface)

String-encoded runner storage interface used by adapters that persist runner
addresses, runners, machine ids, and shard ids outside the in-memory model.

**Signature**

```ts
export interface Encoded {
  /**
   * Get all runners registered with the cluster.
   */
  readonly getRunners: Effect.Effect<Array<readonly [runner: string, healthy: boolean]>, PersistenceError>

  /**
   * Register a new runner with the cluster.
   */
  readonly register: (address: string, runner: string, healthy: boolean) => Effect.Effect<number, PersistenceError>

  /**
   * Unregister the runner with the given address.
   */
  readonly unregister: (address: string) => Effect.Effect<void, PersistenceError>

  /**
   * Set the health status of the given runner.
   */
  readonly setRunnerHealth: (address: string, healthy: boolean) => Effect.Effect<void, PersistenceError>

  /**
   * Acquire the lock on the given shards, returning the shards that were
   * successfully locked.
   */
  readonly acquire: (address: string, shardIds: NonEmptyArray<string>) => Effect.Effect<Array<string>, PersistenceError>

  /**
   * Refresh the lock on the given shards, returning the shards that were
   * successfully locked.
   */
  readonly refresh: (address: string, shardIds: Array<string>) => Effect.Effect<ReadonlyArray<string>, PersistenceError>

  /**
   * Release the lock on the given shard.
   */
  readonly release: (address: string, shardId: string) => Effect.Effect<void, PersistenceError>

  /**
   * Release the lock on all shards for the given runner.
   */
  readonly releaseAll: (address: string) => Effect.Effect<void, PersistenceError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerStorage.ts#L90)

Since v4.0.0

# constructors

## makeMemory

Creates an in-memory `RunnerStorage` implementation for tests and local use.

**Details**

Registered runners are treated as healthy and shard acquisition is kept only in
process memory.

**Signature**

```ts
declare const makeMemory: Effect.Effect<
  {
    readonly register: (runner: Runner, healthy: boolean) => Effect.Effect<MachineId.MachineId, PersistenceError>
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
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerStorage.ts#L204)

Since v4.0.0

# layers

## layerMemory

Layer that provides the in-memory `RunnerStorage` implementation.

**Signature**

```ts
declare const layerMemory: Layer.Layer<RunnerStorage, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerStorage.ts#L237)

Since v4.0.0

## makeEncoded

Adapts an encoded runner storage implementation into `RunnerStorage`, converting
runner addresses, runners, machine ids, and shard ids between typed values and
their string or numeric storage forms.

**Signature**

```ts
declare const makeEncoded: (encoded: Encoded) => {
  readonly register: (runner: Runner, healthy: boolean) => Effect.Effect<MachineId.MachineId, PersistenceError>
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
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerStorage.ts#L151)

Since v4.0.0

# models

## RunnerStorage (class)

Represents a generic interface to the persistent storage required by the
cluster.

**Signature**

```ts
declare class RunnerStorage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerStorage.ts#L30)

Since v4.0.0
