---
title: EntityType.ts
nav_order: 184
parent: "effect"
---

## EntityType.ts overview

The `EntityType` module defines the branded string used to identify a kind of
entity in an Effect cluster. Entity type names are part of the cluster routing
identity: they distinguish one family of entities from another before an
individual entity id is considered.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [EntityType](#entitytype)
  - [make](#make)
- [models](#models)
  - [EntityType (type alias)](#entitytype-type-alias)

---

# constructors

## EntityType

Schema for branded string names that identify entity types in the cluster.

**Signature**

```ts
declare const EntityType: Schema.brand<Schema.String, "~effect/cluster/EntityType">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityType.ts#L17)

Since v4.0.0

## make

Brands a string as an `EntityType`.

**When to use**

Use to brand a stable entity family name before passing it to cluster APIs
that require an `EntityType`, such as entity addresses.

**Details**

The returned value is the same runtime string with the `EntityType` brand
applied by TypeScript.

**Gotchas**

`make` only applies the brand at the type level; it does not validate,
normalize, or check uniqueness. Use the `EntityType` schema when you need
schema-based decoding or validation, and keep names stable because the exact
string participates in routing identity.

**See**

- `EntityType` for schema-based decoding, validation, and encoding of entity type names

**Signature**

```ts
declare const make: (value: string) => EntityType
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityType.ts#L52)

Since v4.0.0

# models

## EntityType (type alias)

Branded string type representing an entity type name.

**Signature**

```ts
type EntityType = typeof EntityType.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EntityType.ts#L25)

Since v4.0.0
