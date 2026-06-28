---
title: Persistable.ts
nav_order: 293
parent: "effect"
---

## Persistable.ts overview

Describes request values whose results can be persisted.

A `Persistable` request has a primary key and schemas for its success and
error results. `Persistence` and `PersistedCache` use that information to
store the request's `Exit` value and restore it later from a backing store.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [exitSchema](#exitschema)
- [constructors](#constructors)
  - [Class](#class)
- [models](#models)
  - [Any (type alias)](#any-type-alias)
  - [DecodingServices (type alias)](#decodingservices-type-alias)
  - [EncodingServices (type alias)](#encodingservices-type-alias)
  - [Error (type alias)](#error-type-alias)
  - [ErrorSchema (type alias)](#errorschema-type-alias)
  - [Persistable (interface)](#persistable-interface)
  - [Services (type alias)](#services-type-alias)
  - [Success (type alias)](#success-type-alias)
  - [SuccessSchema (type alias)](#successschema-type-alias)
  - [TimeToLiveFn (type alias)](#timetolivefn-type-alias)
- [serialization](#serialization)
  - [deserializeExit](#deserializeexit)
  - [serializeExit](#serializeexit)
- [symbols](#symbols)
  - [symbol](#symbol)

---

# accessors

## exitSchema

Returns the cached `Exit` schema for a persistable request's success and
error schemas.

**Signature**

```ts
declare const exitSchema: <A extends Schema.Constraint, E extends Schema.Constraint>(
  self: Persistable<A, E>
) => Schema.Exit<A, E, Schema.Defect>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L208)

Since v4.0.0

# constructors

## Class

Creates request classes that implement `Persistable` and `Request.Request`.

**Details**

The generated class stores the supplied tag, derives its primary key from
the payload, and carries schemas for persisted success and error exits.

**Signature**

```ts
declare const Class: <
  Config extends { payload: Record<string, unknown>; requires?: any; requestError?: any } = { payload: {} }
>() => <
  const Tag extends string,
  A extends Schema.Constraint = Schema.Void,
  E extends Schema.Constraint = Schema.Never
>(
  tag: Tag,
  options: {
    readonly primaryKey: (payload: Config["payload"]) => string
    readonly success?: A | undefined
    readonly error?: E | undefined
  }
) => new (
  args: Types.EqualsWith<
    Config["payload"],
    {},
    void,
    { readonly [P in keyof Config["payload"] as P extends "_tag" ? never : P]: Config["payload"][P] }
  >
) => { readonly _tag: Tag } & { readonly [K in keyof Config["payload"]]: Config["payload"][K] } & Persistable<A, E> &
  Request.Request<
    A["Type"],
    E["Type"] | ("requestError" extends keyof Config ? Config["requestError"] : PersistenceError | Schema.SchemaError),
    | A["DecodingServices"]
    | A["EncodingServices"]
    | E["DecodingServices"]
    | E["EncodingServices"]
    | ("requires" extends keyof Config ? Config["requires"] : never)
  >
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L141)

Since v4.0.0

# models

## Any (type alias)

Any persistable request regardless of its success and error schemas.

**Signature**

```ts
type Any = Persistable<Schema.Constraint, Schema.Constraint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L53)

Since v4.0.0

## DecodingServices (type alias)

Services required to decode a persisted success or error value for the
request.

**Signature**

```ts
type DecodingServices<A> =
  | A["~effect/persistence/Persistable"]["success"]["DecodingServices"]
  | A["~effect/persistence/Persistable"]["error"]["DecodingServices"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L94)

Since v4.0.0

## EncodingServices (type alias)

Services required to encode a success or error value for persistence.

**Signature**

```ts
type EncodingServices<A> =
  | A["~effect/persistence/Persistable"]["success"]["EncodingServices"]
  | A["~effect/persistence/Persistable"]["error"]["EncodingServices"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L104)

Since v4.0.0

## Error (type alias)

Extracts the error value type from a persistable request.

**Signature**

```ts
type Error<A> = A["~effect/persistence/Persistable"]["error"]["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L85)

Since v4.0.0

## ErrorSchema (type alias)

Extracts the error schema from a persistable request.

**Signature**

```ts
type ErrorSchema<A> = A["~effect/persistence/Persistable"]["error"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L77)

Since v4.0.0

## Persistable (interface)

A primary-keyed request value whose success and error results can be
serialized for persistence.

**Signature**

```ts
export interface Persistable<A extends Schema.Constraint, E extends Schema.Constraint> extends PrimaryKey.PrimaryKey {
  readonly [symbol]: {
    readonly success: A
    readonly error: E
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L40)

Since v4.0.0

## Services (type alias)

All schema services required to encode and decode a persistable request
result.

**Signature**

```ts
type Services<A> =
  | A["~effect/persistence/Persistable"]["success"]["DecodingServices"]
  | A["~effect/persistence/Persistable"]["success"]["EncodingServices"]
  | A["~effect/persistence/Persistable"]["error"]["DecodingServices"]
  | A["~effect/persistence/Persistable"]["error"]["EncodingServices"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L115)

Since v4.0.0

## Success (type alias)

Extracts the success value type from a persistable request.

**Signature**

```ts
type Success<A> = A["~effect/persistence/Persistable"]["success"]["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L69)

Since v4.0.0

## SuccessSchema (type alias)

Extracts the success schema from a persistable request.

**Signature**

```ts
type SuccessSchema<A> = A["~effect/persistence/Persistable"]["success"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L61)

Since v4.0.0

## TimeToLiveFn (type alias)

Computes the time to live for a persisted result from the result `Exit` and
request value.

**Signature**

```ts
type TimeToLiveFn<K> = (exit: Exit.Exit<Success<K>, Error<K>>, request: K) => Duration.Input
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L128)

Since v4.0.0

# serialization

## deserializeExit

Decodes a persisted value into an `Exit` for a persistable request using its
success and error schemas.

**Signature**

```ts
declare const deserializeExit: <A extends Schema.Constraint, E extends Schema.Constraint>(
  self: Persistable<A, E>,
  encoded: unknown
) => Effect.Effect<Exit.Exit<A["Type"], E["Type"]>, Schema.SchemaError, A["DecodingServices"] | E["DecodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L242)

Since v4.0.0

## serializeExit

Encodes an `Exit` for a persistable request using its success and error
schemas.

**Signature**

```ts
declare const serializeExit: <A extends Schema.Constraint, E extends Schema.Constraint>(
  self: Persistable<A, E>,
  exit: Exit.Exit<A["Type"], E["Type"]>
) => Effect.Effect<unknown, Schema.SchemaError, A["EncodingServices"] | E["EncodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L227)

Since v4.0.0

# symbols

## symbol

Defines the property key used to attach success and error schemas to persistable
requests.

**When to use**

Use to implement persistable request values by attaching success and error
schemas at this property key.

**Signature**

```ts
declare const symbol: "~effect/persistence/Persistable"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Persistable.ts#L31)

Since v4.0.0
