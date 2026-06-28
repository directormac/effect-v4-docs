---
title: ClusterMetrics.ts
nav_order: 174
parent: "effect"
---

## ClusterMetrics.ts overview

Standard metric definitions used by the unstable cluster runtime. The gauges
track runner-local entities, singleton processes, registered runners,
healthy runners, and acquired shards.

This module only defines the metric handles. The runtime components that
manage entities, runners, singletons, and sharding update these gauges while
the cluster is running.

Since v4.0.0

---

## Exports Grouped by Category

- [metrics](#metrics)
  - [entities](#entities)
  - [runners](#runners)
  - [runnersHealthy](#runnershealthy)
  - [shards](#shards)
  - [singletons](#singletons)

---

# metrics

## entities

Creates a gauge tracking the number of active entity instances for each entity type on
the current runner.

**When to use**

Use when instrumenting runner-local entity counts and tagging them by entity
type for cluster dashboards.

**Details**

Bigint gauge named `effect_cluster_entities`, updated with the entity type as
a metric tag.

**Gotchas**

This gauge is runner-local and sampled by the entity manager loop. Aggregate
across runners and expect up to roughly one polling interval of lag.

**See**

- `singletons` for singleton process counts on the current runner
- `shards` for shard ownership on the current runner

**Signature**

```ts
declare const entities: Metric.Gauge<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterMetrics.ts#L39)

Since v4.0.0

## runners

Represents a gauge tracking the number of registered cluster runners.

**When to use**

Use to monitor the registered runners currently known to the cluster runtime.

**Gotchas**

The value can lag briefly during membership changes or failure detection.

**See**

- `runnersHealthy` for the healthy-runner subset

**Signature**

```ts
declare const runners: Metric.Gauge<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterMetrics.ts#L66)

Since v4.0.0

## runnersHealthy

Represents a gauge tracking the number of cluster runners currently considered healthy.

**When to use**

Use to monitor the healthy subset of registered cluster runners.

**Details**

Bigint gauge named `effect_cluster_runners_healthy`.

**Gotchas**

The value reflects the runtime's health-check view and can lag during
membership changes or failure detection.

**See**

- `runners` for the total registered-runner gauge

**Signature**

```ts
declare const runnersHealthy: Metric.Gauge<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterMetrics.ts#L89)

Since v4.0.0

## shards

Represents a gauge tracking the number of shards currently acquired by the current runner.

**When to use**

Use to observe shard ownership held by the current runner during startup,
rebalancing, or failover.

**Details**

Bigint gauge named `effect_cluster_shards`, updated from the sharding
acquisition loop using the current acquired shard count.

**Gotchas**

This is runner-local, not a cluster-wide shard total. Aggregate per-runner
values carefully.

**Signature**

```ts
declare const shards: Metric.Gauge<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterMetrics.ts#L112)

Since v4.0.0

## singletons

Creates a gauge tracking the number of singleton processes currently running on the
current runner.

**Signature**

```ts
declare const singletons: Metric.Gauge<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ClusterMetrics.ts#L48)

Since v4.0.0
