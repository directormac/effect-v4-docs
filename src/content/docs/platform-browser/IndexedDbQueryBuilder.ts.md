---
title: IndexedDbQueryBuilder.ts
nav_order: 15
parent: "@effect/platform-browser"
---

## IndexedDbQueryBuilder.ts overview

Builds effectful, schema-aware queries for typed browser IndexedDB versions.

An `IndexedDbQueryBuilder` is created from an open database and a version's
table descriptors, then exposes `from(tableName)` as the entry point for
table operations. Query objects can select, count, delete, insert, upsert,
clear tables, stream paged reads, react to invalidations, and run multiple
effects in a shared `IDBTransaction` with `withTransaction`. Reads decode
stored rows with the table schema, and writes encode input values before
sending them to IndexedDB.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [errors](#errors)
  - [ErrorReason (type alias)](#errorreason-type-alias)
  - [IndexedDbQueryError (class)](#indexeddbqueryerror-class)
    - [[ErrorTypeId] (property)](#errortypeid-property)
    - [message (property)](#message-property)
- [models](#models)
  - [IndexedDbQueryBuilder (interface)](#indexeddbquerybuilder-interface)
  - [IndexedDbTransaction (class)](#indexeddbtransaction-class)
  - [KeyPath (type alias)](#keypath-type-alias)
  - [KeyPathNumber (type alias)](#keypathnumber-type-alias)
- [utils](#utils)
  - [IndexedDbQuery (namespace)](#indexeddbquery-namespace)
    - [From (interface)](#from-interface)
    - [Clear (interface)](#clear-interface)
    - [Count (interface)](#count-interface)
    - [DeletePartial (interface)](#deletepartial-interface)
    - [Delete (interface)](#delete-interface)
    - [Select (interface)](#select-interface)
    - [First (interface)](#first-interface)
    - [Filter (interface)](#filter-interface)
    - [Modify (interface)](#modify-interface)
    - [ModifyAll (interface)](#modifyall-interface)
    - [SelectType (type alias)](#selecttype-type-alias)
    - [ModifyType (type alias)](#modifytype-type-alias)
    - [EqualsType (type alias)](#equalstype-type-alias)
    - [ExtractIndexType (type alias)](#extractindextype-type-alias)
    - [ModifyWithKey (type alias)](#modifywithkey-type-alias)

---

# constructors

## make

Creates an `IndexedDbQueryBuilder` from an open database reference, key-range constructor, table map, and reactivity service.

**Signature**

```ts
declare const make: <Source extends IndexedDbVersion.AnyWithProps>({
  IDBKeyRange,
  database,
  tables,
  reactivity
}: {
  readonly database: MutableRef.MutableRef<globalThis.IDBDatabase>
  readonly IDBKeyRange: typeof globalThis.IDBKeyRange
  readonly tables: ReadonlyMap<string, IndexedDbVersion.Tables<Source>>
  readonly reactivity: Reactivity.Reactivity["Service"]
}) => IndexedDbQueryBuilder<Source>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L2004)

Since v4.0.0

# errors

## ErrorReason (type alias)

String union describing IndexedDB query failure categories such as decoding, encoding, and transaction errors.

**Signature**

```ts
type ErrorReason = "UnknownError" | "DecodeError" | "EncodeError" | "TransactionError"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L62)

Since v4.0.0

## IndexedDbQueryError (class)

Tagged error for IndexedDB query operations, carrying a query error reason and the original cause.

**Details**

`reason` is the query failure category, `cause` preserves the underlying
schema, IndexedDB request, transaction, or user callback failure, and
`message` is set to the reason.

**See**

- `ErrorReason` for the supported failure categories

**Signature**

```ts
declare class IndexedDbQueryError
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L82)

Since v4.0.0

### [ErrorTypeId] (property)

Marks this value as an IndexedDB query builder error for runtime guards.

**Signature**

```ts
readonly [ErrorTypeId]: "~@effect/platform-browser/IndexedDbQueryBuilder/IndexedDbQueryError"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L93)

Since v4.0.0

### message (property)

**Signature**

```ts
readonly message: ErrorReason
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L95)

# models

## IndexedDbQueryBuilder (interface)

Typed query builder for an IndexedDB version, with helpers for table queries, database access, clearing data, and running effects in a shared transaction.

**Signature**

```ts
export interface IndexedDbQueryBuilder<Source extends IndexedDbVersion.AnyWithProps>
  extends Pipeable.Pipeable, Inspectable {
  readonly tables: ReadonlyMap<string, IndexedDbVersion.Tables<Source>>
  readonly database: MutableRef.MutableRef<globalThis.IDBDatabase>
  readonly reactivity: Reactivity.Reactivity["Service"]
  readonly IDBKeyRange: typeof globalThis.IDBKeyRange
  readonly IDBTransaction: globalThis.IDBTransaction | undefined

  readonly use: <A = unknown>(f: (database: globalThis.IDBDatabase) => A) => Effect.Effect<A, IndexedDbQueryError>

  readonly from: <const Name extends IndexedDbTable.TableName<IndexedDbVersion.Tables<Source>>>(
    table: Name
  ) => IndexedDbQuery.From<IndexedDbVersion.TableWithName<Source, Name>>

  /** @internal */
  readonly fromCache: Map<string, IndexedDbQuery.From<IndexedDbVersion.TableWithName<Source, any>>>

  readonly clearAll: Effect.Effect<void, IndexedDbQueryError>

  readonly withTransaction: <
    Tables extends NonEmptyReadonlyArray<IndexedDbTable.TableName<IndexedDbVersion.Tables<Source>>>,
    Mode extends "readonly" | "readwrite"
  >(options: {
    readonly tables: Tables
    readonly mode: Mode
    readonly durability?: IDBTransactionDurability
  }) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, Exclude<R, IndexedDbTransaction>>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L104)

Since v4.0.0

## IndexedDbTransaction (class)

Service tag for the active `IDBTransaction` used to share a transaction across IndexedDB query effects.

**Signature**

```ts
declare class IndexedDbTransaction
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L725)

Since v4.0.0

## KeyPath (type alias)

Valid key-path type for a table schema, using encoded fields whose values are IndexedDB-valid keys.

**Signature**

```ts
type KeyPath<TableSchema> = IndexedDbValidKeys<TableSchema> | NonEmptyReadonlyArray<IndexedDbValidKeys<TableSchema>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L148)

Since v4.0.0

## KeyPathNumber (type alias)

Valid numeric key-path type for a table schema, used for auto-increment key paths.

**Signature**

```ts
type KeyPathNumber<TableSchema> =
  | IndexedDbValidNumberKeys<TableSchema>
  | NonEmptyReadonlyArray<IndexedDbValidNumberKeys<TableSchema>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L158)

Since v4.0.0

# utils

## IndexedDbQuery (namespace)

Namespace containing the typed IndexedDB query model interfaces and helper types.

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L167)

Since v4.0.0

### From (interface)

Query entry point for a table, exposing clear, select, count, delete, insert, and upsert operations.

**Signature**

```ts
export interface From<Table extends IndexedDbTable.AnyWithProps> {
  readonly table: Table
  readonly database: MutableRef.MutableRef<globalThis.IDBDatabase>
  readonly IDBKeyRange: typeof globalThis.IDBKeyRange
  readonly reactivity: Reactivity.Reactivity["Service"]

  readonly clear: Effect.Effect<void, IndexedDbQueryError>

  readonly select: {
    <Index extends IndexedDbDatabase.IndexFromTable<Table>>(index: Index): Select<Table, Index>
    (): Select<Table, never>
  }

  /** @internal */
  readonly selectCache: Map<string | undefined, IndexedDbQuery.Select<any, never>>

  readonly count: {
    <Index extends IndexedDbDatabase.IndexFromTable<Table>>(index: Index): Count<Table, Index>
    (): Count<Table, never>
  }

  /** @internal */
  readonly countCache: Map<string | undefined, IndexedDbQuery.Count<any, never>>

  readonly delete: {
    <Index extends IndexedDbDatabase.IndexFromTable<Table>>(index: Index): DeletePartial<Table, Index>
    (): DeletePartial<Table, never>
  }

  /** @internal */
  readonly deleteCache: Map<string | undefined, IndexedDbQuery.DeletePartial<any, never>>

  readonly insert: (value: ModifyWithKey<Table>) => Modify<Table>
  readonly insertAll: (values: Array<ModifyWithKey<Table>>) => ModifyAll<Table>
  readonly upsert: (value: ModifyWithKey<Table>) => Modify<Table>
  readonly upsertAll: (values: Array<ModifyWithKey<Table>>) => ModifyAll<Table>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L262)

Since v4.0.0

### Clear (interface)

Effect model for clearing all rows from a table.

**Signature**

```ts
export interface Clear<Table extends IndexedDbTable.AnyWithProps> extends Effect.Effect<void, IndexedDbQueryError> {
  readonly from: From<Table>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L325)

Since v4.0.0

### Count (interface)

Effect model for counting table rows, optionally constrained by an index and key-range comparisons.

**Signature**

```ts
export interface Count<
  Table extends IndexedDbTable.AnyWithProps,
  Index extends IndexedDbDatabase.IndexFromTable<Table>
> extends Effect.Effect<number, IndexedDbQueryError> {
  readonly from: From<Table>
  readonly index?: Index
  readonly only?: ExtractIndexType<Table, Index>
  readonly lowerBound?: ExtractIndexType<Table, Index>
  readonly upperBound?: ExtractIndexType<Table, Index>
  readonly excludeLowerBound?: boolean
  readonly excludeUpperBound?: boolean

  readonly equals: (value: EqualsType<Table, Index>) => Omit<Count<Table, Index>, ComparisonKeys>

  readonly gte: (value: ExtractIndexType<Table, Index>) => Omit<Count<Table, Index>, ComparisonKeys>

  readonly lte: (value: ExtractIndexType<Table, Index>) => Omit<Count<Table, Index>, ComparisonKeys>

  readonly gt: (value: ExtractIndexType<Table, Index>) => Omit<Count<Table, Index>, ComparisonKeys>

  readonly lt: (value: ExtractIndexType<Table, Index>) => Omit<Count<Table, Index>, ComparisonKeys>

  readonly between: (
    lowerBound: ExtractIndexType<Table, Index>,
    upperBound: ExtractIndexType<Table, Index>,
    options?: { excludeLowerBound?: boolean; excludeUpperBound?: boolean }
  ) => Omit<Count<Table, Index>, ComparisonKeys>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L339)

Since v4.0.0

### DeletePartial (interface)

Intermediate delete builder used to choose a key range or limit before producing an executable delete query.

**Signature**

```ts
export interface DeletePartial<
  Table extends IndexedDbTable.AnyWithProps,
  Index extends IndexedDbDatabase.IndexFromTable<Table>
> {
  readonly from: From<Table>
  readonly index?: Index

  readonly equals: (value: EqualsType<Table, Index>) => Delete<Table, Index>

  readonly gte: (value: ExtractIndexType<Table, Index>) => Delete<Table, Index>

  readonly lte: (value: ExtractIndexType<Table, Index>) => Delete<Table, Index>

  readonly gt: (value: ExtractIndexType<Table, Index>) => Delete<Table, Index>

  readonly lt: (value: ExtractIndexType<Table, Index>) => Delete<Table, Index>

  readonly between: (
    lowerBound: ExtractIndexType<Table, Index>,
    upperBound: ExtractIndexType<Table, Index>,
    options?: { excludeLowerBound?: boolean; excludeUpperBound?: boolean }
  ) => Delete<Table, Index>

  readonly limit: (limit: number) => DeleteWithout<Table, Index, "limit">
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L384)

Since v4.0.0

### Delete (interface)

Effect model for deleting rows from a table, with optional key-range, limit, filter, and reactivity invalidation helpers.

**Signature**

```ts
export interface Delete<
  Table extends IndexedDbTable.AnyWithProps,
  Index extends IndexedDbDatabase.IndexFromTable<Table>,
  ExcludedKeys extends string = never
> extends Effect.Effect<void, IndexedDbQueryError> {
  readonly delete: DeletePartial<Table, Index>
  readonly index?: Index
  readonly limitValue?: number
  readonly only?: ExtractIndexType<Table, Index>
  readonly lowerBound?: ExtractIndexType<Table, Index>
  readonly upperBound?: ExtractIndexType<Table, Index>
  readonly excludeLowerBound?: boolean
  readonly excludeUpperBound?: boolean
  readonly predicate?: (item: IndexedDbTable.Encoded<Table>) => boolean

  readonly limit: (limit: number) => DeleteWithout<Table, Index, ExcludedKeys | "limit">

  readonly filter: (f: (value: IndexedDbTable.Encoded<Table>) => boolean) => DeleteWithout<Table, Index, ExcludedKeys>

  /**
   * Invalidate any queries using Reactivity service with the provided keys.
   *
   * **Details**
   *
   * If no keys are provided, the table name is used as the reactivity key.
   */
  readonly invalidate: (
    keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
  ) => Effect.Effect<void, IndexedDbQueryError, IndexedDbTable.Context<Table>>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L434)

Since v4.0.0

### Select (interface)

Effect model for selecting rows from a table, with chainable range, paging, filtering, streaming, and reactive query helpers.

**Signature**

```ts
export interface Select<
  Table extends IndexedDbTable.AnyWithProps,
  Index extends IndexedDbDatabase.IndexFromTable<Table>,
  ExcludedKeys extends string = never
> extends Effect.Effect<Array<SelectType<Table>>, IndexedDbQueryError, IndexedDbTable.Context<Table>> {
  readonly from: From<Table>
  readonly index?: Index
  readonly limitValue?: number
  readonly offsetValue?: number
  readonly reverseValue?: boolean
  readonly only?: ExtractIndexType<Table, Index>
  readonly lowerBound?: ExtractIndexType<Table, Index>
  readonly upperBound?: ExtractIndexType<Table, Index>
  readonly excludeLowerBound?: boolean
  readonly excludeUpperBound?: boolean
  readonly predicate?: (item: IndexedDbTable.Encoded<Table>) => boolean

  readonly equals: (value: EqualsType<Table, Index>) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

  readonly gte: (value: ExtractIndexType<Table, Index>) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

  readonly lte: (value: ExtractIndexType<Table, Index>) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

  readonly gt: (value: ExtractIndexType<Table, Index>) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

  readonly lt: (value: ExtractIndexType<Table, Index>) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

  readonly between: (
    lowerBound: ExtractIndexType<Table, Index>,
    upperBound: ExtractIndexType<Table, Index>,
    options?: { excludeLowerBound?: boolean; excludeUpperBound?: boolean }
  ) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

  readonly limit: (limit: number) => SelectWithout<Table, Index, ExcludedKeys | "limit" | "first">

  readonly offset: (offset: number) => SelectWithout<Table, Index, ExcludedKeys | "offset" | "first">

  readonly reverse: () => SelectWithout<Table, Index, ExcludedKeys | "reverse" | "first">

  readonly filter: (
    f: (value: IndexedDbTable.Encoded<Table>) => boolean
  ) => SelectWithout<Table, Index, ExcludedKeys | "first">

  readonly first: () => First<Table, Index>

  /**
   * Stream the selected data.
   *
   * **Details**
   *
   * The default chunk size is 100.
   */
  readonly stream: (options?: {
    readonly chunkSize?: number | undefined
  }) => Stream.Stream<SelectType<Table>, IndexedDbQueryError, IndexedDbTable.Context<Table>>

  /**
   * Use the Reactivity service to react to changes to the selected data.
   *
   * **Details**
   *
   * By default, the table name is used as the reactivity key.
   */
  readonly reactive: (
    keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
  ) => Stream.Stream<Array<SelectType<Table>>, IndexedDbQueryError, IndexedDbTable.Context<Table>>
  readonly reactiveQueue: (
    keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
  ) => Effect.Effect<
    Queue.Dequeue<Array<SelectType<Table>>, IndexedDbQueryError>,
    never,
    Scope.Scope | IndexedDbTable.Context<Table>
  >
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L481)

Since v4.0.0

### First (interface)

Effect model for selecting the first matching row, failing with `NoSuchElementError` when no row is found.

**Signature**

```ts
export interface First<
  Table extends IndexedDbTable.AnyWithProps,
  Index extends IndexedDbDatabase.IndexFromTable<Table>
> extends Effect.Effect<
  SelectType<Table>,
  IndexedDbQueryError | Cause.NoSuchElementError,
  IndexedDbTable.Context<Table>
> {
  readonly select: Select<Table, Index>

  /**
   * Use the Reactivity service to react to changes to the selected data.
   *
   * **Details**
   *
   * By default, the table name is used as the reactivity key.
   */
  readonly reactive: (
    keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
  ) => Stream.Stream<SelectType<Table>, IndexedDbQueryError | Cause.NoSuchElementError, IndexedDbTable.Context<Table>>

  /**
   * Use the Reactivity service to react to changes to the selected data.
   *
   * **Details**
   *
   * By default, the table name is used as the reactivity key.
   */
  readonly reactiveQueue: (
    keys: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>>
  ) => Effect.Effect<
    Queue.Dequeue<SelectType<Table>, IndexedDbQueryError | Cause.NoSuchElementError>,
    never,
    Scope.Scope | IndexedDbTable.Context<Table>
  >
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L590)

Since v4.0.0

### Filter (interface)

Effect model for a select query filtered by one or more predicates over encoded table rows.

**Signature**

```ts
export interface Filter<
  Table extends IndexedDbTable.AnyWithProps,
  Index extends IndexedDbDatabase.IndexFromTable<Table>
> extends Effect.Effect<Array<SelectType<Table>>, IndexedDbQueryError, IndexedDbTable.Context<Table>> {
  readonly select: Select<Table, Index>
  readonly predicate: (item: IndexedDbTable.Encoded<Table>) => boolean
  readonly filter: (f: (value: IndexedDbTable.Encoded<Table>) => boolean) => Filter<Table, Index>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L639)

Since v4.0.0

### Modify (interface)

Effect model for inserting or upserting one row, returning the resulting IndexedDB key and supporting reactivity invalidation.

**Signature**

```ts
export interface Modify<Table extends IndexedDbTable.AnyWithProps> extends Effect.Effect<
  globalThis.IDBValidKey,
  IndexedDbQueryError,
  IndexedDbTable.Context<Table>
> {
  readonly operation: "add" | "put"
  readonly from: From<Table>
  readonly value: ModifyWithKey<Table>

  /**
   * Invalidate any queries using Reactivity service with the provided keys.
   *
   * **Details**
   *
   * If no keys are provided, the table name is used as the reactivity key.
   */
  readonly invalidate: (
    keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
  ) => Effect.Effect<globalThis.IDBValidKey, IndexedDbQueryError, IndexedDbTable.Context<Table>>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L662)

Since v4.0.0

### ModifyAll (interface)

Effect model for inserting or upserting multiple rows, returning the resulting IndexedDB keys and supporting reactivity invalidation.

**Signature**

```ts
export interface ModifyAll<Table extends IndexedDbTable.AnyWithProps> extends Effect.Effect<
  Array<globalThis.IDBValidKey>,
  IndexedDbQueryError,
  IndexedDbTable.Context<Table>
> {
  readonly operation: "add" | "put"
  readonly from: From<Table>
  readonly values: Array<ModifyWithKey<Table>>

  /**
   * Invalidate any queries using Reactivity service with the provided keys.
   *
   * **Details**
   *
   * If no keys are provided, the table name is used as the reactivity key.
   */
  readonly invalidate: (
    keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
  ) => Effect.Effect<globalThis.IDBValidKey, IndexedDbQueryError, IndexedDbTable.Context<Table>>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L693)

Since v4.0.0

### SelectType (type alias)

Decoded row type returned by select queries, adding a `key` field when the table does not define a key path.

**Signature**

```ts
type SelectType<Table> = [IndexedDbTable.KeyPath<Table>] extends [undefined]
  ? IndexedDbTable.TableSchema<Table>["Type"] & {
      readonly key: (typeof IndexedDb.IDBValidKey)["Type"]
    }
  : IndexedDbTable.TableSchema<Table>["Type"]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L174)

Since v4.0.0

### ModifyType (type alias)

Input type for insert and upsert operations, adjusted for auto-increment keys and out-of-line keys.

**Signature**

```ts
type ModifyType<Table> = (IndexedDbTable.AutoIncrement<Table> extends true
  ? {
      [key in keyof Schema.Struct.MakeIn<
        Omit<IndexedDbTable.TableSchema<Table>["fields"], IndexedDbTable.KeyPath<Table>>
      >]: key extends keyof Schema.Struct.MakeIn<IndexedDbTable.TableSchema<Table>["fields"]>
        ? Schema.Struct.MakeIn<IndexedDbTable.TableSchema<Table>["fields"]>[key]
        : never
    } & {
      [key in IndexedDbTable.KeyPath<Table>]?: number | undefined
    }
  : Schema.Struct.MakeIn<IndexedDbTable.TableSchema<Table>["fields"]>) &
  ([IndexedDbTable.KeyPath<Table>] extends [undefined]
    ? {
        key: IDBValidKey
      }
    : {})
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L187)

Since v4.0.0

### EqualsType (type alias)

Value type accepted by `equals` comparisons for a table key path or index.

**Signature**

```ts
type EqualsType<Table, Index, KeyPath, Type> = KeyPath extends keyof Type
  ? Type[KeyPath]
  : { [I in keyof KeyPath]: KeyPath[I] extends keyof Type ? Type[KeyPath[I]] | [] : never }
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L221)

Since v4.0.0

### ExtractIndexType (type alias)

Value type accepted by range comparisons for a table key path or index, including partial tuples for compound indexes.

**Signature**

```ts
type ExtractIndexType<Table, Index, KeyPath, Type> = KeyPath extends keyof Type
  ? Type[KeyPath]
  : KeyPath extends readonly [infer K, ...infer Rest]
    ? K extends keyof Type
      ? [Type[K], ...{ [P in keyof Rest]?: Rest[P] extends keyof Type ? Type[Rest[P]] | [] : never }]
      : never
    : never
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L235)

Since v4.0.0

### ModifyWithKey (type alias)

Mutation input type for insert and upsert operations, including any required key fields.

**Signature**

```ts
type ModifyWithKey<Table> = ModifyType<Table>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbQueryBuilder.ts#L254)

Since v4.0.0
