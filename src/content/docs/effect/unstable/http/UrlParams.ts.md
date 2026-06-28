---
title: UrlParams.ts
nav_order: 267
parent: "effect"
---

## UrlParams.ts overview

Models URL query parameters as ordered string pairs.

`UrlParams` is used for HTTP client query strings, URL-encoded form bodies,
and server-side decoding. Values can be built from records, iterables, or
native `URLSearchParams`, then updated, serialized, converted to a `URL`, or
decoded with schemas.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [append](#append)
  - [appendAll](#appendall)
  - [getAll](#getall)
  - [getFirst](#getfirst)
  - [getLast](#getlast)
  - [remove](#remove)
  - [set](#set)
  - [setAll](#setall)
  - [transform](#transform)
- [constructors](#constructors)
  - [empty](#empty)
  - [fromInput](#frominput)
  - [make](#make)
- [converting](#converting)
  - [makeUrl](#makeurl)
  - [toReadonlyRecord](#toreadonlyrecord)
  - [toRecord](#torecord)
  - [toString](#tostring)
- [errors](#errors)
  - [UrlParamsError (class)](#urlparamserror-class)
- [guards](#guards)
  - [isUrlParams](#isurlparams)
- [instances](#instances)
  - [Equivalence](#equivalence)
- [models](#models)
  - [Coercible (type alias)](#coercible-type-alias)
  - [CoercibleRecord (type alias)](#coerciblerecord-type-alias)
  - [Input (type alias)](#input-type-alias)
  - [UrlParams (interface)](#urlparams-interface)
- [schemas](#schemas)
  - [UrlParamsSchema](#urlparamsschema)
  - [UrlParamsSchema (interface)](#urlparamsschema-interface)
  - [schemaJsonField](#schemajsonfield)
  - [schemaJsonField (interface)](#schemajsonfield-interface)
  - [schemaRecord](#schemarecord)
  - [schemaRecord (interface)](#schemarecord-interface)

---

# combinators

## append

Appends a query parameter value without removing existing values for the key.

**Signature**

```ts
declare const append: {
  (key: string, value: Coercible): (self: UrlParams) => UrlParams
  (self: UrlParams, key: string, value: Coercible): UrlParams
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L414)

Since v4.0.0

## appendAll

Appends all query parameters produced from the supplied input.

**Details**

Existing parameters are preserved.

**Signature**

```ts
declare const appendAll: { (input: Input): (self: UrlParams) => UrlParams; (self: UrlParams, input: Input): UrlParams }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L433)

Since v4.0.0

## getAll

Returns all values for a query parameter key in insertion order.

**Details**

Returns an empty array when the key is absent.

**Signature**

```ts
declare const getAll: {
  (key: string): (self: UrlParams) => ReadonlyArray<string>
  (self: UrlParams, key: string): ReadonlyArray<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L277)

Since v4.0.0

## getFirst

Returns the first value for a query parameter key safely.

**When to use**

Use when duplicate query parameters are ordered and the first occurrence has
precedence.

**Details**

Returns `Option.none` when the key is absent.

**Signature**

```ts
declare const getFirst: {
  (key: string): (self: UrlParams) => Option.Option<string>
  (self: UrlParams, key: string): Option.Option<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L306)

Since v4.0.0

## getLast

Returns the last value for a query parameter key safely.

**When to use**

Use when duplicate query parameters are ordered and the last occurrence has
precedence.

**Details**

Returns `Option.none` when the key is absent.

**Signature**

```ts
declare const getLast: {
  (key: string): (self: UrlParams) => Option.Option<string>
  (self: UrlParams, key: string): Option.Option<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L332)

Since v4.0.0

## remove

Removes all query parameter values for the specified key.

**Signature**

```ts
declare const remove: { (key: string): (self: UrlParams) => UrlParams; (self: UrlParams, key: string): UrlParams }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L444)

Since v4.0.0

## set

Sets a query parameter to a single value.

**Details**

Existing values for the same key are removed, and the new value is appended to
the end.

**Signature**

```ts
declare const set: {
  (key: string, value: Coercible): (self: UrlParams) => UrlParams
  (self: UrlParams, key: string, value: Coercible): UrlParams
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L351)

Since v4.0.0

## setAll

Sets multiple query parameters from input.

**Details**

Keys present in the input replace existing values for those keys, while
unmentioned existing parameters are preserved.

**Signature**

```ts
declare const setAll: { (input: Input): (self: UrlParams) => UrlParams; (self: UrlParams, input: Input): UrlParams }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L391)

Since v4.0.0

## transform

Transforms the underlying ordered key-value pairs of `UrlParams`.

**Details**

The result is wrapped in a new `UrlParams` value.

**Signature**

```ts
declare const transform: {
  (f: (params: UrlParams["params"]) => UrlParams["params"]): (self: UrlParams) => UrlParams
  (self: UrlParams, f: (params: UrlParams["params"]) => UrlParams["params"]): UrlParams
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L372)

Since v4.0.0

# constructors

## empty

An empty `UrlParams` value.

**Signature**

```ts
declare const empty: UrlParams
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L265)

Since v4.0.0

## fromInput

Creates `UrlParams` from a supported input shape.

**Details**

Primitive values are converted to strings, arrays produce repeated parameters,
nested records use bracket notation, and `undefined` values are omitted.

**Signature**

```ts
declare const fromInput: (input: Input) => UrlParams
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L159)

Since v4.0.0

## make

Creates `UrlParams` from ordered string key-value pairs.

**Details**

The input pairs are used as-is and are not coerced or normalized.

**Signature**

```ts
declare const make: (params: ReadonlyArray<readonly [string, string]>) => UrlParams
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L142)

Since v4.0.0

# converting

## makeUrl

Creates a `URL` safely by appending `UrlParams` and an optional hash to a URL string.

**Details**

Returns a `Result` that fails with `UrlParamsError` if the URL cannot be
constructed.

**Signature**

```ts
declare const makeUrl: (url: string, params: UrlParams, hash: string | undefined) => Result.Result<URL, UrlParamsError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L470)

Since v4.0.0

## toReadonlyRecord

Builds a readonly record from `UrlParams`.

**Details**

Keys with one value map to a string, and keys with multiple values map to a
non-empty readonly array of strings.

**Signature**

```ts
declare const toReadonlyRecord: (self: UrlParams) => ReadonlyRecord<string, string | Arr.NonEmptyReadonlyArray<string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L566)

Since v4.0.0

## toRecord

Builds a `Record` containing all the key-value pairs in the given `UrlParams`
as `string` (if only one value for a key) or a `NonEmptyArray<string>`
(when more than one value for a key)

**Example** (Converting parameters to a record)

```ts
import { UrlParams } from "effect/unstable/http"
import * as assert from "node:assert"

const urlParams = UrlParams.fromInput({
  a: 1,
  b: true,
  c: "string",
  e: [1, 2, 3]
})
const result = UrlParams.toRecord(urlParams)

assert.deepStrictEqual(result, { a: "1", b: "true", c: "string", e: ["1", "2", "3"] })
```

**Signature**

```ts
declare const toRecord: (self: UrlParams) => Record<string, string | Arr.NonEmptyArray<string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L540)

Since v4.0.0

## toString

Serializes `UrlParams` to a URL query string without a leading question mark.

**Signature**

```ts
declare const toString: (self: UrlParams) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L498)

Since v4.0.0

# errors

## UrlParamsError (class)

Error returned when constructing a `URL` from `UrlParams` fails.

**Signature**

```ts
declare class UrlParamsError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L455)

Since v4.0.0

# guards

## isUrlParams

Returns `true` when a value is a `UrlParams` instance.

**Signature**

```ts
declare const isUrlParams: (u: unknown) => u is UrlParams
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L54)

Since v4.0.0

# instances

## Equivalence

Provides an order-sensitive `Equivalence` instance for `UrlParams`.

**Details**

Two values are equivalent when they contain the same key-value pairs in the same
order.

**Signature**

```ts
declare const Equivalence: Equ.Equivalence<UrlParams>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L208)

Since v4.0.0

# models

## Coercible (type alias)

Primitive value that can be converted into a URL parameter string.

**Gotchas**

`undefined` values are skipped when constructing from input.

**Signature**

```ts
type Coercible = string | number | bigint | boolean | null | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L86)

Since v4.0.0

## CoercibleRecord (type alias)

Record input whose fields can be coerced into URL parameter values.

**Details**

Nested records are rendered using bracket notation, and arrays produce repeated
parameters.

**Signature**

```ts
type CoercibleRecord<A> = {
  readonly [K in keyof A]: CoercibleRecordField<A[K]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L108)

Since v4.0.0

## Input (type alias)

Input accepted when constructing `UrlParams`.

**Details**

Values can be provided as a coercible record, an iterable of key-value pairs, or
a native `URLSearchParams` value.

**Signature**

```ts
type Input = CoercibleRecordInput | Iterable<readonly [string, Coercible]> | URLSearchParams
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L67)

Since v4.0.0

## UrlParams (interface)

Immutable collection of URL query parameters.

**Details**

Parameters are stored as ordered string key-value pairs and can contain multiple
values for the same key.

**Signature**

```ts
export interface UrlParams extends Pipeable, Inspectable, Iterable<readonly [string, string]> {
  readonly [TypeId]: typeof TypeId
  readonly params: ReadonlyArray<readonly [string, string]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L43)

Since v4.0.0

# schemas

## UrlParamsSchema

Schema for `UrlParams`.

**Details**

The encoded representation is an array of string key-value tuples.

**Signature**

```ts
declare const UrlParamsSchema: UrlParamsSchema
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L234)

Since v4.0.0

## UrlParamsSchema (interface)

Schema type for `UrlParams`.

**Signature**

```ts
export interface UrlParamsSchema extends Schema.declare<UrlParams, ReadonlyArray<readonly [string, string]>> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L222)

Since v4.0.0

## schemaJsonField

Extracts a JSON value from the first occurrence of the given `field` in the
`UrlParams`.

**Example** (Decoding JSON parameter fields)

```ts
import { Schema } from "effect"
import { UrlParams } from "effect/unstable/http"

const extractFoo = UrlParams.schemaJsonField("foo").pipe(
  Schema.decodeTo(
    Schema.Struct({
      some: Schema.String,
      number: Schema.Number
    })
  )
)

console.log(
  Schema.decodeSync(extractFoo)(
    UrlParams.fromInput({
      foo: JSON.stringify({ some: "bar", number: 42 }),
      baz: "qux"
    })
  )
)
```

**Signature**

```ts
declare const schemaJsonField: (field: string) => schemaJsonField
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L605)

Since v4.0.0

## schemaJsonField (interface)

Schema type for decoding one URL parameter field as JSON.

**Signature**

```ts
export interface schemaJsonField extends Schema.decodeTo<Schema.UnknownFromJsonString, UrlParamsSchema> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L575)

Since v4.0.0

## schemaRecord

Schema that decodes `UrlParams` into a record of key-value pairs.

**Details**

Keys with one value decode to a string, and keys with multiple values decode to
a non-empty readonly array of strings.

**Example** (Decoding URL parameters to a record)

```ts
import { Schema } from "effect"
import { UrlParams } from "effect/unstable/http"

const toStruct = UrlParams.schemaRecord.pipe(
  Schema.decodeTo(
    Schema.Struct({
      some: Schema.String,
      number: Schema.FiniteFromString
    })
  )
)

console.log(
  Schema.decodeSync(toStruct)(
    UrlParams.fromInput({
      some: "value",
      number: 42
    })
  )
)
```

**Signature**

```ts
declare const schemaRecord: schemaRecord
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L667)

Since v4.0.0

## schemaRecord (interface)

Extract a record of key-value pairs from the `UrlParams`.

**Signature**

```ts
export interface schemaRecord extends Schema.decodeTo<
  Schema.$Record<Schema.String, Schema.Union<readonly [Schema.String, Schema.NonEmptyArray<Schema.String>]>>,
  UrlParamsSchema,
  never,
  never
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/UrlParams.ts#L626)

Since v4.0.0
