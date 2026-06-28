---
title: NodeRedis.ts
nav_order: 15
parent: "@effect/platform-node"
---

## NodeRedis.ts overview

Node.js Redis integration backed by `ioredis`.

This module creates a scoped `ioredis` client and exposes it in two forms:
the generic `Redis` service and the `NodeRedis` service for direct
access to the underlying client. `layer` accepts ioredis options directly,
while `layerConfig` reads them from Effect config. Both layers close the
client when the layer scope ends.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
- [services](#services)
  - [NodeRedis (class)](#noderedis-class)

---

# layers

## layer

Provides `Redis` and `NodeRedis` services backed by an `ioredis` client
created with the supplied options and closed when the layer scope ends.

**Signature**

```ts
declare const layer: (options?: IoRedis.RedisOptions | undefined) => Layer.Layer<Redis.Redis | NodeRedis>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeRedis.ts#L72)

Since v4.0.0

## layerConfig

Provides `Redis` and `NodeRedis` services from `Config`-backed ioredis
options, closing the client when the layer scope ends.

**Signature**

```ts
declare const layerConfig: (
  options: Config.Wrap<IoRedis.RedisOptions>
) => Layer.Layer<Redis.Redis | NodeRedis, Config.ConfigError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeRedis.ts#L83)

Since v4.0.0

# services

## NodeRedis (class)

Service tag for the Node Redis integration, exposing the underlying
`ioredis` client and a `use` helper that maps client failures to
`RedisError`.

**Signature**

```ts
declare class NodeRedis
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeRedis.ts#L29)

Since v4.0.0
