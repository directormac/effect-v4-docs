---
title: SqliteClient.ts
nav_order: 4
parent: "@effect/sql-sqlite-wasm"
---

## SqliteClient.ts overview

Connects Effect SQL to SQLite compiled to WebAssembly with
`@effect/wa-sqlite`.

This module can create an in-memory SQLite database in the current runtime or
connect to a worker-backed database, such as the OPFS worker from
`OpfsWorker`. Both clients are exposed as `SqliteClient` and the generic
Effect SQL client, serialize access, support database import and export, and
can install reactivity hooks from SQLite update notifications. In-memory
clients can stream query rows; worker-backed clients cannot. `updateValues`
is not supported by this driver.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
  - [makeMemory](#makememory)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
  - [layerMemory](#layermemory)
  - [layerMemoryConfig](#layermemoryconfig)
- [models](#models)
  - [SqliteClient (interface)](#sqliteclient-interface)
  - [SqliteClientConfig (interface)](#sqliteclientconfig-interface)
  - [SqliteClientMemoryConfig (interface)](#sqliteclientmemoryconfig-interface)
- [services](#services)
  - [SqliteClient](#sqliteclient)
- [transferables](#transferables)
  - [Transferables](#transferables-1)
  - [withTransferables](#withtransferables)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## make

Creates a scoped worker-backed SQLite WASM client, communicating with the configured worker or message port, restarting the scoped connection on worker errors, and exposing database `export` and `import` operations.

**Signature**

```ts
declare const make: (
  options: SqliteClientConfig
) => Effect.Effect<SqliteClient, SqlError, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L299)

Since v4.0.0

## makeMemory

Creates a scoped in-memory SQLite WASM client using the memory VFS, serializing access through a semaphore and exposing database `export` and `import` operations.

**Signature**

```ts
declare const makeMemory: (
  options: SqliteClientMemoryConfig
) => Effect.Effect<SqliteClient, SqlError, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L131)

Since v4.0.0

# layers

## layer

Builds a layer from a worker-backed SQLite WASM client configuration, providing both `SqliteClient` and the generic `SqlClient` service.

**Signature**

```ts
declare const layer: (config: SqliteClientConfig) => Layer.Layer<SqliteClient | Client.SqlClient, SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L529)

Since v4.0.0

## layerConfig

Builds a layer from an Effect `Config` value, providing both the worker-backed SQLite WASM `SqliteClient` service and the generic `SqlClient` service.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<SqliteClientConfig>
) => Layer.Layer<SqliteClient | Client.SqlClient, Config.ConfigError | SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L545)

Since v4.0.0

## layerMemory

Builds a layer from an in-memory SQLite WASM client configuration, providing both `SqliteClient` and the generic `SqlClient` service.

**Signature**

```ts
declare const layerMemory: (config: SqliteClientMemoryConfig) => Layer.Layer<SqliteClient | Client.SqlClient, SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L513)

Since v4.0.0

## layerMemoryConfig

Builds a layer from an Effect `Config` value, providing both the in-memory SQLite WASM `SqliteClient` service and the generic `SqlClient` service.

**Signature**

```ts
declare const layerMemoryConfig: (
  config: Config.Wrap<SqliteClientMemoryConfig>
) => Layer.Layer<SqliteClient | Client.SqlClient, Config.ConfigError | SqlError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L493)

Since v4.0.0

# models

## SqliteClient (interface)

SQLite WASM client service interface, extending `SqlClient` with database `export` and `import` operations and marking `updateValues` as unsupported for SQLite.

**Signature**

```ts
export interface SqliteClient extends Client.SqlClient {
  readonly [TypeId]: TypeId
  readonly config: SqliteClientMemoryConfig
  readonly export: Effect.Effect<Uint8Array, SqlError>
  readonly import: (data: Uint8Array) => Effect.Effect<void, SqlError>

  /** Not supported in sqlite */
  readonly updateValues: never
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L65)

Since v4.0.0

## SqliteClientConfig (interface)

Configuration for a worker-backed SQLite WASM client, including the scoped worker or message port, optional reactivity hooks, span attributes, and query/result name transforms.

**Signature**

```ts
export interface SqliteClientConfig {
  readonly worker: Effect.Effect<Worker | SharedWorker | MessagePort, never, Scope.Scope>
  readonly installReactivityHooks?: boolean
  readonly spanAttributes?: Record<string, unknown>
  readonly transformResultNames?: (str: string) => string
  readonly transformQueryNames?: (str: string) => string
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L102)

Since v4.0.0

## SqliteClientMemoryConfig (interface)

Configuration for an in-memory SQLite WASM client, including optional reactivity hooks, span attributes, and query/result name transforms.

**Signature**

```ts
export interface SqliteClientMemoryConfig {
  readonly installReactivityHooks?: boolean
  readonly spanAttributes?: Record<string, unknown>
  readonly transformResultNames?: (str: string) => string
  readonly transformQueryNames?: (str: string) => string
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L89)

Since v4.0.0

# services

## SqliteClient

Service tag for the SQLite WASM client.

**Signature**

```ts
declare const SqliteClient: Context.Service<SqliteClient, SqliteClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L81)

Since v4.0.0

# transferables

## Transferables

Fiber reference that stores transferables to include with worker-backed SQLite WASM query messages.

**Signature**

```ts
declare const Transferables: Context.Reference<ReadonlyArray<Transferable>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L472)

Since v4.0.0

## withTransferables

Runs an effect with the supplied transferables attached to worker-backed SQLite WASM query messages.

**Signature**

```ts
declare const withTransferables: (
  transferables: ReadonlyArray<Transferable>
) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L483)

Since v4.0.0

# type IDs

## TypeId

Runtime identifier attached to SQLite WASM client values.

**Signature**

```ts
declare const TypeId: "~@effect/sql-sqlite-wasm/SqliteClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L49)

Since v4.0.0

## TypeId (type alias)

Type-level identifier for SQLite WASM client values.

**Signature**

```ts
type TypeId = "~@effect/sql-sqlite-wasm/SqliteClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteClient.ts#L57)

Since v4.0.0
