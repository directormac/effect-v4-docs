---
title: EventLogMessage.ts
nav_order: 225
parent: "effect"
---

## EventLogMessage.ts overview

Defines protocol messages for event-log remote clients and servers.

This module is the shared boundary between `EventLogRemote` clients and
event-log servers. It defines store ids, protocol errors, the
hello/authenticate session handshake, remote calls for writes and changes,
and message formats for encrypted or plaintext journal entries.

Since v4.0.0

---

## Exports Grouped by Category

- [StoreId](#storeid)
  - [StoreId](#storeid-1)
  - [StoreId (type alias)](#storeid-type-alias)
- [middleware](#middleware)
  - [EventLogAuthentication (class)](#eventlogauthentication-class)
- [protocols](#protocols)
  - [Authenticate (class)](#authenticate-class)
  - [AuthenticateRpc (class)](#authenticaterpc-class)
  - [ChangesRpc (class)](#changesrpc-class)
  - [ChunkedMessage (class)](#chunkedmessage-class)
    - [initialJoinState (static method)](#initialjoinstate-static-method)
    - [split (static method)](#split-static-method)
    - [join (static method)](#join-static-method)
  - [EventLogProtocolError (class)](#eventlogprotocolerror-class)
  - [EventLogRemoteRpcs (class)](#eventlogremoterpcs-class)
  - [HelloResponse (class)](#helloresponse-class)
  - [HelloRpc (class)](#hellorpc-class)
  - [SingleMessage (class)](#singlemessage-class)
  - [WriteChunkedRpc (class)](#writechunkedrpc-class)
  - [WriteEntries (class)](#writeentries-class)
  - [WriteEntriesUnencrypted (class)](#writeentriesunencrypted-class)
  - [WriteSingleRpc (class)](#writesinglerpc-class)
- [type IDs](#type-ids)
  - [StoreIdTypeId](#storeidtypeid)
  - [StoreIdTypeId (type alias)](#storeidtypeid-type-alias)

---

# StoreId

## StoreId

Schema for branded event-log store ids.

**Signature**

```ts
declare const StoreId: Schema.brand<Schema.String, "effect/eventlog/EventLog/StoreId">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L53)

Since v4.0.0

## StoreId (type alias)

Branded string identifying a logical event-log store.

**Signature**

```ts
type StoreId = string & Brand<StoreIdTypeId>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L45)

Since v4.0.0

# middleware

## EventLogAuthentication (class)

RPC middleware that authenticates event-log requests and provides the client
`Identity` to authenticated handlers.

**Signature**

```ts
declare class EventLogAuthentication
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L83)

Since v4.0.0

# protocols

## Authenticate (class)

Schema for an authentication request containing the client public key,
Ed25519 signing public key, signature over the session challenge payload, and
algorithm name.

**Signature**

```ts
declare class Authenticate
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L123)

Since v4.0.0

## AuthenticateRpc (class)

RPC used to authenticate a remote event-log session after `HelloRpc`.

**Signature**

```ts
declare class AuthenticateRpc
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L136)

Since v4.0.0

## ChangesRpc (class)

RPC used to stream remote event-log changes for a public key and store id
starting at a sequence number.

**Details**

Responses are encoded as either `SingleMessage` values or `ChunkedMessage`
parts.

**Signature**

```ts
declare class ChangesRpc
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L323)

Since v4.0.0

## ChunkedMessage (class)

Represents one part of a large encoded event-log payload.

**When to use**

Use to divide data into chunks and `join` to reassemble all chunks with
the same id once every part has arrived.

**Signature**

```ts
declare class ChunkedMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L164)

Since v4.0.0

### initialJoinState (static method)

**Signature**

```ts
declare const initialJoinState: () => Map<number, { readonly parts: Array<Uint8Array>; count: number; bytes: number }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L173)

### split (static method)

Splits binary event-log message data into numbered chunks.

**Signature**

```ts
declare const split: (id: number, data: Uint8Array) => NonEmptyReadonlyArray<ChunkedMessage>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L186)

Since v4.0.0

### join (static method)

Reassembles all chunks for a message id into the original binary payload.

**Signature**

```ts
declare const join: (
  map: Map<number, { readonly parts: Array<Uint8Array>; count: number; bytes: number }>,
  part: ChunkedMessage
) => Uint8Array<ArrayBuffer> | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L206)

Since v4.0.0

## EventLogProtocolError (class)

Error returned by event-log remote RPCs.

**Details**

It records the request tag, optional identity and store information, a protocol
error code, and a human-readable message.

**Signature**

```ts
declare class EventLogProtocolError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L66)

Since v4.0.0

## EventLogRemoteRpcs (class)

RPC group containing the event-log remote handshake, authentication, write, and
changes endpoints.

**Signature**

```ts
declare class EventLogRemoteRpcs
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L348)

Since v4.0.0

## HelloResponse (class)

Response sent by the remote server during the authentication handshake.

**Details**

It contains the server remote id and a challenge that must be signed by the
client.

**Signature**

```ts
declare class HelloResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L100)

Since v4.0.0

## HelloRpc (class)

RPC used to start an event-log remote session and receive a `HelloResponse`.

**Signature**

```ts
declare class HelloRpc
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L111)

Since v4.0.0

## SingleMessage (class)

Represents an entire encoded event-log payload in one transport frame.

**Signature**

```ts
declare class SingleMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L147)

Since v4.0.0

## WriteChunkedRpc (class)

RPC used to send one chunk of a large encoded write payload.

**Signature**

```ts
declare class WriteChunkedRpc
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L247)

Since v4.0.0

## WriteEntries (class)

Schema for encrypted event-log write payloads sent to a remote store.

**Details**

It includes the client public key, target store id, AES-GCM initialization
vector, and encrypted entries.

**Signature**

```ts
declare class WriteEntries
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L263)

Since v4.0.0

## WriteEntriesUnencrypted (class)

Schema for plaintext event-log write payloads sent to a remote store.

**Signature**

```ts
declare class WriteEntriesUnencrypted
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L283)

Since v4.0.0

## WriteSingleRpc (class)

RPC used to send an encoded write payload that fits in one message.

**Signature**

```ts
declare class WriteSingleRpc
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L304)

Since v4.0.0

# type IDs

## StoreIdTypeId

Runtime brand identifier for event-log store ids.

**Signature**

```ts
declare const StoreIdTypeId: "effect/eventlog/EventLog/StoreId"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L37)

Since v4.0.0

## StoreIdTypeId (type alias)

Type-level identifier used to brand event-log store ids.

**Signature**

```ts
type StoreIdTypeId = "effect/eventlog/EventLog/StoreId"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventLogMessage.ts#L29)

Since v4.0.0
