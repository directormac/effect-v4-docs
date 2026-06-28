---
title: RunnerServer.ts
nav_order: 197
parent: "effect"
---

## RunnerServer.ts overview

Provides server-side layers for the cluster runner protocol.

Runner protocol handlers receive ping, notification, request, stream, and
envelope messages from other runners. They forward those messages into
`Sharding` and coordinate persisted replies through `MessageStorage`. This
module includes the handler layer, a transport-independent RPC server layer, a
full server layer that also provides runner clients, and a client-only layer
for applications that do not serve runner RPCs.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerClientOnly](#layerclientonly)
  - [layerHandlers](#layerhandlers)
  - [layerWithClients](#layerwithclients)

---

# layers

## layer

Creates the runner RPC server layer, which receives messages from other
runners, forwards them to the `Sharding` layer, and responds to `Ping`
requests.

**When to use**

Use when a runner process should accept runner-to-runner protocol messages
over a provided server `RpcServer.Protocol`.

**Gotchas**

This layer does not choose or provide the wire transport; provide a
transport-specific `RpcServer.Protocol` separately.

**See**

- `layerHandlers` for the lower-level handler layer used when the RPC server is supplied elsewhere
- `layerWithClients` for a runner server layer that also provides the `Sharding` and `Runners` clients
- `layerClientOnly` for embedding a cluster client without serving runner RPCs

**Signature**

```ts
declare const layer: Layer.Layer<never, never, RpcServer.Protocol | Sharding.Sharding | MessageStorage.MessageStorage>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerServer.ts#L165)

Since v4.0.0

## layerClientOnly

Creates a client-only `Runners` layer.

**When to use**

Use to embed a cluster client inside another Effect application without registering with
the ShardManager or receiving shard assignments.

**Signature**

```ts
declare const layerClientOnly: Layer.Layer<
  Sharding.Sharding | Runners.Runners,
  never,
  MessageStorage.MessageStorage | RunnerStorage.RunnerStorage | ShardingConfig | Runners.RpcClientProtocol
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerServer.ts#L206)

Since v4.0.0

## layerHandlers

Layer that handles runner protocol RPCs by forwarding requests to `Sharding`
and `MessageStorage`.

**Signature**

```ts
declare const layerHandlers: Layer.Layer<
  Handler<"Ping"> | Handler<"Notify"> | Handler<"Effect"> | Handler<"Stream"> | Handler<"Envelope">,
  never,
  Sharding.Sharding | MessageStorage.MessageStorage
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerServer.ts#L40)

Since v4.0.0

## layerWithClients

Layer that provides `RunnerServer` together with `Runners` and `Sharding`
clients.

**Signature**

```ts
declare const layerWithClients: Layer.Layer<
  Sharding.Sharding | Runners.Runners,
  never,
  | RpcServer.Protocol
  | MessageStorage.MessageStorage
  | RunnerStorage.RunnerStorage
  | ShardingConfig
  | Runners.RpcClientProtocol
  | RunnerHealth.RunnerHealth
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RunnerServer.ts#L181)

Since v4.0.0
