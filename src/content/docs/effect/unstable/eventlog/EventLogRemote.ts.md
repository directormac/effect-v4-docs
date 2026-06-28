---
title: EventLogRemote.ts
nav_order: 226
parent: "effect"
---

## EventLogRemote.ts overview

Connects a local event log to a remote replica.

`EventLogRemote` writes local entries to another journal, receives remote
change streams from a sequence number, and can wait until the current
event-log identity has completed remote authentication. The encrypted
constructor is the default for browser, edge, or service replicas crossing an
untrusted network. The unencrypted constructor is intended for trusted
transports or tests.

Since v4.0.0

---

## Exports Grouped by Category

- [RPC client](#rpc-client)
  - [EventLogRemoteClient (class)](#eventlogremoteclient-class)
- [constructors](#constructors)
  - [makeEncrypted](#makeencrypted)
  - [makeUnencrypted](#makeunencrypted)
  - [makeWith](#makewith)
- [errors](#errors)
  - [EventLogRemoteError (class)](#eventlogremoteerror-class)
- [layers](#layers)
  - [layerEncrypted](#layerencrypted)
  - [layerUnencrypted](#layerunencrypted)
- [services](#services)
  - [EventLogRemote (class)](#eventlogremote-class)

---

# RPC client

## EventLogRemoteClient (class)

Service that provides a typed RPC client for the `EventLogRemoteRpcs` protocol.

**When to use**

Use to provide the RPC client used by remote event-log replicas to
authenticate, write entries, and subscribe to changes.

**Signature**

```ts
declare class EventLogRemoteClient
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogRemote.ts#L125)

Since v4.0.0

# constructors

## makeEncrypted

Creates an `EventLogRemote` that encrypts outgoing entries and decrypts
incoming changes with `EventLogEncryption`.

**Signature**

```ts
declare const makeEncrypted: Effect.Effect<
  {
    readonly id: RemoteId
    readonly changes: (options: {
      readonly identity: Identity["Service"]
      readonly storeId: StoreId
      readonly startSequence: number
    }) => Effect.Effect<Queue.Dequeue<RemoteEntry, EventLogRemoteError>, never, Scope.Scope>
    readonly write: (options: {
      readonly identity: Identity["Service"]
      readonly storeId: StoreId
      readonly entries: ReadonlyArray<Entry>
    }) => Effect.Effect<void, EventLogRemoteError>
    readonly whenAuthenticated: <A, E, R>(
      effect: Effect.Effect<A, E, R>
    ) => Effect.Effect<A, E | EventLogRemoteError, R | Identity>
  },
  EventLogRemoteError,
  Scope.Scope | EventLogEncryption | Registry | EventLogRemoteClient
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogRemote.ts#L300)

Since v4.0.0

## makeUnencrypted

Creates an `EventLogRemote` that sends and receives plaintext entry payloads.

**Signature**

```ts
declare const makeUnencrypted: Effect.Effect<
  {
    readonly id: RemoteId
    readonly changes: (options: {
      readonly identity: Identity["Service"]
      readonly storeId: StoreId
      readonly startSequence: number
    }) => Effect.Effect<Queue.Dequeue<RemoteEntry, EventLogRemoteError>, never, Scope.Scope>
    readonly write: (options: {
      readonly identity: Identity["Service"]
      readonly storeId: StoreId
      readonly entries: ReadonlyArray<Entry>
    }) => Effect.Effect<void, EventLogRemoteError>
    readonly whenAuthenticated: <A, E, R>(
      effect: Effect.Effect<A, E, R>
    ) => Effect.Effect<A, E | EventLogRemoteError, R | Identity>
  },
  EventLogRemoteError,
  Scope.Scope | Registry | EventLogRemoteClient
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogRemote.ts#L335)

Since v4.0.0

## makeWith

Creates an `EventLogRemote` from custom write encoding and change decoding
functions.

**Details**

The remote performs the hello/authentication handshake, retries after forbidden
responses by re-authenticating, chunks large writes, and registers itself with
the `Registry` for the current scope.

**Signature**

```ts
declare const makeWith: (args_0: {
  readonly encodeWrite: (options: {
    readonly identity: Identity["Service"]
    readonly entries: ReadonlyArray<Entry>
    readonly storeId: StoreId
  }) => Effect.Effect<Uint8Array<ArrayBuffer>, Schema.SchemaError>
  readonly decodeChanges: (
    identity: Identity["Service"],
    data: Uint8Array<ArrayBuffer>
  ) => Effect.Effect<ReadonlyArray<RemoteEntry>, Schema.SchemaError>
}) => Effect.Effect<
  {
    readonly id: RemoteId
    readonly changes: (options: {
      readonly identity: Identity["Service"]
      readonly storeId: StoreId
      readonly startSequence: number
    }) => Effect.Effect<Queue.Dequeue<RemoteEntry, EventLogRemoteError>, never, Scope.Scope>
    readonly write: (options: {
      readonly identity: Identity["Service"]
      readonly storeId: StoreId
      readonly entries: ReadonlyArray<Entry>
    }) => Effect.Effect<void, EventLogRemoteError>
    readonly whenAuthenticated: <A, E, R>(
      effect: Effect.Effect<A, E, R>
    ) => Effect.Effect<A, E | EventLogRemoteError, R | Identity>
  },
  EventLogRemoteError,
  Scope.Scope | Registry | EventLogRemoteClient
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogRemote.ts#L152)

Since v4.0.0

# errors

## EventLogRemoteError (class)

Error raised by `EventLogRemote` operations, recording the failed method and
underlying cause.

**Signature**

```ts
declare class EventLogRemoteError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogRemote.ts#L83)

Since v4.0.0

# layers

## layerEncrypted

Provides an encrypted `EventLogRemote` using the remote RPC client and the
default Web Crypto encryption layer.

**Signature**

```ts
declare const layerEncrypted: Layer.Layer<EventLogRemote, EventLogRemoteError, RpcClient.Protocol | Registry>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogRemote.ts#L356)

Since v4.0.0

## layerUnencrypted

Provides an unencrypted `EventLogRemote` using the remote RPC client.

**Signature**

```ts
declare const layerUnencrypted: Layer.Layer<EventLogRemote, EventLogRemoteError, RpcClient.Protocol | Registry>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogRemote.ts#L371)

Since v4.0.0

# services

## EventLogRemote (class)

Service that represents a remote event-log replica.

**When to use**

Use to access or provide a remote event-log replica that can write local
entries and stream remote changes.

**Details**

It can write local entries to the remote, stream remote changes from a sequence
number, and run effects only after the supplied identity has authenticated.

**Signature**

```ts
declare class EventLogRemote
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogRemote.ts#L59)

Since v4.0.0
