---
title: Runners.ts
nav_order: 196
parent: "effect"
---

## Runners.ts overview

Handles communication between Effect Cluster runners.

`Runners` sits between sharding decisions and runner execution. It can ping a
runner, send requests or control envelopes, notify a runner that persisted
work is available, and record that a runner address is unavailable. This
module defines the runner communication service, its RPC protocol, no-op and
RPC-backed implementations, local persistence support, reply recovery, and
the protocol service used by transport-specific runner layers.

Since v4.0.0

---

## Exports Grouped by Category

- [No-op](#no-op)
  - [makeNoop](#makenoop)
- [Rpcs](#rpcs)
  - [RpcClient (interface)](#rpcclient-interface)
  - [Rpcs (class)](#rpcs-class)
  - [makeRpcClient](#makerpcclient)
- [client](#client)
  - [RpcClientProtocol (class)](#rpcclientprotocol-class)
- [constructors](#constructors)
  - [make](#make)
  - [makeRpc](#makerpc)
- [context](#context)
  - [Runners (class)](#runners-class)
- [layers](#layers)
  - [layerNoop](#layernoop)
  - [layerRpc](#layerrpc)

---

# No-op

## makeNoop

Creates a no-op `Runners` service that rejects sends with
`EntityNotAssignedToRunner` and ignores notifications, pings, and unavailable
runner reports.

**Signature**

```ts
declare const makeNoop: Effect.Effect<
  {
    readonly ping: (address: RunnerAddress) => Effect.Effect<void, RunnerUnavailable>
    readonly sendLocal: <R extends Rpc.Any>(options: {
      readonly message: Message.Outgoing<R>
      readonly send: <Rpc extends Rpc.Any>(
        message: Message.IncomingLocal<Rpc>
      ) => Effect.Effect<void, EntityNotAssignedToRunner | MailboxFull | AlreadyProcessingMessage>
      readonly simulateRemoteSerialization: boolean
    }) => Effect.Effect<void, EntityNotAssignedToRunner | MailboxFull | AlreadyProcessingMessage | PersistenceError>
    readonly send: <R extends Rpc.Any>(options: {
      readonly address: RunnerAddress
      readonly message: Message.Outgoing<R>
    }) => Effect.Effect<
      void,
      EntityNotAssignedToRunner | RunnerUnavailable | MailboxFull | AlreadyProcessingMessage | PersistenceError
    >
    readonly notify: <R extends Rpc.Any>(options: {
      readonly address: Option.Option<RunnerAddress>
      readonly message: Message.Outgoing<R>
      readonly discard: boolean
    }) => Effect.Effect<void, PersistenceError>
    readonly notifyLocal: <R extends Rpc.Any>(options: {
      readonly message: Message.Outgoing<R>
      readonly notify: (options: Message.IncomingLocal<any>) => Effect.Effect<void, EntityNotAssignedToRunner>
      readonly discard: boolean
      readonly storageOnly?: boolean | undefined
    }) => Effect.Effect<void, PersistenceError>
    readonly onRunnerUnavailable: (address: RunnerAddress) => Effect.Effect<void>
  },
  never,
  Scope | MessageStorage.MessageStorage | ShardingConfig | Snowflake.Generator
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runners.ts#L431)

Since v4.0.0

# Rpcs

## RpcClient (interface)

Client interface generated from the runner RPC group.

**Signature**

```ts
export interface RpcClient extends RpcClient_.FromGroup<typeof Rpcs, RpcClientError> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runners.ts#L513)

Since v4.0.0

## Rpcs (class)

RPC group used for runner-to-runner communication, including ping, notify,
effect, stream, and envelope messages.

**Signature**

```ts
declare class Rpcs
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runners.ts#L472)

Since v4.0.0

## makeRpcClient

Builds a runner RPC client from the current `RpcClient.Protocol`, using the
`Runners` span prefix with tracing disabled.

**Signature**

```ts
declare const makeRpcClient: Effect.Effect<RpcClient, never, Scope | RpcClient_.Protocol>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runners.ts#L522)

Since v4.0.0

# client

## RpcClientProtocol (class)

Service that creates an RPC client protocol for communicating with a runner at a
given address.

**Signature**

```ts
declare class RpcClientProtocol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runners.ts#L687)

Since v4.0.0

# constructors

## make

Builds the `Runners` service from remote runner callbacks and adds local
message persistence, duplicate request handling, optional local serialization
simulation, and polling for persisted replies.

**When to use**

Use when you need a custom `Runners` service around remote `ping`, `send`,
`notify`, and `onRunnerUnavailable` callbacks, with standard local
persistence and reply recovery behavior.

**Details**

`make` uses the supplied remote callbacks for runner communication and
derives `sendLocal` and `notifyLocal`. Local sends can optionally simulate
remote serialization, persisted notifications are saved through
`MessageStorage`, duplicate requests are resumed from stored replies when
possible, and pending replies are polled according to
`ShardingConfig.entityReplyPollInterval`.

**Gotchas**

`notify` and `notifyLocal` only support RPCs annotated as persisted; calling
either path with a non-persisted message dies instead of returning a typed
error.

**See**

- `makeRpc` for the RPC-backed implementation built on top of this constructor
- `makeNoop` for a no-op implementation when remote runner communication is not needed

**Signature**

```ts
declare const make: (
  options: Omit<Runners["Service"], "sendLocal" | "notifyLocal">
) => Effect.Effect<
  Runners["Service"],
  never,
  MessageStorage.MessageStorage | Snowflake.Generator | ShardingConfig | Scope
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runners.ts#L159)

Since v4.0.0

## makeRpc

Builds a `Runners` service backed by RPC clients, caching a client per runner
address and dispatching ping, notify, effect, stream, and envelope messages over
the runner protocol.

**Signature**

```ts
declare const makeRpc: Effect.Effect<
  {
    readonly ping: (address: RunnerAddress) => Effect.Effect<void, RunnerUnavailable>
    readonly sendLocal: <R extends Rpc.Any>(options: {
      readonly message: Message.Outgoing<R>
      readonly send: <Rpc extends Rpc.Any>(
        message: Message.IncomingLocal<Rpc>
      ) => Effect.Effect<void, EntityNotAssignedToRunner | MailboxFull | AlreadyProcessingMessage>
      readonly simulateRemoteSerialization: boolean
    }) => Effect.Effect<void, EntityNotAssignedToRunner | MailboxFull | AlreadyProcessingMessage | PersistenceError>
    readonly send: <R extends Rpc.Any>(options: {
      readonly address: RunnerAddress
      readonly message: Message.Outgoing<R>
    }) => Effect.Effect<
      void,
      EntityNotAssignedToRunner | RunnerUnavailable | MailboxFull | AlreadyProcessingMessage | PersistenceError
    >
    readonly notify: <R extends Rpc.Any>(options: {
      readonly address: Option.Option<RunnerAddress>
      readonly message: Message.Outgoing<R>
      readonly discard: boolean
    }) => Effect.Effect<void, PersistenceError>
    readonly notifyLocal: <R extends Rpc.Any>(options: {
      readonly message: Message.Outgoing<R>
      readonly notify: (options: Message.IncomingLocal<any>) => Effect.Effect<void, EntityNotAssignedToRunner>
      readonly discard: boolean
      readonly storageOnly?: boolean | undefined
    }) => Effect.Effect<void, PersistenceError>
    readonly onRunnerUnavailable: (address: RunnerAddress) => Effect.Effect<void>
  },
  never,
  Scope | MessageStorage.MessageStorage | ShardingConfig | Snowflake.Generator | RpcClientProtocol
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runners.ts#L536)

Since v4.0.0

# context

## Runners (class)

Service for communicating with cluster runners, including pinging runners,
sending and notifying messages, coordinating persisted replies, and marking
runners unavailable.

**Signature**

```ts
declare class Runners
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runners.ts#L47)

Since v4.0.0

# layers

## layerNoop

Layer that provides the no-op `Runners` service, using the default snowflake
generator.

**Signature**

```ts
declare const layerNoop: Layer.Layer<Runners, never, MessageStorage.MessageStorage | ShardingConfig>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runners.ts#L449)

Since v4.0.0

## layerRpc

Layer that provides an RPC-backed `Runners` service using `RpcClientProtocol`,
message storage, sharding configuration, and the default snowflake generator.

**Signature**

```ts
declare const layerRpc: Layer.Layer<Runners, never, MessageStorage.MessageStorage | ShardingConfig | RpcClientProtocol>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Runners.ts#L672)

Since v4.0.0
