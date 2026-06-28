---
title: Message.ts
nav_order: 190
parent: "effect"
---

## Message.ts overview

Defines the message shapes moved through Effect Cluster.

Messages carry entity requests and control envelopes between callers, durable
storage, transports, and runner handlers. This module includes incoming and
outgoing variants for encoded stored requests, decoded local requests,
acknowledgements, and interrupts. It also provides helpers for local delivery
and for encoding or decoding request payloads with matching RPC schemas.

Since v4.0.0

---

## Exports Grouped by Category

- [incoming](#incoming)
  - [Incoming (type alias)](#incoming-type-alias)
  - [IncomingEnvelope (class)](#incomingenvelope-class)
  - [IncomingLocal (type alias)](#incominglocal-type-alias)
  - [IncomingRequest (class)](#incomingrequest-class)
  - [IncomingRequestLocal (class)](#incomingrequestlocal-class)
  - [incomingLocalFromOutgoing](#incominglocalfromoutgoing)
- [outgoing](#outgoing)
  - [Outgoing (type alias)](#outgoing-type-alias)
  - [OutgoingEnvelope (class)](#outgoingenvelope-class)
    - [interrupt (static method)](#interrupt-static-method)
  - [OutgoingRequest (class)](#outgoingrequest-class)
    - [encodedCache (property)](#encodedcache-property)
- [serialization](#serialization)
  - [deserializeLocal](#deserializelocal)
  - [serialize](#serialize)
  - [serializeEnvelope](#serializeenvelope)
  - [serializeRequest](#serializerequest)

---

# incoming

## Incoming (type alias)

Message read by a runner from storage or transport.

**Details**

An incoming message is either a persisted request with an encoded payload or an
incoming control envelope.

**Signature**

```ts
type Incoming<R> = IncomingRequest<R> | IncomingEnvelope
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L37)

Since v4.0.0

## IncomingEnvelope (class)

Represents an incoming control envelope carrying an `AckChunk` or `Interrupt`.

**Signature**

```ts
declare class IncomingEnvelope
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L119)

Since v4.0.0

## IncomingLocal (type alias)

Locally decoded incoming message for in-process delivery.

**Details**

It is either a request with a decoded payload or an incoming control envelope.

**Signature**

```ts
type IncomingLocal<R> = IncomingRequestLocal<R> | IncomingEnvelope
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L49)

Since v4.0.0

## IncomingRequest (class)

Represents an incoming persisted request whose payload has not yet been decoded with the RPC
schema.

**Details**

It carries the last reply that was sent and a callback for persisting encoded
replies.

**Signature**

```ts
declare class IncomingRequest<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L89)

Since v4.0.0

## IncomingRequestLocal (class)

Represents an incoming request for local delivery with a decoded payload.

**Details**

It includes dynamic annotations, the last sent reply, and a callback for
replying with decoded replies.

**Signature**

```ts
declare class IncomingRequestLocal<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L106)

Since v4.0.0

## incomingLocalFromOutgoing

Converts an outgoing message into a locally deliverable incoming message.

**Details**

Request messages keep their decoded payload and response callback, while
control envelopes are wrapped as incoming envelopes.

**Signature**

```ts
declare const incomingLocalFromOutgoing: <R extends Rpc.Any>(self: Outgoing<R>) => IncomingLocal<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L62)

Since v4.0.0

# outgoing

## Outgoing (type alias)

Message produced for storage or transport.

**Details**

An outgoing message is either an entity request or a control envelope.

**Signature**

```ts
type Outgoing<R> = OutgoingRequest<R> | OutgoingEnvelope
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L134)

Since v4.0.0

## OutgoingEnvelope (class)

Represents an outgoing control envelope paired with RPC metadata.

**When to use**

Use to construct an interrupt envelope for an
in-flight request.

**Signature**

```ts
declare class OutgoingEnvelope
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L174)

Since v4.0.0

### interrupt (static method)

Creates an outgoing interrupt envelope for the supplied request.

**Signature**

```ts
declare const interrupt: (options: {
  readonly address: EntityAddress
  readonly id: Snowflake
  readonly requestId: Snowflake
}) => OutgoingEnvelope
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L183)

Since v4.0.0

## OutgoingRequest (class)

Represents an outgoing entity request with decoded payload and RPC metadata.

**Details**

It carries the service context used for serialization, the last received reply,
the reply callback, dynamic annotations, and an optional encoded request cache.

**Signature**

```ts
declare class OutgoingRequest<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L147)

Since v4.0.0

### encodedCache (property)

Cached encoded envelope payload reused when sending the request.

**Signature**

```ts
encodedCache: Envelope.PartialRequest | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L160)

Since v4.0.0

# serialization

## deserializeLocal

Decodes a partial envelope back into a locally deliverable incoming message.

**Details**

Control envelopes pass through directly. Request envelopes require the original
`OutgoingRequest` so the payload can be decoded with the correct RPC schema and
context.

**Signature**

```ts
declare const deserializeLocal: <Rpc extends Rpc.Any>(
  self: Outgoing<Rpc>,
  encoded: Envelope.Partial
) => Effect.Effect<IncomingLocal<Rpc>, MalformedMessage>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L280)

Since v4.0.0

## serialize

Serializes an outgoing message into a partial envelope.

**Details**

Control envelopes pass through unchanged. Requests are encoded with their RPC
payload schema, reusing the cached encoded request when available.

**Signature**

```ts
declare const serialize: <Rpc extends Rpc.Any>(
  message: Outgoing<Rpc>
) => Effect.Effect<Envelope.Partial, MalformedMessage>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L212)

Since v4.0.0

## serializeEnvelope

Serializes an outgoing message into its JSON envelope representation.

**Details**

Schema encoding failures are converted to `MalformedMessage`.

**Signature**

```ts
declare const serializeEnvelope: <Rpc extends Rpc.Any>(
  message: Outgoing<Rpc>
) => Effect.Effect<Envelope.Encoded, MalformedMessage, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L235)

Since v4.0.0

## serializeRequest

Encodes the payload of an `OutgoingRequest` with the request's RPC payload
schema and service context.

**Details**

The result is a `PartialRequest` suitable for storage or transport.

**Signature**

```ts
declare const serializeRequest: <Rpc extends Rpc.Any>(
  self: OutgoingRequest<Rpc>
) => Effect.Effect<Envelope.PartialRequest, MalformedMessage>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Message.ts#L254)

Since v4.0.0
