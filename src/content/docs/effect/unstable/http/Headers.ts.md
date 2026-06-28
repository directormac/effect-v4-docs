---
title: Headers.ts
nav_order: 239
parent: "effect"
---

## Headers.ts overview

Models HTTP headers for the unstable HTTP client and server modules.

`Headers` values are immutable maps keyed by lowercase header name. This
module converts common header inputs into that shape, provides helpers for
reading and updating header values, and redacts configured sensitive headers
when values are inspected.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [get](#get)
  - [has](#has)
  - [merge](#merge)
  - [redact](#redact)
  - [remove](#remove)
  - [removeMany](#removemany)
  - [set](#set)
  - [setAll](#setall)
- [constructors](#constructors)
  - [empty](#empty)
  - [fromInput](#frominput)
  - [fromRecordUnsafe](#fromrecordunsafe)
- [fiber refs](#fiber-refs)
  - [CurrentRedactedNames](#currentredactednames)
- [instances](#instances)
  - [Equivalence](#equivalence)
- [models](#models)
  - [Headers (interface)](#headers-interface)
  - [Input (type alias)](#input-type-alias)
- [refinements](#refinements)
  - [isHeaders](#isheaders)
- [schemas](#schemas)
  - [HeadersSchema](#headersschema)
  - [HeadersSchema (interface)](#headersschema-interface)
- [type IDs](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# combinators

## get

Gets a header value by name safely.

**Details**

The lookup lowercases the provided header name and returns `Option.none()` when absent.

**Signature**

```ts
declare const get: {
  (key: string): (self: Headers) => Option.Option<string>
  (self: Headers, key: string): Option.Option<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L249)

Since v4.0.0

## has

Returns `true` when a header with the given name is present.

**Details**

The lookup lowercases the provided header name.

**Signature**

```ts
declare const has: { (key: string): (self: Headers) => boolean; (self: Headers, key: string): boolean }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L231)

Since v4.0.0

## merge

Returns a new `Headers` collection containing headers from both collections.

**Details**

Headers from the second collection override headers from the first collection with the same name.

**Signature**

```ts
declare const merge: { (headers: Headers): (self: Headers) => Headers; (self: Headers, headers: Headers): Headers }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L311)

Since v4.0.0

## redact

Returns a plain record with selected header values wrapped in `Redacted`.

**Details**

String keys are normalized to lowercase before matching; regular expressions are tested against the stored header names.

**Signature**

```ts
declare const redact: {
  (key: string | RegExp | ReadonlyArray<string | RegExp>): (self: Headers) => Record<string, string | Redacted.Redacted>
  (self: Headers, key: string | RegExp | ReadonlyArray<string | RegExp>): Record<string, string | Redacted.Redacted>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L379)

Since v4.0.0

## remove

Returns a new `Headers` collection with the named header removed.

**Details**

The provided header name is normalized to lowercase before removal.

**Signature**

```ts
declare const remove: { (key: string): (self: Headers) => Headers; (self: Headers, key: string): Headers }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L333)

Since v4.0.0

## removeMany

Returns a new `Headers` collection with each named header removed.

**Details**

Each provided header name is normalized to lowercase before removal.

**Signature**

```ts
declare const removeMany: {
  (keys: Iterable<string>): (self: Headers) => Headers
  (self: Headers, keys: Iterable<string>): Headers
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L355)

Since v4.0.0

## set

Returns a new `Headers` collection with the given header set.

**Details**

The header name is normalized to lowercase.

**Signature**

```ts
declare const set: {
  (key: string, value: string): (self: Headers) => Headers
  (self: Headers, key: string, value: string): Headers
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L267)

Since v4.0.0

## setAll

Returns a new `Headers` collection with all provided headers set.

**Details**

Input headers are normalized with `fromInput` and override existing headers with the same lowercase name.

**Signature**

```ts
declare const setAll: { (headers: Input): (self: Headers) => Headers; (self: Headers, headers: Input): Headers }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L289)

Since v4.0.0

# constructors

## empty

An empty `Headers` collection.

**Signature**

```ts
declare const empty: Headers
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L175)

Since v4.0.0

## fromInput

Creates `Headers` from a record or iterable of header entries.

**Details**

Header names are normalized to lowercase. Array values in record input are joined with `", "`, and `undefined` values are omitted.

**Signature**

```ts
declare const fromInput: (input?: Input) => Headers
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L187)

Since v4.0.0

## fromRecordUnsafe

Treats an existing record as `Headers` unsafely.

**Gotchas**

This mutates the record's prototype and does not normalize header names; callers must provide the expected lowercase keys.

**Signature**

```ts
declare const fromRecordUnsafe: (input: Record.ReadonlyRecord<string, string>) => Headers
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L218)

Since v4.0.0

# fiber refs

## CurrentRedactedNames

Context reference listing header names or patterns that should be redacted when `Headers` are inspected or rendered.

**Details**

Defaults include `authorization`, `cookie`, `set-cookie`, and `x-api-key`.

**Signature**

```ts
declare const CurrentRedactedNames: Context.Reference<ReadonlyArray<string | RegExp>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L429)

Since v4.0.0

# instances

## Equivalence

Provides an `Equivalence` instance that compares `Headers` by header names
and string values.

**Signature**

```ts
declare const Equivalence: Equ.Equivalence<Headers>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L110)

Since v4.0.0

# models

## Headers (interface)

Represents an immutable HTTP header collection keyed by lowercase header name.

**Details**

`Headers` values also support redaction through the `Redactable` protocol.

**Signature**

```ts
export interface Headers extends Redactable.Redactable {
  readonly [TypeId]: TypeId
  readonly [key: string]: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L60)

Since v4.0.0

## Input (type alias)

Input accepted when constructing headers.

**Details**

Records may contain string values, string arrays, or `undefined`; arrays are joined with `", "`, and `undefined` values are omitted.

**Signature**

```ts
type Input =
  | Record.ReadonlyRecord<string, string | ReadonlyArray<string> | undefined>
  | Iterable<readonly [string, string]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L165)

Since v4.0.0

# refinements

## isHeaders

Returns `true` if the provided value is a `Headers` value.

**Signature**

```ts
declare const isHeaders: (u: unknown) => u is Headers
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L48)

Since v4.0.0

# schemas

## HeadersSchema

Schema for `Headers` values encoded as records of string header values.

**Details**

Decoding normalizes header names through `fromInput`; encoding returns a plain record.

**Signature**

```ts
declare const HeadersSchema: HeadersSchema
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L130)

Since v4.0.0

## HeadersSchema (interface)

Schema interface for `Headers` values encoded as records of string header values.

**Signature**

```ts
export interface HeadersSchema extends Schema.declare<Headers, { readonly [x: string]: string }> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L118)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier for `Headers` values.

**Signature**

```ts
declare const TypeId: unique symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L32)

Since v4.0.0

## TypeId (type alias)

Type of the unique symbol used to brand `Headers` values.

**Signature**

```ts
type TypeId = typeof TypeId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Headers.ts#L40)

Since v4.0.0
