---
title: PgClient.ts
nav_order: 2
parent: "@effect/sql-pg"
---

## PgClient.ts overview

Connects Effect SQL to PostgreSQL using the `pg` package.

This module provides constructors and layers for building a PostgreSQL
client from pool settings, a managed `pg.Client`, an existing `pg.Pool`, or
custom connection code. The client runs Effect SQL queries against
PostgreSQL, including transactions and streamed results, and adds helpers for
JSON values and LISTEN/NOTIFY messages. It also maps common PostgreSQL
failures, such as connection, authentication, constraint, timeout, and
deadlock errors, into Effect SQL errors.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [PgClientConfig (interface)](#pgclientconfig-interface)
  - [PgPoolConfig (interface)](#pgpoolconfig-interface)
  - [fromClient](#fromclient)
  - [fromPool](#frompool)
  - [make](#make)
  - [makeClient](#makeclient)
  - [makeCompiler](#makecompiler)
  - [makeWith](#makewith)
- [custom types](#custom-types)
  - [PgCustom (type alias)](#pgcustom-type-alias)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
  - [layerFrom](#layerfrom)
- [models](#models)
  - [PgClient (interface)](#pgclient-interface)
- [services](#services)
  - [PgClient](#pgclient)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## PgClientConfig (interface)

Configuration for a PostgreSQL client, including connection, TLS, custom stream, application name, type parser, JSON transform, and query/result name transform options.

**Signature**

```ts
export interface PgClientConfig {
  readonly url?: Redacted.Redacted | undefined

  readonly host?: string | undefined
  readonly port?: number | undefined
  readonly path?: string | undefined
  readonly ssl?: boolean | ConnectionOptions | undefined
  readonly database?: string | undefined
  readonly username?: string | undefined
  readonly password?: Redacted.Redacted | undefined

  readonly connectTimeout?: Duration.Input | undefined

  readonly stream?: (() => Duplex) | undefined

  readonly applicationName?: string | undefined
  readonly spanAttributes?: Record<string, unknown> | undefined

  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
  readonly transformJson?: boolean | undefined
  readonly types?: Pg.CustomTypesConfig | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L105)

Since v4.0.0

## PgPoolConfig (interface)

PostgreSQL pool configuration, extending `PgClientConfig` with idle timeout, pool size, and connection lifetime settings.

**Signature**

```ts
export interface PgPoolConfig extends PgClientConfig {
  readonly idleTimeout?: Duration.Input | undefined

  readonly maxConnections?: number | undefined
  readonly minConnections?: number | undefined
  readonly connectionTTL?: Duration.Input | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L135)

Since v4.0.0

## fromClient

Builds a PostgreSQL client from a scoped `pg` client acquisition effect, serializing access when sharing the client and optionally using separate clients for streams and LISTEN.

**Signature**

```ts
declare const fromClient: (options: {
  readonly acquire: Effect.Effect<Pg.Client, SqlError, Scope.Scope>
  readonly acquireForStream: boolean
  readonly applicationName?: string | undefined
  readonly spanAttributes?: Record<string, unknown> | undefined
  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
  readonly transformJson?: boolean | undefined
  readonly types?: Pg.CustomTypesConfig | undefined
}) => Effect.Effect<PgClient, SqlError, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L479)

Since v4.0.0

## fromPool

Builds a PostgreSQL client from a scoped `pg` pool acquisition effect, deriving transaction, streaming, and LISTEN/NOTIFY support from that pool.

**Signature**

```ts
declare const fromPool: (options: {
  readonly acquire: Effect.Effect<Pg.Pool, SqlError, Scope.Scope>
  readonly applicationName?: string | undefined
  readonly spanAttributes?: Record<string, unknown> | undefined
  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
  readonly transformJson?: boolean | undefined
  readonly types?: Pg.CustomTypesConfig | undefined
}) => Effect.Effect<PgClient, SqlError, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L275)

Since v4.0.0

## make

Creates a scoped PostgreSQL client backed by a managed `pg` connection pool.

**Signature**

```ts
declare const make: (options: PgPoolConfig) => Effect.Effect<PgClient, SqlError, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L149)

Since v4.0.0

## makeClient

Creates a scoped PostgreSQL client backed by a managed single `pg` client, optionally acquiring a separate client for streaming and LISTEN operations.

**Signature**

```ts
declare const makeClient: (
  options: PgClientConfig & { readonly acquireForStream?: boolean | undefined }
) => Effect.Effect<PgClient, SqlError, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L215)

Since v4.0.0

## makeCompiler

Creates the PostgreSQL statement compiler, using `$1` placeholders, double-quoted identifiers, PostgreSQL returning clauses, and optional JSON value transformation.

**Signature**

```ts
declare const makeCompiler: (transform?: (_: string) => string, transformJson?: boolean) => Statement.Compiler
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L821)

Since v4.0.0

## makeWith

Creates a `PgClient` from SQL connection acquirers, a LISTEN acquirer, client configuration, and transformation options.

**When to use**

Use to build a PostgreSQL client from custom connection acquisition logic
instead of the built-in pool or single-client constructors.

**Signature**

```ts
declare const makeWith: (options: {
  readonly acquirer: SqlConnection.Acquirer
  readonly transactionAcquirer: SqlConnection.Acquirer
  readonly listenAcquirer: Effect.Effect<Pg.ClientBase, SqlError, Scope.Scope>
  readonly config: PgClientConfig
  readonly spanAttributes?: Record<string, unknown> | undefined
  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
  readonly transformJson?: boolean | undefined
}) => Effect.Effect<PgClient, SqlError, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L560)

Since v4.0.0

# custom types

## PgCustom (type alias)

PostgreSQL-specific custom statement fragments supported by the compiler, currently JSON parameter fragments.

**Signature**

```ts
type PgCustom = PgJson
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L872)

Since v4.0.0

# layers

## layer

Creates a layer from a concrete PostgreSQL pool configuration, providing both `PgClient` and `SqlClient`.

**Signature**

```ts
declare const layer: (config: PgPoolConfig) => Layer.Layer<PgClient | Client.SqlClient, SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L811)

Since v4.0.0

## layerConfig

Creates a layer from a `Config`-wrapped PostgreSQL pool configuration, providing both `PgClient` and `SqlClient`.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<PgPoolConfig>
) => Layer.Layer<PgClient | Client.SqlClient, Config.ConfigError | SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L795)

Since v4.0.0

## layerFrom

Creates a layer from an effect that acquires a `PgClient`, providing both `PgClient` and `SqlClient`.

**Signature**

```ts
declare const layerFrom: <E, R>(
  acquire: Effect.Effect<PgClient, E, R>
) => Layer.Layer<PgClient | Client.SqlClient, E, Exclude<R, Scope.Scope | Reactivity.Reactivity>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L779)

Since v4.0.0

# models

## PgClient (interface)

PostgreSQL client service, extending `SqlClient` with JSON parameter fragments and LISTEN/NOTIFY helpers.

**Signature**

```ts
export interface PgClient extends Client.SqlClient {
  readonly [TypeId]: TypeId
  readonly config: PgClientConfig
  readonly json: (_: unknown) => Fragment
  readonly listen: (channel: string) => Stream.Stream<string, SqlError>
  readonly notify: (channel: string, payload: string) => Effect.Effect<void, SqlError>
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L79)

Since v4.0.0

# services

## PgClient

Service tag for the PostgreSQL client service.

**When to use**

Use to access or provide a PostgreSQL client through the Effect context.

**Signature**

```ts
declare const PgClient: Context.Service<PgClient, PgClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L97)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark `PgClient` values.

**Signature**

```ts
declare const TypeId: "~@effect/sql-pg/PgClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L63)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to mark `PgClient` values.

**Signature**

```ts
type TypeId = "~@effect/sql-pg/PgClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgClient.ts#L71)

Since v4.0.0
