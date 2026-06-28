---
title: MachineId.ts
nav_order: 189
parent: "effect"
---

## MachineId.ts overview

Branded integer identifiers for cluster runners. A `MachineId` marks the
machine component used by cluster services, especially snowflake id
generation, while keeping the value distinct from an ordinary `number` in
TypeScript APIs.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [MachineId](#machineid)
  - [make](#make)
- [models](#models)
  - [MachineId (type alias)](#machineid-type-alias)

---

# constructors

## MachineId

Schema for branded integer machine identifiers used by the cluster.

**Signature**

```ts
declare const MachineId: Schema.brand<Schema.Int, "~effect/cluster/MachineId">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MachineId.ts#L17)

Since v4.0.0

## make

Brands a number as a `MachineId`.

**When to use**

Use to turn a trusted numeric machine id into the branded type when
implementing runner storage adapters or configuring snowflake generation.

**Details**

The branded value is the original number at runtime.

**Gotchas**

`make` does not validate integer input or enforce the snowflake machine-id
range. Snowflake ids encode the machine component modulo 1024.

**See**

- `MachineId` for the schema that validates branded integer machine identifiers

**Signature**

```ts
declare const make: (id: number) => MachineId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MachineId.ts#L54)

Since v4.0.0

# models

## MachineId (type alias)

Branded integer type representing a cluster machine ID.

**Signature**

```ts
type MachineId = typeof MachineId.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MachineId.ts#L30)

Since v4.0.0
