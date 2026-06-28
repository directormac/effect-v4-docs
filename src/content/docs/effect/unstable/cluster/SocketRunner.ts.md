---
title: SocketRunner.ts
nav_order: 207
parent: "effect"
---

## SocketRunner.ts overview

Runs cluster runner RPCs over a socket transport.

The full layer serves runner RPC handlers on a provided `SocketServer`, logs
the bound address, and provides `Sharding` and `Runners` clients when an
outgoing runner client protocol is available. This module also includes a
client-only socket runner layer for processes that need cluster clients
without starting a runner server or receiving shard assignments.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerClientOnly](#layerclientonly)

---

# layers

## layer

Layer that runs a cluster runner over the socket RPC protocol, providing
`Sharding` and `Runners` clients and logging the socket listen address.

**When to use**

Use when a cluster runner process should accept runner RPCs through a
provided `SocketServer` and receive shard assignments while exposing
`Sharding` and `Runners` services.

**Details**

It logs the bound `SocketServer.address` when the layer starts, formatting TCP
addresses as `hostname:port` and Unix socket addresses as their filesystem
path.

**Gotchas**

Although this layer serves runner RPCs with the provided `SocketServer`,
outgoing calls to other runners still require a `Runners.RpcClientProtocol`
service.

**See**

- `layerClientOnly` for the socket runner layer that only provides clients and does not receive shard assignments
- `Runners.RpcClientProtocol` for the outgoing runner client protocol required by this layer

**Signature**

```ts
declare const layer: Layer.Layer<
  Sharding.Sharding | Runners.Runners,
  never,
  | RpcSerialization.RpcSerialization
  | SocketServer
  | MessageStorage
  | RunnerStorage.RunnerStorage
  | ShardingConfig
  | Runners.RpcClientProtocol
  | RunnerHealth
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketRunner.ts#L65)

Since v4.0.0

## layerClientOnly

Provides a client-only socket runner layer that provides `Sharding` and `Runners` clients
without starting a runner server or receiving shard assignments.

**When to use**

Use to join a socket-based cluster as a client-only participant that can send
messages without hosting shards.

**Signature**

```ts
declare const layerClientOnly: Layer.Layer<
  Sharding.Sharding | Runners.Runners,
  never,
  MessageStorage | RunnerStorage.RunnerStorage | ShardingConfig | Runners.RpcClientProtocol
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SocketRunner.ts#L92)

Since v4.0.0
