---
title: SqliteMigrator.ts
nav_order: 3
parent: "@effect/sql-sqlite-react-native"
---

## SqliteMigrator.ts overview

Utilities for applying Effect SQL migrations to React Native SQLite databases.

This module re-exports the shared `Migrator` loaders and error types, then
provides `run` and `layer` helpers that execute ordered migrations through the
current React Native SQLite `SqlClient`. Use it when a mobile app needs to
bring its on-device database schema up to date during startup, before opening
repositories or sync services, or in integration tests that create app-local
database files.

React Native SQLite databases are scoped by the client configuration, so the
migrator should be run with the same `filename`, `location`, and encryption
key as the rest of the application. Migrations run through the package's
single serialized connection; by default statements use the synchronous
driver API and can block the JS thread, so long migration sets may want to run
under `SqliteClient.withAsyncQuery`. Mobile upgrades can be interrupted by app
suspension or process death, so keep migrations transaction-aware and avoid
assuming a fresh database on every launch.

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

Creates a layer that runs the configured React Native SQLite migrations during layer construction and provides no services.

**Signature**

```ts
declare const layer: <R>(
  options: Migrator.MigratorOptions<R>
) => Layer.Layer<never, SqlError | Migrator.MigrationError, R | Client.SqlClient>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteMigrator.ts#L53)

Since v4.0.0

## run

Runs SQL migrations for a React Native SQLite database using the shared `Migrator` implementation and the current `SqlClient`.

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

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteMigrator.ts#L39)

Since v4.0.0

# utils

## "effect/unstable/sql/Migrator" (namespace export)

Re-exports all named exports from the "effect/unstable/sql/Migrator" module.

**Signature**

```ts
export * from "effect/unstable/sql/Migrator"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/sqlite-react-native/src/SqliteMigrator.ts#L31)

Since v4.0.0
