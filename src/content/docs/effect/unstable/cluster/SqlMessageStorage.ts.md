---
title: SqlMessageStorage.ts
nav_order: 208
parent: "effect"
---

## SqlMessageStorage.ts overview

Persists cluster mailbox messages and replies in SQL.

The SQL-backed `MessageStorage` stores encoded cluster envelopes and reply
chunks so runners can recover mailbox state after restarts. It supports
redelivering unprocessed messages, deduplicating requests by primary key, and
replaying reply chunks until they are acknowledged. This module includes the
storage constructor, layers, migrations, optional table prefixes, and the row
mapping needed by encoded message storage.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerWith](#layerwith)

---

# constructors

## make

Creates a SQL-backed `MessageStorage` implementation, running its migrations
and using the optional table prefix.

**When to use**

Use when you need the SQL-backed `MessageStorage` service directly, such as
when composing a custom layer or providing your own `Snowflake.Generator`.

**Details**

The optional `prefix` controls the table names for messages, replies, and
migrations; when omitted, `cluster` is used.

**Gotchas**

Changing `prefix` after deployment points the runtime at a different set of
tables, including the migration history table.

**See**

- `layer` for a ready-made layer using the default prefix and generator
- `layerWith` for a ready-made layer with a custom table prefix

**Signature**

```ts
declare const make: (options?: {
  readonly prefix?: string | undefined
}) => Effect.Effect<MessageStorage.MessageStorage["Service"], never, SqlClient.SqlClient | Snowflake.Generator>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlMessageStorage.ts#L59)

Since v4.0.0

# layers

## layer

Layer that provides SQL-backed `MessageStorage` using the default table prefix
and the default snowflake generator.

**When to use**

Use when a cluster should persist mailbox messages and replies in SQL using
the default `cluster` table prefix and the standard snowflake generator.

**Details**

The layer runs the SQL migrations through `make`, provides `MessageStorage`,
and supplies `Snowflake.layerGenerator` internally. Callers still provide
`SqlClient` and `ShardingConfig`.

**Gotchas**

This layer always uses the `cluster` table prefix. Use `layerWith` before
deployment if you need a different stable prefix, because changing prefixes
later points the runtime at a different set of tables.

**See**

- `layerWith` for the same SQL storage layer with a custom table prefix
- `make` for the lower-level service constructor that uses an existing `Snowflake.Generator`

**Signature**

```ts
declare const layer: Layer.Layer<MessageStorage.MessageStorage, never, SqlClient.SqlClient | ShardingConfig>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlMessageStorage.ts#L662)

Since v4.0.0

## layerWith

Layer that provides SQL-backed `MessageStorage` using a custom table prefix.

**Signature**

```ts
declare const layerWith: (options: {
  readonly prefix?: string | undefined
}) => Layer.Layer<MessageStorage.MessageStorage, never, SqlClient.SqlClient | ShardingConfig>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlMessageStorage.ts#L676)

Since v4.0.0
