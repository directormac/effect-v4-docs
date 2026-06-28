---
title: MessageStorage.ts
nav_order: 191
parent: "effect"
---

## MessageStorage.ts overview

Stores Effect Cluster messages and replies behind a pluggable backend.

`MessageStorage` is the boundary between cluster runner logic and the storage
system that keeps mailbox state recoverable. It saves requests, control
envelopes, and replies; finds unprocessed messages for assigned shards;
tracks duplicate requests; and manages reply handlers waiting for responses.
This module also includes the encoded storage-driver contract and no-op or
in-memory implementations for local use and tests.

Since v4.0.0

---

## Exports Grouped by Category

- [Encoded](#encoded)
  - [Encoded (type alias)](#encoded-type-alias)
  - [EncodedRepliesOptions (type alias)](#encodedrepliesoptions-type-alias)
  - [EncodedUnprocessedOptions (type alias)](#encodedunprocessedoptions-type-alias)
- [SaveResult](#saveresult)
  - [SaveResult](#saveresult-1)
  - [SaveResult (type alias)](#saveresult-type-alias)
  - [SaveResultEncoded](#saveresultencoded)
- [constructors](#constructors)
  - [make](#make)
  - [makeEncoded](#makeencoded)
  - [noop](#noop)
- [context](#context)
  - [MessageStorage (class)](#messagestorage-class)
- [layers](#layers)
  - [layerMemory](#layermemory)
  - [layerNoop](#layernoop)
- [memory](#memory)
  - [MemoryDriver (class)](#memorydriver-class)
  - [MemoryEntry (type alias)](#memoryentry-type-alias)
  - [MemoryTransaction](#memorytransaction)
- [utils](#utils)
  - [SaveResult (namespace)](#saveresult-namespace)
    - [Success (interface)](#success-interface)
    - [Duplicate (interface)](#duplicate-interface)
    - [DuplicateEncoded (interface)](#duplicateencoded-interface)
    - [Constructor (interface)](#constructor-interface)
    - [Encoded (type alias)](#encoded-type-alias-1)

---

# Encoded

## Encoded (type alias)

Low-level storage-driver contract for encoded envelopes and replies.

**Details**

Implementations persist encoded messages, track primary keys and delayed
delivery, read unprocessed messages, and provide transaction wrapping.

**Signature**

```ts
type Encoded = {
  /**
   * Save the provided message and its associated metadata.
   */
  readonly saveEnvelope: (options: {
    readonly envelope: Envelope.Encoded
    readonly primaryKey: string | null
    readonly deliverAt: number | null
  }) => Effect.Effect<SaveResult.Encoded, PersistenceError>

  /**
   * Save the provided `Reply` and its associated metadata.
   */
  readonly saveReply: (reply: Reply.Encoded) => Effect.Effect<void, PersistenceError>

  /**
   * Remove the replies for the specified request.
   */
  readonly clearReplies: (requestId: Snowflake.Snowflake) => Effect.Effect<void, PersistenceError>

  /**
   * Retrieves the request id for the specified primary key.
   */
  readonly requestIdForPrimaryKey: (
    primaryKey: string
  ) => Effect.Effect<Option.Option<Snowflake.Snowflake>, PersistenceError>

  /**
   * Retrieves the replies for the specified requests.
   *
   * **Details**
   *
   * This returns:
   *
   * - Un-acknowledged chunk replies
   * - `WithExit` replies
   */
  readonly repliesFor: (requestIds: Arr.NonEmptyArray<string>) => Effect.Effect<Array<Reply.Encoded>, PersistenceError>

  /**
   * Retrieves the replies for the specified request ids.
   */
  readonly repliesForUnfiltered: (
    requestIds: Arr.NonEmptyArray<string>
  ) => Effect.Effect<Array<Reply.Encoded>, PersistenceError>

  /**
   * Retrieves the unprocessed messages for the given shards.
   *
   * **Details**
   *
   * A message is unprocessed when:
   *
   * - Requests that have no `WithExit` replies or no unacknowledged chunk replies
   * - The latest `AckChunk` envelope
   * - All `Interrupt` envelopes for unprocessed requests
   */
  readonly unprocessedMessages: (
    shardIds: Arr.NonEmptyArray<string>,
    now: number
  ) => Effect.Effect<
    Array<{
      readonly envelope: Envelope.Encoded
      readonly lastSentReply: Option.Option<Reply.Encoded>
    }>,
    PersistenceError
  >

  /**
   * Retrieves the unprocessed messages by id.
   */
  readonly unprocessedMessagesById: (
    messageIds: Arr.NonEmptyArray<Snowflake.Snowflake>,
    now: number
  ) => Effect.Effect<
    Array<{
      readonly envelope: Envelope.Encoded
      readonly lastSentReply: Option.Option<Reply.Encoded>
    }>,
    PersistenceError
  >

  /**
   * Reset the mailbox state for the provided address.
   */
  readonly resetAddress: (address: EntityAddress) => Effect.Effect<void, PersistenceError>

  /**
   * Clear all messages and replies for the provided address.
   */
  readonly clearAddress: (address: EntityAddress) => Effect.Effect<void, PersistenceError>

  /**
   * Reset the mailbox state for the provided shards.
   */
  readonly resetShards: (shardIds: Arr.NonEmptyArray<string>) => Effect.Effect<void, PersistenceError>

  /**
   * Used to wrap requests with transactions.
   */
  readonly withTransaction: <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L290)

Since v4.0.0

## EncodedRepliesOptions (type alias)

Cursor options for reading encoded replies across request sets.

**Details**

The fields distinguish existing requests from new requests and carry the
driver-specific pagination cursor.

**Signature**

```ts
type EncodedRepliesOptions<A> = {
  readonly existingRequests: Array<string>
  readonly newRequests: Array<string>
  readonly cursor: Option.Option<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L435)

Since v4.0.0

## EncodedUnprocessedOptions (type alias)

Cursor options for reading encoded unprocessed messages across shard sets.

**Details**

The fields distinguish existing shards from newly assigned shards and carry the
driver-specific pagination cursor.

**Signature**

```ts
type EncodedUnprocessedOptions<A> = {
  readonly existingShards: Array<number>
  readonly newShards: Array<number>
  readonly cursor: Option.Option<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L418)

Since v4.0.0

# SaveResult

## SaveResult

Constructors and matchers for decoded save results.

**Signature**

```ts
declare const SaveResult: {
  readonly Success: <A>(args: void) => SaveResult.Success
  readonly Duplicate: <A>(args: {
    readonly originalId: Snowflake.Snowflake
    readonly lastReceivedReply: Option.Option<Reply.Reply<A extends Rpc.Any ? A : never>>
  }) => SaveResult.Duplicate<A extends Rpc.Any ? A : never>
  readonly $is: <Tag extends "Success" | "Duplicate">(
    tag: Tag
  ) => {
    <T extends SaveResult<any>>(u: T): u is T & { readonly _tag: Tag }
    (
      u: unknown
    ): u is
      | Extract<SaveResult.Success, { readonly _tag: Tag }>
      | Extract<SaveResult.Duplicate<never>, { readonly _tag: Tag }>
  }
  readonly $match: {
    <
      A,
      B,
      C,
      D,
      Cases extends {
        readonly Success: (args: SaveResult.Success) => any
        readonly Duplicate: (args: SaveResult.Duplicate<A extends Rpc.Any ? A : never>) => any
      }
    >(
      cases: Cases
    ): (self: SaveResult<A extends Rpc.Any ? A : never>) => Unify<ReturnType<Cases["Success" | "Duplicate"]>>
    <
      A,
      B,
      C,
      D,
      Cases extends {
        readonly Success: (args: SaveResult.Success) => any
        readonly Duplicate: (args: SaveResult.Duplicate<A extends Rpc.Any ? A : never>) => any
      }
    >(
      self: SaveResult<A extends Rpc.Any ? A : never>,
      cases: Cases
    ): Unify<ReturnType<Cases["Success" | "Duplicate"]>>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L194)

Since v4.0.0

## SaveResult (type alias)

Result of saving a request or envelope into message storage.

**Details**

A duplicate result carries the original request ID and the last reply already
received for the duplicated request.

**Signature**

```ts
type SaveResult<R> = SaveResult.Success | SaveResult.Duplicate<R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L186)

Since v4.0.0

## SaveResultEncoded

Constructors and matchers for encoded save results returned by storage
drivers.

**Signature**

```ts
declare const SaveResultEncoded: {
  readonly Success: Data.TaggedEnum.ConstructorFrom<SaveResult.Success, "_tag">
  readonly Duplicate: Data.TaggedEnum.ConstructorFrom<SaveResult.DuplicateEncoded, "_tag">
  readonly $is: <Tag extends "Success" | "Duplicate">(
    tag: Tag
  ) => (
    u: unknown
  ) => u is
    | Extract<SaveResult.Success, { readonly _tag: Tag }>
    | Extract<SaveResult.DuplicateEncoded, { readonly _tag: Tag }>
  readonly $match: {
    <
      Cases extends {
        readonly Success: (args: SaveResult.Success) => any
        readonly Duplicate: (args: SaveResult.DuplicateEncoded) => any
      }
    >(
      cases: Cases
    ): (value: SaveResult.Encoded) => Unify<ReturnType<Cases["Success" | "Duplicate"]>>
    <
      Cases extends {
        readonly Success: (args: SaveResult.Success) => any
        readonly Duplicate: (args: SaveResult.DuplicateEncoded) => any
      }
    >(
      value: SaveResult.Encoded,
      cases: Cases
    ): Unify<ReturnType<Cases["Success" | "Duplicate"]>>
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L203)

Since v4.0.0

# constructors

## make

Wraps a concrete message storage implementation with reply-handler management.

**Details**

The returned service can register waiting reply handlers, notify them when
replies are saved, and fail them when a request or shard is unregistered.

**Signature**

```ts
declare const make: (
  storage: Omit<
    MessageStorage["Service"],
    "registerReplyHandler" | "unregisterReplyHandler" | "unregisterShardReplyHandlers"
  >
) => Effect.Effect<MessageStorage["Service"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L452)

Since v4.0.0

## makeEncoded

Builds a `MessageStorage` service from an encoded storage driver.

**Details**

The adapter handles envelope and reply encoding and decoding, primary-key
generation, delayed delivery checks, duplicate decoding, and malformed-message
defect replies.

**Signature**

```ts
declare const makeEncoded: (encoded: Encoded) => Effect.Effect<MessageStorage["Service"], never, Snowflake.Generator>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L562)

Since v4.0.0

## noop

No-op `MessageStorage` service that does not persist messages or replies.

**Signature**

```ts
declare const noop: {
  readonly saveRequest: <R extends Rpc.Any>(
    envelope: Message.OutgoingRequest<R>
  ) => Effect.Effect<SaveResult<R>, PersistenceError | MalformedMessage>
  readonly saveEnvelope: (
    envelope: Message.OutgoingEnvelope
  ) => Effect.Effect<void, PersistenceError | MalformedMessage>
  readonly saveReply: <R extends Rpc.Any>(
    reply: Reply.ReplyWithContext<R>
  ) => Effect.Effect<void, PersistenceError | MalformedMessage>
  readonly clearReplies: (requestId: Snowflake.Snowflake) => Effect.Effect<void, PersistenceError>
  readonly repliesFor: <R extends Rpc.Any>(
    requests: Iterable<Message.OutgoingRequest<R>>
  ) => Effect.Effect<Array<Reply.Reply<R>>, PersistenceError | MalformedMessage>
  readonly repliesForUnfiltered: (
    requestIds: Iterable<Snowflake.Snowflake>
  ) => Effect.Effect<Array<Reply.Encoded>, PersistenceError | MalformedMessage>
  readonly requestIdForPrimaryKey: (options: {
    readonly address: EntityAddress
    readonly tag: string
    readonly id: string
  }) => Effect.Effect<Option.Option<Snowflake.Snowflake>, PersistenceError>
  readonly registerReplyHandler: <R extends Rpc.Any>(
    message: Message.OutgoingRequest<R> | Message.IncomingRequest<R>
  ) => Effect.Effect<void, EntityNotAssignedToRunner>
  readonly unregisterReplyHandler: (requestId: Snowflake.Snowflake) => Effect.Effect<void>
  readonly unregisterShardReplyHandlers: (shardId: ShardId.ShardId) => Effect.Effect<void>
  readonly unprocessedMessages: (
    shardIds: Iterable<ShardId.ShardId>
  ) => Effect.Effect<Array<Message.Incoming<any>>, PersistenceError>
  readonly unprocessedMessagesById: <R extends Rpc.Any>(
    messageIds: Iterable<Snowflake.Snowflake>
  ) => Effect.Effect<Array<Message.Incoming<R>>, PersistenceError>
  readonly resetShards: (shardIds: Iterable<ShardId.ShardId>) => Effect.Effect<void, PersistenceError>
  readonly resetAddress: (address: EntityAddress) => Effect.Effect<void, PersistenceError>
  readonly clearAddress: (address: EntityAddress) => Effect.Effect<void, PersistenceError>
  readonly withTransaction: <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L772)

Since v4.0.0

# context

## MessageStorage (class)

Service for cluster mailbox persistence and reply delivery.

**Details**

It stores outgoing requests, control envelopes, and replies; reads unprocessed
messages; manages reply handlers; and provides transaction wrapping for storage
operations.

**Signature**

```ts
declare class MessageStorage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L48)

Since v4.0.0

# layers

## layerMemory

Layer that provides in-memory message storage and its backing `MemoryDriver`.

**Signature**

```ts
declare const layerMemory: Layer.Layer<MessageStorage | MemoryDriver, never, ShardingConfig>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L1052)

Since v4.0.0

## layerNoop

Layer that provides the no-op `MessageStorage` service.

**Signature**

```ts
declare const layerNoop: Layer.Layer<MessageStorage, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L1044)

Since v4.0.0

# memory

## MemoryDriver (class)

Service that provides an in-memory message storage driver with inspectable backing state.

**Details**

It provides a `MessageStorage` service, the encoded driver implementation, and
maps used to track requests, primary keys, unprocessed envelopes, reply IDs,
and the journal.

**Signature**

```ts
declare class MemoryDriver
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L828)

Since v4.0.0

## MemoryEntry (type alias)

In-memory storage entry for a request envelope.

**Details**

It stores the encoded envelope, last acknowledged chunk, accumulated replies,
and optional delivery time.

**Signature**

```ts
type MemoryEntry = {
  readonly envelope: Envelope.Encoded
  lastReceivedChunk: Reply.ChunkEncoded | undefined
  replies: Array<Reply.Encoded>
  deliverAt: number | null
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L799)

Since v4.0.0

## MemoryTransaction

Provides a context reference used in tests to simulate a transaction.

**Signature**

```ts
declare const MemoryTransaction: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L812)

Since v4.0.0

# utils

## SaveResult (namespace)

Variants and helper types for `SaveResult`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L210)

Since v4.0.0

### Success (interface)

Variant indicating that the message was saved as a new storage entry.

**Signature**

```ts
export interface Success {
  readonly _tag: "Success"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L230)

Since v4.0.0

### Duplicate (interface)

Variant indicating that the request duplicates an existing stored request.

**Details**

It carries the original request ID and the latest decoded reply, when one is
available.

**Signature**

```ts
export interface Duplicate<R extends Rpc.Any> {
  readonly _tag: "Duplicate"
  readonly originalId: Snowflake.Snowflake
  readonly lastReceivedReply: Option.Option<Reply.Reply<R>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L245)

Since v4.0.0

### DuplicateEncoded (interface)

Encoded duplicate-save variant returned by lower-level storage drivers.

**Details**

It carries the original request ID and the latest encoded reply, when one is
available.

**Signature**

```ts
export interface DuplicateEncoded {
  readonly _tag: "Duplicate"
  readonly originalId: Snowflake.Snowflake
  readonly lastReceivedReply: Option.Option<Reply.Encoded>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L262)

Since v4.0.0

### Constructor (interface)

Generic tagged enum constructor type for `SaveResult`.

**Signature**

```ts
export interface Constructor extends Data.TaggedEnum.WithGenerics<1> {
  readonly taggedEnum: SaveResult<this["A"] extends Rpc.Any ? this["A"] : never>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L274)

Since v4.0.0

### Encoded (type alias)

Encoded storage-driver form of `SaveResult`.

**Details**

Duplicate results contain an encoded last received reply instead of a decoded
reply.

**Signature**

```ts
type Encoded = SaveResult.Success | SaveResult.DuplicateEncoded
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/MessageStorage.ts#L222)

Since v4.0.0
