---
title: NodeClusterSocket.ts
nav_order: 3
parent: "@effect/platform-node-shared"
---

## NodeClusterSocket.ts overview

Node TCP socket transport for Effect Cluster runner-to-runner RPC.

This module provides the shared Node layers used by socket-based cluster
transports. `layerClientProtocol` opens TCP sockets to peer runner addresses
and wraps them in the current RPC serialization protocol. `layerSocketServer`
exposes the socket server that receives incoming runner RPC traffic.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layerClientProtocol](#layerclientprotocol)
  - [layerSocketServer](#layersocketserver)

---

# layers

## layerClientProtocol

Provides the cluster `RpcClientProtocol` by opening TCP sockets to runner
addresses and using the current RPC serialization service.

**Signature**

```ts
declare const layerClientProtocol: Layer.Layer<Runners.RpcClientProtocol, never, RpcSerialization.RpcSerialization>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeClusterSocket.ts#L30)

Since v4.0.0

## layerSocketServer

Provides the socket server used by cluster runners, listening on
`ShardingConfig.runnerListenAddress` or `runnerAddress`.

**Signature**

```ts
declare const layerSocketServer: Layer.Layer<
  SocketServer.SocketServer,
  SocketServer.SocketServerError,
  ShardingConfig.ShardingConfig
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeClusterSocket.ts#L59)

Since v4.0.0
