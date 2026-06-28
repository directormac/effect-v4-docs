---
title: D1Client.ts
nav_order: 1
parent: "@effect/sql-d1"
---

## D1Client.ts overview

Cloudflare D1 client implementation for Effect SQL, backed by a Workers `D1Database` binding.

This module adapts a Cloudflare D1 database binding into both the
D1-specific `D1Client` service and the generic Effect `SqlClient` service.
It uses the SQLite statement compiler, caches prepared statements, maps D1
failures to `SqlError`, and provides direct or config-backed layers.
Transactions, streaming queries, and `updateValues` are not supported by this
driver.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [models](#models)
  - [D1Client (interface)](#d1client-interface)
  - [D1ClientConfig (interface)](#d1clientconfig-interface)
- [services](#services)
  - [D1Client](#d1client)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## make

Creates a scoped Cloudflare D1 SQL client. Prepared statements are cached, while transactions and streaming queries are not supported by this driver.

**Signature**

```ts
declare const make: (options: D1ClientConfig) => Effect.Effect<D1Client, never, Scope.Scope | Reactivity.Reactivity>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/D1Client.ts#L99)

Since v4.0.0

# layers

## layer

Creates a layer from a concrete D1 client configuration, providing both `D1Client` and `SqlClient`.

**Signature**

```ts
declare const layer: (config: D1ClientConfig) => Layer.Layer<D1Client | Client.SqlClient, Config.ConfigError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/D1Client.ts#L259)

Since v4.0.0

## layerConfig

Creates a layer from a `Config`-wrapped D1 client configuration, providing both `D1Client` and `SqlClient`.

**Signature**

```ts
declare const layerConfig: (
  config: Config.Wrap<D1ClientConfig>
) => Layer.Layer<D1Client | Client.SqlClient, Config.ConfigError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/D1Client.ts#L239)

Since v4.0.0

# models

## D1Client (interface)

Cloudflare D1 SQL client service, extending `SqlClient` with its D1 configuration and no `updateValues` support.

**Signature**

```ts
export interface D1Client extends Client.SqlClient {
  readonly [TypeId]: TypeId
  readonly config: D1ClientConfig

  /** Not supported in d1 */
  readonly updateValues: never
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/D1Client.ts#L56)

Since v4.0.0

## D1ClientConfig (interface)

Configuration for a Cloudflare D1 client, including the `D1Database`, prepared statement cache settings, span attributes, and query/result name transforms.

**Signature**

```ts
export interface D1ClientConfig {
  readonly db: D1Database
  readonly prepareCacheSize?: number | undefined
  readonly prepareCacheTTL?: Duration.Input | undefined
  readonly spanAttributes?: Record<string, unknown> | undefined

  readonly transformResultNames?: ((str: string) => string) | undefined
  readonly transformQueryNames?: ((str: string) => string) | undefined
}
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/D1Client.ts#L83)

Since v4.0.0

# services

## D1Client

Service tag for the Cloudflare D1 SQL client.

**When to use**

Use to access or provide a Cloudflare D1 SQL client through the Effect
context.

**Signature**

```ts
declare const D1Client: Context.Service<D1Client, D1Client>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/D1Client.ts#L75)

Since v4.0.0

# type IDs

## TypeId

Unique runtime identifier used to tag `D1Client` values.

**Signature**

```ts
declare const TypeId: "~@effect/sql-d1/D1Client"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/D1Client.ts#L40)

Since v4.0.0

## TypeId (type alias)

Type-level literal for the `D1Client` runtime identifier.

**Signature**

```ts
type TypeId = "~@effect/sql-d1/D1Client"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/d1/src/D1Client.ts#L48)

Since v4.0.0
