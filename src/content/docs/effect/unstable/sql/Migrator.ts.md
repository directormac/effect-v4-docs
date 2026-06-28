---
title: Migrator.ts
nav_order: 331
parent: "effect"
---

## Migrator.ts overview

Runs SQL migrations with `SqlClient`.

A migrator loads numbered migration effects, records completed ids in a
migrations table, and runs only pending migrations in a transaction. It
creates the table when needed, detects duplicate ids, treats concurrent runs
as locked, and can dump the schema after successful migrations.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [errors](#errors)
  - [MigrationError (class)](#migrationerror-class)
- [loaders](#loaders)
  - [fromBabelGlob](#frombabelglob)
  - [fromFileSystem](#fromfilesystem)
  - [fromGlob](#fromglob)
  - [fromRecord](#fromrecord)
- [models](#models)
  - [Loader (type alias)](#loader-type-alias)
  - [Migration (interface)](#migration-interface)
  - [ResolvedMigration (type alias)](#resolvedmigration-type-alias)
- [options](#options)
  - [MigratorOptions (interface)](#migratoroptions-interface)

---

# constructors

## make

Creates a migrator that ensures the migrations table exists, runs pending
migrations in a transaction, and optionally dumps the schema after successful
migrations.

**Signature**

```ts
declare const make: <RD = never>({
  dumpSchema
}: {
  dumpSchema?: (path: string, migrationsTable: string) => Effect.Effect<void, MigrationError, RD>
}) => <R2 = never>({
  loader,
  schemaDirectory,
  table
}: MigratorOptions<R2>) => Effect.Effect<
  ReadonlyArray<readonly [id: number, name: string]>,
  MigrationError | SqlError,
  Client.SqlClient | RD | R2
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Migrator.ts#L99)

Since v4.0.0

# errors

## MigrationError (class)

Error raised while loading, validating, locking, or running SQL migrations.

**Signature**

```ts
declare class MigrationError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Migrator.ts#L79)

Since v4.0.0

# loaders

## fromBabelGlob

Creates a migration loader from a Babel-style glob record, parsing keys such
as `_<id>_<name>Js`, `_<id>_<name>Ts`, `_<id>_<name>Mjs`, or
`_<id>_<name>Mts` and sorting migrations by id.

**Signature**

```ts
declare const fromBabelGlob: (migrations: Record<string, any>) => Loader
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Migrator.ts#L361)

Since v4.0.0

## fromFileSystem

Creates a migration loader that reads a directory with `FileSystem`, imports
files named `<id>_<name>.js`, `<id>_<name>.ts`,
`<id>_<name>.mjs`, or `<id>_<name>.mts`, and sorts migrations by id.

**Signature**

```ts
declare const fromFileSystem: (directory: string) => Loader<FileSystem>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Migrator.ts#L406)

Since v4.0.0

## fromGlob

Creates a migration loader from a glob record of dynamic import functions,
parsing files named `<id>_<name>.js`, `<id>_<name>.ts`,
`<id>_<name>.mjs`, or `<id>_<name>.mts` and sorting migrations by id.

**Signature**

```ts
declare const fromGlob: (migrations: Record<string, () => Promise<any>>) => Loader
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Migrator.ts#L336)

Since v4.0.0

## fromRecord

Creates a migration loader from a record of migration effects keyed by
`<id>_<name>`, sorted by migration id.

**Signature**

```ts
declare const fromRecord: (migrations: Record<string, Effect.Effect<void, unknown, Client.SqlClient>>) => Loader
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Migrator.ts#L383)

Since v4.0.0

# models

## Loader (type alias)

Effect that resolves the available migrations for the migrator or fails with a
`MigrationError`.

**Signature**

```ts
type Loader<R> = Effect.Effect<ReadonlyArray<ResolvedMigration>, MigrationError, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Migrator.ts#L41)

Since v4.0.0

## Migration (interface)

Metadata for a migration recorded in the migrations table, including its id,
name, and creation timestamp.

**Signature**

```ts
export interface Migration {
  readonly id: number
  readonly name: string
  readonly createdAt: Date
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Migrator.ts#L67)

Since v4.0.0

## ResolvedMigration (type alias)

Tuple produced by a migration loader, containing the migration id, migration
name, and an effect that loads the migration implementation.

**Signature**

```ts
type ResolvedMigration = readonly [id: number, name: string, load: Effect.Effect<any, any, Client.SqlClient>]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Migrator.ts#L54)

Since v4.0.0

# options

## MigratorOptions (interface)

Options for running SQL migrations, including the migration loader, optional
schema dump directory, and migrations table name.

**Signature**

```ts
export interface MigratorOptions<R = never> {
  readonly loader: Loader<R>
  readonly schemaDirectory?: string
  readonly table?: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Migrator.ts#L28)

Since v4.0.0
