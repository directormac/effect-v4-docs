---
title: SqlConnection.ts
nav_order: 333
parent: "effect"
---

## SqlConnection.ts overview

Low-level SQL connection contract used by driver integrations.

A `Connection` is the driver-facing layer under `SqlClient`. It executes
already-compiled SQL with positional parameters and can return transformed
rows, raw driver results, streams, value arrays, or unprepared statement
results. This module also defines the scoped connection acquirer type, the
connection service tag, and the generic row shape.

Since v4.0.0

---

## Exports Grouped by Category

- [models](#models)
  - [Acquirer (type alias)](#acquirer-type-alias)
  - [Connection (interface)](#connection-interface)
  - [Row (type alias)](#row-type-alias)
- [services](#services)
  - [Connection](#connection)

---

# models

## Acquirer (type alias)

Scoped effect that acquires a `Connection`, may fail with `SqlError`, and
requires a `Scope` for release.

**Signature**

```ts
type Acquirer = Effect<Connection, SqlError, Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlConnection.ts#L72)

Since v4.0.0

## Connection (interface)

Low-level SQL driver connection capable of executing compiled SQL as
transformed rows, raw results, streams, value arrays, or unprepared
statements.

**Signature**

```ts
export interface Connection {
  readonly execute: (
    sql: string,
    params: ReadonlyArray<unknown>,
    transformRows: (<A extends object>(row: ReadonlyArray<A>) => ReadonlyArray<A>) | undefined
  ) => Effect<ReadonlyArray<any>, SqlError>

  /**
   * Execute the specified SQL query and return the raw results directly from
   * underlying SQL client.
   */
  readonly executeRaw: (sql: string, params: ReadonlyArray<unknown>) => Effect<unknown, SqlError>

  readonly executeStream: (
    sql: string,
    params: ReadonlyArray<unknown>,
    transformRows: (<A extends object>(row: ReadonlyArray<A>) => ReadonlyArray<A>) | undefined
  ) => Stream<any, SqlError>

  readonly executeValues: (
    sql: string,
    params: ReadonlyArray<unknown>
  ) => Effect<ReadonlyArray<ReadonlyArray<unknown>>, SqlError>

  readonly executeValuesUnprepared: (
    sql: string,
    params: ReadonlyArray<unknown>
  ) => Effect<ReadonlyArray<ReadonlyArray<unknown>>, SqlError>

  readonly executeUnprepared: (
    sql: string,
    params: ReadonlyArray<unknown>,
    transformRows: (<A extends object>(row: ReadonlyArray<A>) => ReadonlyArray<A>) | undefined
  ) => Effect<ReadonlyArray<any>, SqlError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlConnection.ts#L26)

Since v4.0.0

## Row (type alias)

Generic SQL row shape mapping column names to unknown values.

**Signature**

```ts
type Row = { readonly [column: string]: unknown }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlConnection.ts#L88)

Since v4.0.0

# services

## Connection

Service tag for a low-level SQL `Connection`.

**Signature**

```ts
declare const Connection: Context.Service<Connection, Connection>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlConnection.ts#L80)

Since v4.0.0
