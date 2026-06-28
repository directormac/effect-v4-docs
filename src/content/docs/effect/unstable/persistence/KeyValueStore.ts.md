---
title: KeyValueStore.ts
nav_order: 292
parent: "effect"
---

## KeyValueStore.ts overview

Provides effectful key/value storage for persistence backends.

`KeyValueStore` is a service for storing string or binary values by key. It
is useful for lightweight durable state, browser storage, local files, SQL
tables, tests, and as a storage building block for higher-level persistence
APIs. This module includes store operations, prefixed views, schema-aware JSON
storage, error values, and layers for memory, filesystem, Web Storage, and
SQL-backed stores.

Since v4.0.0

---

## Exports Grouped by Category

- [SchemaStore](#schemastore)
  - [SchemaStore (interface)](#schemastore-interface)
  - [toSchemaStore](#toschemastore)
- [combinators](#combinators)
  - [prefix](#prefix)
- [constructors](#constructors)
  - [make](#make)
  - [makeStringOnly](#makestringonly)
- [errors](#errors)
  - [KeyValueStoreError (class)](#keyvaluestoreerror-class)
    - [[ErrorTypeId] (property)](#errortypeid-property)
- [layers](#layers)
  - [LayerSqlOptions (interface)](#layersqloptions-interface)
  - [layerFileSystem](#layerfilesystem)
  - [layerMemory](#layermemory)
  - [layerSql](#layersql)
  - [layerStorage](#layerstorage)
- [models](#models)
  - [KeyValueStore (interface)](#keyvaluestore-interface)
- [options](#options)
  - [MakeOptions (type alias)](#makeoptions-type-alias)
  - [MakeStringOptions (type alias)](#makestringoptions-type-alias)
- [services](#services)
  - [KeyValueStore](#keyvaluestore)

---

# SchemaStore

## SchemaStore (interface)

Schema-aware view of a `KeyValueStore` that stores values as encoded JSON.

**Signature**

```ts
export interface SchemaStore<S extends Schema.Constraint> {
  readonly [SchemaStoreTypeId]: typeof SchemaStoreTypeId
  /**
   * Returns the value of the specified key if it exists.
   */
  readonly get: (
    key: string
  ) => Effect.Effect<Option.Option<S["Type"]>, KeyValueStoreError | Schema.SchemaError, S["DecodingServices"]>

  /**
   * Sets the value of the specified key.
   */
  readonly set: (
    key: string,
    value: S["Type"]
  ) => Effect.Effect<void, KeyValueStoreError | Schema.SchemaError, S["EncodingServices"]>

  /**
   * Removes the specified key.
   */
  readonly remove: (key: string) => Effect.Effect<void, KeyValueStoreError>

  /**
   * Removes all entries.
   */
  readonly clear: Effect.Effect<void, KeyValueStoreError>

  /**
   * Returns the number of entries.
   */
  readonly size: Effect.Effect<number, KeyValueStoreError>

  /**
   * Updates the value of the specified key if it exists.
   */
  readonly modify: (
    key: string,
    f: (value: S["Type"]) => S["Type"]
  ) => Effect.Effect<
    Option.Option<S["Type"]>,
    KeyValueStoreError | Schema.SchemaError,
    S["DecodingServices"] | S["EncodingServices"]
  >

  /**
   * Returns true if the KeyValueStore contains the specified key.
   */
  readonly has: (key: string) => Effect.Effect<boolean, KeyValueStoreError>

  /**
   * Checks whether the KeyValueStore contains any entries.
   */
  readonly isEmpty: Effect.Effect<boolean, KeyValueStoreError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L684)

Since v4.0.0

## toSchemaStore

Adapts a `KeyValueStore` into a `SchemaStore` using the schema's JSON codec.

**Signature**

```ts
declare const toSchemaStore: <S extends Schema.Constraint>(self: KeyValueStore, schema: S) => SchemaStore<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L745)

Since v4.0.0

# combinators

## prefix

Returns a view of a `KeyValueStore` that prepends the given prefix to every
key.

**Signature**

```ts
declare const prefix: {
  (prefix: string): (self: KeyValueStore) => KeyValueStore
  (self: KeyValueStore, prefix: string): KeyValueStore
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L297)

Since v4.0.0

# constructors

## make

Constructs a `KeyValueStore` from primitive store operations.

**Details**

Default implementations are derived for `has`, `isEmpty`, `modify`, and
`modifyUint8Array` unless they are provided in the options.

**Signature**

```ts
declare const make: (options: MakeOptions) => KeyValueStore
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L224)

Since v4.0.0

## makeStringOnly

Adapts a string-only backing store into a `KeyValueStore`.

**Details**

`Uint8Array` values are stored as base64 strings. `getUint8Array` decodes
base64 values and falls back to UTF-8 encoding for non-base64 strings.

**Signature**

```ts
declare const makeStringOnly: (options: MakeStringOptions) => KeyValueStore
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L268)

Since v4.0.0

# errors

## KeyValueStoreError (class)

Error raised by key/value store operations, including the failed method,
optional key, message, and cause.

**Signature**

```ts
declare class KeyValueStoreError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L183)

Since v4.0.0

### [ErrorTypeId] (property)

Marks this value as a key-value store error for runtime guards.

**Signature**

```ts
readonly [ErrorTypeId]: "~effect/persistence/KeyValueStore/KeyValueStoreError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L194)

Since v4.0.0

# layers

## LayerSqlOptions (interface)

Options for configuring the SQL-backed `KeyValueStore` layer.

**Signature**

```ts
export interface LayerSqlOptions {
  /**
   * The SQL table name used to store values.
   *
   * @default "effect_key_value_store"
   */
  readonly table?: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L452)

Since v4.0.0

## layerFileSystem

Provides a `KeyValueStore` backed by files in the specified directory.

**Details**

The directory is created if needed, and each key is encoded as a file name.

**Signature**

```ts
declare const layerFileSystem: (
  directory: string
) => Layer.Layer<KeyValueStore, PlatformError, FileSystem.FileSystem | Path.Path>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L349)

Since v4.0.0

## layerMemory

Provides a process-local in-memory `KeyValueStore` backed by a `Map`.

**Signature**

```ts
declare const layerMemory: Layer.Layer<KeyValueStore, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L317)

Since v4.0.0

## layerSql

Provides a SQL-backed `KeyValueStore`.

**Details**

The layer creates the configured table if it does not exist and stores both
string and binary values through the current `SqlClient`.

**Signature**

```ts
declare const layerSql: (options?: LayerSqlOptions) => Layer.Layer<KeyValueStore, never, SqlClient.SqlClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L472)

Since v4.0.0

## layerStorage

Provides a `KeyValueStore` backed by a Web `Storage` instance such as
`localStorage` or `sessionStorage`.

**Details**

This layer uses the Web Storage API:
https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

**Signature**

```ts
declare const layerStorage: (evaluate: LazyArg<Storage>) => Layer.Layer<KeyValueStore>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L802)

Since v4.0.0

# models

## KeyValueStore (interface)

Effectful key/value store service for string and binary values.

**Signature**

```ts
export interface KeyValueStore {
  readonly [TypeId]: typeof TypeId
  /**
   * Returns the value of the specified key if it exists.
   */
  readonly get: (key: string) => Effect.Effect<string | undefined, KeyValueStoreError>

  /**
   * Returns the value of the specified key if it exists.
   */
  readonly getUint8Array: (key: string) => Effect.Effect<Uint8Array | undefined, KeyValueStoreError>

  /**
   * Sets the value of the specified key.
   */
  readonly set: (key: string, value: string | Uint8Array) => Effect.Effect<void, KeyValueStoreError>

  /**
   * Removes the specified key.
   */
  readonly remove: (key: string) => Effect.Effect<void, KeyValueStoreError>

  /**
   * Removes all entries.
   */
  readonly clear: Effect.Effect<void, KeyValueStoreError>

  /**
   * Returns the number of entries.
   */
  readonly size: Effect.Effect<number, KeyValueStoreError>

  /**
   * Updates the value of the specified key if it exists.
   */
  readonly modify: (key: string, f: (value: string) => string) => Effect.Effect<string | undefined, KeyValueStoreError>

  /**
   * Updates the value of the specified key if it exists.
   */
  readonly modifyUint8Array: (
    key: string,
    f: (value: Uint8Array) => Uint8Array
  ) => Effect.Effect<Uint8Array | undefined, KeyValueStoreError>

  /**
   * Returns true if the KeyValueStore contains the specified key.
   */
  readonly has: (key: string) => Effect.Effect<boolean, KeyValueStoreError>

  /**
   * Checks whether the KeyValueStore contains any entries.
   */
  readonly isEmpty: Effect.Effect<boolean, KeyValueStoreError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L38)

Since v4.0.0

# options

## MakeOptions (type alias)

Implementation callbacks used by `make` to construct a `KeyValueStore`.

**Details**

Primitive operations are required, while helpers such as `has`, `isEmpty`,
and `modify` can be supplied to override the defaults.

**Signature**

```ts
type MakeOptions = Partial<KeyValueStore> & {
  /**
   * Returns the value of the specified key if it exists.
   */
  readonly get: (key: string) => Effect.Effect<string | undefined, KeyValueStoreError>

  /**
   * Returns the value of the specified key if it exists.
   */
  readonly getUint8Array: (key: string) => Effect.Effect<Uint8Array | undefined, KeyValueStoreError>

  /**
   * Sets the value of the specified key.
   */
  readonly set: (key: string, value: string | Uint8Array) => Effect.Effect<void, KeyValueStoreError>

  /**
   * Removes the specified key.
   */
  readonly remove: (key: string) => Effect.Effect<void, KeyValueStoreError>

  /**
   * Removes all entries.
   */
  readonly clear: Effect.Effect<void, KeyValueStoreError>

  /**
   * Returns the number of entries.
   */
  readonly size: Effect.Effect<number, KeyValueStoreError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L108)

Since v4.0.0

## MakeStringOptions (type alias)

Implementation callbacks for adapting a string-only backing store into a
`KeyValueStore`.

**Signature**

```ts
type MakeStringOptions = Partial<Omit<KeyValueStore, "set">> & {
  /**
   * Returns the value of the specified key if it exists.
   */
  readonly get: (key: string) => Effect.Effect<string | undefined, KeyValueStoreError>

  /**
   * Sets the value of the specified key.
   */
  readonly set: (key: string, value: string) => Effect.Effect<void, KeyValueStoreError>

  /**
   * Removes the specified key.
   */
  readonly remove: (key: string) => Effect.Effect<void, KeyValueStoreError>

  /**
   * Removes all entries.
   */
  readonly clear: Effect.Effect<void, KeyValueStoreError>

  /**
   * Returns the number of entries.
   */
  readonly size: Effect.Effect<number, KeyValueStoreError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L147)

Since v4.0.0

# services

## KeyValueStore

Service tag for string and binary key/value storage.

**When to use**

Use to access or provide the persistence store used for lightweight durable
state.

**Signature**

```ts
declare const KeyValueStore: Context.Service<KeyValueStore, KeyValueStore>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/KeyValueStore.ts#L208)

Since v4.0.0
