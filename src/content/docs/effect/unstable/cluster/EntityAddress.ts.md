---
title: EntityAddress.ts
nav_order: 179
parent: "effect"
---

## EntityAddress.ts overview

The `EntityAddress` module defines the value used to locate an entity within
a cluster. An address combines the entity type, entity id, and shard id so
messages, persisted envelopes, workflow executions, and entity managers can
agree on the same routing target.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [EntityAddress (class)](#entityaddress-class)
    - [toString (method)](#tostring-method)
    - [[Equal.symbol] (method)](#equalsymbol-method)
    - [[Hash.symbol] (method)](#hashsymbol-method)
    - [[TypeId] (property)](#typeid-property)

---

# constructors

## make

Constructs an `EntityAddress` from a shard ID, entity type, and entity ID.

**When to use**

Use to create the routing target for a known entity type and entity id after
resolving that id to the `ShardId` assigned by the entity's shard group.

**Details**

The returned `EntityAddress` stores the supplied `shardId`, `entityType`, and
`entityId`. Equality and hashing include all three fields.

**Gotchas**

`make` does not choose the shard for an entity. Use the same shard group
logic as the entity definition; a different `shardId` makes a different
address even when the entity type and entity id match.

**See**

- `EntityAddress` for the equality, hashing, and string formatting behavior of constructed addresses
- `ShardId` for the shard identifier included in the address

**Signature**

```ts
declare const make: (options: {
  readonly shardId: ShardId
  readonly entityType: EntityType
  readonly entityId: EntityId
}) => EntityAddress
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityAddress.ts#L89)

Since v4.0.0

# models

## EntityAddress (class)

Represents the unique address of an entity within the cluster.

**Signature**

```ts
declare class EntityAddress
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityAddress.ts#L24)

Since v4.0.0

### toString (method)

Formats the entity type, entity id, and shard id as a readable address.

**Signature**

```ts
declare const toString: () => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityAddress.ts#L41)

Since v4.0.0

### [Equal.symbol] (method)

Compares entity addresses by entity type, entity id, and shard id.

**Signature**

```ts
declare const [Equal.symbol]: (that: EntityAddress) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityAddress.ts#L50)

Since v4.0.0

### [Hash.symbol] (method)

Computes a structural hash from the entity type, entity id, and shard id.

**Signature**

```ts
declare const [Hash.symbol]: () => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityAddress.ts#L60)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster entity address for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/EntityAddress"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityAddress.ts#L34)

Since v4.0.0
