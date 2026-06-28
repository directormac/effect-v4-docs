---
title: Snowflake.ts
nav_order: 206
parent: "effect"
---

## Snowflake.ts overview

Creates compact, sortable identifiers for cluster messages and runtime
events.

A snowflake id is a branded `bigint` built from a millisecond timestamp, a
machine id, and a sequence number for that machine. The parts make generated
ids sortable by time while still being unique for a runner. This module
includes schemas for bigint and string encodings, helpers for creating and
reading ids, and a `Clock`-backed generator service for cluster runtime use.

Since v4.0.0

---

## Exports Grouped by Category

- [Generator](#generator)
  - [Generator (class)](#generator-class)
  - [layerGenerator](#layergenerator)
  - [makeGenerator](#makegenerator)
- [constants](#constants)
  - [constEpochMillis](#constepochmillis)
- [constructors](#constructors)
  - [Snowflake](#snowflake)
  - [make](#make)
- [models](#models)
  - [Snowflake (type alias)](#snowflake-type-alias)
- [parts](#parts)
  - [dateTime](#datetime)
  - [machineId](#machineid)
  - [sequence](#sequence)
  - [timestamp](#timestamp)
  - [toParts](#toparts)
- [schemas](#schemas)
  - [SnowflakeFromBigInt](#snowflakefrombigint)
  - [SnowflakeFromBigInt (interface)](#snowflakefrombigint-interface)
  - [SnowflakeFromString](#snowflakefromstring)
  - [SnowflakeFromString (interface)](#snowflakefromstring-interface)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utils](#utils)
  - [Snowflake (namespace)](#snowflake-namespace)
    - [Parts (interface)](#parts-interface)
    - [Generator (interface)](#generator-interface)

---

# Generator

## Generator (class)

Context service for a stateful snowflake id generator.

**Signature**

```ts
declare class Generator
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L271)

Since v4.0.0

## layerGenerator

Layer that provides the default snowflake `Generator` service.

**Signature**

```ts
declare const layerGenerator: Layer.Layer<Generator, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L282)

Since v4.0.0

## makeGenerator

Creates a stateful snowflake generator using `Clock`.

**Details**

The generator starts with a random machine id, never moves generated timestamps
backward, resets the sequence each millisecond, and advances the timestamp when
more than 4096 ids are requested in the same millisecond.

**Signature**

```ts
declare const makeGenerator: Effect.Effect<Snowflake.Generator, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L227)

Since v4.0.0

# constants

## constEpochMillis

Defines the custom snowflake epoch in Unix milliseconds.

**Signature**

```ts
declare const constEpochMillis: number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L132)

Since v4.0.0

# constructors

## Snowflake

Constructs a branded cluster snowflake id from a bigint or bigint-compatible
string.

**Signature**

```ts
declare const Snowflake: (input: string | bigint) => Snowflake
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L56)

Since v4.0.0

## make

Creates a branded snowflake id from a timestamp, machine id, and sequence number,
using the custom snowflake epoch and 10-bit machine id and 12-bit sequence
fields.

**When to use**

Use to pack known timestamp, machine id, and sequence parts into a branded
snowflake id.

**Gotchas**

Machine id values are encoded modulo 1024, and sequence values modulo 4096;
values outside those ranges wrap instead of being rejected.

**See**

- `toParts` for the inverse operation that decodes a snowflake id into timestamp, machine id, and sequence parts
- `makeGenerator` for generating ids with Clock-backed timestamp and sequence management

**Signature**

```ts
declare const make: (options: {
  readonly machineId: MachineId
  readonly sequence: number
  readonly timestamp: number
}) => Snowflake
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L161)

Since v4.0.0

# models

## Snowflake (type alias)

Branded bigint identifier composed from a timestamp, machine id, and per-machine
sequence number.

**Signature**

```ts
type Snowflake = Brand.Branded<bigint, TypeId>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L47)

Since v4.0.0

# parts

## dateTime

Extracts the timestamp from a snowflake id as a `DateTime.Utc`.

**Signature**

```ts
declare const dateTime: (snowflake: Snowflake) => DateTime.Utc
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L184)

Since v4.0.0

## machineId

Extracts the machine id component from a snowflake id.

**Signature**

```ts
declare const machineId: (snowflake: Snowflake) => MachineId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L192)

Since v4.0.0

## sequence

Extracts the per-machine sequence component from a snowflake id.

**Signature**

```ts
declare const sequence: (snowflake: Snowflake) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L201)

Since v4.0.0

## timestamp

Extracts the Unix timestamp in milliseconds from a snowflake id.

**Signature**

```ts
declare const timestamp: (snowflake: Snowflake) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L176)

Since v4.0.0

## toParts

Decomposes a snowflake id into its timestamp, machine id, and sequence parts.

**Signature**

```ts
declare const toParts: (snowflake: Snowflake) => Snowflake.Parts
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L209)

Since v4.0.0

# schemas

## SnowflakeFromBigInt

Schema for snowflake ids represented as branded bigints.

**Signature**

```ts
declare const SnowflakeFromBigInt: SnowflakeFromBigInt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L105)

Since v4.0.0

## SnowflakeFromBigInt (interface)

Schema type for snowflake ids represented as branded bigints.

**Signature**

```ts
export interface SnowflakeFromBigInt extends Schema.brand<Schema.BigInt, TypeId> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L97)

Since v4.0.0

## SnowflakeFromString

Schema that decodes snowflake ids from strings into branded bigints and encodes
them back to strings.

**Signature**

```ts
declare const SnowflakeFromString: SnowflakeFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L122)

Since v4.0.0

## SnowflakeFromString (interface)

Schema type for snowflake ids decoded from strings into branded bigints.

**Signature**

```ts
export interface SnowflakeFromString extends Schema.decodeTo<SnowflakeFromBigInt, Schema.String> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L113)

Since v4.0.0

# type IDs

## TypeId

Runtime brand identifier for cluster snowflake ids.

**Signature**

```ts
declare const TypeId: "~effect/cluster/Snowflake"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L30)

Since v4.0.0

## TypeId (type alias)

Type-level representation of the cluster snowflake brand identifier.

**Signature**

```ts
type TypeId = typeof TypeId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L38)

Since v4.0.0

# utils

## Snowflake (namespace)

Namespace containing support types for snowflake parts and generators.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L64)

Since v4.0.0

### Parts (interface)

Decoded components of a snowflake id: Unix timestamp milliseconds, machine id,
and sequence number.

**Signature**

```ts
export interface Parts {
  readonly timestamp: number
  readonly machineId: MachineId
  readonly sequence: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L72)

Since v4.0.0

### Generator (interface)

Stateful generator for runner-local snowflake ids, exposing an unsafe
synchronous `nextUnsafe` operation and an effectful machine id setter.

**Signature**

```ts
export interface Generator {
  readonly nextUnsafe: () => Snowflake
  readonly setMachineId: (machineId: MachineId) => Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Snowflake.ts#L85)

Since v4.0.0
