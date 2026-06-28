---
title: SqlEventLogServerEncrypted.ts
nav_order: 233
parent: "effect"
---

## SqlEventLogServerEncrypted.ts overview

Stores encrypted event-log server state in SQL.

This module provides the durable `Storage` implementation used by
`EventLogServerEncrypted` when entries should be stored without exposing
plaintext event data to the database. It persists the server remote id,
session authentication bindings, and encrypted entry tables, assigns stable
sequence numbers, and streams changes. Clients remain responsible for
encrypting writes and decrypting reads.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [makeStorage](#makestorage)
- [layers](#layers)
  - [layerStorage](#layerstorage)
  - [layerStorageSubtle](#layerstoragesubtle)

---

# constructors

## makeStorage

Creates encrypted event-log server `Storage` backed by SQL.

**Details**

It persists the server remote id, session authentication bindings, and encrypted
entries in dialect-specific tables, creating per-identity/store entry tables as
needed.

**Signature**

```ts
declare const makeStorage: (options?: {
  readonly entryTablePrefix?: string
  readonly remoteIdTable?: string
  readonly insertBatchSize?: number
}) => Effect.Effect<
  EventLogServerEncrypted.Storage["Service"],
  SqlError.SqlError,
  SqlClient.SqlClient | EventLogEncryption.EventLogEncryption | Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlEventLogServerEncrypted.ts#L38)

Since v4.0.0

# layers

## layerStorage

Provides encrypted server `Storage` using the SQL-backed implementation.

**Signature**

```ts
declare const layerStorage: (options?: {
  readonly entryTablePrefix?: string
  readonly remoteIdTable?: string
  readonly insertBatchSize?: number
}) => Layer.Layer<
  EventLogServerEncrypted.Storage,
  SqlError.SqlError,
  SqlClient.SqlClient | EventLogEncryption.EventLogEncryption
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlEventLogServerEncrypted.ts#L312)

Since v4.0.0

## layerStorageSubtle

Provides SQL-backed encrypted server `Storage` and supplies the default Web
Crypto `EventLogEncryption` layer.

**Signature**

```ts
declare const layerStorageSubtle: (options?: {
  readonly entryTablePrefix?: string
  readonly remoteIdTable?: string
  readonly insertBatchSize?: number
}) => Layer.Layer<EventLogServerEncrypted.Storage, SqlError.SqlError, SqlClient.SqlClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlEventLogServerEncrypted.ts#L329)

Since v4.0.0
