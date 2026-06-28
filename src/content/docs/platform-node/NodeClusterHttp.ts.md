---
title: NodeClusterHttp.ts
nav_order: 4
parent: "@effect/platform-node"
---

## NodeClusterHttp.ts overview

Node.js HTTP and WebSocket layers for Effect Cluster runners.

The main `layer` builds a sharding layer for HTTP or WebSocket transport,
choosing serialization, runner health checks, runner storage, message
storage, and optional client-only mode from the supplied options.
`layerHttpServer` provides the Node HTTP server used by cluster runners, and
this module re-exports the Kubernetes HTTP client layer used by runner health
checks.

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

Builds the Node cluster HTTP/WebSocket sharding layer, configuring runner
transport, RPC serialization, message storage, runner health checks, and
optional client-only mode.

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
      Sharding | Runners.Runners | ("byo" extends Storage ? never : MessageStorage.MessageStorage),
      ServeError | Config.ConfigError,
      "local" extends Storage
        ? never
        : "byo" extends Storage
          ? MessageStorage.MessageStorage | RunnerStorage.RunnerStorage
          : SqlClient
    >
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeClusterHttp.ts#L57)

Since v4.0.0

## layerHttpServer

Provides the HTTP server and Node HTTP services used by cluster runners,
listening on `ShardingConfig.runnerListenAddress` or `runnerAddress`.

**Signature**

```ts
declare const layerHttpServer: Layer.Layer<
  NodeServices | HttpServer | HttpPlatform | Etag.Generator,
  ServeError,
  ShardingConfig.ShardingConfig
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeClusterHttp.ts#L141)

Since v4.0.0

# re-exports

## layerK8sHttpClient

Provides the Kubernetes HTTP client layer used by Kubernetes runner health checks.

**Signature**

```ts
declare const layerK8sHttpClient: Layer.Layer<K8sHttpClient, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeClusterHttp.ts#L46)

Since v4.0.0
