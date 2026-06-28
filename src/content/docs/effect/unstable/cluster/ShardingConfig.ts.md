---
title: ShardingConfig.ts
nav_order: 201
parent: "effect"
---

## ShardingConfig.ts overview

Configures how an Effect Cluster runner participates in sharding.

`ShardingConfig` describes the runner address, shard group membership, shard
counts and weights, lock timing, entity mailbox and lifecycle limits, polling
intervals, health checks, and local serialization simulation. This module
includes the service, default values, programmatic and environment-based
layers, a `Config` description for loading values, and helpers for normalizing
assigned shard groups.

Since v4.0.0

---

## Exports Grouped by Category

- [Shard groups](#shard-groups)
  - [shardGroupConfig](#shardgroupconfig)
- [configuration](#configuration)
  - [config](#config)
  - [configFromEnv](#configfromenv)
- [defaults](#defaults)
  - [defaults](#defaults-1)
  - [layerDefaults](#layerdefaults)
- [layers](#layers)
  - [layer](#layer)
  - [layerFromEnv](#layerfromenv)
- [models](#models)
  - [ShardingConfig (class)](#shardingconfig-class)

---

# Shard groups

## shardGroupConfig

Normalizes the provided `ShardingConfig` to calculate the `available` and
`assigned` shard groups.

**Signature**

```ts
declare const shardGroupConfig: (config: ShardingConfig["Service"]) => {
  readonly available: ReadonlySet<string>
  readonly assigned: ReadonlySet<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingConfig.ts#L355)

Since v4.0.0

# configuration

## config

Describes how to load `ShardingConfig` values, applying the same
defaults used by the in-memory `defaults` object.

**Signature**

```ts
declare const config: Config.Config<{
  readonly runnerAddress: Option.Option<RunnerAddress>
  readonly runnerListenAddress: Option.Option<RunnerAddress>
  readonly runnerShardWeight: number
  readonly availableShardGroups: ReadonlyArray<string>
  readonly assignedShardGroups: ReadonlyArray<string>
  readonly shardsPerGroup: number
  readonly shardLockRefreshInterval: Duration.Input
  readonly shardLockExpiration: Duration.Input
  readonly shardLockDisableAdvisory: boolean
  readonly preemptiveShutdown: boolean
  readonly entityMailboxCapacity: number | "unbounded"
  readonly entityMaxIdleTime: Duration.Input
  readonly entityRegistrationTimeout: Duration.Input
  readonly entityTerminationTimeout: Duration.Input
  readonly entityMessagePollInterval: Duration.Input
  readonly entityReplyPollInterval: Duration.Input
  readonly refreshAssignmentsInterval: Duration.Input
  readonly sendRetryInterval: Duration.Input
  readonly runnerHealthCheckInterval: Duration.Input
  readonly simulateRemoteSerialization: boolean
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingConfig.ts#L221)

Since v4.0.0

## configFromEnv

Effect that loads `ShardingConfig` from environment variables using the
constant-case config provider.

**Signature**

```ts
declare const configFromEnv: Effect.Effect<
  {
    readonly runnerAddress: Option.Option<RunnerAddress>
    readonly runnerListenAddress: Option.Option<RunnerAddress>
    readonly runnerShardWeight: number
    readonly availableShardGroups: ReadonlyArray<string>
    readonly assignedShardGroups: ReadonlyArray<string>
    readonly shardsPerGroup: number
    readonly shardLockRefreshInterval: Duration.Input
    readonly shardLockExpiration: Duration.Input
    readonly shardLockDisableAdvisory: boolean
    readonly preemptiveShutdown: boolean
    readonly entityMailboxCapacity: number | "unbounded"
    readonly entityMaxIdleTime: Duration.Input
    readonly entityRegistrationTimeout: Duration.Input
    readonly entityTerminationTimeout: Duration.Input
    readonly entityMessagePollInterval: Duration.Input
    readonly entityReplyPollInterval: Duration.Input
    readonly refreshAssignmentsInterval: Duration.Input
    readonly sendRetryInterval: Duration.Input
    readonly runnerHealthCheckInterval: Duration.Input
    readonly simulateRemoteSerialization: boolean
  },
  Config.ConfigError,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingConfig.ts#L324)

Since v4.0.0

# defaults

## defaults

Default values for `ShardingConfig`, including the default local runner address,
shard group, shard count, mailbox settings, polling intervals, and remote
serialization simulation.

**Signature**

```ts
declare const defaults: {
  readonly runnerAddress: Option.Option<RunnerAddress>
  readonly runnerListenAddress: Option.Option<RunnerAddress>
  readonly runnerShardWeight: number
  readonly availableShardGroups: ReadonlyArray<string>
  readonly assignedShardGroups: ReadonlyArray<string>
  readonly shardsPerGroup: number
  readonly shardLockRefreshInterval: Duration.Input
  readonly shardLockExpiration: Duration.Input
  readonly shardLockDisableAdvisory: boolean
  readonly preemptiveShutdown: boolean
  readonly entityMailboxCapacity: number | "unbounded"
  readonly entityMaxIdleTime: Duration.Input
  readonly entityRegistrationTimeout: Duration.Input
  readonly entityTerminationTimeout: Duration.Input
  readonly entityMessagePollInterval: Duration.Input
  readonly entityReplyPollInterval: Duration.Input
  readonly refreshAssignmentsInterval: Duration.Input
  readonly sendRetryInterval: Duration.Input
  readonly runnerHealthCheckInterval: Duration.Input
  readonly simulateRemoteSerialization: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingConfig.ts#L150)

Since v4.0.0

## layerDefaults

Layer that provides the default `ShardingConfig` values.

**Signature**

```ts
declare const layerDefaults: Layer.Layer<ShardingConfig, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingConfig.ts#L212)

Since v4.0.0

# layers

## layer

Creates a `ShardingConfig` layer by merging the provided partial options over
`defaults`.

**When to use**

Use when you need to wire a cluster runner with explicit `ShardingConfig`
values, especially in tests, local development, or code paths where
configuration should be provided programmatically instead of loaded from
environment variables.

**Details**

The merge is shallow: omitted fields use `defaults`, and provided fields
replace the corresponding default value.

**Gotchas**

This layer only merges and provides configuration; it does not check that
cluster-wide settings are consistent across runners. Keep values such as
`shardsPerGroup` and `availableShardGroups` aligned for runners that should
share shard assignments.

**See**

- `defaults` for the values used when an option is omitted
- `layerDefaults` for a layer with no overrides
- `layerFromEnv` for loading configuration from environment variables before applying explicit overrides

**Signature**

```ts
declare const layer: (options?: Partial<ShardingConfig["Service"]>) => Layer.Layer<ShardingConfig>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingConfig.ts#L203)

Since v4.0.0

## layerFromEnv

Layer that loads `ShardingConfig` from environment variables and, when options
are provided, overlays those options on top of the loaded values.

**Signature**

```ts
declare const layerFromEnv: (
  options?: Partial<ShardingConfig["Service"]> | undefined
) => Layer.Layer<ShardingConfig, Config.ConfigError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingConfig.ts#L340)

Since v4.0.0

# models

## ShardingConfig (class)

Represents the configuration for the `Sharding` service on a given runner.

**Signature**

```ts
declare class ShardingConfig
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingConfig.ts#L29)

Since v4.0.0
