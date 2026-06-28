---
title: ClickhouseClient.ts
nav_order: 1
parent: "@effect/sql-clickhouse"
---

## ClickhouseClient.ts overview

ClickHouse driver for Effect SQL, backed by `@clickhouse/client`.

This module provides both the ClickHouse-specific `ClickhouseClient`
service and the generic `Client.SqlClient` service. `make` creates a
scoped client, checks the connection with `SELECT 1`, maps ClickHouse errors
to `SqlError`, and aborts in-flight queries when interrupted. The
ClickHouse-specific service adds typed parameters, command execution, insert
queries, query id and settings helpers, a statement compiler, and direct or
config-backed layers.

Since v4.0.0

---

## Exports Grouped by Category

- [compiler](#compiler)
  - [makeCompiler](#makecompiler)
- [constructors](#constructors)
  - [ClickhouseClientConfig (interface)](#clickhouseclientconfig-interface)
  - [make](#make)
- [custom types](#custom-types)
  - [ClickhouseCustom (type alias)](#clickhousecustom-type-alias)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [models](#models)
  - [ClickhouseClient (interface)](#clickhouseclient-interface)
- [references](#references)
  - [ClickhouseSettings](#clickhousesettings)
  - [ClientMethod](#clientmethod)
  - [QueryId](#queryid)
- [services](#services)
  - [ClickhouseClient](#clickhouseclient)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# compiler

## makeCompiler

Creates the SQL statement compiler for ClickHouse, emitting typed
`{pN: Type}` placeholders and escaping identifiers with an optional query
name transform.

**Signature**

```ts
declare const makeCompiler: (transform?: (_: string) => string) => Statement.Compiler
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L510)

Since v4.0.0

# constructors

## ClickhouseClientConfig (interface)

Configuration for creating a ClickHouse client, combining
`@clickhouse/client` options with optional span attributes and query/result
name transforms.

**Signature**

```ts
export interface ClickhouseClientConfig extends Clickhouse.ClickHouseClientConfigOptions {
  readonly spanAttributes?: Record<string, unknown> | undefined
  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L155)

Since v4.0.0

## make

Creates a scoped `ClickhouseClient`, verifies connectivity with `SELECT 1`,
closes the underlying client when the scope ends, maps ClickHouse failures
to `SqlError`, and aborts plus kills in-flight queries when interrupted.

**Signature**

```ts
declare const make: (
  options: ClickhouseClientConfig
) => Effect.Effect<ClickhouseClient, SqlError, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L169)

Since v4.0.0

# custom types

## ClickhouseCustom (type alias)

Custom SQL fragment type used for ClickHouse typed parameters created by
`ClickhouseClient.param`.

**Signature**

```ts
type ClickhouseCustom = ClickhouseParam
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L540)

Since v4.0.0

# layers

## layer

Provides both `ClickhouseClient` and generic `SqlClient` services from a
ClickHouse client configuration.

**Signature**

```ts
declare const layer: (
  config: ClickhouseClientConfig
) => Layer.Layer<ClickhouseClient | Client.SqlClient, Config.ConfigError | SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L467)

Since v4.0.0

## layerConfig

Provides both `ClickhouseClient` and generic `SqlClient` services from a
`Config`-backed ClickHouse client configuration.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<ClickhouseClientConfig>
) => Layer.Layer<ClickhouseClient | Client.SqlClient, Config.ConfigError | SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L444)

Since v4.0.0

# models

## ClickhouseClient (interface)

ClickHouse-specific `SqlClient` extension with access to its configuration,
typed parameter fragments, command-mode execution, insert queries, and
per-effect query ID and ClickHouse settings.

**Signature**

```ts
export interface ClickhouseClient extends Client.SqlClient {
  readonly [TypeId]: TypeId
  readonly config: ClickhouseClientConfig
  readonly param: (dataType: string, value: unknown) => Statement.Fragment
  readonly asCommand: <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  readonly insertQuery: <T = unknown>(options: {
    readonly table: string
    readonly values: Clickhouse.InsertValues<Readable, T>
    readonly format?: Clickhouse.DataFormat
  }) => Effect.Effect<Clickhouse.InsertResult, SqlError>
  readonly withQueryId: {
    (queryId: string): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
    <A, E, R>(effect: Effect.Effect<A, E, R>, queryId: string): Effect.Effect<A, E, R>
  }
  readonly withClickhouseSettings: {
    (
      settings: NonNullable<Clickhouse.BaseQueryParams["clickhouse_settings"]>
    ): <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
    <A, E, R>(
      effect: Effect.Effect<A, E, R>,
      settings: NonNullable<Clickhouse.BaseQueryParams["clickhouse_settings"]>
    ): Effect.Effect<A, E, R>
  }
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L110)

Since v4.0.0

# references

## ClickhouseSettings

Fiber reference containing ClickHouse settings to attach to queries,
commands, and inserts.

**Signature**

```ts
declare const ClickhouseSettings: Context.Reference<
  Partial<ClickHouseServerSettings> &
    Partial<ClickHouseHTTPSettings> &
    Record<string, string | number | boolean | Clickhouse.SettingsMap | undefined>
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L431)

Since v4.0.0

## ClientMethod

Fiber reference read by the low-level ClickHouse connection to choose query
or command execution for statements; defaults to `query`.

**Signature**

```ts
declare const ClientMethod: Context.Reference<"query" | "command" | "insert">
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L405)

Since v4.0.0

## QueryId

Fiber reference for the ClickHouse `query_id` applied to queries and
inserts; a random UUID is generated when no query ID is set.

**Signature**

```ts
declare const QueryId: Context.Reference<string | undefined>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L419)

Since v4.0.0

# services

## ClickhouseClient

Service tag for the active ClickHouse SQL client.

**When to use**

Use to access or provide a ClickHouse SQL client through the Effect context.

**Signature**

```ts
declare const ClickhouseClient: Context.Service<ClickhouseClient, ClickhouseClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L145)

Since v4.0.0

# type IDs

## TypeId

Unique runtime identifier used to tag `ClickhouseClient` values.

**Signature**

```ts
declare const TypeId: "~@effect/sql-clickhouse/ClickhouseClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L92)

Since v4.0.0

## TypeId (type alias)

Type-level literal for the `ClickhouseClient` runtime identifier.

**Signature**

```ts
type TypeId = "~@effect/sql-clickhouse/ClickhouseClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/clickhouse/src/ClickhouseClient.ts#L100)

Since v4.0.0
