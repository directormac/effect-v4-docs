---
title: SqlEventLogServerUnencrypted.ts
nav_order: 234
parent: "effect"
---

## SqlEventLogServerUnencrypted.ts overview

SQL-backed storage for unencrypted event-log servers.

This module provides the durable `Storage` implementation used by
`EventLogServerUnencrypted` when remote entries should be stored in a SQL
database and streamed back to clients by store sequence. It creates
dialect-specific tables for the server remote id, per-store sequence state,
plaintext entries, and session authentication bindings.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [makeStorage](#makestorage)
- [layers](#layers)
  - [layerStorage](#layerstorage)

---

# constructors

## makeStorage

Creates unencrypted event-log server `Storage` backed by SQL.

**Details**

The implementation creates tables for the server remote id, store sequences,
entries, and session authentication bindings, then persists and streams
plaintext remote entries.

**Signature**

```ts
declare const makeStorage: (options?: {
  readonly entryTablePrefix?: string
  readonly remoteIdTable?: string
  readonly insertBatchSize?: number
}) => Effect.Effect<EventLogServerUnencrypted.Storage["Service"], SqlError.SqlError, SqlClient.SqlClient | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlEventLogServerUnencrypted.ts#L37)

Since v4.0.0

# layers

## layerStorage

Provides unencrypted server `Storage` using the SQL-backed implementation.

**Signature**

```ts
declare const layerStorage: (options?: {
  readonly entryTablePrefix?: string
  readonly remoteIdTable?: string
  readonly insertBatchSize?: number
}) => Layer.Layer<EventLogServerUnencrypted.Storage, SqlError.SqlError, SqlClient.SqlClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlEventLogServerUnencrypted.ts#L448)

Since v4.0.0
