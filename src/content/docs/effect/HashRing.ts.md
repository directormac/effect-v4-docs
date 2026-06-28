---
title: HashRing.ts
nav_order: 43
parent: "effect"
---

## HashRing.ts overview

Assigns string inputs to nodes with weighted consistent hashing.

A hash ring minimizes remapping when nodes are added, removed, or reweighted.
This makes it useful for routing requests, partitioning keys, and
distributing shards across service instances or storage backends. This module
can create rings, add or remove nodes by `PrimaryKey`, route an input string
to a node, and compute shard assignments.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [add](#add)
  - [addMany](#addmany)
  - [get](#get)
  - [getShards](#getshards)
  - [has](#has)
  - [remove](#remove)
- [constructors](#constructors)
  - [make](#make)
- [guards](#guards)
  - [isHashRing](#ishashring)
- [models](#models)
  - [HashRing (interface)](#hashring-interface)

---

# combinators

## add

Adds a new node to the ring. If the node already exists in the ring, it
will be updated. For example, you can use this to update the node's weight.

**When to use**

Use to register one node in a `HashRing` so lookups and shard assignments can
return it, or update that node's weight.

**Details**

Nodes are matched by `PrimaryKey.value`. The weight defaults to `1` and is
clamped to at least `0.1`.

**Gotchas**

This mutates and returns the same ring instance.

**See**

- `addMany` for adding or updating several nodes
- `remove` for unregistering a node
- `has` for checking primary-key membership

**Signature**

```ts
declare const add: {
  <A extends PrimaryKey.PrimaryKey>(
    node: A,
    options?: { readonly weight?: number | undefined }
  ): (self: HashRing<A>) => HashRing<A>
  <A extends PrimaryKey.PrimaryKey>(
    self: HashRing<A>,
    node: A,
    options?: { readonly weight?: number | undefined }
  ): HashRing<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashRing.ts#L206)

Since v3.19.0

## addMany

Adds new nodes to the ring. If a node already exists in the ring, it
will be updated. For example, you can use this to update the node's weight.

**When to use**

Use to register or update several nodes in a `HashRing` at the same weight.

**Signature**

```ts
declare const addMany: {
  <A extends PrimaryKey.PrimaryKey>(
    nodes: Iterable<A>,
    options?: { readonly weight?: number | undefined }
  ): (self: HashRing<A>) => HashRing<A>
  <A extends PrimaryKey.PrimaryKey>(
    self: HashRing<A>,
    nodes: Iterable<A>,
    options?: { readonly weight?: number | undefined }
  ): HashRing<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashRing.ts#L129)

Since v3.19.0

## get

Gets the node which should handle the given input. Returns undefined if
the hashring has no elements with weight.

**When to use**

Use to route a single string input key to the current ring member responsible
for that key.

**See**

- `getShards` for assigning fixed shard indexes instead of routing
  one input string at a time

**Signature**

```ts
declare const get: <A extends PrimaryKey.PrimaryKey>(self: HashRing<A>, input: string) => A | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashRing.ts#L297)

Since v3.19.0

## getShards

Computes a balanced shard distribution across the nodes in the ring.

**When to use**

Use to precompute ownership for a fixed number of shard indexes across the
current ring members.

**Signature**

```ts
declare const getShards: <A extends PrimaryKey.PrimaryKey>(self: HashRing<A>, count: number) => Array<A> | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashRing.ts#L317)

Since v3.19.0

## has

Checks whether the ring contains a node with the same `PrimaryKey` value.

**When to use**

Use when you need to know whether registering a node would update an existing
ring member because another node already has the same primary-key identity.

**Details**

Membership is checked with `self.nodes.has(PrimaryKey.value(node))`, so
matching is by primary key, not object identity or weight.

**See**

- `add` for registering or updating nodes
- `remove` for removing nodes by the same primary-key identity
- `get` for routing an input string to a node

**Signature**

```ts
declare const has: {
  <A extends PrimaryKey.PrimaryKey>(node: A): (self: HashRing<A>) => boolean
  <A extends PrimaryKey.PrimaryKey>(self: HashRing<A>, node: A): boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashRing.ts#L274)

Since v3.19.0

## remove

Removes the node from the ring. No-op's if the node does not exist.

**When to use**

Use to remove a node that has left the pool so future lookups and shard
assignments stop returning it.

**Details**

Removal matches by `PrimaryKey.value`, so any value with the same primary key
removes the same ring member.

**Gotchas**

This mutates and returns the same ring instance.

**See**

- `add` for registering or updating a node
- `has` for checking membership by primary key

**Signature**

```ts
declare const remove: {
  <A extends PrimaryKey.PrimaryKey>(node: A): (self: HashRing<A>) => HashRing<A>
  <A extends PrimaryKey.PrimaryKey>(self: HashRing<A>, node: A): HashRing<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashRing.ts#L240)

Since v3.19.0

# constructors

## make

Creates an empty `HashRing`.

**When to use**

Use to create an empty weighted consistent-hashing ring with the default or
custom virtual-point density.

**Details**

`baseWeight` controls how many virtual points are added for a node with
weight `1`; it defaults to `128` and is clamped to at least `1`.

**See**

- `add` for registering one node after creation
- `addMany` for registering several nodes after creation

**Signature**

```ts
declare const make: <A extends PrimaryKey.PrimaryKey>(options?: {
  readonly baseWeight?: number | undefined
}) => HashRing<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashRing.ts#L92)

Since v3.19.0

# guards

## isHashRing

Checks whether a value is a `HashRing`.

**When to use**

Use to narrow an `unknown` value before treating it as a `HashRing`, such as
values crossing an untyped boundary.

**Details**

The guard checks for the module's internal `TypeId` property and narrows to
`HashRing<any>`.

**Gotchas**

This is a structural type-id check; it does not validate the ring's `nodes`,
`ring`, or weight state.

**See**

- `HashRing` for the type narrowed by this guard
- `make` for creating an empty `HashRing`

**Signature**

```ts
declare const isHashRing: (u: unknown) => u is HashRing<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashRing.ts#L71)

Since v3.19.0

# models

## HashRing (interface)

A weighted consistent-hashing ring for assigning inputs to nodes with stable
remapping as nodes are added or removed.

**When to use**

Use to maintain a mutable weighted hash ring for routing keys or shards to
nodes identified by `PrimaryKey`.

**Details**

Nodes are identified by their `PrimaryKey` value and can be iterated from the
ring.

**Signature**

```ts
export interface HashRing<A extends PrimaryKey.PrimaryKey> extends Pipeable, Iterable<A> {
  readonly [TypeId]: typeof TypeId
  readonly baseWeight: number
  totalWeightCache: number
  readonly nodes: Map<string, [node: A, weight: number]>
  ring: Array<[hash: number, node: string]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HashRing.ts#L39)

Since v3.19.0
