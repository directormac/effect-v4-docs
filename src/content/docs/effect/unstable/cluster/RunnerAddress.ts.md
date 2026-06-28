---
title: RunnerAddress.ts
nav_order: 194
parent: "effect"
---

## RunnerAddress.ts overview

Network addresses for locating cluster runners. A `RunnerAddress` stores the
host and port for a runner and provides schema support, structural equality,
hashing, Node.js inspection, and a stable primary key formatted from the host
and port.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [RunnerAddress (class)](#runneraddress-class)
    - [[Equal.symbol] (method)](#equalsymbol-method)
    - [[Hash.symbol] (method)](#hashsymbol-method)
    - [[PrimaryKey.symbol] (method)](#primarykeysymbol-method)
    - [toString (method)](#tostring-method)
    - [[NodeInspectSymbol] (method)](#nodeinspectsymbol-method)
    - [[TypeId] (property)](#typeid-property)

---

# constructors

## make

Constructs a `RunnerAddress` from a host and port.

**When to use**

Use to create the stable network identity for a cluster runner when
configuring sharding, registering runner metadata, or targeting a runner by
host and port.

**Details**

The returned `RunnerAddress` stores the supplied `host` and `port`. Equality,
hashing, and the primary key use both fields, with the primary key formatted
as `host:port`.

**Gotchas**

`make` does not normalize the host. Pass the host string exactly as the
cluster routing and storage layers should identify it.

**See**

- `RunnerAddress` for the constructed address type and its equality, hashing, primary-key, and formatting behavior

**Signature**

```ts
declare const make: (host: string, port: number) => RunnerAddress
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerAddress.ts#L111)

Since v4.0.0

# models

## RunnerAddress (class)

Represents the network address of a cluster runner, identified by host and
port.

**When to use**

Use to represent the host and port that identify a runner in cluster routing,
registration, and health checks.

**Signature**

```ts
declare class RunnerAddress
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerAddress.ts#L29)

Since v4.0.0

### [Equal.symbol] (method)

Compares runner addresses by host and port.

**Signature**

```ts
declare const [Equal.symbol]: (that: RunnerAddress) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerAddress.ts#L45)

Since v4.0.0

### [Hash.symbol] (method)

Computes a structural hash from the host and port.

**Signature**

```ts
declare const [Hash.symbol]: () => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerAddress.ts#L54)

Since v4.0.0

### [PrimaryKey.symbol] (method)

Stable primary key used to identify the runner address.

**Signature**

```ts
declare const [PrimaryKey.symbol]: () => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerAddress.ts#L63)

Since v4.0.0

### toString (method)

Formats the runner address with its host and port.

**Signature**

```ts
declare const toString: () => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerAddress.ts#L72)

Since v4.0.0

### [NodeInspectSymbol] (method)

Formats the runner address for Node.js inspection.

**Signature**

```ts
declare const [NodeInspectSymbol]: () => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerAddress.ts#L81)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster runner address for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/RunnerAddress"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerAddress.ts#L38)

Since v4.0.0
