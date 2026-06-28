---
title: EventLogServerEncrypted.ts
nav_order: 228
parent: "effect"
---

## EventLogServerEncrypted.ts overview

Serves encrypted event-log replication.

Encrypted `EventLogRemote` clients use this module when they need a remote
synchronization endpoint that never sees plaintext events. The server stores
encrypted entries and replication metadata keyed by client public key and
store id, then streams encrypted changes back to clients for local
decryption. This module defines the RPC handlers, server layer, storage
contract, and in-memory storage layer for that encrypted server path.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerRpcHandlers](#layerrpchandlers)
- [storage](#storage)
  - [PersistedEntry (class)](#persistedentry-class)
  - [Storage (class)](#storage-class)
  - [layerStorageMemory](#layerstoragememory)
  - [makeStorageMemory](#makestoragememory)

---

# layers

## layer

Provides an encrypted event-log RPC server using `EventLogRemoteRpcs` and the
encrypted server RPC handlers.

**When to use**

Use when you need an encrypted event-log RPC server for encrypted
`EventLogRemote` replication over an existing `RpcServer.Protocol`.

**Details**

This layer installs `EventLogRemoteRpcs` on the provided RPC server protocol
and wires those RPCs to `layerRpcHandlers`. Encrypted entries, session
authentication bindings, remote ids, and change streams are delegated to
`Storage`.

**See**

- `layerRpcHandlers` for the encrypted handler layer without installing an RPC server protocol
- `Storage` for the storage service required by this layer
- `layerStorageMemory` for the process-local in-memory storage layer

**Signature**

```ts
declare const layer: Layer.Layer<never, never, RpcServer.Protocol | Storage>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerEncrypted.ts#L112)

Since v4.0.0

## layerRpcHandlers

Provides RPC handlers for the encrypted event-log server.

**Details**

Incoming encrypted write payloads are decoded and persisted through `Storage`;
change streams read encrypted entries from storage and encode them for the
remote protocol.

**Signature**

```ts
declare const layerRpcHandlers: Layer.Layer<
  | EventLogAuthentication
  | Handler<"EventLog.Hello">
  | Handler<"EventLog.Authenticate">
  | Handler<"EventLog.WriteChunked">
  | Handler<"EventLog.WriteSingle">
  | Handler<"EventLog.Changes">,
  never,
  Storage
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerEncrypted.ts#L42)

Since v4.0.0

# storage

## PersistedEntry (class)

Schema for encrypted entries persisted by the encrypted event-log server.

**Signature**

```ts
declare class PersistedEntry
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerEncrypted.ts#L122)

Since v4.0.0

## Storage (class)

Defines the backing store service used by the encrypted event-log server.

**When to use**

Use to provide durable encrypted event-log persistence for an encrypted
event-log server layer.

**Details**

It provides the server remote id, stores session authentication bindings,
persists encrypted entries, and streams encrypted changes for a public key and
store id.

**Signature**

```ts
declare class Storage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerEncrypted.ts#L156)

Since v4.0.0

## layerStorageMemory

Provides encrypted server `Storage` using the in-memory implementation.

**Signature**

```ts
declare const layerStorageMemory: Layer.Layer<Storage, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerEncrypted.ts#L261)

Since v4.0.0

## makeStorageMemory

Creates an in-memory encrypted server `Storage`.

**Details**

Data, session authentication bindings, and streams are process-local and are
released with the surrounding scope.

**Signature**

```ts
declare const makeStorageMemory: Effect.Effect<
  {
    readonly getId: Effect.Effect<RemoteId>
    readonly getOrCreateSessionAuthBinding: (
      publicKey: string,
      signingPublicKey: Uint8Array<ArrayBuffer>
    ) => Effect.Effect<Uint8Array<ArrayBuffer>>
    readonly write: (
      publicKey: string,
      storeId: StoreId,
      entries: ReadonlyArray<PersistedEntry>
    ) => Effect.Effect<ReadonlyArray<EncryptedRemoteEntry>>
    readonly changes: (
      publicKey: string,
      storeId: StoreId,
      startSequence: number
    ) => Stream.Stream<EncryptedRemoteEntry>
  },
  never,
  Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServerEncrypted.ts#L185)

Since v4.0.0
