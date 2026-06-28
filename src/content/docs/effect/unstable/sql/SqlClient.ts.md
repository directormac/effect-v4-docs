---
title: SqlClient.ts
nav_order: 332
parent: "effect"
---

## SqlClient.ts overview

Main SQL client service for tagged-template queries.

`SqlClient` combines the tagged-template statement constructor with
connection acquisition, dialect compilation, transactions, row transforms,
tracing, and reactive query helpers. Driver integrations build this service
from their connection and compiler pieces.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [SqlClient (interface)](#sqlclient-interface)
  - [TransactionConnection (interface)](#transactionconnection-interface)
- [references](#references)
  - [SafeIntegers](#safeintegers)
- [services](#services)
  - [SqlClient](#sqlclient)
  - [TransactionConnection](#transactionconnection)
- [transactions](#transactions)
  - [makeWithTransaction](#makewithtransaction)
- [utils](#utils)
  - [SqlClient (namespace)](#sqlclient-namespace)
    - [MakeOptions (interface)](#makeoptions-interface)
  - [TransactionConnection (namespace)](#transactionconnection-namespace)
    - [Service (type alias)](#service-type-alias)

---

# constructors

## make

Constructs a `SqlClient` from connection acquirers, a compiler, transaction
commands, tracing attributes, optional row transforms, and reactive query
integration.

**Signature**

```ts
declare const make: (options: SqlClient.MakeOptions) => Effect.Effect<SqlClient, never, Reactivity>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlClient.ts#L139)

Since v4.0.0

# models

## SqlClient (interface)

SQL client service interface, combining the statement constructor API with
connection reservation, transaction handling, and reactive query helpers.

**Signature**

```ts
export interface SqlClient extends Constructor {
  readonly [TypeId]: typeof TypeId

  /**
   * Copy of the client for safeql etc.
   */
  readonly safe: this

  /**
   * Copy of the client without transformations.
   */
  readonly withoutTransforms: () => this

  readonly reserve: Effect.Effect<Connection.Connection, SqlError, Scope.Scope>

  /**
   * With the given effect, ensure all sql queries are run in a transaction.
   */
  readonly withTransaction: <R, E, A>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E | SqlError, R>

  /**
   * The transaction service for this client.
   */
  readonly transactionService: Context.Service<TransactionConnection, TransactionConnection.Service>

  /**
   * Use the Reactivity service from @effect/experimental to create a reactive
   * query.
   */
  readonly reactive: <A, E, R>(
    keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>,
    effect: Effect.Effect<A, E, R>
  ) => Stream.Stream<A, E, R>

  /**
   * Use the Reactivity service to create a reactive
   * query.
   */
  readonly reactiveMailbox: <A, E, R>(
    keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>,
    effect: Effect.Effect<A, E, R>
  ) => Effect.Effect<Queue.Dequeue<A, E>, never, R | Scope.Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlClient.ts#L37)

Since v4.0.0

## TransactionConnection (interface)

Phantom identifier for the scoped transaction connection service associated
with a SQL client.

**Signature**

```ts
export interface TransactionConnection {
  readonly _: unique symbol
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlClient.ts#L301)

Since v4.0.0

# references

## SafeIntegers

Context reference used by SQL integrations to opt in to safe integer
handling; defaults to `false`.

**Signature**

```ts
declare const SafeIntegers: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlClient.ts#L340)

Since v4.0.0

# services

## SqlClient

Service tag for the active SQL client service.

**When to use**

Use to access or provide the SQL client used to build statements, stream
rows, reserve connections, and run transactions.

**Signature**

```ts
declare const SqlClient: Context.Service<SqlClient, SqlClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlClient.ts#L94)

Since v4.0.0

## TransactionConnection

Creates a unique context service tag for the active transaction connection of
a specific SQL client.

**Signature**

```ts
declare const TransactionConnection: (
  clientId: number
) => Context.Service<TransactionConnection, TransactionConnection.Service>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlClient.ts#L328)

Since v4.0.0

# transactions

## makeWithTransaction

Builds a transaction wrapper that begins top-level transactions, uses
savepoints for nested transactions, commits on success, and rolls back on
failure or interruption.

**Signature**

```ts
declare const makeWithTransaction: <I, S>(options: {
  readonly transactionService: Context.Key<I, readonly [conn: S, counter: number]>
  readonly spanAttributes: ReadonlyArray<readonly [string, unknown]>
  readonly acquireConnection: Effect.Effect<readonly [Scope.Closeable | undefined, S], SqlError>
  readonly begin: (conn: NoInfer<S>) => Effect.Effect<void, SqlError>
  readonly savepoint: (conn: NoInfer<S>, id: number) => Effect.Effect<void, SqlError>
  readonly commit: (conn: NoInfer<S>) => Effect.Effect<void, SqlError>
  readonly rollback: (conn: NoInfer<S>) => Effect.Effect<void, SqlError>
  readonly rollbackSavepoint: (conn: NoInfer<S>, id: number) => Effect.Effect<void, SqlError>
}) => <R, E, A>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E | SqlError, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlClient.ts#L222)

Since v4.0.0

# utils

## SqlClient (namespace)

Namespace containing types associated with the `SqlClient` service.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlClient.ts#L101)

Since v4.0.0

### MakeOptions (interface)

Options used to construct a `SqlClient`, including connection acquirers,
the SQL compiler, transaction SQL, row transformation, tracing attributes,
and optional reactive query integration.

**Signature**

```ts
export interface MakeOptions {
  readonly acquirer: Connection.Acquirer
  readonly compiler: Compiler
  readonly transactionAcquirer?: Connection.Acquirer
  readonly spanAttributes: ReadonlyArray<readonly [string, unknown]>
  readonly transactionService?: Context.Service<TransactionConnection, TransactionConnection.Service>
  readonly beginTransaction?: string | undefined
  readonly rollback?: string | undefined
  readonly commit?: string | undefined
  readonly savepoint?: ((name: string) => string) | undefined
  readonly rollbackSavepoint?: ((name: string) => string) | undefined
  readonly transformRows?: (<A extends object>(row: ReadonlyArray<A>) => ReadonlyArray<A>) | undefined
  readonly reactiveQueue?: <A, E, R>(
    keys: ReadonlyArray<unknown> | ReadonlyRecord<string, ReadonlyArray<unknown>>,
    effect: Effect.Effect<A, E, R>
  ) => Effect.Effect<Queue.Dequeue<A, E>, never, R | Scope.Scope>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlClient.ts#L110)

Since v4.0.0

## TransactionConnection (namespace)

Namespace containing types associated with transaction connection services.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlClient.ts#L310)

Since v4.0.0

### Service (type alias)

Service payload stored during a transaction, containing the active
connection and nested transaction depth.

**Signature**

```ts
type Service = readonly [conn: Connection.Connection, depth: number]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlClient.ts#L318)

Since v4.0.0
