---
title: IndexedDbTable.ts
nav_order: 16
parent: "@effect/platform-browser"
---

## IndexedDbTable.ts overview

Typed object-store descriptors for the browser IndexedDB integration.

An `IndexedDbTable` is the schema-backed description of one IndexedDB
object store. It carries the store name, row schema, key path, index key
paths, auto-increment mode, and transaction durability used by database
versions, migrations, and typed queries. The `make` constructor also derives
the read, array, and auto-increment write schemas used by the query builder.

**See**

- `make` for constructing table descriptors.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [interface](#interface)
  - [IndexedDbTable (interface)](#indexeddbtable-interface)
- [models](#models)
  - [Any (interface)](#any-interface)
  - [AnySchemaStruct (type alias)](#anyschemastruct-type-alias)
  - [AnyWithProps (type alias)](#anywithprops-type-alias)
  - [AutoIncrement (type alias)](#autoincrement-type-alias)
  - [Context (type alias)](#context-type-alias)
  - [Encoded (type alias)](#encoded-type-alias)
  - [Indexes (type alias)](#indexes-type-alias)
  - [KeyPath (type alias)](#keypath-type-alias)
  - [TableName (type alias)](#tablename-type-alias)
  - [TableSchema (type alias)](#tableschema-type-alias)
  - [WithName (type alias)](#withname-type-alias)

---

# constructors

## make

Creates a typed IndexedDB table definition from its name, schema, optional key path, indexes, auto-increment flag, and durability.

**When to use**

Use to define a typed object-store descriptor for inclusion in an
`IndexedDbVersion` and for migration or query APIs.

**Details**

`autoIncrement` defaults to `false` and `durability` defaults to `"relaxed"`.
Tables without a key path get a read schema that includes an out-of-line
`key`, while auto-increment tables use a write schema where the generated key
may be omitted.

**Gotchas**

Tables without a key path cannot define a `key` field in their row schema.
Key paths and index paths must point to encoded fields whose values are valid
IndexedDB keys, and declared indexes still need to be created during
database migrations.

**See**

- `IndexedDbVersion.make` for grouping table definitions into a schema version

**Signature**

```ts
declare const make: <
  const Name extends string,
  TableSchema extends AnySchemaStruct,
  const Indexes extends Record<string, IndexedDbQueryBuilder.KeyPath<TableSchema>>,
  const KeyPath extends
    | (AutoIncrement extends true
        ? IndexedDbQueryBuilder.KeyPathNumber<NoInfer<TableSchema>>
        : IndexedDbQueryBuilder.KeyPath<NoInfer<TableSchema>>)
    | undefined = undefined,
  const AutoIncrement extends boolean = false
>(options: {
  readonly name: Name
  readonly schema: [KeyPath] extends [undefined]
    ? "key" extends keyof TableSchema["fields"]
      ? "Cannot have a 'key' field when keyPath is undefined"
      : TableSchema
    : TableSchema
  readonly keyPath?: KeyPath
  readonly indexes?: Indexes | undefined
  readonly autoIncrement?: IsValidAutoIncrementKeyPath<TableSchema, KeyPath> extends true
    ? AutoIncrement | undefined
    : never
  readonly durability?: IDBTransactionDurability | undefined
}) => IndexedDbTable<Name, TableSchema, Indexes, Extract<KeyPath, Readonly<IDBValidKey | undefined>>, AutoIncrement>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L195)

Since v4.0.0

# interface

## IndexedDbTable (interface)

Typed IndexedDB table definition containing its name, schema, key path, indexes, auto-increment setting, and transaction durability.

**Signature**

```ts
export interface IndexedDbTable<
  out Name extends string,
  out TableSchema extends AnySchemaStruct,
  out Indexes extends Record<string, IndexedDbQueryBuilder.KeyPath<TableSchema>>,
  out KeyPath extends Readonly<IDBValidKey | undefined>,
  out AutoIncrement extends boolean
> extends Pipeable {
  new (_: never): {}
  readonly [TypeId]: typeof TypeId
  readonly tableName: Name
  readonly tableSchema: TableSchema
  readonly readSchema: Schema.Top
  readonly autoincrementSchema: Schema.Top
  readonly arraySchema: Schema.Top
  readonly keyPath: KeyPath
  readonly indexes: Indexes
  readonly autoIncrement: AutoIncrement
  readonly durability: IDBTransactionDurability
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L29)

Since v4.0.0

# models

## Any (interface)

Type-erased shape of an `IndexedDbTable` used when table type parameters are not needed.

**Signature**

```ts
export interface Any {
  readonly [TypeId]: typeof TypeId
  readonly keyPath: any
  readonly tableName: string
  readonly tableSchema: Schema.Top
  readonly readSchema: Schema.Top
  readonly autoincrementSchema: Schema.Top
  readonly arraySchema: Schema.Top
  readonly autoIncrement: boolean
  readonly indexes: any
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L68)

Since v4.0.0

## AnySchemaStruct (type alias)

Schema constraint for table schemas that expose struct fields.

**Signature**

```ts
type AnySchemaStruct = Schema.Top & {
  readonly fields: Schema.Struct.Fields
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L58)

Since v4.0.0

## AnyWithProps (type alias)

Type-erased `IndexedDbTable` retaining the table interface properties with broad type parameters.

**Signature**

```ts
type AnyWithProps = IndexedDbTable<string, AnySchemaStruct, any, any, boolean>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L86)

Since v4.0.0

## AutoIncrement (type alias)

Extracts the auto-increment flag type from an `IndexedDbTable`.

**Signature**

```ts
type AutoIncrement<Table> = Table["autoIncrement"]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L115)

Since v4.0.0

## Context (type alias)

Extracts the decoding or encoding service requirements needed by an `IndexedDbTable` schema.

**Signature**

```ts
type Context<Table> = Table["tableSchema"]["DecodingServices"] | Table["tableSchema"]["EncodingServices"]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L130)

Since v4.0.0

## Encoded (type alias)

Extracts the encoded row type from an `IndexedDbTable` schema.

**Signature**

```ts
type Encoded<Table> = Table["tableSchema"]["Encoded"]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L140)

Since v4.0.0

## Indexes (type alias)

Extracts the index definition map from an `IndexedDbTable`.

**Signature**

```ts
type Indexes<Table> = Table["indexes"]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L148)

Since v4.0.0

## KeyPath (type alias)

Extracts the key-path type from an `IndexedDbTable`.

**Signature**

```ts
type KeyPath<Table> = Table["keyPath"]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L107)

Since v4.0.0

## TableName (type alias)

Extracts the table name type from an `IndexedDbTable`.

**Signature**

```ts
type TableName<Table> = Table["tableName"]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L100)

Since v4.0.0

## TableSchema (type alias)

Extracts the schema type from an `IndexedDbTable`.

**Signature**

```ts
type TableSchema<Table> = Table["tableSchema"]
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L123)

Since v4.0.0

## WithName (type alias)

Selects the table with the given name from a union of `IndexedDbTable` types.

**Signature**

```ts
type WithName<Table, TableName> = Extract<Table, { readonly tableName: TableName }>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/IndexedDbTable.ts#L156)

Since v4.0.0
