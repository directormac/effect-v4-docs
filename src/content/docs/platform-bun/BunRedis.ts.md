---
title: BunRedis.ts
nav_order: 12
parent: "@effect/platform-bun"
---

## BunRedis.ts overview

Bun Redis integration backed by Bun's built-in `RedisClient`.

This module creates scoped Bun `RedisClient` connections and exposes them as
both the portable `Redis` service and the Bun-specific `BunRedis` service for
direct access to the raw client. The `layer` helper accepts Redis options
directly, while `layerConfig` reads them from Effect config. Both close the
underlying client when the layer scope finalizes.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [services](#services)
  - [BunRedis (class)](#bunredis-class)

---

# layers

## layer

Creates scoped Bun Redis layers for `Redis.Redis` and `BunRedis`, closing the underlying client when the scope finalizes.

**Signature**

```ts
declare const layer: (
  options?: ({ readonly url?: string } & RedisOptions) | undefined
) => Layer.Layer<Redis.Redis | BunRedis>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunRedis.ts#L71)

Since v4.0.0

## layerConfig

Creates scoped Bun Redis layers from configurable Redis options, closing the underlying client when the scope finalizes.

**Signature**

```ts
declare const layerConfig: (
  options: Config.Wrap<{ readonly url?: string } & RedisOptions>
) => Layer.Layer<Redis.Redis | BunRedis, Config.ConfigError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunRedis.ts#L81)

Since v4.0.0

# services

## BunRedis (class)

Service tag for Bun Redis integration, exposing the raw `RedisClient` and a `use` helper that maps client promise failures to `RedisError`.

**Signature**

```ts
declare class BunRedis
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunRedis.ts#L27)

Since v4.0.0
