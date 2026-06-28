---
title: ClusterCron.ts
nav_order: 172
parent: "effect"
---

## ClusterCron.ts overview

Runs recurring cron jobs through cluster sharding.

This module turns a `Cron.Cron` schedule into a `Layer` that coordinates one
recurring job across a cluster. It registers a singleton for the initial
scheduling step and a persisted entity message for each run. This is useful
for distributed maintenance work where the job should be owned by the cluster
rather than by every runner independently.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)

---

# constructors

## make

Creates a layer that runs a cron job through the cluster sharding system.

**Details**

The job is scheduled as persisted entity messages, with an initial singleton
scheduling step and optional controls for shard group, next-run calculation,
and skipping stale scheduled runs.

**Signature**

```ts
declare const make: <E, R>(options: {
  readonly name: string
  readonly cron: Cron.Cron
  readonly execute: Effect.Effect<void, E, R>
  readonly shardGroup?: string | undefined
  readonly calculateNextRunFromPrevious?: boolean | undefined
  readonly skipIfOlderThan?: Duration.Input | undefined
}) => Layer.Layer<never, never, Sharding | Exclude<R, Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterCron.ts#L43)

Since v4.0.0
