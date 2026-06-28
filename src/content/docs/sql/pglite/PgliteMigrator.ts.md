---
title: PgliteMigrator.ts
nav_order: 3
parent: "@effect/sql-pglite"
---

## PgliteMigrator.ts overview

Runs database migrations for PGlite projects that use Effect SQL.

This module re-exports the shared migration loaders and errors, then provides
`run` and `layer` helpers that apply pending migration files with the current
`SqlClient`. It does not require a separate PGlite service; the active SQL
client supplies the database connection.

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

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteMigrator.ts#L42)

Since v4.0.0

## run

Runs SQL migrations using the configured `SqlClient`, returning the migrations that were applied.

**Signature**

```ts
declare const run: <R2 = never>(
  options: Migrator.MigratorOptions<R2>
) => Effect.Effect<
  ReadonlyArray<readonly [id: number, name: string]>,
  Migrator.MigrationError | SqlError,
  Client.SqlClient | R2
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteMigrator.ts#L28)

Since v4.0.0

# utils

## "effect/unstable/sql/Migrator" (namespace export)

Re-exports all named exports from the "effect/unstable/sql/Migrator" module.

**Signature**

```ts
export * from "effect/unstable/sql/Migrator"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/sql/pglite/src/PgliteMigrator.ts#L20)

Since v4.0.0
