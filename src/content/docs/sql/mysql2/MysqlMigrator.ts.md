---
title: MysqlMigrator.ts
nav_order: 3
parent: "@effect/sql-mysql2"
---

## MysqlMigrator.ts overview

MySQL adapter for the shared Effect SQL migration runner.

This module re-exports the shared `Migrator` loaders and error types, then
provides `run` and `layer` helpers that apply ordered migrations through the
current mysql2-backed `SqlClient`. `run` returns the applied migration IDs
and names, while `layer` runs migrations during layer construction and
provides no services.

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

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlMigrator.ts#L29)

Since v4.0.0

# layers

## layer

Creates a layer that runs the configured SQL migrations during layer construction.

**Signature**

```ts
declare const layer: <R>(
  options: Migrator.MigratorOptions<R>
) => Layer.Layer<never, Migrator.MigrationError | SqlError, Client.SqlClient | R>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlMigrator.ts#L96)

Since v4.0.0

# utils

## "effect/unstable/sql/Migrator" (namespace export)

Re-exports all named exports from the "effect/unstable/sql/Migrator" module.

**Signature**

```ts
export * from "effect/unstable/sql/Migrator"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/sql/mysql2/src/MysqlMigrator.ts#L21)

Since v4.0.0
