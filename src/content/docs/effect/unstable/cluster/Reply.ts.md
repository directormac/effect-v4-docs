---
title: Reply.ts
nav_order: 192
parent: "effect"
---

## Reply.ts overview

Defines reply values produced by clustered RPC execution.

Every reply belongs to a request and is either a final `WithExit`, which
carries the final RPC `Exit`, or a streaming `Chunk`, which carries a
non-empty batch of success values. This module includes runtime and encoded
reply shapes, guards, per-RPC schema builders, `ReplyWithContext` for
carrying encoding services, and serialization helpers for storage or
transport.

Since v4.0.0

---

## Exports Grouped by Category

- [guards](#guards)
  - [isReply](#isreply)
- [models](#models)
  - [Chunk (class)](#chunk-class)
    - [emptyFrom (static method)](#emptyfrom-static-method)
    - [schema (static method)](#schema-static-method)
    - [schemaFrom (static method)](#schemafrom-static-method)
    - [withRequestId (method)](#withrequestid-method)
    - [[TypeId] (property)](#typeid-property)
  - [ChunkEncoded (interface)](#chunkencoded-interface)
  - [Encoded (type alias)](#encoded-type-alias)
  - [Reply (type alias)](#reply-type-alias)
  - [ReplyWithContext (class)](#replywithcontext-class)
    - [fromDefect (static method)](#fromdefect-static-method)
    - [interrupt (static method)](#interrupt-static-method)
  - [WithExit (class)](#withexit-class)
    - [is (static method)](#is-static-method)
    - [schema (static method)](#schema-static-method-1)
    - [schemaFrom (static method)](#schemafrom-static-method-1)
    - [withRequestId (method)](#withrequestid-method-1)
    - [[TypeId] (property)](#typeid-property-1)
  - [WithExitEncoded (interface)](#withexitencoded-interface)
- [schemas](#schemas)
  - [Encoded](#encoded)
  - [Reply](#reply)
- [serialization](#serialization)
  - [serialize](#serialize)
  - [serializeLastReceived](#serializelastreceived)

---

# guards

## isReply

Returns `true` when the supplied value is a runtime cluster reply, based on the
reply type identifier.

**Signature**

```ts
declare const isReply: (u: unknown) => u is Reply<Rpc.Any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L40)

Since v4.0.0

# models

## Chunk (class)

Represents a streaming RPC reply chunk for a request, carrying a non-empty
batch of success values together with the reply id and sequence number.

**Signature**

```ts
declare class Chunk<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L173)

Since v4.0.0

### emptyFrom (static method)

Creates an empty chunk reply for the supplied request id.

**Signature**

```ts
declare const emptyFrom: (requestId: Snowflake) => Chunk<Rpc.Any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L191)

Since v4.0.0

### schema (static method)

Builds a chunk schema from the streaming success schema of an RPC.

**Signature**

```ts
declare const schema: <R extends Rpc.Any>(
  rpc: R
) => Schema.declareConstructor<Chunk<R>, Chunk<R>, readonly [Rpc.SuccessExitSchema<R>]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L222)

Since v4.0.0

### schemaFrom (static method)

Builds a chunk schema that validates each success value with the supplied schema.

**Signature**

```ts
declare const schemaFrom: <Success extends Schema.Constraint>(
  success: Success
) => Schema.declareConstructor<Chunk<Rpc.Any>, Chunk<Rpc.Any>, readonly [Success]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L237)

Since v4.0.0

### withRequestId (method)

Returns a copy of this chunk associated with the supplied request id.

**Signature**

```ts
declare const withRequestId: (requestId: Snowflake) => Chunk<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L278)

Since v4.0.0

### [TypeId] (property)

Marks this value as a runtime cluster reply.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/Reply"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L184)

Since v4.0.0

## ChunkEncoded (interface)

Wire-format representation of a streaming reply chunk, including the request id,
reply id, sequence number, and non-empty encoded values.

**Signature**

```ts
export interface ChunkEncoded {
  readonly _tag: "Chunk"
  readonly requestId: string
  readonly id: string
  readonly sequence: number
  readonly values: NonEmptyReadonlyArray<unknown>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L156)

Since v4.0.0

## Encoded (type alias)

JSON-serializable form of a cluster reply.

**Signature**

```ts
type Encoded = WithExitEncoded | ChunkEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L57)

Since v4.0.0

## Reply (type alias)

Runtime reply sent for an RPC request, either as a final exit or a chunk of a
streaming success value.

**Signature**

```ts
type Reply<R> = WithExit<R> | Chunk<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L49)

Since v4.0.0

## ReplyWithContext (class)

Represents a cluster reply paired with the RPC definition and service context required to
serialize it for transport.

**When to use**

Use to carry a runtime reply together with the RPC schema and services needed
to encode it for storage or transport.

**Signature**

```ts
declare class ReplyWithContext<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L83)

Since v4.0.0

### fromDefect (static method)

Creates a terminal reply context that dies with the supplied defect.

**Signature**

```ts
declare const fromDefect: (options: {
  readonly id: Snowflake
  readonly requestId: Snowflake
  readonly defect: unknown
}) => ReplyWithContext<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L93)

Since v4.0.0

### interrupt (static method)

Creates a terminal reply context that interrupts the supplied request.

**Signature**

```ts
declare const interrupt: (options: { readonly id: Snowflake; readonly requestId: Snowflake }) => ReplyWithContext<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L113)

Since v4.0.0

## WithExit (class)

Represents a terminal RPC reply for a request, carrying the final `Exit` for the remote
call.

**When to use**

Use to represent the final success, typed failure, defect, or interruption
for a clustered RPC request.

**Signature**

```ts
declare class WithExit<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L298)

Since v4.0.0

### is (static method)

Returns `true` when the value is a terminal `WithExit` reply.

**Signature**

```ts
declare const is: (u: unknown) => u is WithExit<any>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L315)

Since v4.0.0

### schema (static method)

Builds a terminal reply schema from the exit schema of an RPC.

**Signature**

```ts
declare const schema: <R extends Rpc.Any>(
  rpc: R
) => Schema.declareConstructor<
  WithExit<R>,
  WithExit<R>,
  readonly [Schema.Exit<Rpc.SuccessExitSchema<R>, Rpc.ErrorExitSchema<R>, Rpc.DefectSchema>]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L324)

Since v4.0.0

### schemaFrom (static method)

Builds a terminal reply schema that validates the encoded exit value.

**Signature**

```ts
declare const schemaFrom: <
  Success extends Schema.Constraint,
  Error extends Schema.Constraint,
  Defect extends Schema.Constraint
>(
  exitSchema: Schema.Exit<Success, Error, Defect>
) => Schema.declareConstructor<WithExit<Rpc.Any>, WithExit<Rpc.Any>, readonly [Schema.Exit<Success, Error, Defect>]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L339)

Since v4.0.0

### withRequestId (method)

Returns a copy of this terminal reply associated with the supplied request id.

**Signature**

```ts
declare const withRequestId: (requestId: Snowflake) => WithExit<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L387)

Since v4.0.0

### [TypeId] (property)

Marks this value as a runtime cluster reply.

**Signature**

```ts
readonly [TypeId]: "~effect/cluster/Reply"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L308)

Since v4.0.0

## WithExitEncoded (interface)

Wire-format representation of a terminal reply containing the request id, reply
id, and encoded RPC exit value.

**Signature**

```ts
export interface WithExitEncoded<A = unknown, E = unknown> {
  readonly _tag: "WithExit"
  readonly requestId: string
  readonly id: string
  readonly exit: RpcMessage.ExitEncoded<A, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L142)

Since v4.0.0

# schemas

## Encoded

Schema for reply values that are already in encoded form.

**Details**

Per-RPC payload validation is performed by `Reply(rpc)`.

**Signature**

```ts
declare const Encoded: Schema.Codec<Encoded, Encoded, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L69)

Since v4.0.0

## Reply

Builds the transport codec for replies to the specified RPC, covering terminal
`WithExit` replies and streaming `Chunk` replies.

**Signature**

```ts
declare const Reply: <R extends Rpc.Any>(
  rpc: R
) => Schema.Codec<WithExit<R> | Chunk<R>, Encoded, Rpc.ServicesServer<R>, Rpc.ServicesClient<R>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L402)

Since v4.0.0

# serialization

## serialize

Serializes a `ReplyWithContext` into its encoded wire representation, using the
reply's RPC schema and context and refailing encoding errors as
`MalformedMessage`.

**Signature**

```ts
declare const serialize: <R extends Rpc.Any>(self: ReplyWithContext<R>) => Effect.Effect<Encoded, MalformedMessage>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L426)

Since v4.0.0

## serializeLastReceived

Serializes an outgoing request's last received reply when one exists, returning
`None` when no reply has been received and refailing encoding errors as
`MalformedMessage`.

**Signature**

```ts
declare const serializeLastReceived: <R extends Rpc.Any>(
  self: OutgoingRequest<R>
) => Effect.Effect<Option.Option<Encoded>, MalformedMessage>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Reply.ts#L446)

Since v4.0.0
