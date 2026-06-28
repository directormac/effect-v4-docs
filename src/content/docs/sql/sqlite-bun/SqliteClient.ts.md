---
title: SqliteClient.ts
nav_order: 2
parent: "@effect/sql-sqlite-bun"
---

## SqliteClient.ts overview

Connects Effect SQL to SQLite when running on Bun, using `bun:sqlite`.

This module opens a SQLite database and exposes it as both `SqliteClient` and
the generic Effect SQL client. It serializes access to the database, enables
WAL mode unless disabled, and supports database export and extension loading.
Streaming queries and `updateValues` are not supported by this driver.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [models](#models)
  - [SqliteClient (interface)](#sqliteclient-interface)
  - [SqliteClientConfig (interface)](#sqliteclientconfig-interface)
- [services](#services)
  - [SqliteClient](#sqliteclient)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## make

Creates a scoped Bun SQLite client for a database file, enabling WAL by default and serializing access. Streaming queries are not implemented.

**Signature**

```ts
declare const make: (
  options: SqliteClientConfig
) => Effect.Effect<SqliteClient, never, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-bun/src/SqliteClient.ts#L106)

Since v4.0.0

# layers

## layer

Creates a layer from a concrete Bun SQLite client configuration, providing both `SqliteClient` and `SqlClient`.

**Signature**

```ts
declare const layer: (config: SqliteClientConfig) => Layer.Layer<SqliteClient | Client.SqlClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-bun/src/SqliteClient.ts#L260)

Since v4.0.0

## layerConfig

Creates a layer from a `Config`-wrapped Bun SQLite client configuration, providing both `SqliteClient` and `SqlClient`.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<SqliteClientConfig>
) => Layer.Layer<SqliteClient | Client.SqlClient, Config.ConfigError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-bun/src/SqliteClient.ts#L240)

Since v4.0.0

# models

## SqliteClient (interface)

Bun SQLite client service, extending `SqlClient` with database export and extension loading helpers. `updateValues` is not supported.

**Signature**

```ts
export interface SqliteClient extends Client.SqlClient {
  readonly [TypeId]: TypeId
  readonly config: SqliteClientConfig
  readonly export: Effect.Effect<Uint8Array, SqlError>
  readonly loadExtension: (path: string) => Effect.Effect<void, SqlError>

  /** Not supported in sqlite */
  readonly updateValues: never
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-bun/src/SqliteClient.ts#L54)

Since v4.0.0

## SqliteClientConfig (interface)

Configuration for a Bun SQLite client, including filename, open mode flags, WAL behavior, span attributes, and query/result name transforms.

**Signature**

```ts
export interface SqliteClientConfig {
  readonly filename: string
  readonly readonly?: boolean | undefined
  readonly create?: boolean | undefined
  readonly readwrite?: boolean | undefined
  readonly disableWAL?: boolean | undefined

  readonly spanAttributes?: Record<string, unknown> | undefined

  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-bun/src/SqliteClient.ts#L82)

Since v4.0.0

# services

## SqliteClient

Service tag for the Bun SQLite client service.

**When to use**

Use to access or provide a Bun SQLite client through the Effect context.

**Signature**

```ts
declare const SqliteClient: Context.Service<SqliteClient, SqliteClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-bun/src/SqliteClient.ts#L74)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark Bun `SqliteClient` values.

**Signature**

```ts
declare const TypeId: "~@effect/sql-sqlite-bun/SqliteClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-bun/src/SqliteClient.ts#L38)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to mark Bun `SqliteClient` values.

**Signature**

```ts
type TypeId = "~@effect/sql-sqlite-bun/SqliteClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-bun/src/SqliteClient.ts#L46)

Since v4.0.0
