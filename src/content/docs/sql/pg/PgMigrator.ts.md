---
title: PgMigrator.ts
nav_order: 3
parent: "@effect/sql-pg"
---

## PgMigrator.ts overview

Runs database migrations for PostgreSQL projects that use Effect SQL.

This module reuses the shared SQL migrator and connects it to PostgreSQL. It
exposes the common migration helpers and adds `run` and `layer` functions
that apply pending migration files with the current SQL client. When schema
dumps are requested, it uses `pg_dump` and the usual process and filesystem
services.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [run](#run)
- [layers](#layers)
  - [layer](#layer)
- [utils](#utils)
  - ["effect/unstable/sql/Migrator" (namespace export)](#effectunstablesqlmigrator-namespace-export)

---

# constructors

## run

Runs PostgreSQL SQL migrations using the configured clients. Schema dumps use `pg_dump` and require child process, filesystem, and path services.

**Signature**

```ts
declare const run: <R2 = never>(
  options: Migrator.MigratorOptions<R2>
) => Effect.Effect<
  ReadonlyArray<readonly [id: number, name: string]>,
  Migrator.MigrationError | SqlError,
  SqlClient | PgClient | ChildProcessSpawner.ChildProcessSpawner | FileSystem.FileSystem | Path.Path | R2
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgMigrator.ts#L35)

Since v4.0.0

# layers

## layer

Creates a layer that runs PostgreSQL migrations during layer construction, including `pg_dump`-based schema dump support when requested.

**Signature**

```ts
declare const layer: <R>(
  options: Migrator.MigratorOptions<R>
) => Layer.Layer<
  never,
  Migrator.MigrationError | SqlError,
  SqlClient | PgClient | ChildProcessSpawner.ChildProcessSpawner | FileSystem.FileSystem | Path.Path | R
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgMigrator.ts#L109)

Since v4.0.0

# utils

## "effect/unstable/sql/Migrator" (namespace export)

Re-exports all named exports from the "effect/unstable/sql/Migrator" module.

**Signature**

```ts
export * from "effect/unstable/sql/Migrator"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/pg/src/PgMigrator.ts#L27)

Since v4.0.0
