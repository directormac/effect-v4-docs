---
title: BunClusterHttp.ts
nav_order: 2
parent: "@effect/platform-bun"
---

## BunClusterHttp.ts overview

Bun HTTP and WebSocket layers for Effect Cluster runners.

`layerHttpServer` provides the Bun HTTP server used by cluster runners. The
main `layer` builds a sharding layer for HTTP or WebSocket transport,
choosing serialization, runner health checks, runner storage, message
storage, and optional client-only mode from the supplied options.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerHttpServer](#layerhttpserver)
- [re-exports](#re-exports)
  - [layerK8sHttpClient](#layerk8shttpclient)

---

# layers

## layer

Creates Bun cluster layers for HTTP or WebSocket transport, configuring serialization, storage, runner health, and optional client-only mode.

**When to use**

Use to install the complete Bun HTTP or WebSocket cluster layer, including
client-only cluster access when a process should connect without serving
runner RPCs.

**Details**

`serialization` defaults to MessagePack, `runnerHealth` defaults to ping
checks, SQL-backed storage is used by default, and `shardingConfig` is
overlaid on environment-loaded sharding configuration. `local` storage uses
no-op message storage plus in-memory runner storage, while `byo` leaves both
message and runner storage for the caller to provide.

**Gotchas**

`clientOnly` does not start the HTTP server or receive shard assignments.
Non-client-only mode listens with `runnerListenAddress` when present, falling
back to `runnerAddress`. HTTP and WebSocket runner RPCs use the default
`HttpRunner` route.

**See**

- `layerHttpServer` for the server layer used by non-client-only transports
- `layerK8sHttpClient` for Kubernetes runner health support

**Signature**

```ts
declare const layer: <
  const ClientOnly extends boolean = false,
  const Storage extends "local" | "sql" | "byo" = never
>(options: {
  readonly transport: "http" | "websocket"
  readonly serialization?: "msgpack" | "ndjson" | undefined
  readonly clientOnly?: ClientOnly | undefined
  readonly storage?: Storage | undefined
  readonly runnerHealth?: "ping" | "k8s" | undefined
  readonly runnerHealthK8s?:
    | { readonly namespace?: string | undefined; readonly labelSelector?: string | undefined }
    | undefined
  readonly shardingConfig?: Partial<ShardingConfig.ShardingConfig["Service"]> | undefined
}) => ClientOnly extends true
  ? Layer.Layer<
      Sharding | Runners.Runners | ("byo" extends Storage ? never : MessageStorage.MessageStorage),
      Config.ConfigError,
      "local" extends Storage
        ? never
        : "byo" extends Storage
          ? MessageStorage.MessageStorage | RunnerStorage.RunnerStorage
          : SqlClient
    >
  : Layer.Layer<
      Sharding | Runners.Runners | MessageStorage.MessageStorage,
      ServeError | Config.ConfigError,
      "local" extends Storage
        ? never
        : "byo" extends Storage
          ? MessageStorage.MessageStorage | RunnerStorage.RunnerStorage
          : SqlClient
    >
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunClusterHttp.ts#L99)

Since v4.0.0

## layerHttpServer

Layer that provides a Bun HTTP server for cluster runners.

**Signature**

```ts
declare const layerHttpServer: Layer.Layer<
  BunServices | HttpServer | HttpPlatform | Etag.Generator,
  ServeError,
  ShardingConfig.ShardingConfig
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunClusterHttp.ts#L53)

Since v4.0.0

# re-exports

## layerK8sHttpClient

Layer that provides a Kubernetes HTTP client for runner health checks.

**Signature**

```ts
declare const layerK8sHttpClient: Layer.Layer<K8sHttpClient, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunClusterHttp.ts#L44)

Since v4.0.0
