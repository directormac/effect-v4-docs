---
title: EntityResource.ts
nav_order: 183
parent: "effect"
---

## EntityResource.ts overview

Keeps resources available across cluster entity restarts.

`EntityResource` is useful for long-lived resources tied to an entity
address, such as external processes, network clients, Kubernetes Pods, or
other handles that should survive routine shard movement. This module
includes the resource wrapper, a close scope that survives normal entity
restarts, a generic resource constructor, and a Kubernetes Pod resource
helper built on `K8sHttpClient`.

Since v4.0.0

---

## Exports Grouped by Category

- [Kubernetes](#kubernetes)
  - [makeK8sPod](#makek8spod)
- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [EntityResource (interface)](#entityresource-interface)
- [resource management](#resource-management)
  - [CloseScope (class)](#closescope-class)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# Kubernetes

## makeK8sPod

Creates an `EntityResource` backed by a Kubernetes Pod.

**Details**

The pod is created and waited on through `K8sHttpClient`, and is kept alive
until the resource is closed or its idle time to live expires.

**Signature**

```ts
declare const makeK8sPod: (
  spec: v1.Pod,
  options?: { readonly idleTimeToLive?: Duration.Input | undefined } | undefined
) => Effect.Effect<
  EntityResource<K8sHttpClient.PodStatus>,
  never,
  Scope.Scope | Sharding | Entity.CurrentAddress | K8sHttpClient.K8sHttpClient
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityResource.ts#L162)

Since v4.0.0

# constructors

## make

Creates an `EntityResource` that can be acquired inside a cluster entity.

**When to use**

Use when a cluster entity should lazily share an acquired resource across
messages and release it only on idle timeout or explicit close.

**Details**

The resource will only be fully released when the idle time to live is
reached, or when the `close` effect is called.

**Gotchas**

By default, the `idleTimeToLive` is infinite, meaning the resource will only
be released when `close` is called.

**Signature**

```ts
declare const make: <A, E, R>(options: {
  readonly acquire: Effect.Effect<A, E, R>
  readonly idleTimeToLive?: Duration.Input | undefined
  readonly acquireEagerly?: boolean | undefined
}) => Effect.Effect<EntityResource<A, E>, E, Scope.Scope | Exclude<R, CloseScope> | Sharding | Entity.CurrentAddress>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityResource.ts#L98)

Since v4.0.0

# models

## EntityResource (interface)

A resource acquired inside a cluster entity and kept alive across restarts.

**Details**

`get` acquires or reuses the resource in the caller's scope, while `close`
invalidates it so its close scope can be released.

**Signature**

```ts
export interface EntityResource<out A, out E = never> {
  readonly [TypeId]: TypeId
  readonly get: Effect.Effect<A, E, Scope.Scope>
  readonly close: Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityResource.ts#L51)

Since v4.0.0

# resource management

## CloseScope (class)

Context service for a Scope that is only closed when the resource is explicitly closed.

**When to use**

Use when a cluster entity resource needs a scope that survives restarts and
closes only through the resource lifecycle.

**Gotchas**

It is not closed during restarts, due to shard movement or node shutdowns.

**Signature**

```ts
declare class CloseScope
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityResource.ts#L72)

Since v4.0.0

# type IDs

## TypeId

Type identifier used to brand `EntityResource` values.

**Signature**

```ts
declare const TypeId: "~effect/cluster/EntityResource"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityResource.ts#L30)

Since v4.0.0

## TypeId (type alias)

Literal type of the `EntityResource` type identifier.

**Signature**

```ts
type TypeId = "~effect/cluster/EntityResource"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityResource.ts#L38)

Since v4.0.0
