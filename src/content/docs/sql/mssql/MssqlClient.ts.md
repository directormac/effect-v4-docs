---
title: MssqlClient.ts
nav_order: 2
parent: "@effect/sql-mssql"
---

## MssqlClient.ts overview

Microsoft SQL Server client implementation for Effect SQL, backed by the
`tedious` driver.

This module provides the `MssqlClient` service, constructors, layers, and SQL
Server statement compiler. `make` creates a pooled Tedious client, checks the
connection with `SELECT 1`, maps SQL Server failures to `SqlError`, and
supports transactions with savepoints. The SQL Server-specific service adds
typed Tedious parameters with `param`, stored procedure calls with `call`,
direct or config-backed layers, and default parameter type mappings.
Streaming queries are not implemented by this driver.

Since v4.0.0

---

## Exports Grouped by Category

- [compiler](#compiler)
  - [makeCompiler](#makecompiler)
- [configuration](#configuration)
  - [defaultParameterTypes](#defaultparametertypes)
- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [models](#models)
  - [MssqlClient (interface)](#mssqlclient-interface)
  - [MssqlClientConfig (interface)](#mssqlclientconfig-interface)
- [services](#services)
  - [MssqlClient](#mssqlclient)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# compiler

## makeCompiler

Creates the SQL Server statement compiler, using `@1`-style placeholders, bracket-escaped identifiers, and SQL Server `OUTPUT INSERTED` returning clauses.

**Signature**

```ts
declare const makeCompiler: (transform?: (_: string) => string) => Statement.Compiler
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/MssqlClient.ts#L654)

Since v4.0.0

# configuration

## defaultParameterTypes

Default mapping from Effect SQL primitive value kinds to Tedious SQL Server parameter data types.

**Signature**

```ts
declare const defaultParameterTypes: Record<Statement.PrimitiveKind, DataType>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/MssqlClient.ts#L706)

Since v4.0.0

# constructors

## make

Creates a scoped Microsoft SQL Server client backed by a connection pool, with transaction and stored procedure support. Streaming queries are not implemented.

**Signature**

```ts
declare const make: (
  options: MssqlClientConfig
) => Effect.Effect<MssqlClient, SqlError, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/MssqlClient.ts#L258)

Since v4.0.0

# layers

## layer

Creates a layer from a concrete SQL Server client configuration, providing both `MssqlClient` and `SqlClient`.

**Signature**

```ts
declare const layer: (config: MssqlClientConfig) => Layer.Layer<Client.SqlClient | MssqlClient, never | SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/MssqlClient.ts#L638)

Since v4.0.0

## layerConfig

Creates a layer from a `Config`-wrapped SQL Server client configuration, providing both `MssqlClient` and `SqlClient`.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<MssqlClientConfig>
) => Layer.Layer<Client.SqlClient | MssqlClient, Config.ConfigError | SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/MssqlClient.ts#L616)

Since v4.0.0

# models

## MssqlClient (interface)

Microsoft SQL Server client service, extending `SqlClient` with typed parameter fragments and stored procedure calls.

**Signature**

```ts
export interface MssqlClient extends Client.SqlClient {
  readonly [TypeId]: TypeId

  readonly config: MssqlClientConfig

  readonly param: (type: DataType, value: unknown, options?: ParameterOptions) => Statement.Fragment

  readonly call: <I extends Record<string, Parameter<any>>, O extends Record<string, Parameter<any>>, A extends object>(
    procedure: Procedure.ProcedureWithValues<I, O, A>
  ) => Effect.Effect<Procedure.Procedure.Result<O, A>, SqlError>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/MssqlClient.ts#L165)

Since v4.0.0

## MssqlClientConfig (interface)

Configuration for a Microsoft SQL Server client, including connection, authentication, pool, parameter type, span attribute, and query/result name transform options.

**Signature**

```ts
export interface MssqlClientConfig {
  readonly domain?: string | undefined
  readonly server: string
  readonly instanceName?: string | undefined
  readonly encrypt?: boolean | undefined
  readonly trustServer?: boolean | undefined
  readonly port?: number | undefined
  readonly authType?: string | undefined
  readonly database?: string | undefined
  readonly username?: string | undefined
  readonly password?: Redacted.Redacted | undefined
  readonly connectTimeout?: Duration.Input | undefined
  readonly cancelTimeout?: Duration.Input | undefined
  readonly connectionRetryInterval?: Duration.Input | undefined
  readonly multiSubnetFailover?: boolean | undefined
  readonly maxRetriesOnTransientErrors?: number | undefined

  readonly minConnections?: number | undefined
  readonly maxConnections?: number | undefined
  readonly connectionTTL?: Duration.Input | undefined

  readonly parameterTypes?: Record<Statement.PrimitiveKind, DataType> | undefined

  readonly spanAttributes?: Record<string, unknown> | undefined

  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/MssqlClient.ts#L204)

Since v4.0.0

# services

## MssqlClient

Service tag for the Microsoft SQL Server client service.

**When to use**

Use to access or provide a Microsoft SQL Server client through the Effect
context.

**Signature**

```ts
declare const MssqlClient: Context.Service<MssqlClient, MssqlClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/MssqlClient.ts#L196)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark `MssqlClient` values.

**Signature**

```ts
declare const TypeId: unique symbol
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/MssqlClient.ts#L149)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to mark `MssqlClient` values.

**Signature**

```ts
type TypeId = typeof TypeId
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/MssqlClient.ts#L157)

Since v4.0.0
