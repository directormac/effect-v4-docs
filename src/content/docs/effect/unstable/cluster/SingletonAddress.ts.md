---
title: SingletonAddress.ts
nav_order: 205
parent: "effect"
---

## SingletonAddress.ts overview

The `SingletonAddress` module models the runtime address assigned to a cluster
singleton registration. The address pairs the singleton `name` with the
`ShardId` selected from that name and its shard group, giving sharding one
stable value for registration events, equality, hashing, and local singleton
fiber tracking.

Since v4.0.0

---

## Exports Grouped by Category

- [address](#address)
  - [SingletonAddress (class)](#singletonaddress-class)
    - [[Hash.symbol] (method)](#hashsymbol-method)
    - [[Equal.symbol] (method)](#equalsymbol-method)
    - [[TypeId] (property)](#typeid-property)

---

# address

## SingletonAddress (class)

Represents the unique address of an singleton within the cluster.

**Signature**

```ts
declare class SingletonAddress
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SingletonAddress.ts#L23)

Since v4.0.0

### [Hash.symbol] (method)

Computes a structural hash from the singleton name and shard id.

**Signature**

```ts
declare const [Hash.symbol]: () => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SingletonAddress.ts#L38)

Since v4.0.0

### [Equal.symbol] (method)

Compares singleton addresses by name and shard id.

**Signature**

```ts
declare const [Equal.symbol]: (that: SingletonAddress) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SingletonAddress.ts#L46)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster singleton address for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/SingletonAddress"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SingletonAddress.ts#L32)

Since v4.0.0
