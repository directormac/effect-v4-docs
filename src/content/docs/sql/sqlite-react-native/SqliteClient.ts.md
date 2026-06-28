---
title: SqliteClient.ts
nav_order: 2
parent: "@effect/sql-sqlite-react-native"
---

## SqliteClient.ts overview

Connects Effect SQL to SQLite in React Native using
`@op-engineering/op-sqlite`.

This module opens an on-device SQLite database and exposes it as both
`SqliteClient` and the generic Effect SQL client. It serializes access,
supports normal and value-based queries, and uses the driver's synchronous
query API by default. `AsyncQuery` and `withAsyncQuery` switch a scoped effect
to the driver's asynchronous query API. Streaming queries and `updateValues`
are not supported by this driver.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [fiber refs](#fiber-refs)
  - [AsyncQuery](#asyncquery)
  - [withAsyncQuery](#withasyncquery)
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

Creates a scoped React Native SQLite client from the supplied configuration, using a single serialized connection and honoring `AsyncQuery` for query execution.

**Signature**

```ts
declare const make: (
  options: SqliteClientConfig
) => Effect.Effect<SqliteClient, never, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteClient.ts#L121)

Since v4.0.0

# fiber refs

## AsyncQuery

Fiber reference that makes the React Native SQLite client run queries through the asynchronous `execute` API instead of `executeSync`.

**When to use**

Use to switch React Native SQLite query execution to the asynchronous driver
API for a scoped effect.

**Signature**

```ts
declare const AsyncQuery: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteClient.ts#L99)

Since v4.0.0

## withAsyncQuery

Runs an effect with `AsyncQuery` enabled, causing React Native SQLite queries in that effect to use the asynchronous driver API.

**Signature**

```ts
declare const withAsyncQuery: <R, E, A>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, Exclude<R, never>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteClient.ts#L110)

Since v4.0.0

# layers

## layer

Builds a layer from a React Native SQLite client configuration, providing both `SqliteClient` and the generic `SqlClient` service.

**Signature**

```ts
declare const layer: (config: SqliteClientConfig) => Layer.Layer<SqliteClient | Client.SqlClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteClient.ts#L253)

Since v4.0.0

## layerConfig

Builds a layer from an Effect `Config` value, providing both the React Native `SqliteClient` service and the generic `SqlClient` service.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<SqliteClientConfig>
) => Layer.Layer<SqliteClient | Client.SqlClient, Config.ConfigError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteClient.ts#L233)

Since v4.0.0

# models

## SqliteClient (interface)

React Native SQLite client service interface, extending `SqlClient` with its configuration and marking `updateValues` as unsupported for SQLite.

**Signature**

```ts
export interface SqliteClient extends Client.SqlClient {
  readonly [TypeId]: TypeId
  readonly config: SqliteClientConfig

  /** Not supported in sqlite */
  readonly updateValues: never
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteClient.ts#L57)

Since v4.0.0

## SqliteClientConfig (interface)

Configuration for a React Native SQLite client, including the database filename, optional location and encryption key, span attributes, and query/result name transforms.

**Signature**

```ts
export interface SqliteClientConfig {
  readonly filename: string
  readonly location?: string | undefined
  readonly encryptionKey?: string | undefined
  readonly spanAttributes?: Record<string, unknown> | undefined
  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteClient.ts#L79)

Since v4.0.0

# services

## SqliteClient

Service tag for the React Native SQLite client.

**Signature**

```ts
declare const SqliteClient: Context.Service<SqliteClient, SqliteClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteClient.ts#L71)

Since v4.0.0

# type IDs

## TypeId

Runtime identifier attached to SQLite React Native client values.

**Signature**

```ts
declare const TypeId: "~@effect/sql-sqlite-react-native/SqliteClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteClient.ts#L41)

Since v4.0.0

## TypeId (type alias)

Type-level identifier for SQLite React Native client values.

**Signature**

```ts
type TypeId = "~@effect/sql-sqlite-react-native/SqliteClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteClient.ts#L49)

Since v4.0.0
