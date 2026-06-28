---
title: SqliteClient.ts
nav_order: 2
parent: "@effect/sql-sqlite-node"
---

## SqliteClient.ts overview

Connects Effect SQL to SQLite on Node.js using `better-sqlite3`.

This module opens a SQLite database and exposes it as both `SqliteClient` and
the generic Effect SQL client. It serializes access through one connection,
caches prepared statements, enables WAL mode unless disabled, and supports
database export, backup, and extension loading. Streaming queries and
`updateValues` are not supported by this driver.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [models](#models)
  - [BackupMetadata (interface)](#backupmetadata-interface)
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

Creates a scoped node SQLite client from the supplied configuration, using a single serialized connection with WAL enabled by default and exposing SQLite-specific `export`, `backup`, and `loadExtension` operations.

**Signature**

```ts
declare const make: (
  options: SqliteClientConfig
) => Effect.Effect<SqliteClient, never, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-node/src/SqliteClient.ts#L117)

Since v4.0.0

# layers

## layer

Builds a layer from a node SQLite client configuration, providing both `SqliteClient` and the generic `SqlClient` service.

**Signature**

```ts
declare const layer: (config: SqliteClientConfig) => Layer.Layer<SqliteClient | Client.SqlClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-node/src/SqliteClient.ts#L326)

Since v4.0.0

## layerConfig

Builds a layer from an Effect `Config` value, providing both the node `SqliteClient` service and the generic `SqlClient` service.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<SqliteClientConfig>
) => Layer.Layer<SqliteClient | Client.SqlClient, Config.ConfigError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-node/src/SqliteClient.ts#L306)

Since v4.0.0

# models

## BackupMetadata (interface)

Metadata returned from a Node SQLite backup operation, reporting total and remaining page counts.

**Signature**

```ts
export interface BackupMetadata {
  readonly totalPages: number
  readonly remainingPages: number
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-node/src/SqliteClient.ts#L74)

Since v4.0.0

## SqliteClient (interface)

Node SQLite client service, extending `SqlClient` with database export, backup, and extension loading helpers. `updateValues` is not supported.

**Signature**

```ts
export interface SqliteClient extends Client.SqlClient {
  readonly [TypeId]: TypeId
  readonly config: SqliteClientConfig
  readonly export: Effect.Effect<Uint8Array, SqlError>
  readonly backup: (destination: string) => Effect.Effect<BackupMetadata, SqlError>
  readonly loadExtension: (path: string) => Effect.Effect<void, SqlError>

  /** Not supported in sqlite */
  readonly updateValues: never
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-node/src/SqliteClient.ts#L57)

Since v4.0.0

## SqliteClientConfig (interface)

Configuration for a node SQLite client backed by `better-sqlite3`, including the database filename, read-only mode, statement cache settings, WAL behavior, span attributes, and query/result name transforms.

**Signature**

```ts
export interface SqliteClientConfig {
  readonly filename: string
  readonly readonly?: boolean | undefined
  readonly prepareCacheSize?: number | undefined
  readonly prepareCacheTTL?: Duration.Input | undefined
  readonly disableWAL?: boolean | undefined
  readonly spanAttributes?: Record<string, unknown> | undefined

  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-node/src/SqliteClient.ts#L93)

Since v4.0.0

# services

## SqliteClient

Service tag for the node SQLite client implementation.

**Signature**

```ts
declare const SqliteClient: Context.Service<SqliteClient, SqliteClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-node/src/SqliteClient.ts#L85)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark Node `SqliteClient` values.

**Signature**

```ts
declare const TypeId: "~@effect/sql-sqlite-node/SqliteClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-node/src/SqliteClient.ts#L41)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to mark Node `SqliteClient` values.

**Signature**

```ts
type TypeId = "~@effect/sql-sqlite-node/SqliteClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-node/src/SqliteClient.ts#L49)

Since v4.0.0
