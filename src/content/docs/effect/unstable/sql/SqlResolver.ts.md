---
title: SqlResolver.ts
nav_order: 336
parent: "effect"
---

## SqlResolver.ts overview

Schema-aware `RequestResolver` helpers for SQL-backed data loading.

This module represents each lookup or mutation as a `SqlRequest` and batches
concurrent requests into SQL operations. Request payloads are encoded with the
request schema before `execute` is called, and returned rows are decoded with
the result schema before requests are completed. It provides ordered,
grouped, id-based, and side-effect-only resolver constructors, and keeps
batches separated by the active SQL transaction connection.

Since v4.0.0

---

## Exports Grouped by Category

- [requests](#requests)
  - [SqlRequest](#sqlrequest)
  - [SqlRequest (interface)](#sqlrequest-interface)
  - [request](#request)
- [resolvers](#resolvers)
  - [findById](#findbyid)
  - [grouped](#grouped)
  - [ordered](#ordered)
  - [void](#void)

---

# requests

## SqlRequest

Constructs a `SqlRequest` from a payload. Equality and hashing are based on
the payload so equal requests can be batched and deduplicated.

**Signature**

```ts
declare const SqlRequest: <In, A, E, R>(payload: In) => SqlRequest<In, A, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlResolver.ts#L82)

Since v4.0.0

## SqlRequest (interface)

Request type used by SQL request resolvers, carrying the input payload
together with the resolver's result, error, and environment types.

**Signature**

```ts
export interface SqlRequest<In, A, E, R> extends Request.Request<A, E | Schema.SchemaError, R> {
  readonly payload: In
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlResolver.ts#L35)

Since v4.0.0

## request

Runs a payload as a `SqlRequest` through a request resolver, either directly
with a payload and resolver or curried by resolver.

**Signature**

```ts
declare const request: {
  <In, A, E, R>(
    resolver: RequestResolver.RequestResolver<SqlRequest<In, A, E, R>>
  ): (payload: In) => Effect.Effect<A, E | Schema.SchemaError, R>
  <In, A, E, R>(
    payload: In,
    resolver: RequestResolver.RequestResolver<SqlRequest<In, A, E, R>>
  ): Effect.Effect<A, E | Schema.SchemaError, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlResolver.ts#L59)

Since v4.0.0

# resolvers

## findById

Creates a batched resolver that fetches rows for encoded ids, decodes
results, completes each matching request using `ResultId`, and fails missing
ids with `NoSuchElementError`.

**Signature**

```ts
declare const findById: <Id extends Schema.Constraint, Res extends Schema.Constraint, Row, E, R>(options: {
  readonly Id: Id
  readonly Result: Res
  readonly ResultId: (result: Res["Type"], row: Types.NoInfer<Row>) => Id["Type"]
  readonly execute: (requests: Arr.NonEmptyArray<Id["Encoded"]>) => Effect.Effect<ReadonlyArray<Row>, E, R>
}) => RequestResolver.RequestResolver<
  SqlRequest<
    Id["Type"],
    Res["Type"],
    E | Schema.SchemaError | Cause.NoSuchElementError,
    Id["EncodingServices"] | Res["DecodingServices"] | R
  >
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlResolver.ts#L218)

Since v4.0.0

## grouped

Creates a batched SQL request resolver that encodes requests, decodes result
rows, groups decoded results by matching request and result keys, and fails a
request with `NoSuchElementError` when no result group exists.

**Signature**

```ts
declare const grouped: <Req extends Schema.Constraint, Res extends Schema.Constraint, K, Row, E, R>(options: {
  readonly Request: Req
  readonly RequestGroupKey: (request: Req["Type"]) => K
  readonly Result: Res
  readonly ResultGroupKey: (result: Res["Type"], row: Types.NoInfer<Row>) => K
  readonly execute: (requests: Arr.NonEmptyArray<Req["Encoded"]>) => Effect.Effect<ReadonlyArray<Row>, E, R>
}) => RequestResolver.RequestResolver<
  SqlRequest<
    Req["Type"],
    Arr.NonEmptyArray<Res["Type"]>,
    E | Schema.SchemaError | Cause.NoSuchElementError,
    Req["EncodingServices"] | Res["DecodingServices"] | R
  >
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlResolver.ts#L149)

Since v4.0.0

## ordered

Creates a resolver for a SQL query with a request schema and a result schema.

**Details**

The request schema is used to validate the input of the query, and the result
schema is used to validate the output of the query. Results are mapped to the
requests in order, so the length of the results must match the length of the
requests.

**Signature**

```ts
declare const ordered: <Req extends Schema.Constraint, Res extends Schema.Constraint, _, E, R>(options: {
  readonly Request: Req
  readonly Result: Res
  readonly execute: (requests: Arr.NonEmptyArray<Req["Encoded"]>) => Effect.Effect<ReadonlyArray<_>, E, R>
}) => RequestResolver.RequestResolver<
  SqlRequest<Req["Type"], Res["Type"], E | ResultLengthMismatch, Req["EncodingServices"] | Res["DecodingServices"] | R>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlResolver.ts#L101)

Since v4.0.0

## void

Create a resolver that performs side effects.

**Signature**

```ts
declare const void: <Req extends Schema.Constraint, _, E, R>(options: { readonly Request: Req; readonly execute: (requests: Arr.NonEmptyArray<Req["Encoded"]>) => Effect.Effect<ReadonlyArray<_>, E, R>; }) => RequestResolver.RequestResolver<SqlRequest<Req["Type"], void, E | Schema.SchemaError, Req["EncodingServices"] | R>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlResolver.ts#L318)

Since v4.0.0
