---
title: EventJournal.ts
nav_order: 222
parent: "effect"
---

## EventJournal.ts overview

Stores event-log entries and replication state.

`EventJournal` records committed entries, exposes them for replay, publishes
local changes, and tracks the remote metadata needed to exchange entries with
other journals. Higher-level event-log schemas and handlers use this service
to rebuild projections, sync offline clients, import remote changes, and
coordinate writes per store. This module also defines journal errors, entry
and remote identifiers, schemas, and in-memory or IndexedDB-backed journal
layers.

Since v4.0.0

---

## Exports Grouped by Category

- [context](#context)
  - [EventJournal (class)](#eventjournal-class)
- [entry](#entry)
  - [Entry (class)](#entry-class)
  - [EntryId](#entryid)
  - [EntryId (type alias)](#entryid-type-alias)
  - [EntryIdOrder](#entryidorder)
  - [RemoteEntry (class)](#remoteentry-class)
  - [entryIdMillis](#entryidmillis)
  - [makeEntryIdUnsafe](#makeentryidunsafe)
- [errors](#errors)
  - [EventJournalError (class)](#eventjournalerror-class)
    - [[TypeId] (property)](#typeid-property)
- [indexed db](#indexed-db)
  - [layerIndexedDb](#layerindexeddb)
  - [makeIndexedDb](#makeindexeddb)
- [memory](#memory)
  - [layerMemory](#layermemory)
  - [makeMemory](#makememory)
- [remote](#remote)
  - [RemoteId](#remoteid)
  - [RemoteId (type alias)](#remoteid-type-alias)
  - [makeRemoteIdUnsafe](#makeremoteidunsafe)
- [type IDs](#type-ids)
  - [EntryIdTypeId](#entryidtypeid)
  - [EntryIdTypeId (type alias)](#entryidtypeid-type-alias)
  - [RemoteIdTypeId](#remoteidtypeid)
  - [RemoteIdTypeId (type alias)](#remoteidtypeid-type-alias)

---

# context

## EventJournal (class)

Context service for storing and replaying event journal entries.

**Details**

The service writes local entries, imports entries from remote journals, exposes
a stream of local changes, and provides per-store locking.

**Signature**

```ts
declare class EventJournal
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L40)

Since v4.0.0

# entry

## Entry (class)

Schema for a committed event journal entry.

**Details**

An entry records its ID, event tag, primary key, and MessagePack-encoded
payload, with helpers for array MessagePack encoding and creation timestamps.

**Signature**

```ts
declare class Entry
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L275)

Since v4.0.0

## EntryId

Schema for branded event journal entry identifiers.

**Signature**

```ts
declare const EntryId: Schema.brand<
  Schema.instanceOf<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>,
  "effect/eventlog/EventJournal/EntryId"
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L213)

Since v4.0.0

## EntryId (type alias)

Branded byte identifier for an event journal entry.

**Signature**

```ts
type EntryId = Uint8Array<ArrayBuffer> & Brand<EntryIdTypeId>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L205)

Since v4.0.0

## EntryIdOrder

Provides an Ordering instance for entry identifiers based on their raw UUID bytes.

**Signature**

```ts
declare const EntryIdOrder: Order.Order<EntryId>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L223)

Since v4.0.0

## RemoteEntry (class)

Schema for an event journal entry received from a remote source.

**Details**

It pairs the remote sequence number with the journal entry payload.

**Signature**

```ts
declare class RemoteEntry
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L347)

Since v4.0.0

## entryIdMillis

Extracts the millisecond timestamp encoded in a UUID v7 `EntryId`.

**Signature**

```ts
declare const entryIdMillis: (entryId: EntryId) => number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L258)

Since v4.0.0

## makeEntryIdUnsafe

Generates a UUID v7 `EntryId`, optionally using the supplied millisecond
timestamp.

**When to use**

Use when generating an event-log entry id internally and the UUID v7 bytes
are trusted to satisfy the brand.

**Gotchas**

This is unsafe because the generated UUID bytes are cast to the brand without
schema validation.

**Signature**

```ts
declare const makeEntryIdUnsafe: (options?: { msecs?: number }) => EntryId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L249)

Since v4.0.0

# errors

## EventJournalError (class)

Error raised by event journal operations.

**Details**

The error records the journal method that failed and the underlying cause.

**Signature**

```ts
declare class EventJournalError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L121)

Since v4.0.0

### [TypeId] (property)

Marks this value as an event journal error for runtime guards.

**Signature**

```ts
readonly [TypeId]: "effect/eventlog/EventJournal/EventJournalError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L130)

Since v4.0.0

# indexed db

## layerIndexedDb

Provides `EventJournal` using the IndexedDB-backed implementation created by
`makeIndexedDb`.

**Signature**

```ts
declare const layerIndexedDb: (options?: { readonly database?: string }) => Layer.Layer<EventJournal, EventJournalError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L778)

Since v4.0.0

## makeIndexedDb

Creates an `EventJournal` backed by IndexedDB.

**Details**

The journal stores entries and remote replication metadata in the configured
browser database, publishes local changes, and requires `Scope` so the database
connection can be closed when the scope ends.

**Signature**

```ts
declare const makeIndexedDb: (options?: {
  readonly database?: string
}) => Effect.Effect<EventJournal["Service"], EventJournalError, Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L517)

Since v4.0.0

# memory

## layerMemory

Layer that provides an in-memory `EventJournal`.

**Gotchas**

All journal data is stored in process memory and is not persisted across layer
lifetimes.

**Signature**

```ts
declare const layerMemory: Layer.Layer<EventJournal, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L503)

Since v4.0.0

## makeMemory

Creates an in-memory `EventJournal` service.

**Gotchas**

Entries, remote tracking state, and locks live only in the current process and
are lost when the service is discarded.

**Signature**

```ts
declare const makeMemory: Effect.Effect<
  {
    readonly entries: Effect.Effect<ReadonlyArray<Entry>, EventJournalError>
    readonly write: <A, E, R>(options: {
      readonly event: string
      readonly primaryKey: string
      readonly payload: Uint8Array
      readonly effect: (entry: Entry) => Effect.Effect<A, E, R>
    }) => Effect.Effect<A, EventJournalError | E, R>
    readonly writeFromRemote: (options: {
      readonly remoteId: RemoteId
      readonly entries: ReadonlyArray<RemoteEntry>
      readonly compact?:
        | ((uncommitted: ReadonlyArray<RemoteEntry>) => Effect.Effect<ReadonlyArray<Entry>, EventJournalError>)
        | undefined
      readonly effect: (options: {
        readonly entry: Entry
        readonly conflicts: ReadonlyArray<Entry>
      }) => Effect.Effect<void, EventJournalError>
    }) => Effect.Effect<{ readonly duplicateEntries: ReadonlyArray<Entry> }, EventJournalError>
    readonly withRemoteUncommited: <A, E, R>(
      remoteId: RemoteId,
      f: (entries: ReadonlyArray<Entry>) => Effect.Effect<A, E, R>
    ) => Effect.Effect<A, EventJournalError | E, R>
    readonly nextRemoteSequence: (remoteId: RemoteId) => Effect.Effect<number, EventJournalError>
    readonly changes: Effect.Effect<PubSub.Subscription<Entry>, never, Scope>
    readonly destroy: Effect.Effect<void, EventJournalError>
    readonly withLock: (storeId: StoreId) => <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  },
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L363)

Since v4.0.0

# remote

## RemoteId

Schema for branded remote event journal identifiers.

**Signature**

```ts
declare const RemoteId: Schema.brand<Schema.Uint8Array, "effect/eventlog/EventJournal/RemoteId">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L163)

Since v4.0.0

## RemoteId (type alias)

Branded byte identifier for a remote event journal source.

**Signature**

```ts
type RemoteId = Uint8Array & Brand<RemoteIdTypeId>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L155)

Since v4.0.0

## makeRemoteIdUnsafe

Generates a new random `RemoteId`.

**When to use**

Use when generating a fresh event-log remote id internally and the UUID bytes
are trusted to satisfy the brand.

**Gotchas**

This is unsafe because the generated UUID bytes are cast to the brand without
schema validation.

**Signature**

```ts
declare const makeRemoteIdUnsafe: () => RemoteId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L181)

Since v4.0.0

# type IDs

## EntryIdTypeId

Runtime brand identifier used for `EntryId` values.

**Signature**

```ts
declare const EntryIdTypeId: "effect/eventlog/EventJournal/EntryId"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L189)

Since v4.0.0

## EntryIdTypeId (type alias)

Brand identifier used for `EntryId` values.

**Signature**

```ts
type EntryIdTypeId = "effect/eventlog/EventJournal/EntryId"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L197)

Since v4.0.0

## RemoteIdTypeId

Runtime brand identifier used for `RemoteId` values.

**Signature**

```ts
declare const RemoteIdTypeId: "effect/eventlog/EventJournal/RemoteId"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L147)

Since v4.0.0

## RemoteIdTypeId (type alias)

Brand identifier used for `RemoteId` values.

**Signature**

```ts
type RemoteIdTypeId = "effect/eventlog/EventJournal/RemoteId"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/EventJournal.ts#L139)

Since v4.0.0
