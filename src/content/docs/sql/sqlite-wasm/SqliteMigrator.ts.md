---
title: SqliteMigrator.ts
nav_order: 5
parent: "@effect/sql-sqlite-wasm"
---

## SqliteMigrator.ts overview

Utilities for applying Effect SQL migrations to SQLite WASM databases.

This module re-exports the shared `Migrator` loaders and error types, then
provides `run` and `layer` helpers that execute ordered migrations through the
current SQLite WASM `SqlClient`. Use it when a browser, worker, or test
runtime needs to create or upgrade a local SQLite schema before repositories,
caches, sync services, or other database-backed services start.

The migrator operates on whichever WASM client is in the environment. With
`SqliteClient.makeMemory`, migrations update an in-memory database, so the
resulting schema is transient unless you persist it with the client's
`export` and `import` operations. With worker-backed OPFS databases, run the
migrator against the same worker configuration and OPFS database name used by
the rest of the application, and coordinate startup across tabs or workers so
only one migrator upgrades a given database at a time. OPFS availability is
browser- and origin-dependent, and this adapter does not currently write
SQLite schema dumps for `schemaDirectory`.

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

Creates a layer that runs the configured SQLite WASM migrations during layer construction and provides no services.

**Signature**

```ts
declare const layer: <R>(
  options: Migrator.MigratorOptions<R>
) => Layer.Layer<never, SqlError | Migrator.MigrationError, R | Client.SqlClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteMigrator.ts#L53)

Since v4.0.0

## run

Runs SQL migrations for a SQLite WASM database using the shared `Migrator` implementation and the current `SqlClient`.

**Signature**

```ts
declare const run: <R>(
  options: Migrator.MigratorOptions<R>
) => Effect.Effect<
  ReadonlyArray<readonly [id: number, name: string]>,
  SqlError | Migrator.MigrationError,
  Client.SqlClient | R
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteMigrator.ts#L39)

Since v4.0.0

# utils

## "effect/unstable/sql/Migrator" (namespace export)

Re-exports all named exports from the "effect/unstable/sql/Migrator" module.

**Signature**

```ts
export * from "effect/unstable/sql/Migrator"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/do/src/SqliteMigrator.ts#L31)

Since v4.0.0
