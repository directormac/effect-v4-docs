---
title: IndexedDbDatabase.ts
nav_order: 14
parent: "@effect/platform-browser"
---

## IndexedDbDatabase.ts overview

Builds and opens typed IndexedDB databases from versioned schema migrations.

This module turns an `IndexedDbVersion` migration chain into an
`IndexedDbDatabase` layer. The layer opens the browser database, runs any
pending upgrade migrations, provides a query builder for the current schema,
and exposes a `rebuild` effect that deletes and reopens the database.
Migration transactions can create or delete object stores and indexes, and
database failures are represented as `IndexedDbDatabaseError` values.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [errors](#errors)
  - [ErrorReason (type alias)](#errorreason-type-alias)
  - [IndexedDbDatabaseError (class)](#indexeddbdatabaseerror-class)
    - [[ErrorTypeId] (property)](#errortypeid-property)
    - [message (property)](#message-property)
- [models](#models)
  - [Any (interface)](#any-interface)
  - [AnySchema (type alias)](#anyschema-type-alias)
  - [IndexFromTable (type alias)](#indexfromtable-type-alias)
  - [IndexFromTableName (type alias)](#indexfromtablename-type-alias)
  - [IndexedDbDatabase (class)](#indexeddbdatabase-class)
  - [IndexedDbSchema (interface)](#indexeddbschema-interface)
  - [Transaction (interface)](#transaction-interface)

---

# constructors

## make

Creates the initial `IndexedDbSchema` from a version and an initialization migration run during database upgrade.

**Signature**

```ts
declare const make: <InitialVersion extends IndexedDbVersion.AnyWithProps, Error>(
  initialVersion: InitialVersion,
  init: (toQuery: Transaction<InitialVersion>) => Effect.Effect<void, Error>
) => IndexedDbSchema<never, InitialVersion, Error>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L293)

Since v4.0.0

# errors

## ErrorReason (type alias)

String union describing the failure categories for IndexedDB database opening, migration, and schema operations.

**Signature**

```ts
type ErrorReason =
  | "TransactionError"
  | "MissingTable"
  | "OpenError"
  | "UpgradeError"
  | "Aborted"
  | "Blocked"
  | "MissingIndex"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L77)

Since v4.0.0

## IndexedDbDatabaseError (class)

Tagged error for IndexedDB database operations, carrying a database error reason and the original cause.

**Signature**

```ts
declare class IndexedDbDatabaseError
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L92)

Since v4.0.0

### [ErrorTypeId] (property)

Marks this value as an IndexedDB database error for runtime guards.

**Signature**

```ts
readonly [ErrorTypeId]: "~@effect/platform-browser/IndexedDbDatabase/IndexedDbDatabaseError"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L103)

Since v4.0.0

### message (property)

**Signature**

```ts
readonly message: ErrorReason
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L104)

# models

## Any (interface)

Type-erased IndexedDB schema shape used when traversing schema migration chains.

**Signature**

```ts
export interface Any {
  readonly previous?: Any | undefined
  readonly layer: (databaseName: string) => Layer.Layer<IndexedDbDatabase, IndexedDbDatabaseError, IndexedDb.IndexedDb>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L264)

Since v4.0.0

## AnySchema (type alias)

Type-erased `IndexedDbSchema` covering any source version, target version, and migration error type.

**Signature**

```ts
type AnySchema = IndexedDbSchema<IndexedDbVersion.AnyWithProps, IndexedDbVersion.AnyWithProps, any>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L281)

Since v4.0.0

## IndexFromTable (type alias)

Extracts the string-literal index names defined by an `IndexedDbTable`.

**Signature**

```ts
type IndexFromTable<Table> =
  IsStringLiteral<Extract<keyof IndexedDbTable.Indexes<Table>, string>> extends true
    ? Extract<keyof IndexedDbTable.Indexes<Table>, string>
    : never
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L240)

Since v4.0.0

## IndexFromTableName (type alias)

Extracts the valid index names for a table name within an IndexedDB version.

**Signature**

```ts
type IndexFromTableName<Version, Table> = IndexFromTable<
  IndexedDbTable.WithName<IndexedDbVersion.Tables<Version>, Table>
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L251)

Since v4.0.0

## IndexedDbDatabase (class)

Service tag for an open IndexedDB database, its `IDBKeyRange` constructor, reactivity service, and rebuild effect.

**When to use**

Use when you need access to the live database service after an
`IndexedDbSchema` layer has been provided, especially for `rebuild` or
lower-level database primitives.

**Details**

`database` is a mutable reference to the current `IDBDatabase`. `IDBKeyRange`
and `reactivity` are shared with query builders created from the schema.

**Gotchas**

`rebuild` closes and deletes the browser database, then reopens it and reruns
migrations. Records not recreated by migrations are removed.

**See**

- `IndexedDb.IndexedDb` for the lower-level browser IndexedDB primitives
- `make` for creating a schema that provides this service as a layer

**Signature**

```ts
declare class IndexedDbDatabase
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L132)

Since v4.0.0

## IndexedDbSchema (interface)

Describes an IndexedDB schema version and its migrations, and acts as an effect that yields a query builder for the target version.

**Signature**

```ts
export interface IndexedDbSchema<
  in out FromVersion extends IndexedDbVersion.AnyWithProps,
  in out ToVersion extends IndexedDbVersion.AnyWithProps,
  out Error = never
> extends Effect.Effect<IndexedDbQueryBuilder.IndexedDbQueryBuilder<ToVersion>, never, IndexedDbDatabase> {
  new (_: never): {}

  readonly previous: [FromVersion] extends [never] ? undefined : IndexedDbSchema<never, FromVersion, Error>
  readonly fromVersion: FromVersion
  readonly version: ToVersion

  readonly migrate: [FromVersion] extends [never]
    ? (query: Transaction<ToVersion>) => Effect.Effect<void, Error>
    : (fromQuery: Transaction<FromVersion>, toQuery: Transaction<ToVersion>) => Effect.Effect<void, Error>

  readonly add: <Version extends IndexedDbVersion.AnyWithProps, MigrationError>(
    version: Version,
    migrate: (fromQuery: Transaction<ToVersion>, toQuery: Transaction<Version>) => Effect.Effect<void, MigrationError>
  ) => IndexedDbSchema<ToVersion, Version, MigrationError | Error>

  readonly getQueryBuilder: Effect.Effect<
    IndexedDbQueryBuilder.IndexedDbQueryBuilder<ToVersion>,
    never,
    IndexedDbDatabase
  >

  readonly layer: (databaseName: string) => Layer.Layer<IndexedDbDatabase, IndexedDbDatabaseError, IndexedDb.IndexedDb>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L148)

Since v4.0.0

## Transaction (interface)

Query builder available during a database migration, extended with object-store and index management helpers for the active `IDBTransaction`.

**Signature**

```ts
export interface Transaction<Source extends IndexedDbVersion.AnyWithProps = never> extends Omit<
  IndexedDbQueryBuilder.IndexedDbQueryBuilder<Source>,
  "transaction"
> {
  readonly transaction: globalThis.IDBTransaction

  readonly createObjectStore: <A extends IndexedDbTable.TableName<IndexedDbVersion.Tables<Source>>>(
    table: A
  ) => Effect.Effect<globalThis.IDBObjectStore, IndexedDbDatabaseError>

  readonly deleteObjectStore: <A extends IndexedDbTable.TableName<IndexedDbVersion.Tables<Source>>>(
    table: A
  ) => Effect.Effect<void, IndexedDbDatabaseError>

  readonly createIndex: <Name extends IndexedDbTable.TableName<IndexedDbVersion.Tables<Source>>>(
    table: Name,
    indexName: IndexFromTableName<Source, Name>,
    options?: IDBIndexParameters
  ) => Effect.Effect<globalThis.IDBIndex, IndexedDbDatabaseError>

  readonly deleteIndex: <Name extends IndexedDbTable.TableName<IndexedDbVersion.Tables<Source>>>(
    table: Name,
    indexName: IndexFromTableName<Source, Name>
  ) => Effect.Effect<void, IndexedDbDatabaseError>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbDatabase.ts#L201)

Since v4.0.0
