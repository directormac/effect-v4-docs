---
title: Runner.ts
nav_order: 193
parent: "effect"
---

## Runner.ts overview

Cluster runner metadata for processes that can host entity shards.

A `Runner` combines the stable `RunnerAddress` used to contact a process, the
shard groups that process participates in, and the relative weight used when
the sharding service distributes shards across healthy runners.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [Runner (class)](#runner-class)
    - [toString (method)](#tostring-method)
    - [[NodeInspectSymbol] (method)](#nodeinspectsymbol-method)
    - [[Equal.symbol] (method)](#equalsymbol-method)
    - [[Hash.symbol] (method)](#hashsymbol-method)
    - [[TypeId] (property)](#typeid-property)

---

# constructors

## make

Constructs a `Runner` from its network address, shard groups, and relative
shard-assignment weight.

**When to use**

Use to build runner metadata from an existing `RunnerAddress`, shard groups,
and relative weight when registering or exchanging a cluster runner.

**Details**

The `groups` array lists the shard groups the runner can host. During shard
assignment, the runner's address is added to each group's hash ring with
`weight` as its relative weight.

**Gotchas**

This helper constructs the value without runtime schema validation, so only
pass trusted `RunnerAddress`, `groups`, and `weight` values.

**See**

- `Runner` for the value created by this helper
- `RunnerAddress` for the network address accepted in `props.address`

**Signature**

```ts
declare const make: (props: {
  readonly address: RunnerAddress
  readonly groups: ReadonlyArray<string>
  readonly weight: number
}) => Runner
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runner.ts#L125)

Since v4.0.0

# models

## Runner (class)

Represents a cluster runner that can host entities.

**Details**

Each runner has a unique network `address`, the shard `groups` it participates
in, and a relative `weight` used when assigning shards across runners.

**Signature**

```ts
declare class Runner
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runner.ts#L29)

Since v4.0.0

### toString (method)

Formats this runner as a string.

**Signature**

```ts
declare const toString: () => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runner.ts#L67)

Since v4.0.0

### [NodeInspectSymbol] (method)

Formats this runner for Node.js inspection.

**Signature**

```ts
declare const [NodeInspectSymbol]: () => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runner.ts#L76)

Since v4.0.0

### [Equal.symbol] (method)

Compares runners by address and shard-assignment weight.

**Signature**

```ts
declare const [Equal.symbol]: (that: Runner) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runner.ts#L85)

Since v4.0.0

### [Hash.symbol] (method)

Computes a structural hash from the runner address and shard-assignment weight.

**Signature**

```ts
declare const [Hash.symbol]: () => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runner.ts#L94)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster runner for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/Runner"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runner.ts#L46)

Since v4.0.0
