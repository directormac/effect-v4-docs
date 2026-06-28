---
title: ShardingRegistrationEvent.ts
nav_order: 202
parent: "effect"
---

## ShardingRegistrationEvent.ts overview

The `ShardingRegistrationEvent` module models the live notifications emitted
by `Sharding` when the local runner registers an entity handler or singleton.
Consumers can use these events to wait for registrations during startup,
inspect which capabilities a runner made available, or assert registration
behavior in tests.

Since v4.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [EntityRegistered (interface)](#entityregistered-interface)
  - [ShardingRegistrationEvent (type alias)](#shardingregistrationevent-type-alias)
  - [SingletonRegistered (interface)](#singletonregistered-interface)
- [pattern matching](#pattern-matching)
  - [{](#)

---

# models

## EntityRegistered (interface)

Represents an event that occurs when a new entity is registered with a runner.

**Signature**

```ts
export interface EntityRegistered {
  readonly _tag: "EntityRegistered"
  readonly entity: Entity<any, any>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingRegistrationEvent.ts#L30)

Since v4.0.0

## ShardingRegistrationEvent (type alias)

Represents events that can occur when a runner registers entities or singletons.

**Signature**

```ts
type ShardingRegistrationEvent = EntityRegistered | SingletonRegistered
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingRegistrationEvent.ts#L20)

Since v4.0.0

## SingletonRegistered (interface)

Represents an event that occurs when a new singleton is registered with a
runner.

**Signature**

```ts
export interface SingletonRegistered {
  readonly _tag: "SingletonRegistered"
  readonly address: SingletonAddress
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingRegistrationEvent.ts#L42)

Since v4.0.0

# pattern matching

## {

/\*\*

- Pattern matches on a sharding registration event and dispatches to the
- matching variant handler.
-
- @category pattern matching
- @since 4.0.0
  \*/
  $match: match,
  /\*\*
- Creates an event for an entity registered by the local runner.
-
- @category constructors
- @since 4.0.0
  \*/
  EntityRegistered,
  /\*\*
- Creates an event for a singleton registered by the local runner.
-
- @category constructors
- @since 4.0.0
  \*/
  SingletonRegistered
  }

Constructors and matchers for sharding registration events.

**Signature**

```ts
declare const {
  /**
   * Pattern matches on a sharding registration event and dispatches to the
   * matching variant handler.
   *
   * @category pattern matching
   * @since 4.0.0
   */
  $match: match,
  /**
   * Creates an event for an entity registered by the local runner.
   *
   * @category constructors
   * @since 4.0.0
   */
  EntityRegistered,
  /**
   * Creates an event for a singleton registered by the local runner.
   *
   * @category constructors
   * @since 4.0.0
   */
  SingletonRegistered
}: any
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardingRegistrationEvent.ts#L53)

Since v4.0.0
