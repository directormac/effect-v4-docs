---
title: SqliteClient.ts
nav_order: 2
parent: "@effect/sql-sqlite-do"
---

## SqliteClient.ts overview

Connects Effect SQL to SQLite storage inside Cloudflare Durable Objects.

This module adapts a Durable Object `SqlStorage` handle into both the
Durable Object-specific `SqliteClient` service and the generic Effect
`SqlClient` service. Use it from inside a Durable Object to run local
per-object queries, repositories, migrations, transactional read/write
workflows, and tests that exercise Cloudflare's SQLite-backed storage API.

Durable Object SQLite storage is scoped to one object id, so each object
instance has its own database. Callers can pass the `SqlStorage` handle for
normal queries, or the full `DurableObjectStorage` when `withTransaction` or
migrations need Cloudflare-managed transactions. This adapter serializes
Effect SQL access through one connection; a transaction holds that permit for
the lifetime of its scope, so keep transactions short, avoid suspending them
across unrelated work, and use them when multi-statement writes must commit
atomically. `SqlStorage.exec` returns `ArrayBuffer` values
for SQLite blobs, which this client normalizes to `Uint8Array`, and SQLite
does not support `updateValues`.

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

Creates a scoped Cloudflare Durable Object SQLite client around Durable Object SQLite storage, serializing access and converting returned `ArrayBuffer` values to `Uint8Array`.

**Signature**

```ts
declare const make: (
  options: SqliteClientConfig
) => Effect.Effect<SqliteClient, never, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L176)

Since v4.0.0

# layers

## layer

Creates a layer from a concrete Durable Object SQLite client configuration, providing both `SqliteClient` and `SqlClient`.

**Signature**

```ts
declare const layer: (config: SqliteClientConfig) => Layer.Layer<SqliteClient | Client.SqlClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L333)

Since v4.0.0

## layerConfig

Creates a layer from a `Config`-wrapped Durable Object SQLite client configuration, providing both `SqliteClient` and `SqlClient`.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<SqliteClientConfig>
) => Layer.Layer<SqliteClient | Client.SqlClient, Config.ConfigError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L313)

Since v4.0.0

# models

## SqliteClient (interface)

Cloudflare Durable Object SQLite client service, extending `SqlClient` with its configuration. `updateValues` is not supported.

**Signature**

```ts
export interface SqliteClient extends Client.SqlClient {
  readonly [TypeId]: TypeId
  readonly config: SqliteClientConfig

  /** Not supported in sqlite */
  readonly updateValues: never
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L67)

Since v4.0.0

## SqliteClientConfig (interface)

Configuration for a Cloudflare Durable Object SQLite client, including either a `SqlStorage` handle or the full `DurableObjectStorage` for transaction support, span attributes, and query/result name transforms.

**Signature**

```ts
export interface SqliteClientConfig {
  readonly db?: SqlStorage | undefined
  readonly storage?: DurableObjectStorage | undefined
  readonly spanAttributes?: Record<string, unknown> | undefined

  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L98)

Since v4.0.0

# services

## SqliteClient

Service tag for the Cloudflare Durable Object SQLite client service.

**When to use**

Use to access or provide a Durable Object SQLite client through the Effect
context.

**Signature**

```ts
declare const SqliteClient: Context.Service<SqliteClient, SqliteClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L86)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark Cloudflare Durable Object `SqliteClient` values.

**Signature**

```ts
declare const TypeId: "~@effect/sql-sqlite-do/SqliteClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L51)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to mark Cloudflare Durable Object `SqliteClient` values.

**Signature**

```ts
type TypeId = "~@effect/sql-sqlite-do/SqliteClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L59)

Since v4.0.0
