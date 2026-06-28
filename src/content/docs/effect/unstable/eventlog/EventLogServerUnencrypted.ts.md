---
title: EventLogServerUnencrypted.ts
nav_order: 229
parent: "effect"
---

## EventLogServerUnencrypted.ts overview

Plaintext server implementation for the event-log remote protocol.

This module accepts unencrypted event batches from remote clients, runs the
registered event handlers, stores journal entries, and streams backlog plus
live changes through the shared `EventLogServer` RPC protocol. It is intended
for trusted deployments, local development, and tests where event data does
not need a server-side encryption layer. The module also provides the
services and layers needed to authorize requests, map stores, persist entries,
and install the plaintext server.

Since v4.0.0

---

## Exports Grouped by Category

- [EventLogServerUnencrypted](#eventlogserverunencrypted)
  - [makeWrite](#makewrite)
- [compaction](#compaction)
  - [compactBacklog](#compactbacklog)
- [constructors](#constructors)
  - [make](#make)
- [errors](#errors)
  - [EventLogServerAuthError (class)](#eventlogserverautherror-class)
  - [EventLogServerStoreError (class)](#eventlogserverstoreerror-class)
- [layers](#layers)
  - [layer](#layer)
  - [layerNoRpcServer](#layernorpcserver)
  - [layerRpcHandlers](#layerrpchandlers)
  - [layerServer](#layerserver)
- [services](#services)
  - [EventLogServerAuthorization (class)](#eventlogserverauthorization-class)
  - [EventLogServerUnencrypted (class)](#eventlogserverunencrypted-class)
  - [StoreMapping (class)](#storemapping-class)
- [storage](#storage)
  - [Storage (class)](#storage-class)
  - [layerStorageMemory](#layerstoragememory)
  - [makeStorageMemory](#makestoragememory)
- [store](#store)
  - [layerStoreMappingStatic](#layerstoremappingstatic)

---

# EventLogServerUnencrypted

## makeWrite

Creates a typed server-side write function for events in the supplied
`EventLogSchema`.

**Signature**

```ts
declare const makeWrite: <Groups extends EventGroup.Any>(
  schema: EventLog.EventLogSchema<Groups>
) => Effect.Effect<
  <
    Tag extends EventGroup.Events<Groups>["tag"],
    Event extends Event.Any = Event.WithTag<EventGroup.Events<Groups>, Tag>
  >(options: {
    readonly storeId: StoreId
    readonly event: Tag
    readonly payload: Event.Payload<Event>
  }) => Effect.Effect<Event.Success<Event>, EventLogServerStoreError | Event.Error<Event>>,
  never,
  EventLogServerUnencrypted
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L80)

Since v4.0.0

# compaction

## compactBacklog

Runs the registered compactors over a backlog of remote entries.

**When to use**

Use to reduce stored remote entries before replaying them to an unencrypted
event-log client.

**Details**

Contiguous entries handled by the same compactor may be replaced with compacted
entries when the replacement count can be mapped back to increasing remote
sequence numbers; otherwise the original entries are kept.

**Signature**

```ts
declare const compactBacklog: (options: {
  readonly remoteEntries: ReadonlyArray<RemoteEntry>
  readonly compactors: ReadonlyMap<string, RegisteredCompactor>
}) => Effect.Effect<ReadonlyArray<EventJournal.RemoteEntry>, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L490)

Since v4.0.0

# constructors

## make

Creates the `EventLogServerUnencrypted` service from the configured storage and
registered event handlers.

**When to use**

Use when you need the unencrypted event-log server service from provided
`Storage` and an event-log `Registry`.

**Details**

The constructed service exposes `makeWrite`, which builds a typed server-side
write function from an `EventLogSchema`. Each write encodes the payload with
the event schema, runs the registered handler, and persists the generated
entry inside `Storage.withTransaction`.

**Gotchas**

The write function dies if the requested event tag is not present in the
schema passed to `makeWrite`; it does not report that case as a typed failure.

**See**

- `makeWrite` for the accessor that retrieves the typed server-side write function from the service environment
- `layerServer` for the layer form that provides this service together with an event-log `Registry`

**Signature**

```ts
declare const make: Effect.Effect<
  {
    readonly makeWrite: <Groups extends EventGroup.Any>(
      schema: EventLog.EventLogSchema<Groups>
    ) => <
      Tag extends EventGroup.Events<Groups>["tag"],
      Event extends Event.Any = Event.WithTag<EventGroup.Events<Groups>, Tag>
    >(options: {
      readonly storeId: StoreId
      readonly event: Tag
      readonly payload: Event.Payload<Event>
    }) => Effect.Effect<Event.Success<Event>, EventLogServerStoreError | Event.Error<Event>>
  },
  never,
  Storage | EventLog.Registry
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L698)

Since v4.0.0

# errors

## EventLogServerAuthError (class)

Error raised when unencrypted server authorization rejects an identity or store
operation.

**Signature**

```ts
declare class EventLogServerAuthError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L249)

Since v4.0.0

## EventLogServerStoreError (class)

Error raised by unencrypted server storage and store mapping operations.

**Signature**

```ts
declare class EventLogServerStoreError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L235)

Since v4.0.0

# layers

## layer

Builds a full unencrypted event-log RPC server for the supplied schema and
event-group handler layer.

**When to use**

Use when you need the full unencrypted event-log RPC server layer with
storage, authorization, RPC protocol, and event-group handler dependencies
supplied externally.

**Details**

The layer installs `EventLogRemoteRpcs`, wires `layerRpcHandlers`, registers
the supplied event-group handler layer, and provides `layerServer`, leaving
only the required infrastructure services in the environment.

**Gotchas**

Entries are persisted and streamed in plaintext. Protect the backing
`Storage` with the surrounding infrastructure, and use durable storage that
preserves session authentication bindings when the server must survive
restarts.

**See**

- `layerNoRpcServer` for installing the same unencrypted handlers when an `RpcServer.Protocol` is provided elsewhere
- `layerRpcHandlers` for wiring the unencrypted RPC handlers directly
- `layerServer` for constructing the server service and event-log registry without RPC handlers

**Signature**

```ts
declare const layer: <Groups extends EventGroup.Any, E, R>(
  _schema: EventLog.EventLogSchema<Groups>,
  layer: Layer.Layer<EventGroup.ToService<Groups>, E, R>
) => Layer.Layer<
  never,
  E,
  | Exclude<R, EventLogServerUnencrypted | EventLog.Registry>
  | EventLogServerAuthorization
  | RpcServer.Protocol
  | Storage
  | StoreMapping
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L804)

Since v4.0.0

## layerNoRpcServer

Builds the unencrypted event-log server handlers without installing an
`RpcServer.Protocol` implementation.

**Signature**

```ts
declare const layerNoRpcServer: <Groups extends EventGroup.Any, E, R>(
  _schema: EventLog.EventLogSchema<Groups>,
  layer: Layer.Layer<EventGroup.ToService<Groups>, E, R>
) => Layer.Layer<
  Rpc.ToHandler<RpcGroup.Rpcs<typeof EventLogRemoteRpcs>> | EventLogAuthentication,
  E,
  Exclude<R, EventLogServerUnencrypted | EventLog.Registry> | EventLogServerAuthorization | Storage | StoreMapping
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L829)

Since v4.0.0

## layerRpcHandlers

Provides RPC handlers for the unencrypted event-log server.

**Details**

Incoming plaintext entries are authorized, mapped to a server store, checked
for conflicts, run through registered handlers, and persisted; change streams
include compacted backlog entries when compactors are registered.

**Signature**

```ts
declare const layerRpcHandlers: Layer.Layer<
  | EventLogAuthentication
  | Rpc.Handler<"EventLog.Hello">
  | Rpc.Handler<"EventLog.Authenticate">
  | Rpc.Handler<"EventLog.WriteChunked">
  | Rpc.Handler<"EventLog.WriteSingle">
  | Rpc.Handler<"EventLog.Changes">,
  never,
  Storage | StoreMapping | EventLog.Registry | EventLogServerAuthorization
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L110)

Since v4.0.0

## layerServer

Provides `EventLogServerUnencrypted` and an event-log `Registry` using the
configured unencrypted server `Storage`.

**When to use**

Use to provide the unencrypted event-log server service together with the
registry needed by event handlers.

**Signature**

```ts
declare const layerServer: Layer.Layer<EventLogServerUnencrypted | EventLog.Registry, never, Storage>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L766)

Since v4.0.0

# services

## EventLogServerAuthorization (class)

Service that validates unencrypted event-log server
write access, read access, and identities.

**When to use**

Use to provide authorization checks for plaintext event-log writes, reads,
and identity authentication.

**Signature**

```ts
declare class EventLogServerAuthorization
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L268)

Since v4.0.0

## EventLogServerUnencrypted (class)

Service that writes plaintext event-log entries directly to
unencrypted storage through registered event handlers.

**When to use**

Use to access or provide the server service that handles plaintext
event-log writes.

**Signature**

```ts
declare class EventLogServerUnencrypted
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L57)

Since v4.0.0

## StoreMapping (class)

Service that resolves client-requested store ids to server store ids and checks
whether a store exists.

**When to use**

Use to map client-visible store identifiers to server storage identifiers
before authorizing or serving unencrypted event-log requests.

**Signature**

```ts
declare class StoreMapping
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L295)

Since v4.0.0

# storage

## Storage (class)

Defines the backing store service used by the unencrypted event-log server.

**When to use**

Use to provide durable event-log persistence for an unencrypted event-log
server layer.

**Details**

It provides the server remote id, stores session authentication bindings,
allocates remote sequence numbers, persists entries, streams changes, and
exposes a transaction boundary.

**Signature**

```ts
declare class Storage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L358)

Since v4.0.0

## layerStorageMemory

Provides unencrypted server `Storage` using the in-memory implementation.

**Signature**

```ts
declare const layerStorageMemory: Layer.Layer<Storage, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L669)

Since v4.0.0

## makeStorageMemory

Creates an in-memory unencrypted server `Storage`.

**Details**

The implementation keeps per-store journals and session authentication bindings
in memory, publishes live changes, and serializes transactions with a
semaphore.

**Signature**

```ts
declare const makeStorageMemory: Effect.Effect<
  {
    readonly getId: Effect.Effect<RemoteId>
    readonly getOrCreateSessionAuthBinding: (
      publicKey: string,
      signingPublicKey: Uint8Array<ArrayBuffer>
    ) => Effect.Effect<Uint8Array<ArrayBuffer>>
    readonly entriesAfter: (storeId: StoreId, entry: Entry) => Effect.Effect<Array<Entry>>
    readonly write: (storeId: StoreId, entries: ReadonlyArray<Entry>) => Effect.Effect<ReadonlyArray<RemoteEntry>>
    readonly changes: (options: {
      readonly storeId: StoreId
      readonly startSequence: number
      readonly compactors: ReadonlyMap<string, RegisteredCompactor>
    }) => Stream.Stream<RemoteEntry>
    readonly withTransaction: <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  },
  never,
  Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L562)

Since v4.0.0

# store

## layerStoreMappingStatic

Provides a `StoreMapping` that accepts only one configured store id and fails
all other store ids as not found.

**Signature**

```ts
declare const layerStoreMappingStatic: (options: { readonly storeId: StoreId }) => Layer.Layer<StoreMapping>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerUnencrypted.ts#L328)

Since v4.0.0
