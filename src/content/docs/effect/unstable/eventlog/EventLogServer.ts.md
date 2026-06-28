---
title: EventLogServer.ts
nav_order: 227
parent: "effect"
---

## EventLogServer.ts overview

Builds server-side handlers for the event-log remote protocol.

Transport modules use these handlers to expose an event journal to remote
replicas. The handlers run the hello/authenticate challenge flow, attach the
authenticated `EventLog.Identity` to later requests, accept single or chunked
writes, and stream changes back as single or chunked messages.

Since v4.0.0

---

## Exports Grouped by Category

- [chunked message state](#chunked-message-state)
  - [ChunkedMessageState (class)](#chunkedmessagestate-class)
- [layers](#layers)
  - [layerAuthMiddleware](#layerauthmiddleware)
  - [layerRpcHandlers](#layerrpchandlers)

---

# chunked message state

## ChunkedMessageState (class)

Annotation that stores partial `ChunkedMessage` data while chunked writes are
being reassembled.

**When to use**

Use to keep per-client chunk assembly state while handling chunked event-log
writes.

**Signature**

```ts
declare class ChunkedMessageState
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServer.ts#L220)

Since v4.0.0

# layers

## layerAuthMiddleware

Provides RPC authentication middleware that reads the authenticated
`EventLog.Identity` from client annotations.

**Details**

Requests without an identity fail with a forbidden `EventLogProtocolError`.

**Signature**

```ts
declare const layerAuthMiddleware: Layer.Layer<EventLogAuthentication, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServer.ts#L49)

Since v4.0.0

## layerRpcHandlers

Creates the shared RPC handlers for the event-log remote protocol.

**Details**

The layer manages hello challenges, verifies session authentication, reassembles
chunked writes, delegates write and change handling to the supplied callbacks,
and frames large change payloads into chunks.

**Signature**

```ts
declare const layerRpcHandlers: (options: {
  readonly remoteId: RemoteId
  readonly getOrCreateSessionAuthBinding: (
    publicKey: string,
    signingPublicKey: Uint8Array<ArrayBuffer>
  ) => Effect.Effect<Uint8Array<ArrayBuffer>>
  readonly onWrite: (data: Uint8Array<ArrayBuffer>) => Effect.Effect<void, EventLogProtocolError>
  readonly changes: (options: {
    readonly publicKey: string
    readonly storeId: StoreId
    readonly startSequence: number
  }) => Stream.Stream<Uint8Array<ArrayBuffer>, unknown>
}) => Layer.Layer<Rpc.ToHandler<RpcGroup.Rpcs<typeof EventLogRemoteRpcs>> | EventLogAuthentication>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogServer.ts#L76)

Since v4.0.0
