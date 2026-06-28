---
title: Envelope.ts
nav_order: 185
parent: "effect"
---

## Envelope.ts overview

Defines the transport envelopes exchanged by cluster entities.

Request envelopes wrap decoded RPC payloads with the target entity address,
RPC tag, request id, headers, and optional tracing context. The module also
includes acknowledgement envelopes for streamed reply chunks, interrupt
envelopes for in-flight requests, JSON codecs for partially decoded
envelopes, guards, request constructors, and storage primary-key helpers.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [makeRequest](#makerequest)
- [models](#models)
  - [AckChunk (class)](#ackchunk-class)
    - [withRequestId (method)](#withrequestid-method)
    - [[TypeId] (property)](#typeid-property)
  - [AckChunkEncoded (interface)](#ackchunkencoded-interface)
  - [Encoded (type alias)](#encoded-type-alias)
  - [Envelope (type alias)](#envelope-type-alias)
  - [Interrupt (class)](#interrupt-class)
    - [withRequestId (method)](#withrequestid-method-1)
    - [[TypeId] (property)](#typeid-property-1)
  - [InterruptEncoded (interface)](#interruptencoded-interface)
  - [PartialRequest (class)](#partialrequest-class)
  - [PartialRequestEncoded (interface)](#partialrequestencoded-interface)
  - [Request (interface)](#request-interface)
- [primary key](#primary-key)
  - [primaryKey](#primarykey)
  - [primaryKeyByAddress](#primarykeybyaddress)
- [refinements](#refinements)
  - [isEnvelope](#isenvelope)
- [schemas](#schemas)
  - [Partial](#partial)
  - [Partial (type alias)](#partial-type-alias)
  - [PartialArray](#partialarray)
  - [PartialJson](#partialjson)
- [serialization](#serialization)
  - [Envelope](#envelope)
  - [Request](#request)
  - [RequestTransform](#requesttransform)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
- [utils](#utils)
  - [Envelope (namespace)](#envelope-namespace)
    - [Any (type alias)](#any-type-alias)
  - [Request (namespace)](#request-namespace)
    - [Any (type alias)](#any-type-alias-1)

---

# constructors

## makeRequest

Constructs a runtime request envelope and attaches the envelope type identifier.

**Details**

Tracing fields are included only when a `traceId` is provided.

**Signature**

```ts
declare const makeRequest: <Rpc extends Rpc.Any>(options: {
  readonly requestId: Snowflake
  readonly address: EntityAddress
  readonly tag: Rpc.Tag<Rpc>
  readonly payload: Rpc.Payload<Rpc>
  readonly headers: Headers.Headers
  readonly traceId?: string | undefined
  readonly spanId?: string | undefined
  readonly sampled?: boolean | undefined
}) => Request<Rpc>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L338)

Since v4.0.0

# models

## AckChunk (class)

Represents an envelope acknowledging receipt of a streamed reply chunk for a
request.

**Details**

The `replyId` identifies the chunk reply that has been received.

**Signature**

```ts
declare class AckChunk
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L154)

Since v4.0.0

### withRequestId (method)

Returns a copy of this acknowledgement associated with the supplied request id.

**Signature**

```ts
declare const withRequestId: (requestId: Snowflake) => AckChunk
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L173)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster envelope for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/Envelope"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L166)

Since v4.0.0

## AckChunkEncoded (interface)

Serialized JSON shape of an `AckChunk` envelope.

**Signature**

```ts
export interface AckChunkEncoded {
  readonly _tag: "AckChunk"
  readonly id: string
  readonly address: {
    readonly shardId: {
      readonly group: string
      readonly id: number
    }
    readonly entityType: string
    readonly entityId: string
  }
  readonly requestId: string
  readonly replyId: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L187)

Since v4.0.0

## Encoded (type alias)

JSON-serializable form of a cluster envelope.

**Signature**

```ts
type Encoded = PartialRequestEncoded | AckChunkEncoded | InterruptEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L49)

Since v4.0.0

## Envelope (type alias)

Union of cluster envelopes exchanged for an RPC request.

**Details**

An envelope is either a request, an acknowledgement for a streamed reply chunk,
or an interrupt signal.

**Signature**

```ts
type Envelope<R> = Request<R> | AckChunk | Interrupt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L41)

Since v4.0.0

## Interrupt (class)

Represents an envelope used to interrupt an in-flight entity request.

**Signature**

```ts
declare class Interrupt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L208)

Since v4.0.0

### withRequestId (method)

Returns a copy of this interrupt associated with the supplied request id.

**Signature**

```ts
declare const withRequestId: (requestId: Snowflake) => Interrupt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L226)

Since v4.0.0

### [TypeId] (property)

Marks this value as a cluster envelope for runtime guards.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/Envelope"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L219)

Since v4.0.0

## InterruptEncoded (interface)

Serialized JSON shape of an `Interrupt` envelope.

**Signature**

```ts
export interface InterruptEncoded {
  readonly _tag: "Interrupt"
  readonly id: string
  readonly address: {
    readonly shardId: {
      readonly group: string
      readonly id: number
    }
    readonly entityType: string
    readonly entityId: string
  }
  readonly requestId: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L240)

Since v4.0.0

## PartialRequest (class)

Schema for a request envelope before its RPC payload has been decoded.

**Details**

The envelope metadata is decoded, while the payload remains `unknown` until it
is decoded with the target RPC payload schema.

**Signature**

```ts
declare class PartialRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L101)

Since v4.0.0

## PartialRequestEncoded (interface)

Serialized JSON shape of a request envelope.

**Details**

Identifiers are encoded as strings and the RPC payload remains unknown until
decoded with the RPC schema.

**Signature**

```ts
export interface PartialRequestEncoded {
  readonly _tag: "Request"
  readonly requestId: string
  readonly address: {
    readonly shardId: {
      readonly group: string
      readonly id: number
    }
    readonly entityType: string
    readonly entityId: string
  }
  readonly tag: string
  readonly payload: unknown
  readonly headers: ReadonlyRecord<string, string>
  readonly traceId?: string
  readonly spanId?: string
  readonly sampled?: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L124)

Since v4.0.0

## Request (interface)

Runtime envelope for an RPC request addressed to a specific entity.

**Details**

It carries the request ID, entity address, RPC tag, decoded payload, request
headers, and optional tracing context.

**Signature**

```ts
export interface Request<in out Rpc extends Rpc.Any> {
  readonly [TypeId]: typeof TypeId
  readonly _tag: "Request"
  readonly requestId: Snowflake
  readonly address: EntityAddress
  readonly tag: Rpc.Tag<Rpc>
  readonly payload: Rpc.Payload<Rpc>
  readonly headers: Headers.Headers
  readonly traceId?: string
  readonly spanId?: string
  readonly sampled?: boolean
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L77)

Since v4.0.0

# primary key

## primaryKey

Returns the storage primary key for a request envelope whose payload has a
primary key, or `null` when the envelope is not a keyed request.

**Signature**

```ts
declare const primaryKey: <R extends Rpc.Any>(envelope: Envelope<R>) => string | null
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L409)

Since v4.0.0

## primaryKeyByAddress

Builds a storage primary-key string from an entity address, RPC tag, and
payload primary-key ID.

**Signature**

```ts
declare const primaryKeyByAddress: (options: {
  readonly address: EntityAddress
  readonly tag: string
  readonly id: string
}) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L427)

Since v4.0.0

# refinements

## isEnvelope

Returns `true` when the supplied value is a runtime cluster envelope.

**Details**

The check is based on the envelope type identifier.

**Signature**

```ts
declare const isEnvelope: (u: unknown) => u is Envelope<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L326)

Since v4.0.0

# schemas

## Partial

Schema for partially decoded cluster envelopes.

**Details**

It accepts `PartialRequest`, `AckChunk`, and `Interrupt` envelope values.

**Signature**

```ts
declare const Partial: Schema.Union<readonly [typeof PartialRequest, typeof AckChunk, typeof Interrupt]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L264)

Since v4.0.0

## Partial (type alias)

Decoded value type produced by the `Partial` envelope schema.

**Signature**

```ts
type Partial = typeof Partial.Type
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L278)

Since v4.0.0

## PartialArray

Schema for mutable arrays of JSON-encoded partial cluster envelopes.

**Signature**

```ts
declare const PartialArray: Schema.mutable<
  Schema.$Array<Schema.Codec<PartialRequest | AckChunk | Interrupt, Encoded, never, never>>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L297)

Since v4.0.0

## PartialJson

JSON codec for partial cluster envelopes.

**Signature**

```ts
declare const PartialJson: Schema.Codec<PartialRequest | AckChunk | Interrupt, Encoded, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L286)

Since v4.0.0

# serialization

## Envelope

Schema for runtime cluster envelopes recognized by their type identifier.

**Signature**

```ts
declare const Envelope: Schema.declare<Envelope<any>, Envelope<any>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L372)

Since v4.0.0

## Request

Schema for runtime request envelopes.

**Signature**

```ts
declare const Request: Schema.declare<Request.Any, Request.Any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L382)

Since v4.0.0

## RequestTransform

Transforms plain request data with `makeRequest` and encodes
request envelopes back to their raw representation.

**Signature**

```ts
declare const RequestTransform: SchemaTransformation.Transformation<Request.Any, any, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L394)

Since v4.0.0

# type IDs

## TypeId

Type identifier used to mark runtime cluster envelope values.

**Signature**

```ts
declare const TypeId: "~effect/cluster/Envelope"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L28)

Since v4.0.0

# utils

## Envelope (namespace)

Helper types associated with cluster envelopes.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L56)

Since v4.0.0

### Any (type alias)

Envelope type for any RPC protocol.

**Signature**

```ts
type Any = Envelope<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L63)

Since v4.0.0

## Request (namespace)

Helper types associated with request envelopes.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L306)

Since v4.0.0

### Any (type alias)

Request envelope type for any RPC protocol.

**Signature**

```ts
type Any = Request<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Envelope.ts#L313)

Since v4.0.0
