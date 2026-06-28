---
title: SqlSchema.ts
nav_order: 337
parent: "effect"
---

## SqlSchema.ts overview

Wraps SQL execution callbacks with request encoding and result decoding.

`SqlSchema` is a small adapter between Effect Schema and SQL statements. Each
helper builds a function that accepts the decoded request type used by
application code, encodes it before calling `execute`, and decodes unknown
driver rows into the result schema. The helpers cover returning all rows, a
non-empty row list, the first row, an optional first row, or discarding the
SQL result for side-effect-only statements.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [findAll](#findall)
  - [findNonEmpty](#findnonempty)
  - [findOne](#findone)
  - [findOneOption](#findoneoption)
  - [void](#void)

---

# constructors

## findAll

Builds a query function that encodes the request and decodes all result rows,
allowing an empty result set.

**When to use**

Use when you need to run a query that may return zero or more rows and
represent an empty result as an empty array.

**See**

- `findNonEmpty` for queries where an empty result is a failure

**Signature**

```ts
declare const findAll: <Req extends Schema.Constraint, Res extends Schema.Constraint, E, R>(options: {
  readonly Request: Req
  readonly Result: Res
  readonly execute: (request: Req["Encoded"]) => Effect.Effect<ReadonlyArray<unknown>, E, R>
}) => (
  request: Req["Type"]
) => Effect.Effect<Array<Res["Type"]>, E | Schema.SchemaError, Req["EncodingServices"] | Res["DecodingServices"] | R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlSchema.ts#L33)

Since v4.0.0

## findNonEmpty

Builds a query function that encodes the request, decodes all result rows,
and fails with `NoSuchElementError` when the result set is empty.

**When to use**

Use when you need to run a query that must return at least one row and treat
an empty result as a failure.

**See**

- `findAll` for queries where an empty result should return an empty array

**Signature**

```ts
declare const findNonEmpty: <Req extends Schema.Constraint, Res extends Schema.Constraint, E, R>(options: {
  readonly Request: Req
  readonly Result: Res
  readonly execute: (request: Req["Encoded"]) => Effect.Effect<ReadonlyArray<unknown>, E, R>
}) => (
  request: Req["Type"]
) => Effect.Effect<
  Arr.NonEmptyArray<Res["Type"]>,
  E | Schema.SchemaError | Cause.NoSuchElementError,
  Req["EncodingServices"] | Res["DecodingServices"] | R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlSchema.ts#L65)

Since v4.0.0

## findOne

Builds a query function that encodes the request, decodes the first result
row, and fails with `NoSuchElementError` when no rows are returned.

**Signature**

```ts
declare const findOne: <Req extends Schema.Constraint, Res extends Schema.Constraint, E, R>(options: {
  readonly Request: Req
  readonly Result: Res
  readonly execute: (request: Req["Encoded"]) => Effect.Effect<ReadonlyArray<unknown>, E, R>
}) => (
  request: Req["Type"]
) => Effect.Effect<
  Res["Type"],
  E | Schema.SchemaError | Cause.NoSuchElementError,
  R | Req["EncodingServices"] | Res["DecodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlSchema.ts#L115)

Since v4.0.0

## findOneOption

Builds a query function that encodes the request, decodes the first result row
as `Option.some`, and returns `Option.none` when no rows are returned.

**Signature**

```ts
declare const findOneOption: <Req extends Schema.Constraint, Res extends Schema.Constraint, E, R>(options: {
  readonly Request: Req
  readonly Result: Res
  readonly execute: (request: Req["Encoded"]) => Effect.Effect<ReadonlyArray<unknown>, E, R>
}) => (
  request: Req["Type"]
) => Effect.Effect<
  Option.Option<Res["Type"]>,
  E | Schema.SchemaError,
  R | Req["EncodingServices"] | Res["DecodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlSchema.ts#L148)

Since v4.0.0

## void

Runs a sql query with a request schema and discard the result.

**Signature**

```ts
declare const void: <Req extends Schema.Constraint, E, R>(options: { readonly Request: Req; readonly execute: (request: Req["Encoded"]) => Effect.Effect<unknown, E, R>; }) => (request: Req["Type"]) => Effect.Effect<void, E | Schema.SchemaError, R | Req["EncodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SqlSchema.ts#L105)

Since v4.0.0
