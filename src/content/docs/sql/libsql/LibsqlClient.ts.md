---
title: LibsqlClient.ts
nav_order: 2
parent: "@effect/sql-libsql"
---

## LibsqlClient.ts overview

libSQL adapter for Effect SQL, backed by `@libsql/client`.

This module provides a `LibsqlClient` and the generic SQL client
service for `@libsql/client`. It uses Effect SQL's SQLite compiler, supports
managed SDK clients or caller-owned live clients, classifies libSQL and
SQLite failures as `SqlError`s, and provides transaction support with
savepoints. Streaming queries are not implemented by this driver.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [models](#models)
  - [LibsqlClient (interface)](#libsqlclient-interface)
  - [LibsqlClientConfig (type alias)](#libsqlclientconfig-type-alias)
- [services](#services)
  - [LibsqlClient](#libsqlclient)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utils](#utils)
  - [LibsqlClientConfig (namespace)](#libsqlclientconfig-namespace)
    - [Base (interface)](#base-interface)
    - [Full (interface)](#full-interface)
    - [Live (interface)](#live-interface)

---

# constructors

## make

Creates a scoped libSQL SQL client with transaction support. When given connection options it creates and closes the SDK client; when given `liveClient`, the caller retains ownership.

**Signature**

```ts
declare const make: (
  options: LibsqlClientConfig
) => Effect.Effect<LibsqlClient, never, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L183)

Since v4.0.0

# layers

## layer

Creates a layer from a concrete libSQL client configuration, providing both `LibsqlClient` and `SqlClient`.

**Signature**

```ts
declare const layer: (config: LibsqlClientConfig) => Layer.Layer<LibsqlClient | Client.SqlClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L376)

Since v4.0.0

## layerConfig

Creates a layer from a `Config`-wrapped libSQL client configuration, providing both `LibsqlClient` and `SqlClient`.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<LibsqlClientConfig>
) => Layer.Layer<LibsqlClient | Client.SqlClient, Config.ConfigError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L354)

Since v4.0.0

# models

## LibsqlClient (interface)

libSQL-backed SQL client service, extending `SqlClient` with its runtime type marker and client configuration.

**Signature**

```ts
export interface LibsqlClient extends Client.SqlClient {
  readonly [TypeId]: TypeId
  readonly config: LibsqlClientConfig
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L55)

Since v4.0.0

## LibsqlClientConfig (type alias)

Configuration for a libSQL client, either by supplying connection options or an existing live libSQL client.

**Signature**

```ts
type LibsqlClientConfig = LibsqlClientConfig.Full | LibsqlClientConfig.Live
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L82)

Since v4.0.0

# services

## LibsqlClient

Service tag for the libSQL client service.

**When to use**

Use to access or provide a libSQL client through the Effect context.

**Signature**

```ts
declare const LibsqlClient: Context.Service<LibsqlClient, LibsqlClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L70)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark `LibsqlClient` values.

**Signature**

```ts
declare const TypeId: "~@effect/sql-libsql/LibsqlClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L39)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to mark `LibsqlClient` values.

**Signature**

```ts
type TypeId = "~@effect/sql-libsql/LibsqlClient"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L47)

Since v4.0.0

# utils

## LibsqlClientConfig (namespace)

Namespace containing the configuration variants for `LibsqlClient`.

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L89)

Since v4.0.0

### Base (interface)

Shared libSQL client options for span attributes and query/result name transformations.

**Signature**

```ts
export interface Base {
  readonly spanAttributes?: Record<string, unknown> | undefined
  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L96)

Since v4.0.0

### Full (interface)

Connection-based libSQL configuration used to create a managed client, including URL, credentials, sync, integer mode, TLS, and concurrency options.

**Signature**

```ts
export interface Full extends Base {
  /**
   * The database URL.
   *
   * **Details**
   *
   * The client supports `libsql:`, `http:`/`https:`, `ws:`/`wss:` and `file:` URL. For more infomation,
   * please refer to the project README:
   *
   * https://github.com/libsql/libsql-client-ts#supported-urls
   */
  readonly url: string | URL
  /** Authentication token for the database. */
  readonly authToken?: Redacted.Redacted | undefined
  /** Encryption key for the database. */
  readonly encryptionKey?: Redacted.Redacted | undefined
  /** URL of a remote server to synchronize database with. */
  readonly syncUrl?: string | URL | undefined
  /** Sync interval in seconds. */
  readonly syncInterval?: number | undefined
  /**
   * Enables or disables TLS for `libsql:` URLs.
   *
   * **Details**
   *
   * By default, `libsql:` URLs use TLS. You can set this option to `false` to disable TLS.
   */
  readonly tls?: boolean | undefined
  /**
   * How to convert SQLite integers to JavaScript values.
   *
   * **Details**
   *
   * - `"number"` (default): returns SQLite integers as JavaScript `number`-s (double precision floats).
   * `number` cannot precisely represent integers larger than 2^53-1 in absolute value, so attempting to read
   * larger integers will throw a `RangeError`.
   * - `"bigint"`: returns SQLite integers as JavaScript `bigint`-s (arbitrary precision integers). Bigints can
   * precisely represent all SQLite integers.
   * - `"string"`: returns SQLite integers as strings.
   */
  readonly intMode?: "number" | "bigint" | "string" | undefined
  /**
   * Concurrency limit.
   *
   * **Details**
   *
   * By default, the client performs up to 20 concurrent requests. You can set this option to a higher
   * number to increase the concurrency limit or set it to 0 to disable concurrency limits completely.
   */
  readonly concurrency?: number | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L108)

Since v4.0.0

### Live (interface)

Configuration that uses an existing libSQL client. The supplied `liveClient` is caller-owned and is not closed by the Effect client.

**Signature**

```ts
export interface Live extends Base {
  readonly liveClient: Libsql.Client
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/libsql/src/LibsqlClient.ts#L166)

Since v4.0.0
