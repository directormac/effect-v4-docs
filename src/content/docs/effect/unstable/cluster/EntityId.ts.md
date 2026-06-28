---
title: EntityId.ts
nav_order: 180
parent: "effect"
---

## EntityId.ts overview

The `EntityId` module defines the branded string used to identify one entity
instance within an entity type. The value is the routing key that sharding
hashes, stores in entity addresses, and uses when sending messages to a
running entity.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [EntityId](#entityid)
  - [make](#make)
- [models](#models)
  - [EntityId (type alias)](#entityid-type-alias)

---

# constructors

## EntityId

Schema for branded string entity identifiers used inside the cluster.

**Signature**

```ts
declare const EntityId: Schema.brand<Schema.String, "~effect/cluster/EntityId">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityId.ts#L17)

Since v4.0.0

## make

Brands a string as an `EntityId`.

**When to use**

Use to turn a trusted, stable entity routing key into an `EntityId` before
passing it to cluster APIs.

**Details**

The branded value is the original string at runtime.

**Gotchas**

`make` does not validate, normalize, or make the value unique. Choose
deterministic strings because cluster routing hashes the exact entity id
value.

**See**

- `EntityId` for the schema that validates and encodes branded entity identifiers

**Signature**

```ts
declare const make: (id: string) => EntityId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityId.ts#L50)

Since v4.0.0

# models

## EntityId (type alias)

Branded string type representing the ID of an entity instance.

**Signature**

```ts
type EntityId = typeof EntityId.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityId.ts#L25)

Since v4.0.0
