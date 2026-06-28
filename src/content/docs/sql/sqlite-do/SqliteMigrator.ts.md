---
title: SqliteMigrator.ts
nav_order: 3
parent: "@effect/sql-sqlite-do"
---

## SqliteMigrator.ts overview

Runs database migrations for Durable Object SQLite storage that uses Effect
SQL.

This module re-exports the shared `Migrator` loaders and error types, then
provides `run` and `layer` helpers that execute ordered migrations through the
current Durable Object SQLite `SqlClient`. Use it when a Durable
Object needs to create or upgrade its local schema during construction, before
repositories or request handlers use the object storage, or in tests that
exercise Durable Object persistence.

Migrations are recorded in `effect_sql_migrations` by default and are loaded
using the shared `<id>_<name>` file or record-key convention. The underlying
storage is scoped to a Durable Object id, so running migrations for one object
does not update any other object instance; run the migrator against the same
`DurableObjectStorage`-backed client that the object uses for normal queries
so migrations can run in Cloudflare-managed transactions. These SQL
migrations are separate from Cloudflare's Durable Object class migrations, and
the Durable Object must already be configured with SQLite storage before this
module can apply schema changes. Repeated startup runs are expected and are
guarded by the migrations table, but request handling should wait until the
migration layer has finished. This adapter does not currently write SQLite
schema dumps for `schemaDirectory`.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [layer](#layer)
  - [run](#run)
- [utils](#utils)
  - ["effect/unstable/sql/Migrator" (namespace export)](#effectunstablesqlmigrator-namespace-export)

---

# constructors

## layer

Creates a layer that runs the configured SQL migrations during layer construction.

**Signature**

```ts
declare const layer: <R>(
  options: Migrator.MigratorOptions<R>
) => Layer.Layer<never, Migrator.MigrationError | SqlError, Client.SqlClient | R>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteMigrator.ts#L58)

Since v4.0.0

## run

Runs SQL migrations using the configured `SqlClient`, returning the migrations that were applied.

**Signature**

```ts
declare const run: <R2 = never>({
  loader,
  schemaDirectory,
  table
}: Migrator.MigratorOptions<R2>) => Effect.Effect<
  ReadonlyArray<readonly [id: number, name: string]>,
  Migrator.MigrationError | SqlError,
  Client.SqlClient | R2
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteMigrator.ts#L44)

Since v4.0.0

# utils

## "effect/unstable/sql/Migrator" (namespace export)

Re-exports all named exports from the "effect/unstable/sql/Migrator" module.

**Signature**

```ts
export * from "effect/unstable/sql/Migrator"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteMigrator.ts#L36)

Since v4.0.0
