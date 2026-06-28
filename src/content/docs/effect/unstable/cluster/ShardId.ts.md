---
title: ShardId.ts
nav_order: 199
parent: "effect"
---

## ShardId.ts overview

The `ShardId` module models the address of a shard inside an Effect Cluster
shard group. A shard id is made from a string `group` and numeric `id`, and
the module gives that pair stable equality, hashing, primary-key behavior,
schema support, and conversion to and from the `group:id` string form used by
routing and storage boundaries.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [converting](#converting)
  - [toString](#tostring)
- [decoding](#decoding)
  - [fromString](#fromstring)
  - [fromStringEncoded](#fromstringencoded)
- [guards](#guards)
  - [isShardId](#isshardid)
- [models](#models)
  - [ShardId (interface)](#shardid-interface)
- [schemas](#schemas)
  - [ShardId](#shardid)

---

# constructors

## make

Creates or reuses the cached `ShardId` for the specified shard group and numeric
id.

**When to use**

Use to create a `ShardId` when the shard group and numeric id are already
known, such as after a routing decision or after decoding stored shard-id
parts.

**Details**

Repeated calls with the same `group` and `id` return the same cached
`ShardId` instance. The returned value stores those fields, compares by
`group` and `id`, formats as `group:id`, and uses that string form for
hashing and primary keys.

**Gotchas**

`make` does not compute a shard from an entity id or check whether the shard
belongs to the current sharding configuration. Pass the shard group and
numeric id produced by the routing or storage layer.

**See**

- `toString` for formatting an existing shard id as `group:id`
- `fromString` for constructing a cached shard id from the `group:id` string form

**Signature**

```ts
declare const make: (group: string, id: number) => ShardId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardId.ts#L90)

Since v4.0.0

# converting

## toString

Formats a shard identifier as `group:id`.

**Signature**

```ts
declare const toString: (shardId: { readonly group: string; readonly id: number }) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardId.ts#L131)

Since v4.0.0

# decoding

## fromString

Parses a `group:id` string into a cached `ShardId`.

**Details**

Throws an `Error` when the string has no colon separator or the id segment is
not numeric.

**Signature**

```ts
declare const fromString: (s: string) => ShardId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardId.ts#L175)

Since v4.0.0

## fromStringEncoded

Parses a `group:id` string into plain shard id parts.

**Details**

Throws an `Error` when the string has no colon separator or the id segment is
not numeric.

**Signature**

```ts
declare const fromStringEncoded: (s: string) => { readonly group: string; readonly id: number }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardId.ts#L148)

Since v4.0.0

# guards

## isShardId

Returns `true` when the value carries the `ShardId` runtime marker.

**Signature**

```ts
declare const isShardId: (u: unknown) => u is ShardId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardId.ts#L38)

Since v4.0.0

# models

## ShardId (interface)

Identifier for a shard within a shard group, with equality, hashing, and primary
key behavior based on the `group:id` string form.

**Signature**

```ts
export interface ShardId extends Equal.Equal, Hash.Hash, PrimaryKey.PrimaryKey {
  readonly [TypeId]: typeof TypeId
  readonly group: string
  readonly id: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardId.ts#L26)

Since v4.0.0

# schemas

## ShardId

Schema for shard identifiers encoded as `{ group, id }` objects and decoded
via `make`.

**Signature**

```ts
declare const ShardId: S.declare<ShardId, ShardId>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ShardId.ts#L47)

Since v4.0.0
