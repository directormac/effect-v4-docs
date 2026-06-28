---
title: SqlEventJournal.ts
nav_order: 232
parent: "effect"
---

## SqlEventJournal.ts overview

SQL-backed persistence for the unstable event-log journal.

This module implements `EventJournal` on top of a `SqlClient`. It stores event
entries as encoded bytes and stores per-remote sequence metadata in separate
tables, giving event-log programs a durable journal that can be replayed after
restart and synchronized with remote journals.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)

---

# constructors

## make

Creates an `EventJournal` backed by a SQL database.

**Details**

The constructor creates the entry and remote metadata tables when needed,
persists local and remote entries, and uses the configured `SqlClient`.

**Signature**

```ts
declare const make: (options?: {
  readonly entryTable?: string
  readonly remotesTable?: string
}) => Effect.Effect<EventJournal.EventJournal["Service"], SqlError.SqlError, SqlClient.SqlClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlEventJournal.ts#L34)

Since v4.0.0

# layers

## layer

Provides `EventJournal` using the SQL-backed implementation created by
`make`.

**When to use**

Use when composing a Layer graph that should provide a persistent SQL-backed
`EventJournal` from an existing `SqlClient` service.

**Details**

The layer delegates to `make(options)`, so the same optional `entryTable` and
`remotesTable` settings are used and construction requires `SqlClient` and
may fail with `SqlError`.

**Gotchas**

Layer construction performs the same minimal `CREATE TABLE IF NOT EXISTS`
setup as `make`; manage indexes and schema migrations outside this layer when
your SQL schema needs more than the built-in tables.

**See**

- `make` for constructing the SQL-backed service directly
- `EventJournal.layerMemory` for an in-memory `EventJournal` layer
- `EventJournal.layerIndexedDb` for an IndexedDB-backed `EventJournal` layer

**Signature**

```ts
declare const layer: (options?: {
  readonly entryTable?: string
  readonly remotesTable?: string
}) => Layer.Layer<EventJournal.EventJournal, SqlError.SqlError, SqlClient.SqlClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlEventJournal.ts#L311)

Since v4.0.0
