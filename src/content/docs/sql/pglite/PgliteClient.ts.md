---
title: PgliteClient.ts
nav_order: 2
parent: "@effect/sql-pglite"
---

## PgliteClient.ts overview

Connects Effect SQL to PGlite, the embedded PostgreSQL-compatible database
from `@electric-sql/pglite`.

This module can create a managed PGlite instance or wrap an existing one and
expose it as both `PgliteClient` and the generic Effect SQL client. The client
runs PostgreSQL-style SQL, adds helpers for JSON values and LISTEN/NOTIFY
messages, can dump the PGlite data directory, and can refresh PGlite array
types. It also provides layers and maps common PostgreSQL-style failures into
Effect SQL errors.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [fromClient](#fromclient)
  - [make](#make)
  - [makeCompiler](#makecompiler)
- [custom types](#custom-types)
  - [PgCustom (type alias)](#pgcustom-type-alias)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
  - [layerFrom](#layerfrom)
- [models](#models)
  - [PgliteClient (interface)](#pgliteclient-interface)
  - [PgliteClientConfig (type alias)](#pgliteclientconfig-type-alias)
- [services](#services)
  - [PgliteClient](#pgliteclient)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utils](#utils)
  - [PgliteClientConfig (namespace)](#pgliteclientconfig-namespace)
    - [Base (interface)](#base-interface)
    - [Create (interface)](#create-interface)
    - [Live (interface)](#live-interface)
    - [ConfigBase (interface)](#configbase-interface)

---

# constructors

## fromClient

Builds a `PgliteClient` around an existing PGlite instance, adding SQL client operations, LISTEN/NOTIFY, dump helpers, and serialized access.

**Signature**

```ts
declare const fromClient: (
  options: PgliteClientConfig.Base & { readonly liveClient: PGliteInterface }
) => Effect.Effect<PgliteClient, SqlError, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L182)

Since v4.0.0

## make

Creates a scoped PGlite SQL client. When no live client is supplied it creates and closes a PGlite instance; when `liveClient` is supplied, the caller retains ownership.

**Signature**

```ts
declare const make: (
  options?: PgliteClientConfig
) => Effect.Effect<PgliteClient, SqlError, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L154)

Since v4.0.0

## makeCompiler

Creates the PGlite statement compiler, using PostgreSQL `$1` placeholders, double-quoted identifiers, returning clauses, and optional JSON value transformation.

**Signature**

```ts
declare const makeCompiler: (transform?: (_: string) => string, transformJson?: boolean) => Statement.Compiler
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L390)

Since v4.0.0

# custom types

## PgCustom (type alias)

PGlite-specific custom statement fragments supported by the compiler, currently JSON parameter fragments.

**Signature**

```ts
type PgCustom = PgJson
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L442)

Since v4.0.0

# layers

## layer

Creates a layer from a concrete PGlite client configuration, providing both `PgliteClient` and `SqlClient`.

**Signature**

```ts
declare const layer: (config?: PgliteClientConfig | undefined) => Layer.Layer<PgliteClient | Client.SqlClient, SqlError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L380)

Since v4.0.0

## layerConfig

Creates a layer from a `Config`-wrapped PGlite client configuration, providing both `PgliteClient` and `SqlClient`.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<PgliteClientConfig.ConfigBase>
) => Layer.Layer<PgliteClient | Client.SqlClient, Config.ConfigError | SqlError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L364)

Since v4.0.0

## layerFrom

Creates a layer from an effect that acquires a `PgliteClient`, providing both `PgliteClient` and `SqlClient`.

**Signature**

```ts
declare const layerFrom: <E, R>(
  acquire: Effect.Effect<PgliteClient, E, R>
) => Layer.Layer<PgliteClient | Client.SqlClient, E, Exclude<R, Scope.Scope | Reactivity.Reactivity>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L348)

Since v4.0.0

# models

## PgliteClient (interface)

PGlite-backed PostgreSQL client service, extending `SqlClient` with access to the PGlite instance, JSON fragments, LISTEN/NOTIFY, data directory dumps, and array type refresh.

**Signature**

```ts
export interface PgliteClient extends Client.SqlClient {
  readonly [TypeId]: TypeId
  readonly config: PgliteClientConfig
  readonly pglite: PGliteInterface
  readonly json: (_: unknown) => Fragment
  readonly listen: (channel: string) => Stream.Stream<string, SqlError>
  readonly notify: (channel: string, payload: string) => Effect.Effect<void, SqlError>
  readonly dumpDataDir: (compression?: "none" | "gzip" | "auto") => Effect.Effect<File | Blob, SqlError>
  readonly refreshArrayTypes: Effect.Effect<void, SqlError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L66)

Since v4.0.0

## PgliteClientConfig (type alias)

Configuration for a PGlite client, either by supplying PGlite creation options or an existing live PGlite client.

**Signature**

```ts
type PgliteClientConfig = PgliteClientConfig.Create | PgliteClientConfig.Live
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L95)

Since v4.0.0

# services

## PgliteClient

Service tag for the PGlite client service.

**When to use**

Use to access or provide a PGlite client through the Effect context.

**Signature**

```ts
declare const PgliteClient: Context.Service<PgliteClient, PgliteClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L87)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier used to mark `PgliteClient` values.

**Signature**

```ts
declare const TypeId: "~@effect/sql-pglite/PgliteClient"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L50)

Since v4.0.0

## TypeId (type alias)

Type-level identifier used to mark `PgliteClient` values.

**Signature**

```ts
type TypeId = "~@effect/sql-pglite/PgliteClient"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L58)

Since v4.0.0

# utils

## PgliteClientConfig (namespace)

Namespace containing the configuration variants for `PgliteClient`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L102)

Since v4.0.0

### Base (interface)

Shared PGlite client options for span attributes, query/result name transformations, and JSON value transformation.

**Signature**

```ts
export interface Base {
  readonly spanAttributes?: Record<string, unknown> | undefined
  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
  readonly transformJson?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L109)

Since v4.0.0

### Create (interface)

Configuration used to create a managed PGlite instance from PGlite constructor options.

**Signature**

```ts
export interface Create extends Base, PGliteOptions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L122)

Since v4.0.0

### Live (interface)

Configuration that uses an existing PGlite client. The supplied `liveClient` is caller-owned and is not closed by the Effect client.

**Signature**

```ts
export interface Live extends Base {
  readonly liveClient: PGliteInterface
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L130)

Since v4.0.0

### ConfigBase (interface)

Config-friendly subset of PGlite creation options, including data directory, username, database, relaxed durability, and shared transform options.

**Signature**

```ts
export interface ConfigBase extends Base {
  readonly dataDir?: string | undefined
  readonly username?: string | undefined
  readonly database?: string | undefined
  readonly relaxedDurability?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteClient.ts#L140)

Since v4.0.0
