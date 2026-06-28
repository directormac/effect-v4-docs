---
title: IndexedDbVersion.ts
nav_order: 17
parent: "@effect/platform-browser"
---

## IndexedDbVersion.ts overview

Typed IndexedDB schema version definitions.

This module represents one logical IndexedDB database version as a non-empty set of `IndexedDbTable` definitions.
Versions are consumed by `IndexedDbDatabase.make` and `.add` to type query builders and migration transactions, so
applications can describe the tables available after initialization or after each schema upgrade.

Use an `IndexedDbVersion` when defining the initial stores for a browser database, adding or removing object stores,
changing indexes, or moving data between differently shaped table schemas. The version value is a typed description of
the target schema; creating and deleting object stores or indexes still happens explicitly inside the corresponding
`IndexedDbDatabase` migration callback.

IndexedDB versioning is ordered by the migration chain rather than by a number stored here. Each `.add` step becomes
the next browser database version, and only migrations after the browser's current version are run. Include every table
that should be queryable in each target version, avoid duplicate table names, and remember that key-path or
auto-increment changes usually require creating a new object store and copying data during the upgrade transaction.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [interface](#interface)
  - [IndexedDbVersion (interface)](#indexeddbversion-interface)
- [models](#models)
  - [Any (interface)](#any-interface)
  - [AnyWithProps (type alias)](#anywithprops-type-alias)
  - [SchemaWithName (type alias)](#schemawithname-type-alias)
  - [TableWithName (type alias)](#tablewithname-type-alias)
  - [Tables (type alias)](#tables-type-alias)

---

# constructors

## make

Creates an `IndexedDbVersion` from one or more table definitions.

**When to use**

Use when you need a typed description of the target IndexedDB schema that a
database migration will materialize.

**Details**

The returned version exposes a `tables` map keyed by each table's
`tableName`, and its type is the union of the supplied table definitions.

**Gotchas**

This constructor only describes the target schema; object stores and indexes
still need to be created in the corresponding `IndexedDbDatabase` migration.
Duplicate table names are not rejected, and the runtime map keeps the later
table for a repeated key.

**See**

- `IndexedDbTable.make` for creating table definitions consumed by this constructor

**Signature**

```ts
declare const make: <const Tables extends NonEmptyReadonlyArray<IndexedDbTable.AnyWithProps>>(
  ...tables: Tables
) => IndexedDbVersion<Tables[number]>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbVersion.ts#L131)

Since v4.0.0

# interface

## IndexedDbVersion (interface)

Typed IndexedDB version definition containing the tables available in that schema version.

**Signature**

```ts
export interface IndexedDbVersion<out Tables extends IndexedDbTable.AnyWithProps> extends Pipeable {
  new (_: never): {}
  readonly [TypeId]: typeof TypeId
  readonly tables: ReadonlyMap<string, Tables>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbVersion.ts#L33)

Since v4.0.0

# models

## Any (interface)

Type-erased shape of an `IndexedDbVersion`.

**Signature**

```ts
export interface Any {
  readonly [TypeId]: typeof TypeId
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbVersion.ts#L47)

Since v4.0.0

## AnyWithProps (type alias)

Type-erased `IndexedDbVersion` retaining version properties with broad table types.

**Signature**

```ts
type AnyWithProps = IndexedDbVersion<IndexedDbTable.AnyWithProps>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbVersion.ts#L57)

Since v4.0.0

## SchemaWithName (type alias)

Extracts the schema for a named table within an `IndexedDbVersion`.

**Signature**

```ts
type SchemaWithName<Db, TableName> = IndexedDbTable.TableSchema<IndexedDbTable.WithName<Tables<Db>, TableName>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbVersion.ts#L84)

Since v4.0.0

## TableWithName (type alias)

Selects a table by name from an `IndexedDbVersion`.

**Signature**

```ts
type TableWithName<Db, TableName> = IndexedDbTable.WithName<Tables<Db>, TableName>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbVersion.ts#L73)

Since v4.0.0

## Tables (type alias)

Extracts the table union from an `IndexedDbVersion`.

**Signature**

```ts
type Tables<Db> = Db extends IndexedDbVersion<infer _Tables> ? _Tables : never
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbVersion.ts#L65)

Since v4.0.0
