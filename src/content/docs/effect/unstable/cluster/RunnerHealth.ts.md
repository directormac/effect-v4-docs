---
title: RunnerHealth.ts
nav_order: 195
parent: "effect"
---

## RunnerHealth.ts overview

Checks whether cluster runners should be treated as alive.

`RunnerHealth` is used by sharding when deciding whether assigned shards can
stay on a runner or need to move elsewhere. This module includes the
health-check service, a no-op layer that always reports runners as alive, a
ping-based checker, and a Kubernetes-based checker that looks at pod readiness
for the runner host.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [makeK8s](#makek8s)
  - [makePing](#makeping)
- [layers](#layers)
  - [layerK8s](#layerk8s)
  - [layerNoop](#layernoop)
  - [layerPing](#layerping)
- [models](#models)
  - [RunnerHealth (class)](#runnerhealth-class)

---

# constructors

## makeK8s

Creates a `RunnerHealth` service that checks Kubernetes pod readiness for a
runner host, optionally scoped by namespace and label selector.

**Gotchas**

If the Kubernetes API check fails, the runner is treated as healthy.

**Signature**

```ts
declare const makeK8s: (
  options?: { readonly namespace?: string | undefined; readonly labelSelector?: string | undefined } | undefined
) => Effect.Effect<{ readonly isAlive: (address: RunnerAddress) => Effect.Effect<boolean> }, never, K8s.K8sHttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerHealth.ts#L105)

Since v4.0.0

## makePing

Creates a `RunnerHealth` service that pings runners through `Runners`, retrying
failed pings on a short schedule and treating a successful ping within the
timeout as healthy.

**Signature**

```ts
declare const makePing: Effect.Effect<
  { readonly isAlive: (address: RunnerAddress) => Effect.Effect<boolean> },
  never,
  Scope.Scope | Runners.Runners
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerHealth.ts#L63)

Since v4.0.0

# layers

## layerK8s

Layer that checks Kubernetes pod readiness to determine whether a runner is
healthy.

**Details**

The provided `HttpClient` must trust the pod CA certificate and the pod service
account must be allowed to list pods.

**Gotchas**

If the Kubernetes API check fails, the runner is treated as healthy.

**Signature**

```ts
declare const layerK8s: (
  options?: { readonly namespace?: string | undefined; readonly labelSelector?: string | undefined } | undefined
) => Layer.Layer<RunnerHealth, never, K8s.K8sHttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerHealth.ts#L136)

Since v4.0.0

## layerNoop

Layer that always considers a runner healthy.

**When to use**

Use when you need a runner-health layer for tests or local development where
active health checks are unnecessary.

**Signature**

```ts
declare const layerNoop: Layer.Layer<RunnerHealth, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerHealth.ts#L51)

Since v4.0.0

## layerPing

Layer that pings runners directly to check whether they are healthy.

**Signature**

```ts
declare const layerPing: Layer.Layer<RunnerHealth, never, Runners.Runners>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerHealth.ts#L88)

Since v4.0.0

# models

## RunnerHealth (class)

Represents the service used to check if a Runner is healthy.

**Details**

If a Runner is responsive, shards will not be re-assigned because the Runner may
still be processing messages. If a Runner is not responsive, then its
associated shards can and will be re-assigned to a different Runner.

**Signature**

```ts
declare class RunnerHealth
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerHealth.ts#L33)

Since v4.0.0
