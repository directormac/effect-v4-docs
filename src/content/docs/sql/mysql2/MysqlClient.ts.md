---
title: MysqlClient.ts
nav_order: 2
parent: "@effect/sql-mysql2"
---

## MysqlClient.ts overview

MySQL adapter for Effect SQL, backed by the `mysql2` driver.

This module provides constructors and layers for a `MysqlClient` and
the generic Effect SQL client service. `make` creates a managed mysql2 pool,
checks the connection with `SELECT 1`, maps mysql2 failures to `SqlError`,
supports transaction connections, and exposes streaming queries through
mysql2 query streams. It also provides direct and config-backed layers plus a
MySQL statement compiler.

Since v4.0.0

---

## Exports Grouped by Category

- [compiler](#compiler)
  - [makeCompiler](#makecompiler)
- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [models](#models)
  - [MysqlClient (interface)](#mysqlclient-interface)
  - [MysqlClientConfig (interface)](#mysqlclientconfig-interface)
- [services](#services)
  - [MysqlClient](#mysqlclient)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# compiler

## makeCompiler

Creates the MySQL statement compiler, using `?` placeholders and backtick-escaped identifiers.

**Signature**

```ts
declare const makeCompiler: (transform?: (_: string) => string) => Statement.Compiler
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlClient.ts#L454)

Since v4.0.0

# constructors

## make

Creates a scoped MySQL client backed by a managed mysql2 pool, verifying connectivity and supporting streaming queries through mysql2 query streams.

**Signature**

```ts
declare const make: (options: MysqlClientConfig) => Effect.Effect<MysqlClient, SqlError, Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlClient.ts#L211)

Since v4.0.0

# layers

## layer

Creates a layer from a concrete MySQL client configuration, providing both `MysqlClient` and `SqlClient`.

**Signature**

```ts
declare const layer: (
  config: MysqlClientConfig
) => Layer.Layer<MysqlClient | Client.SqlClient, Config.ConfigError | SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlClient.ts#L438)

Since v4.0.0

## layerConfig

Creates a layer from a `Config`-wrapped MySQL client configuration, providing both `MysqlClient` and `SqlClient`.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<MysqlClientConfig>
) => Layer.Layer<MysqlClient | Client.SqlClient, Config.ConfigError | SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlClient.ts#L418)

Since v4.0.0

# models

## MysqlClient (interface)

mysql2-backed SQL client service, extending `SqlClient` with its runtime type marker and client configuration.

**Signature**

```ts
export interface MysqlClient extends Client.SqlClient {
  readonly [TypeId]: TypeId
  readonly config: MysqlClientConfig
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlClient.ts#L159)

Since v4.0.0

## MysqlClientConfig (interface)

Configuration for a mysql2 client, including connection URI or connection fields, pool options, span attributes, and query/result name transforms.

**Signature**

```ts
export interface MysqlClientConfig {
  /**
   * Connection URI. Setting this will override the other connection options
   */
  readonly url?: Redacted.Redacted | undefined

  readonly host?: string | undefined
  readonly port?: number | undefined
  readonly database?: string | undefined
  readonly username?: string | undefined
  readonly password?: Redacted.Redacted | undefined

  readonly maxConnections?: number | undefined
  readonly connectionTTL?: Duration.Input | undefined

  readonly poolConfig?: Mysql.PoolOptions | undefined

  readonly spanAttributes?: Record<string, unknown> | undefined

  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlClient.ts#L182)

Since v4.0.0

# services

## MysqlClient

Service tag for the mysql2 SQL client service.

**When to use**

Use to access or provide a mysql2 client through the Effect context.

**Signature**

```ts
declare const MysqlClient: Context.Service<MysqlClient, MysqlClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlClient.ts#L174)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark `MysqlClient` values.

**Signature**

```ts
declare const TypeId: "~@effect/sql-mysql2/MysqlClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlClient.ts#L143)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to mark `MysqlClient` values.

**Signature**

```ts
type TypeId = "~@effect/sql-mysql2/MysqlClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlClient.ts#L151)

Since v4.0.0
