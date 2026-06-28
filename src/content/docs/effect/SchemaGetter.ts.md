---
title: SchemaGetter.ts
nav_order: 100
parent: "effect"
---

## SchemaGetter.ts overview

Builds one-way conversions used by schemas.

A `Getter<T, E, R>` receives an optional encoded value and returns an
optional decoded value. It can also report a schema issue or require Effect
services. Schema transformations use getters to describe one direction of a
conversion, for example decoding a field from input data. This module
includes basic getters, validation helpers, pure and effectful conversions,
and ready-made conversions for common string, number, binary, date, form, and
URL-related values.

Since v4.0.0

---

## Exports Grouped by Category

- [Base64 getters](#base64-getters)
  - [decodeBase64](#decodebase64)
  - [decodeBase64String](#decodebase64string)
  - [decodeBase64Url](#decodebase64url)
  - [decodeBase64UrlString](#decodebase64urlstring)
  - [encodeBase64](#encodebase64)
  - [encodeBase64Url](#encodebase64url)
- [Coercions](#coercions)
  - [BigInt](#bigint)
  - [Boolean](#boolean)
  - [Date](#date)
  - [Number](#number)
  - [String](#string)
- [DateTime](#datetime)
  - [dateTimeUtcFromInput](#datetimeutcfrominput)
- [FormData](#formdata)
  - [decodeFormData](#decodeformdata)
  - [encodeFormData](#encodeformdata)
- [Hex getters](#hex-getters)
  - [decodeHex](#decodehex)
  - [decodeHexString](#decodehexstring)
  - [encodeHex](#encodehex)
- [JSON getters](#json-getters)
  - [parseJson](#parsejson)
  - [stringifyJson](#stringifyjson)
- [Tree](#tree)
  - [collectBracketPathEntries](#collectbracketpathentries)
  - [makeTreeRecord](#maketreerecord)
- [URI](#uri)
  - [decodeUriComponent](#decodeuricomponent)
  - [encodeUriComponent](#encodeuricomponent)
- [constructors](#constructors)
  - [checkEffect](#checkeffect)
  - [fail](#fail)
  - [forbidden](#forbidden)
  - [omit](#omit)
  - [onNone](#onnone)
  - [onSome](#onsome)
  - [passthrough](#passthrough)
  - [passthroughSubtype](#passthroughsubtype)
  - [passthroughSupertype](#passthroughsupertype)
  - [required](#required)
  - [succeed](#succeed)
  - [transform](#transform)
  - [transformOptional](#transformoptional)
  - [transformOrFail](#transformorfail)
  - [withDefault](#withdefault)
- [models](#models)
  - [Getter (class)](#getter-class)
    - [map (method)](#map-method)
    - [compose (method)](#compose-method)
    - [run (property)](#run-property)
- [search params](#search-params)
  - [decodeURLSearchParams](#decodeurlsearchparams)
  - [encodeURLSearchParams](#encodeurlsearchparams)
- [string](#string-1)
  - [camelToSnake](#cameltosnake)
  - [capitalize](#capitalize)
  - [joinKeyValue](#joinkeyvalue)
  - [snakeToCamel](#snaketocamel)
  - [split](#split)
  - [splitKeyValue](#splitkeyvalue)
  - [toLowerCase](#tolowercase)
  - [toUpperCase](#touppercase)
  - [trim](#trim)
  - [uncapitalize](#uncapitalize)

---

# Base64 getters

## decodeBase64

Decodes a Base64 string to a `Uint8Array`.

**Details**

- Fails with `SchemaIssue.InvalidValue` if the input is not valid Base64.

**Example** (Decoding Base64 to bytes)

```ts
import { SchemaGetter } from "effect"

const decode = SchemaGetter.decodeBase64<string>()
// Getter<Uint8Array, string>
```

**See**

- `decodeBase64String` to decode to `string` instead
- `encodeBase64` for the inverse operation

**Signature**

```ts
declare const decodeBase64: <E extends string>() => Getter<Uint8Array, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1267)

Since v4.0.0

## decodeBase64String

Decodes a Base64 string to a UTF-8 `string`.

**Details**

- Fails with `SchemaIssue.InvalidValue` if the input is not valid Base64.

**Example** (Decoding Base64 to string)

```ts
import { SchemaGetter } from "effect"

const decode = SchemaGetter.decodeBase64String<string>()
// Getter<string, string>
```

**See**

- `decodeBase64` to decode to `Uint8Array` instead
- `encodeBase64` for the inverse operation

**Signature**

```ts
declare const decodeBase64String: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1298)

Since v4.0.0

## decodeBase64Url

Decodes a URL-safe Base64 string to a `Uint8Array`.

**Details**

- Fails with `SchemaIssue.InvalidValue` if the input is not valid Base64Url.

**Example** (Decoding Base64Url to bytes)

```ts
import { SchemaGetter } from "effect"

const decode = SchemaGetter.decodeBase64Url<string>()
// Getter<Uint8Array, string>
```

**See**

- `decodeBase64UrlString` to decode to `string` instead
- `encodeBase64Url` for the inverse operation

**Signature**

```ts
declare const decodeBase64Url: <E extends string>() => Getter<Uint8Array, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1329)

Since v4.0.0

## decodeBase64UrlString

Decodes a URL-safe Base64 string to a UTF-8 `string`.

**Details**

- Fails with `SchemaIssue.InvalidValue` if the input is not valid Base64Url.

**Example** (Decoding Base64Url to string)

```ts
import { SchemaGetter } from "effect"

const decode = SchemaGetter.decodeBase64UrlString<string>()
// Getter<string, string>
```

**See**

- `decodeBase64Url` to decode to `Uint8Array` instead
- `encodeBase64Url` for the inverse operation

**Signature**

```ts
declare const decodeBase64UrlString: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1360)

Since v4.0.0

## encodeBase64

Encodes a `Uint8Array` or string to a Base64 string.

**Details**

The getter is pure and never fails.

**Example** (Encoding to Base64)

```ts
import { SchemaGetter } from "effect"

const encode = SchemaGetter.encodeBase64<Uint8Array>()
```

**See**

- `decodeBase64` for the inverse operation to `Uint8Array`
- `decodeBase64String` for the inverse operation to `string`
- `encodeBase64Url` for the URL-safe variant

**Signature**

```ts
declare const encodeBase64: <E extends Uint8Array | string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1190)

Since v4.0.0

## encodeBase64Url

Encodes a `Uint8Array` or string to a URL-safe Base64 string.

**Details**

The getter is pure and never fails.

**Example** (Encoding to Base64Url)

```ts
import { SchemaGetter } from "effect"

const encode = SchemaGetter.encodeBase64Url<Uint8Array>()
```

**See**

- `decodeBase64Url` for the inverse operation to `Uint8Array`
- `decodeBase64UrlString` for the inverse operation to `string`
- `encodeBase64` for the standard Base64 variant

**Signature**

```ts
declare const encodeBase64Url: <E extends Uint8Array | string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1216)

Since v4.0.0

# Coercions

## BigInt

Coerces a value to `bigint` using the global `BigInt()` constructor.

**When to use**

Use when you need a schema getter to convert a present string, number, or
boolean value to `bigint`.

**Details**

- Delegates to `globalThis.BigInt`.
- Throws at runtime if the input cannot be converted (e.g. non-numeric string).

**Example** (Coercing to a bigint)

```ts
import { SchemaGetter } from "effect"

const toBigInt = SchemaGetter.BigInt<string>()
// Getter<bigint, string>
```

**Signature**

```ts
declare const BigInt: <E extends string | number | bigint | boolean>() => Getter<bigint, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L760)

Since v4.0.0

## Boolean

Coerces any value to a `boolean` using the global `Boolean()` constructor.

**When to use**

Use when you need a schema getter to coerce a present encoded value to a
boolean with `Boolean()`.

**Details**

The getter is pure, never fails, and delegates to `globalThis.Boolean`.

**Example** (Coercing to a boolean)

```ts
import { SchemaGetter } from "effect"

const toBool = SchemaGetter.Boolean<string>()
// Getter<boolean, string>
```

**Signature**

```ts
declare const Boolean: <E>() => Getter<boolean, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L731)

Since v4.0.0

## Date

Coerces a value to a `Date` using `new Date(input)`.

**When to use**

Use when you need a schema getter to coerce a present string, number, or
existing date object into a new date object.

**Details**

- Delegates to `new globalThis.Date(input)`.
- Does not validate the result — may produce an invalid Date.

**Example** (Coercing to a Date)

```ts
import { SchemaGetter } from "effect"

const toDate = SchemaGetter.Date<string>()
// Getter<Date, string>
```

**See**

- `dateTimeUtcFromInput` for validated DateTime parsing

**Signature**

```ts
declare const Date: <E extends string | number | Date>() => Getter<Date, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L791)

Since v4.0.0

## Number

Coerces any value to a `number` using the global `Number()` constructor.

**When to use**

Use when you need a schema getter to coerce a present encoded value to a
number with `Number()`.

**Details**

The getter is pure, never fails, and delegates to `globalThis.Number`. It may
produce `NaN` for non-numeric inputs.

**Example** (Coercing to a number)

```ts
import { SchemaGetter } from "effect"

const toNumber = SchemaGetter.Number<string>()
// Getter<number, string>
```

**See**

- `transformOrFail` for validated number parsing

**Signature**

```ts
declare const Number: <E>() => Getter<number, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L703)

Since v4.0.0

## String

Coerces any value to a `string` using the global `String()` constructor.

**When to use**

Use when you need a schema getter to coerce a present encoded value to a
string with `String()`.

**Details**

The getter is pure, never fails, and delegates to `globalThis.String`.

**Example** (Coercing to a string)

```ts
import { SchemaGetter } from "effect"

const toString = SchemaGetter.String<number>()
// Getter<string, number>
```

**See**

- `transform` for custom string conversions

**Signature**

```ts
declare const String: <E>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L672)

Since v4.0.0

# DateTime

## dateTimeUtcFromInput

Parses a `DateTime.Input` value into a `DateTime.Utc`.

**When to use**

Use when you need a schema getter to decode a present encoded date/time value
to a `DateTime.Utc`.

**Details**

- Accepted input includes existing `DateTime` values, partial date/time parts,
  instant objects, zoned instant objects, JavaScript `Date` instances, epoch
  milliseconds, and date strings.
- Converts successfully parsed values to UTC.
- Fails with `SchemaIssue.InvalidValue` if the input cannot be parsed as a valid
  `DateTime`.

**Example** (Parsing DateTime)

```ts
import { SchemaGetter } from "effect"

const parseDate = SchemaGetter.dateTimeUtcFromInput<string>()
// Getter<DateTime.Utc, string>
```

**See**

- `Date` for a simpler coercion to `Date` (no validation)

**Signature**

```ts
declare const dateTimeUtcFromInput: <E extends DateTime.DateTime.Input>() => Getter<DateTime.Utc, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1523)

Since v4.0.0

# FormData

## decodeFormData

Decodes a `FormData` object into a nested tree structure using bracket-path notation.

**When to use**

Use when you need a schema getter to parse `FormData` from HTTP requests into
structured objects.

**Details**

The getter is pure and never fails. It interprets bracket-path keys such as
`user[name]` and `items[0]` to build nested objects or arrays, and each leaf
value is a `string` or `Blob`.

**Example** (Decoding FormData)

```ts
import { SchemaGetter } from "effect"

const decode = SchemaGetter.decodeFormData()
// Getter<TreeObject<string | Blob>, FormData>
```

**See**

- `encodeFormData` for the inverse operation
- `makeTreeRecord` for the underlying bracket-path parser
- `decodeURLSearchParams` for the URLSearchParams variant

**Signature**

```ts
declare const decodeFormData: () => Getter<Schema.TreeRecord<string | Blob>, FormData>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1563)

Since v4.0.0

## encodeFormData

Encodes a nested object into a `FormData` instance using bracket-path notation.

**When to use**

Use when you need a schema getter to serialize structured data to `FormData`
for HTTP requests.

**Details**

The getter is pure and never fails. It flattens nested objects or arrays into
bracket-path keys such as `user[name]` and `items[0]`. Non-object inputs
produce an empty `FormData`.

**Example** (Encoding to FormData)

```ts
import { SchemaGetter } from "effect"

const encode = SchemaGetter.encodeFormData()
// Getter<FormData, unknown>
```

**See**

- `decodeFormData` for the inverse operation
- `collectBracketPathEntries` for the underlying flattener
- `encodeURLSearchParams` for the URLSearchParams variant

**Signature**

```ts
declare const encodeFormData: () => Getter<FormData, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1601)

Since v4.0.0

# Hex getters

## decodeHex

Decodes a hexadecimal string to a `Uint8Array`.

**Details**

- Fails with `SchemaIssue.InvalidValue` if the input is not valid hex.

**Example** (Decoding hex to bytes)

```ts
import { SchemaGetter } from "effect"

const decode = SchemaGetter.decodeHex<string>()
// Getter<Uint8Array, string>
```

**See**

- `decodeHexString` to decode to `string` instead
- `encodeHex` for the inverse operation

**Signature**

```ts
declare const decodeHex: <E extends string>() => Getter<Uint8Array, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1391)

Since v4.0.0

## decodeHexString

Decodes a hexadecimal string to a UTF-8 `string`.

**Details**

- Fails with `SchemaIssue.InvalidValue` if the input is not valid hex.

**Example** (Decoding hex to string)

```ts
import { SchemaGetter } from "effect"

const decode = SchemaGetter.decodeHexString<string>()
// Getter<string, string>
```

**See**

- `decodeHex` to decode to `Uint8Array` instead
- `encodeHex` for the inverse operation

**Signature**

```ts
declare const decodeHexString: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1422)

Since v4.0.0

## encodeHex

Encodes a `Uint8Array` or string to a hexadecimal string.

**Details**

The getter is pure and never fails.

**Example** (Encoding to hex)

```ts
import { SchemaGetter } from "effect"

const encode = SchemaGetter.encodeHex<Uint8Array>()
```

**See**

- `decodeHex` for the inverse operation to `Uint8Array`
- `decodeHexString` for the inverse operation to `string`

**Signature**

```ts
declare const encodeHex: <E extends Uint8Array | string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1241)

Since v4.0.0

# JSON getters

## parseJson

Parses a JSON string into a value.

**When to use**

Use when you need a schema getter to parse a present encoded JSON string
during decoding.

**Details**

- Skips `None` inputs.
- Without `reviver`: returns `Schema.MutableJson` (typed JSON).
- With `reviver`: returns `unknown` (reviver may produce arbitrary values).
- On parse failure, fails with `SchemaIssue.InvalidValue` containing the error message.

**Example** (Parsing JSON)

```ts
import { SchemaGetter } from "effect"

const parse = SchemaGetter.parseJson<string>()
// Getter<MutableJson, string>
```

**See**

- `stringifyJson` for the inverse operation

**Signature**

```ts
declare const parseJson: {
  <E extends string>(): Getter<Schema.MutableJson, E>
  <E extends string>(options: ParseJsonOptions): Getter<unknown, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L992)

Since v4.0.0

## stringifyJson

Stringifies a present value using `JSON.stringify`.

**When to use**

Use when you need a schema getter to serialize a present decoded value to
JSON text during encoding.

**Details**

- Skips `None` inputs.
- On thrown stringify failures, such as circular references, fails with
  `SchemaIssue.InvalidValue`.
- Supports optional `replacer` and `space` options, matching
  `JSON.stringify`.
- If `JSON.stringify` returns `undefined`, such as for `undefined`,
  functions, symbols, or a replacer that removes the root value, that
  `undefined` result is returned rather than converted into an `Issue`.

**Example** (Stringifying JSON)

```ts
import { SchemaGetter } from "effect"

const stringify = SchemaGetter.stringifyJson()
// Getter<string, unknown>
```

**See**

- `parseJson` for the inverse operation

**Signature**

```ts
declare const stringifyJson: (options?: StringifyJsonOptions) => Getter<string, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1039)

Since v4.0.0

# Tree

## collectBracketPathEntries

Flattens a nested object into bracket-path entries, filtering leaf values by a type guard.

**When to use**

Use when you need a schema getter to serialize structured objects to flat
key-value entries.

- Building custom `FormData` or `URLSearchParams` encoders.

**Details**

- This is the inverse of `makeTreeRecord`.
- Takes a nested object and produces flat `[bracketPath, value]` pairs suitable for
  `FormData` or `URLSearchParams`.
- Returns a curried function: first call provides the leaf type guard, second call provides the object.
- Recursively traverses objects and arrays.
- If all elements of an array are leaves, encodes them as multiple entries with the same key
  (e.g. `tags=a&tags=b`). Otherwise uses indexed bracket paths (e.g. `items[0]`, `items[1]`).
- Non-leaf values that aren't objects or arrays are silently skipped.

**Example** (Flattening an object to bracket paths)

```ts
import { Predicate, SchemaGetter } from "effect"

const collectStrings = SchemaGetter.collectBracketPathEntries(Predicate.isString)
const entries = collectStrings({ user: { name: "Alice", tags: ["admin", "editor"] } })
// [["user[name]", "Alice"], ["user[tags]", "admin"], ["user[tags]", "editor"]]
```

**See**

- `makeTreeRecord` for the inverse operation (flat entries to tree)
- `encodeFormData` for a higher-level FormData encoder
- `encodeURLSearchParams` for a higher-level URLSearchParams encoder

**Signature**

```ts
declare const collectBracketPathEntries: <A>(
  isLeaf: (value: unknown) => value is A
) => (input: object) => Array<[bracketPath: string, value: A]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1838)

Since v4.0.0

## makeTreeRecord

Builds a nested tree object from a list of bracket-path entries.

**When to use**

Use when you need a schema getter to parse FormData or URLSearchParams
entries into structured objects.

- You have flat key-value pairs with bracket-path keys that need nesting.

**Details**

- A bracket path is a string like `"user[address][city]"` that describes nested
  object/array structure.
- Interprets bracket paths and constructs the corresponding nested object.
- Builds and returns a nested object from the input entries.
- Supported syntax:
  - `"foo"` → object key `"foo"`
  - `"foo[bar]"` → nested `{ foo: { bar: ... } }`
  - `"foo[0]"` → array index `{ foo: [value] }`
  - `"foo[]"` → append to array `foo`
  - `""` → real empty key
- Duplicate keys for the same path are merged into arrays.

**Example** (Building a tree from bracket paths)

```ts
import { SchemaGetter } from "effect"

const tree = SchemaGetter.makeTreeRecord([
  ["user[name]", "Alice"],
  ["user[tags][]", "admin"],
  ["user[tags][]", "editor"]
])
// { user: { name: "Alice", tags: ["admin", "editor"] } }
```

**See**

- `collectBracketPathEntries` for the inverse operation (tree to flat entries)
- `decodeFormData` for a higher-level FormData decoder
- `decodeURLSearchParams` for a higher-level URLSearchParams decoder

**Signature**

```ts
declare const makeTreeRecord: <A>(
  bracketPathEntries: ReadonlyArray<readonly [bracketPath: string, value: A]>
) => Schema.TreeRecord<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1749)

Since v4.0.0

# URI

## decodeUriComponent

Decodes a URI component encoded string using `decodeURIComponent`.

**Details**

- Fails with `SchemaIssue.InvalidValue` if the input contains malformed percent-encoding sequences.

**Example** (Decoding a URI component)

```ts
import { SchemaGetter } from "effect"

const decode = SchemaGetter.decodeUriComponent<string>()
// Getter<string, string>
```

**See**

- `encodeUriComponent` for the inverse operation

**Signature**

```ts
declare const decodeUriComponent: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1478)

Since v4.0.0

## encodeUriComponent

Encodes a present string using `encodeURIComponent`.

**Details**

- Skips `None` inputs.
- May throw a `URIError` for malformed surrogate pairs; this exception is not
  converted into an `Issue`.

**Example** (Encoding a URI component)

```ts
import { SchemaGetter } from "effect"

const encode = SchemaGetter.encodeUriComponent<string>()
```

**See**

- `decodeUriComponent` for the inverse operation

**Signature**

```ts
declare const encodeUriComponent: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1453)

Since v4.0.0

# constructors

## checkEffect

Creates a getter that validates a value using an effectful check function.

**When to use**

Use when you need a schema getter to validate a decoded value (e.g. check a
constraint or call an external service).

- The validation may be asynchronous or require Effect services.

**Details**

- Only runs when input is `Some` — `None` passes through.
- The check function returns a validation result:
  - `undefined` or `true` — value is valid, passes through.
  - `false` or a `string` — value is invalid, fails with an `Issue`.
  - An `Issue` object — fails with that issue directly.
  - `{ path, issue }` — fails with a nested path issue (`issue` may be a
    message string or a full `SchemaIssue.Issue`).
- Does not transform the value — input and output types are the same.

**Example** (Validating effectfully)

```ts
import { Effect, SchemaGetter } from "effect"

const nonNegative = SchemaGetter.checkEffect<number>((n) => Effect.succeed(n >= 0 ? undefined : "must be non-negative"))
```

**See**

- `transform` when you need to change the value, not just validate
- `fail` for unconditional failure

**Signature**

```ts
declare const checkEffect: <T, R = never>(
  f: (input: T, options: SchemaAST.ParseOptions) => Effect.Effect<undefined | boolean | Schema.FilterIssue, never, R>
) => Getter<T, T, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L446)

Since v4.0.0

## fail

Creates a getter that always fails with the given issue.

**When to use**

Use when you need a schema getter that unconditionally rejects input.

- Building custom validation getters that produce specific error types.

**Details**

- Always fails with the `Issue` returned by `f`.
- The failure function receives the original `Option<E>` input for error context.

**Example** (Defining an always-failing getter)

```ts
import { Option, SchemaGetter, SchemaIssue } from "effect"

const rejectAll = SchemaGetter.fail<string, string>(
  (oe) => new SchemaIssue.InvalidValue(oe, { message: "not allowed" })
)
```

**See**

- `forbidden` for a convenience helper for `Forbidden` issues
- `checkEffect` to fail conditionally based on input value

**Signature**

```ts
declare const fail: <T, E>(f: (oe: Option.Option<E>) => SchemaIssue.Issue) => Getter<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L153)

Since v4.0.0

## forbidden

Creates a getter that always fails with a `Forbidden` issue.

**When to use**

Use when you need a schema getter to disallow a field or direction
(encode/decode) entirely.

- You want a clear "forbidden" error message in schema validation output.

**Details**

- Always fails with `SchemaIssue.Forbidden`.
- The message function receives the `Option<E>` input for context.

**Example** (Forbidding a decode direction)

```ts
import { SchemaGetter } from "effect"

const noEncode = SchemaGetter.forbidden<string, number>(() => "encoding is not supported")
```

**See**

- `fail` to fail with a custom issue type

**Signature**

```ts
declare const forbidden: <T, E>(message: (oe: Option.Option<E>) => string) => Getter<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L186)

Since v4.0.0

## omit

Creates a getter that always returns `None`, effectively omitting the value from output.

**When to use**

Use when you need a schema getter to exclude a field during decoding or
encoding.

**Details**

- Always returns `Option.None` regardless of input.
- Never fails.

**Example** (Omitting a field during encoding)

```ts
import { SchemaGetter } from "effect"

const omitField = SchemaGetter.omit<string>()
```

**See**

- `transformOptional` when you want conditional omission
- `forbidden` when you want to fail instead of silently omit

**Signature**

```ts
declare const omit: <T>() => Getter<never, T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L604)

Since v4.0.0

## onNone

Creates a getter that handles the case when the input is absent (`Option.None`).

**When to use**

Use when you need a schema getter to provide a fallback or computed value for
missing struct keys.

- Building custom "default value" logic more complex than `withDefault`.

**Details**

- When input is `None`, calls `f` to produce the result.
- When input is `Some`, passes it through unchanged.
- `f` receives the parse options and may return `None` to keep the value absent.

**Example** (Providing a default timestamp for a missing field)

```ts
import { Effect, Option, SchemaGetter } from "effect"

const withTimestamp = SchemaGetter.onNone<number>(() => Effect.succeed(Option.some(Date.now())))
```

**See**

- `required` when absent input should fail
- `withDefault` for a simpler default value for undefined inputs
- `onSome` to handle only present values

**Signature**

```ts
declare const onNone: <T, E extends T = T, R = never>(
  f: (options: SchemaAST.ParseOptions) => Effect.Effect<Option.Option<T>, SchemaIssue.Issue, R>
) => Getter<T, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L334)

Since v4.0.0

## onSome

Creates a getter that handles present values (`Option.Some`), passing `None` through.

**When to use**

Use when you need a schema getter to transform or validate only when a field
value is present.

- Missing keys should remain absent in the output.

**Details**

- When input is `None`, returns `None` (no-op).
- When input is `Some(e)`, calls `f(e, options)` to produce the result.
- `f` may return `None` to omit the value, or fail with an `Issue`.

**Example** (Transforming only present values)

```ts
import { Effect, Option, SchemaGetter } from "effect"

const parseIfPresent = SchemaGetter.onSome<number, string>((s) => Effect.succeed(Option.some(Number(s))))
```

**See**

- `onNone` to handle only absent values
- `transform` for a simpler pure transformation of present values
- `transformOrFail` for fallible transformation of present values

**Signature**

```ts
declare const onSome: <T, E, R = never>(
  f: (e: E, options: SchemaAST.ParseOptions) => Effect.Effect<Option.Option<T>, SchemaIssue.Issue, R>
) => Getter<T, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L404)

Since v4.0.0

## passthrough

Returns the identity getter — passes the value through unchanged.

**When to use**

Use when you need a schema getter for one side of a `decodeTo` pair, either
encode or decode, to pass values through unchanged.

**Details**

- Pure, no allocation (singleton instance).
- Optimized away during `.compose()` — composing with a passthrough is free.
- The default overload requires `T === E`. Pass `{ strict: false }` to opt
  out of the type constraint.

**Example** (Passing through identity transformations)

```ts
import { Schema, SchemaGetter } from "effect"

// No transformation needed — types already match
const StringToString = Schema.String.pipe(
  Schema.decodeTo(Schema.String, {
    decode: SchemaGetter.passthrough(),
    encode: SchemaGetter.passthrough()
  })
)
```

**See**

- `passthroughSupertype` when `T extends E`
- `passthroughSubtype` when `E extends T`
- `transform` when you need to change the value

**Signature**

```ts
declare const passthrough: { <T, E>(options: { readonly strict: false }): Getter<T, E>; <T>(): Getter<T, T> }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L234)

Since v4.0.0

## passthroughSubtype

Returns the identity getter, typed for when the encoded type `E` is a subtype of `T`.

**When to use**

Use when you need a schema getter that passes values through without
`{ strict: false }` for an encoded type that narrows the decoded type.

**Details**

- Same singleton as `passthrough` — no allocation, optimized in composition.

**Example** (Passing through subtypes)

```ts
import { SchemaGetter } from "effect"

// "hello" extends string, so E extends T
const g = SchemaGetter.passthroughSubtype<string, "hello">()
```

**See**

- `passthrough` when types are identical
- `passthroughSupertype` when `T extends E`

**Signature**

```ts
declare const passthroughSubtype: <T, E extends T>() => Getter<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L298)

Since v4.0.0

## passthroughSupertype

Returns the identity getter typed for the relationship `T extends E`.

**When to use**

Use when you need a schema getter that passes values through when the
decoded/output type is narrower than the encoded/input type.

**Details**

- Same singleton as `passthrough` — no allocation, optimized in composition.

**Example** (Passing through supertypes)

```ts
import { SchemaGetter } from "effect"

// string extends string, so this is valid
const g = SchemaGetter.passthroughSupertype<string, string>()
```

**See**

- `passthrough` when types are identical
- `passthroughSubtype` when `E extends T`

**Signature**

```ts
declare const passthroughSupertype: <T extends E, E>() => Getter<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L266)

Since v4.0.0

## required

Creates a getter that fails with `MissingKey` if the input is absent (`Option.None`).

**When to use**

Use when you need a schema getter to require a struct field in the encoded
input and report a missing key error when it is absent.

**Details**

- When input is `None`, fails with `SchemaIssue.MissingKey`.
- When input is `Some`, passes it through unchanged.
- Optional `annotations` customize the error message for the missing key.

**Example** (Defining a required struct field)

```ts
import { SchemaGetter } from "effect"

const mustExist = SchemaGetter.required<string>()
```

**See**

- `onNone` to provide a fallback instead of failing
- `withDefault` to substitute a default for undefined values

**Signature**

```ts
declare const required: <T, E extends T = T>(annotations?: Schema.Annotations.Key<T>) => Getter<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L368)

Since v4.0.0

## succeed

Creates a getter that always produces the given constant value, ignoring the input.

**When to use**

Use when you need a schema getter that always decodes a field to a fixed
value.

**Details**

The getter is pure and always returns `Option.some(t)` regardless of whether
the input is `Some` or `None`.

**Example** (Returning a constant getter)

```ts
import { SchemaGetter } from "effect"

const alwaysZero = SchemaGetter.succeed(0)
// alwaysZero: Getter<0, unknown> — always produces 0
```

**See**

- `transform` when you need to use the input value
- `passthrough` when you want to keep the input as-is

**Signature**

```ts
declare const succeed: <const T, E>(t: T) => Getter<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L120)

Since v4.0.0

## transform

Creates a getter that applies a pure function to present values.

**When to use**

Use when you need a schema getter for a pure, infallible transformation
between types.

- Building encode/decode pairs for `Schema.decodeTo`.

**Details**

- This is the most commonly used constructor.
- Transforms `Some(e)` to `Some(f(e))` and leaves `None` unchanged.
- Skips `None` inputs — only called when a value is present.
- Never fails.

**Example** (Transforming strings to numbers)

```ts
import { Schema, SchemaGetter } from "effect"

const NumberFromString = Schema.String.pipe(
  Schema.decodeTo(Schema.Number, {
    decode: SchemaGetter.transform((s) => Number(s)),
    encode: SchemaGetter.transform((n) => String(n))
  })
)
```

**See**

- `transformOrFail` when the transformation can fail
- `transformOptional` when you need to handle `None` inputs
- `passthrough` when no transformation is needed

**Signature**

```ts
declare const transform: <T, E>(f: (e: E) => T) => Getter<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L499)

Since v4.0.0

## transformOptional

Creates a getter that transforms the full `Option` — both present and absent values.

**When to use**

Use when you need a schema getter to handle both `Some` and `None` cases.

**Details**

The getter is pure and never fails. It receives the full `Option<E>` and
must return `Option<T>`, so it can turn a present value into absent or an
absent value into present.

**Example** (Filtering out empty strings)

```ts
import { Option, SchemaGetter } from "effect"

const skipEmpty = SchemaGetter.transformOptional<string, string>((o) => Option.filter(o, (s) => s.length > 0))
```

**See**

- `transform` when you only need to transform present values
- `omit` when you always want `None`

**Signature**

```ts
declare const transformOptional: <T, E>(f: (oe: Option.Option<E>) => Option.Option<T>) => Getter<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L573)

Since v4.0.0

## transformOrFail

Creates a getter that applies a fallible, effectful transformation to present values.

**When to use**

Use when you need a schema getter for a transformation that may fail, require
Effect services, or run asynchronously.

**Details**

- Skips `None` inputs — only called when a value is present.
- On success, wraps the result in `Some`.
- On failure, propagates the `Issue`.

**Example** (Parsing with failure)

```ts
import { Effect, Option, SchemaGetter, SchemaIssue } from "effect"

const safeParseInt = SchemaGetter.transformOrFail<number, string>((s) => {
  const n = parseInt(s, 10)
  return isNaN(n)
    ? Effect.fail(new SchemaIssue.InvalidValue(Option.some(s), { message: "not an integer" }))
    : Effect.succeed(n)
})
```

**See**

- `transform` when transformation cannot fail
- `onSome` when you need full `Option` control over the output

**Signature**

```ts
declare const transformOrFail: <T, E, R = never>(
  f: (e: E, options: SchemaAST.ParseOptions) => Effect.Effect<T, SchemaIssue.Issue, R>
) => Getter<T, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L538)

Since v4.0.0

## withDefault

Creates a getter that replaces `undefined` values with a default.

**When to use**

Use when you need a schema getter to provide a fallback for a field that may
be `undefined` in the encoded input.

**Details**

- If the input is `Some(undefined)` or `None`, produces `Some(T)`.
- If the input is `Some(value)` where value is not `undefined`, passes it through.
- `defaultValue` is an `Effect` that will be executed each time a default is needed.

**Example** (Providing a default value for an optional field)

```ts
import { Effect, SchemaGetter } from "effect"

const withZero = SchemaGetter.withDefault(Effect.succeed(0))
// Getter<number, number | undefined>
```

**See**

- `onNone` to handle only absent keys (not `undefined` values)
- `required` when absent input should fail instead of using a default

**Signature**

```ts
declare const withDefault: <T, R = never>(
  defaultValue: Effect.Effect<T, SchemaIssue.Issue, R>
) => Getter<T, T | undefined, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L637)

Since v4.0.0

# models

## Getter (class)

Represents a composable transformation from an encoded type `E` to a decoded type `T`.

**When to use**

Use when you need a schema getter to build and compose custom transformations
for `Schema.decodeTo` or `Schema.decode`.

**Details**

A getter wraps a function `Option<E> -> Effect<Option<T>, Issue, R>`. It
receives `Option.None` when the encoded key is absent, such as a missing
struct field, and returns `Option.None` to omit the value from the decoded
output. It fails with `Issue` on invalid input and may require Effect
services via `R`. `.map(f)` applies `f` to the decoded value inside `Some`
while leaving `None` unchanged. `.compose(other)` chains two getters by
feeding the output of `this` into `other`; passthrough getters on either side
are optimized away.

**Example** (Creating and composing getters)

```ts
import { SchemaGetter } from "effect"

const parseNumber = SchemaGetter.transform<number, string>((s) => Number(s))
const double = SchemaGetter.transform<number, number>((n) => n * 2)
const composed = parseNumber.compose(double)
// composed: Getter<number, string> — parses then doubles
```

**See**

- `transform` to create a getter from a pure function
- `passthrough` for the identity getter
- `transformOrFail` for fallible transformation

**Signature**

```ts
declare class Getter<T, E, R> {
  constructor(
    run: (
      input: Option.Option<E>,
      options: SchemaAST.ParseOptions
    ) => Effect.Effect<Option.Option<T>, SchemaIssue.Issue, R>
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L63)

Since v4.0.0

### map (method)

**Signature**

```ts
declare const map: <T2>(f: (t: T) => T2) => Getter<T2, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L78)

### compose (method)

**Signature**

```ts
declare const compose: <T2, R2>(other: Getter<T2, T, R2>) => Getter<T2, E, R | R2>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L81)

### run (property)

**Signature**

```ts
readonly run: (input: Option.Option<E>, options: SchemaAST.ParseOptions) => Effect.Effect<Option.Option<T>, SchemaIssue.Issue, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L64)

# search params

## decodeURLSearchParams

Decodes a `URLSearchParams` object into a nested tree structure using bracket-path notation.

**When to use**

Use when you need a schema getter to parse query parameters from URLs into
structured objects.

**Details**

The getter is pure and never fails. It interprets bracket-path keys such as
`user[name]` and `items[0]` to build nested objects or arrays, and each leaf
value is a `string`.

**Example** (Decoding URLSearchParams)

```ts
import { SchemaGetter } from "effect"

const decode = SchemaGetter.decodeURLSearchParams()
// Getter<TreeObject<string>, URLSearchParams>
```

**See**

- `encodeURLSearchParams` for the inverse operation
- `makeTreeRecord` for the underlying bracket-path parser
- `decodeFormData` for the FormData variant

**Signature**

```ts
declare const decodeURLSearchParams: () => Getter<Schema.TreeRecord<string>, URLSearchParams>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1644)

Since v4.0.0

## encodeURLSearchParams

Encodes a nested object into a `URLSearchParams` instance using bracket-path notation.

**When to use**

Use when you need a schema getter to serialize structured data to query
parameters for URLs.

**Details**

The getter is pure and never fails. It flattens nested objects or arrays into
bracket-path keys. Non-object inputs produce an empty `URLSearchParams`.

**Example** (Encoding to URLSearchParams)

```ts
import { SchemaGetter } from "effect"

const encode = SchemaGetter.encodeURLSearchParams()
// Getter<URLSearchParams, unknown>
```

**See**

- `decodeURLSearchParams` for the inverse operation
- `collectBracketPathEntries` for the underlying flattener
- `encodeFormData` for the FormData variant

**Signature**

```ts
declare const encodeURLSearchParams: () => Getter<URLSearchParams, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1679)

Since v4.0.0

# string

## camelToSnake

Converts a `camelCase` string to `snake_case`.

**Details**

- Pure, delegates to `String.camelToSnake`.

**Example** (Converting camel case to snake case)

```ts
import { SchemaGetter } from "effect"

const toSnake = SchemaGetter.camelToSnake<string>()
```

**See**

- `snakeToCamel` for the inverse operation

**Signature**

```ts
declare const camelToSnake: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L905)

Since v4.0.0

## capitalize

Capitalizes the first character of a string.

**Details**

- Pure, delegates to `String.capitalize`.

**Example** (Capitalizing a string)

```ts
import { SchemaGetter } from "effect"

const cap = SchemaGetter.capitalize<string>()
```

**Signature**

```ts
declare const capitalize: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L835)

Since v4.0.0

## joinKeyValue

Joins a record of key-value pairs into a delimited string.

**When to use**

Use when you need a schema getter to serialize a present decoded record as a
delimited key-value string.

**Details**

The getter is pure and never fails. It joins entries with `separator`
(default `,`) and joins each key and value with `keyValueSeparator` (default
`=`).

**Example** (Joining key-value records)

```ts
import { SchemaGetter } from "effect"

const join = SchemaGetter.joinKeyValue()
// { a: "1", b: "2" } -> "a=1,b=2"
```

**See**

- `splitKeyValue` for the inverse operation

**Signature**

```ts
declare const joinKeyValue: <E extends Record<PropertyKey, string>>(options?: {
  readonly separator?: string | undefined
  readonly keyValueSeparator?: string | undefined
}) => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1122)

Since v4.0.0

## snakeToCamel

Converts a `snake_case` string to `camelCase`.

**Details**

- Pure, delegates to `String.snakeToCamel`.

**Example** (Converting snake case to camel case)

```ts
import { SchemaGetter } from "effect"

const toCamel = SchemaGetter.snakeToCamel<string>()
```

**See**

- `camelToSnake` for the inverse operation

**Signature**

```ts
declare const snakeToCamel: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L881)

Since v4.0.0

## split

Splits a string into an array of strings by a separator.

**When to use**

Use when you need a schema getter to split a present encoded string
containing a delimited list, such as CSV values.

**Details**

The getter is pure and never fails. It splits by `separator` (default `,`).
An empty string produces an empty array, not `[""]`.

**Example** (Splitting a comma-separated string)

```ts
import { SchemaGetter } from "effect"

const splitComma = SchemaGetter.split<string>()
// "a,b,c" -> ["a", "b", "c"]
// "" -> []
```

**See**

- `splitKeyValue` when values are key-value pairs

**Signature**

```ts
declare const split: <E extends string>(options?: {
  readonly separator?: string | undefined
}) => Getter<ReadonlyArray<string>, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1161)

Since v4.0.0

## splitKeyValue

Parses a string into a record of key-value pairs.

**When to use**

Use when you need a schema getter to parse a present encoded string that
contains delimited key-value pairs (e.g. `"a=1,b=2"`).

**Details**

The getter is pure and never fails. It splits the string by `separator`
(default `,`) and then each pair by `keyValueSeparator` (default `=`). Pairs
missing a key or value are silently skipped.

**Example** (Parsing a key-value string)

```ts
import { SchemaGetter } from "effect"

const parse = SchemaGetter.splitKeyValue<string>()
// "a=1,b=2" -> { a: "1", b: "2" }
```

**See**

- `joinKeyValue` for the inverse operation
- `split` to split into an array of strings

**Signature**

```ts
declare const splitKeyValue: <E extends string>(options?: {
  readonly separator?: string | undefined
  readonly keyValueSeparator?: string | undefined
}) => Getter<Record<string, string>, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L1077)

Since v4.0.0

## toLowerCase

Converts a string to lowercase.

**Details**

- Pure, delegates to `String.toLowerCase`.

**Example** (Converting to lowercase)

```ts
import { SchemaGetter } from "effect"

const lower = SchemaGetter.toLowerCase<string>()
```

**See**

- `toUpperCase` for the inverse operation

**Signature**

```ts
declare const toLowerCase: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L929)

Since v4.0.0

## toUpperCase

Converts a string to uppercase.

**Details**

- Pure, delegates to `String.toUpperCase`.

**Example** (Converting to uppercase)

```ts
import { SchemaGetter } from "effect"

const upper = SchemaGetter.toUpperCase<string>()
```

**See**

- `toLowerCase` for the inverse operation

**Signature**

```ts
declare const toUpperCase: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L953)

Since v4.0.0

## trim

Strips whitespace from both ends of a string.

**Details**

- Pure, delegates to `String.trim`.

**Example** (Trimming whitespace)

```ts
import { SchemaGetter } from "effect"

const trimmed = SchemaGetter.trim<string>()
```

**Signature**

```ts
declare const trim: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L813)

Since v4.0.0

## uncapitalize

Uncapitalizes the first character of a string.

**Details**

- Pure, delegates to `String.uncapitalize`.

**Example** (Uncapitalizing a string)

```ts
import { SchemaGetter } from "effect"

const uncap = SchemaGetter.uncapitalize<string>()
```

**Signature**

```ts
declare const uncapitalize: <E extends string>() => Getter<string, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaGetter.ts#L857)

Since v4.0.0
