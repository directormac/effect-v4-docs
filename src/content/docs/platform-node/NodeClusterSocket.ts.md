---
title: NodeClusterSocket.ts
nav_order: 5
parent: "@effect/platform-node"
---

## NodeClusterSocket.ts overview

Node.js socket layers for Effect Cluster runners.

The main `layer` builds a sharding layer for socket transport, choosing
serialization, runner health checks, runner storage, message storage, and
optional client-only mode from the supplied options. This module also
re-exports the shared socket client and server protocol layers, and provides
Kubernetes-aware Undici dispatcher and HTTP client layers for runner health
checks.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerDispatcherK8s](#layerdispatcherk8s)
  - [layerK8sHttpClient](#layerk8shttpclient)
- [re-exports](#re-exports)
  - [layerClientProtocol](#layerclientprotocol)
  - [layerSocketServer](#layersocketserver)

---

# layers

## layer

Builds the Node cluster socket sharding layer, configuring RPC
serialization, message storage, runner health checks, and optional
client-only mode.

**Signature**

```ts
declare const layer: <
  const ClientOnly extends boolean = false,
  const Storage extends "local" | "sql" | "byo" = never
>(options?: {
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
      ConfigError,
      "local" extends Storage
        ? never
        : "byo" extends Storage
          ? MessageStorage.MessageStorage | RunnerStorage.RunnerStorage
          : SqlClient
    >
  : Layer.Layer<
      Sharding | Runners.Runners | ("byo" extends Storage ? never : MessageStorage.MessageStorage),
      SocketServer.SocketServerError | ConfigError,
      "local" extends Storage
        ? never
        : "byo" extends Storage
          ? MessageStorage.MessageStorage | RunnerStorage.RunnerStorage
          : SqlClient
    >
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeClusterSocket.ts#L62)

Since v4.0.0

## layerDispatcherK8s

Provides an Undici dispatcher for Kubernetes API calls, using the service
account CA certificate when it is available and falling back to the default
dispatcher otherwise.

**Signature**

```ts
declare const layerDispatcherK8s: Layer.Layer<NodeHttpClient.Dispatcher, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeClusterSocket.ts#L140)

Since v4.0.0

## layerK8sHttpClient

Provides a `K8sHttpClient` backed by the Undici HTTP client and the
Kubernetes-aware dispatcher.

**Signature**

```ts
declare const layerK8sHttpClient: Layer.Layer<K8sHttpClient.K8sHttpClient, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeClusterSocket.ts#L172)

Since v4.0.0

# re-exports

## layerClientProtocol

Provides the cluster `RpcClientProtocol` using the shared socket client
implementation.

**Signature**

```ts
declare const layerClientProtocol: Layer.Layer<Runners.RpcClientProtocol, never, RpcSerialization.RpcSerialization>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeClusterSocket.ts#L43)

Since v4.0.0

## layerSocketServer

Provides the socket server used by Node cluster runners through the shared
socket server implementation.

**Signature**

```ts
declare const layerSocketServer: Layer.Layer<
  SocketServer.SocketServer,
  SocketServer.SocketServerError,
  ShardingConfig.ShardingConfig
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeClusterSocket.ts#L51)

Since v4.0.0
