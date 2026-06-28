---
title: SchemaTransformation.ts
nav_order: 104
parent: "effect"
---

## SchemaTransformation.ts overview

Builds two-way conversions used by schemas.

A `Transformation<T, E>` describes how to decode an encoded value into a
decoded value and how to encode it back again. Schema APIs use
transformations to connect two representations, such as a string and a
number, a JSON value and a richer TypeScript value, or a form field and an
application value. This module includes transformation and middleware types,
constructors for pure or effectful conversions, and common conversions used
by the Schema module.

Since v4.0.0

---

## Exports Grouped by Category

- [Coercions](#coercions)
  - [bigintFromString](#bigintfromstring)
  - [dateFromString](#datefromstring)
  - [numberFromString](#numberfromstring)
- [String transformations](#string-transformations)
  - [capitalize](#capitalize)
  - [snakeToCamel](#snaketocamel)
  - [splitKeyValue](#splitkeyvalue)
  - [toLowerCase](#tolowercase)
  - [toUpperCase](#touppercase)
  - [trim](#trim)
  - [uncapitalize](#uncapitalize)
- [constructors](#constructors)
  - [make](#make)
  - [passthrough](#passthrough)
  - [passthroughSubtype](#passthroughsubtype)
  - [passthroughSupertype](#passthroughsupertype)
  - [transform](#transform)
  - [transformOptional](#transformoptional)
  - [transformOrFail](#transformorfail)
- [decoding](#decoding)
  - [fromFormData](#fromformdata)
  - [fromJsonString](#fromjsonstring)
  - [fromURLSearchParams](#fromurlsearchparams)
- [encoding](#encoding)
  - [stringFromBase64String](#stringfrombase64string)
  - [stringFromBase64UrlString](#stringfrombase64urlstring)
  - [stringFromHexString](#stringfromhexstring)
  - [stringFromUriComponent](#stringfromuricomponent)
  - [uint8ArrayFromBase64String](#uint8arrayfrombase64string)
- [guards](#guards)
  - [isTransformation](#istransformation)
- [models](#models)
  - [Middleware (class)](#middleware-class)
    - [flip (method)](#flip-method)
    - [\_tag (property)](#_tag-property)
    - [decode (property)](#decode-property)
    - [encode (property)](#encode-property)
  - [Transformation (class)](#transformation-class)
    - [flip (method)](#flip-method-1)
    - [compose (method)](#compose-method)
    - [[TypeId] (property)](#typeid-property)
    - [\_tag (property)](#_tag-property-1)
    - [decode (property)](#decode-property-1)
    - [encode (property)](#encode-property-1)
- [transforming](#transforming)
  - [bigDecimalFromString](#bigdecimalfromstring)
  - [dateTimeUtcFromString](#datetimeutcfromstring)
  - [dateTimeZonedFromString](#datetimezonedfromstring)
  - [durationFromMillis](#durationfrommillis)
  - [durationFromNanos](#durationfromnanos)
  - [durationFromString](#durationfromstring)
  - [optionFromNullOr](#optionfromnullor)
  - [optionFromNullishOr](#optionfromnullishor)
  - [optionFromOptional](#optionfromoptional)
  - [optionFromOptionalKey](#optionfromoptionalkey)
  - [optionFromUndefinedOr](#optionfromundefinedor)
  - [timeZoneFromString](#timezonefromstring)
  - [timeZoneNamedFromString](#timezonenamedfromstring)
  - [timeZoneOffsetFromNumber](#timezoneoffsetfromnumber)
  - [urlFromString](#urlfromstring)

---

# Coercions

## bigintFromString

Decodes a `string` into a `bigint` and encodes a `bigint` back to a
`string`.

**When to use**

Use when you need a schema transformation to parse large integer strings
(e.g. database IDs, blockchain values).

**Details**

Decoding coerces the string to a bigint like `BigInt(s)`. Encoding coerces
the bigint to a string like `String(n)`. Decoding fails if the string is not
a valid bigint representation.

**Example** (Converting a string to a BigInt)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.String.pipe(Schema.decodeTo(Schema.BigInt, SchemaTransformation.bigintFromString))
```

**See**

- `numberFromString`
- `transform`

**Signature**

```ts
declare const bigintFromString: Transformation<bigint, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L845)

Since v4.0.0

## dateFromString

Decodes a `string` into a `Date` and encodes a `Date` back to a `string`.

**When to use**

Use when you need a schema transformation to parse ISO 8601 date strings from
APIs or user input.

**Details**

Decoding creates a `Date` from the string like `new Date(s)`. Encoding
converts the `Date` to an ISO string like `date.toISOString()`, returning
`"Invalid Date"` for invalid dates.

**Example** (Converting a string to a Date)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.String.pipe(Schema.decodeTo(Schema.Date, SchemaTransformation.dateFromString))
```

**See**

- `numberFromString`
- `dateTimeUtcFromString`

**Signature**

```ts
declare const dateFromString: Transformation<Date, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L880)

Since v4.0.0

## numberFromString

Decodes a `string` into a `number` and encodes a `number` back to a
`string`.

**When to use**

Use when you need a schema transformation to parse numeric strings from APIs,
form data, or URL parameters.

**Details**

Decoding coerces the string to a number like `Number(s)`. Encoding coerces
the number to a string like `String(n)`. This does not validate that the
result is finite; combine with `Schema.Finite` or `Schema.Int` for stricter
checks.

**Example** (Converting a string to a number)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.String.pipe(Schema.decodeTo(Schema.Number, SchemaTransformation.numberFromString))
```

**See**

- `bigintFromString`
- `transform`

**Signature**

```ts
declare const numberFromString: Transformation<number, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L809)

Since v4.0.0

# String transformations

## capitalize

Transforms strings by capitalizing the first character on
decode. Encode is passthrough.

**When to use**

Use when you need a schema transformation to normalize display names or
titles.

**Details**

Decoding uppercases the first character and leaves the rest unchanged.
Encoding is passthrough.

**Example** (Capitalizing on decode)

```ts
import { Schema, SchemaTransformation } from "effect"

const Capitalized = Schema.String.pipe(Schema.decode(SchemaTransformation.capitalize()))
```

**See**

- `uncapitalize`
- `toUpperCase`

**Signature**

```ts
declare const capitalize: () => Transformation<string, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L577)

Since v4.0.0

## snakeToCamel

Transforms strings by converting snake_case to camelCase
on decode and camelCase to snake_case on encode.

**When to use**

Use when you need a schema transformation to convert API field names between
snake_case and camelCase conventions.

**Details**

Decoding converts values such as `"my_field_name"` to `"myFieldName"`.
Encoding converts values such as `"myFieldName"` back to `"my_field_name"`.
The transformation is round-trippable for standard snake_case and camelCase.

**Example** (Converting snake case to camel case)

```ts
import { Schema, SchemaTransformation } from "effect"

const SnakeToCamel = Schema.String.pipe(Schema.decode(SchemaTransformation.snakeToCamel()))
```

**See**

- `trim`
- `toLowerCase`

**Signature**

```ts
declare const snakeToCamel: () => Transformation<string, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L466)

Since v4.0.0

## splitKeyValue

Transforms a string into a record of key-value pairs and
encodes a record of key-value pairs into a string.

**When to use**

Use when you need a schema transformation to parse query-string-like or
config-file-like strings into records.

**Details**

Decoding splits the string by `separator` (default `","`) into pairs, then
splits each pair by `keyValueSeparator` (default `"="`). Encoding joins the
record back into a string using the same separators. The transformation is
round-trippable when keys and values do not contain the separators.

**Example** (Parsing key-value pairs)

```ts
import { Schema, SchemaTransformation } from "effect"

const Config = Schema.String.pipe(
  Schema.decodeTo(
    Schema.Record(Schema.String, Schema.String),
    SchemaTransformation.splitKeyValue({ separator: ";", keyValueSeparator: ":" })
  )
)
// "host:localhost;port:3000" → { host: "localhost", port: "3000" }
```

**See**

- `trim`
- `snakeToCamel`

**Signature**

```ts
declare const splitKeyValue: (options?: {
  readonly separator?: string | undefined
  readonly keyValueSeparator?: string | undefined
}) => Transformation<Record<string, string>, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L657)

Since v4.0.0

## toLowerCase

Transforms strings by lowercasing on decode.
Encode is passthrough.

**When to use**

Use when you need a schema transformation to normalize strings to lowercase
(e.g. email addresses).

**Details**

Decoding applies `String.prototype.toLowerCase()`. Encoding is passthrough.
This is not round-trippable if the original had uppercase characters.

**Example** (Lowercasing on decode)

```ts
import { Schema, SchemaTransformation } from "effect"

const Lowered = Schema.String.pipe(Schema.decode(SchemaTransformation.toLowerCase()))
```

**See**

- `toUpperCase`
- `trim`

**Signature**

```ts
declare const toLowerCase: () => Transformation<string, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L503)

Since v4.0.0

## toUpperCase

Transforms strings by uppercasing on decode.
Encode is passthrough.

**When to use**

Use when you need a schema transformation to normalize strings to uppercase
(e.g. country codes).

**Details**

Decoding applies `String.prototype.toUpperCase()`. Encoding is passthrough.
This is not round-trippable if the original had lowercase characters.

**Example** (Uppercasing on decode)

```ts
import { Schema, SchemaTransformation } from "effect"

const Uppered = Schema.String.pipe(Schema.decode(SchemaTransformation.toUpperCase()))
```

**See**

- `toLowerCase`
- `trim`

**Signature**

```ts
declare const toUpperCase: () => Transformation<string, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L540)

Since v4.0.0

## trim

Transforms strings by trimming whitespace on decode.
Encode is passthrough (no change).

**When to use**

Use when you need a schema transformation to normalize user input by
stripping leading/trailing whitespace.

**Details**

Decoding applies `String.prototype.trim()`. Encoding is passthrough and
returns the string unchanged. This is not round-trippable if the original had
whitespace.

**Example** (Trimming on decode)

```ts
import { Schema, SchemaTransformation } from "effect"

const Trimmed = Schema.String.pipe(Schema.decode(SchemaTransformation.trim()))
```

**See**

- `toLowerCase`
- `toUpperCase`
- `snakeToCamel`

**Signature**

```ts
declare const trim: () => Transformation<string, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L428)

Since v4.0.0

## uncapitalize

Transforms strings by lowercasing the first character on
decode. Encode is passthrough.

**When to use**

Use when you need a schema transformation to normalize identifiers or field
names.

**Details**

Decoding lowercases the first character and leaves the rest unchanged.
Encoding is passthrough.

**Example** (Uncapitalizing on decode)

```ts
import { Schema, SchemaTransformation } from "effect"

const Uncapitalized = Schema.String.pipe(Schema.decode(SchemaTransformation.uncapitalize()))
```

**See**

- `capitalize`
- `toLowerCase`

**Signature**

```ts
declare const uncapitalize: () => Transformation<string, string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L614)

Since v4.0.0

# constructors

## make

Constructs a `Transformation` from an object with `decode` and `encode`
`Getter`s. If the input is already a `Transformation`, returns it as-is.

**When to use**

Use when you already have schema getter instances and want to pair them into
a schema transformation.

- You want idempotent wrapping (won't double-wrap).

**Details**

- Returns the input unchanged if it is already a `Transformation`.

**Example** (Wrapping existing getters)

```ts
import { SchemaGetter, SchemaTransformation } from "effect"

const t = SchemaTransformation.make({
  decode: SchemaGetter.transform<number, string>((s) => Number(s)),
  encode: SchemaGetter.transform<string, number>((n) => String(n))
})
```

**See**

- `transform` — simpler constructor from pure functions
- `transformOrFail` — constructor from effectful functions
- `Transformation`

**Signature**

```ts
declare const make: <T, E, RD = never, RE = never>(options: {
  readonly decode: SchemaGetter.Getter<T, E, RD>
  readonly encode: SchemaGetter.Getter<E, T, RE>
}) => Transformation<T, E, RD, RE>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L233)

Since v3.10.0

## passthrough

Transforms values by returning the input unchanged in both
directions.

**When to use**

Use when you need a schema transformation to connect two schemas that share
the same type with no actual conversion.

**Details**

- Both decode and encode are no-ops.
- Returns a shared singleton instance (no allocation per call).
- By default, `T` and `E` must be the same type. Pass `{ strict: false }`
  to bypass the type constraint.

**Example** (Chaining schemas with no conversion)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.Trim.pipe(Schema.decodeTo(Schema.FiniteFromString, SchemaTransformation.passthrough()))
```

**See**

- `passthroughSupertype`
- `passthroughSubtype`
- `transform`

**Signature**

```ts
declare const passthrough: {
  <T, E>(options: { readonly strict: false }): Transformation<T, E>
  <T>(): Transformation<T, T>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L707)

Since v4.0.0

## passthroughSubtype

Transforms values without changing them, typed so that `E extends T` — the encoded
type is a subtype of the decoded type.

**When to use**

Use when you need a no-op schema transformation whose encoded side is more
specific than its decoded side.

**Details**

- Both decode and encode are no-ops (same as `passthrough`).
- Returns a shared singleton instance.

**Example** (Passing through subtypes)

```ts
import { SchemaTransformation } from "effect"

const t = SchemaTransformation.passthroughSubtype<string, "a" | "b">()
```

**See**

- `passthrough`
- `passthroughSupertype`

**Signature**

```ts
declare const passthroughSubtype: <T, E extends T>() => Transformation<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L773)

Since v4.0.0

## passthroughSupertype

Transforms values without changing them, typed so that `T extends E`, where the decoded
type `T` is a subtype of the encoded type `E`.

**When to use**

Use when you need a no-op schema transformation whose decoded side is
narrower than the encoded side.

**Details**

Both decode and encode are no-ops and return a shared singleton
transformation.

**Example** (Passing through supertypes)

```ts
import { SchemaTransformation } from "effect"

const t = SchemaTransformation.passthroughSupertype<"a" | "b", string>()
```

**See**

- `passthrough`
- `passthroughSubtype`

**Signature**

```ts
declare const passthroughSupertype: <T extends E, E>() => Transformation<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L740)

Since v4.0.0

## transform

Creates a `Transformation` from pure (sync, infallible) decode and encode
functions.

**When to use**

Use when you need an infallible schema transformation that does not require
Effect services.

**Details**

- Each function receives the input and returns the output directly.
- Skips `None` inputs (missing keys) — functions are only called on present values.
- Does not allocate Effects internally; uses optimized sync path.

**Example** (Converting between cents and dollars)

```ts
import { Schema, SchemaTransformation } from "effect"

const CentsFromDollars = Schema.Number.pipe(
  Schema.decodeTo(
    Schema.Number,
    SchemaTransformation.transform({
      decode: (dollars) => dollars * 100,
      encode: (cents) => cents / 100
    })
  )
)
```

**See**

- `transformOrFail` — for fallible or effectful transformations
- `transformOptional` — for transformations that handle missing keys
- `passthrough` — when no conversion is needed

**Signature**

```ts
declare const transform: <T, E>(options: {
  readonly decode: (input: E) => T
  readonly encode: (input: T) => E
}) => Transformation<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L334)

Since v3.10.0

## transformOptional

Creates a `Transformation` where decode and encode operate on `Option`
values, giving full control over missing-key handling.

**When to use**

Use when you need a schema transformation to produce or consume `Option.None`
for absent keys.

- You are working with optional struct fields.

**Details**

- Each function receives `Option<input>` and returns `Option<output>`.
- `Option.None` input means the key is absent; returning `Option.None`
  omits the key from the output.
- Pure and synchronous.

**Example** (Converting an optional key to Option)

```ts
import { Option, Schema, SchemaTransformation } from "effect"

const schema = Schema.Struct({
  a: Schema.optionalKey(Schema.Number).pipe(
    Schema.decodeTo(
      Schema.Option(Schema.Number),
      SchemaTransformation.transformOptional({
        decode: Option.some,
        encode: Option.flatten
      })
    )
  )
})
```

**See**

- `transform` — when you don't need Option-level control
- `optionFromOptionalKey` — built-in for the common optional-key-to-Option pattern
- `optionFromOptional` — built-in for optional (undefined) to Option

**Signature**

```ts
declare const transformOptional: <T, E>(options: {
  readonly decode: (input: Option.Option<E>) => Option.Option<T>
  readonly encode: (input: Option.Option<T>) => Option.Option<E>
}) => Transformation<T, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L386)

Since v4.0.0

## transformOrFail

Creates a `Transformation` from effectful decode and encode functions that
can fail with `Issue`.

**When to use**

Use when you need a schema transformation that may fail or require Effect
services.

**Details**

- Each function receives the input value and `ParseOptions`.
- Must return an `Effect` that succeeds with the output or fails with `Issue`.
- Skips `None` inputs (missing keys) — functions are only called on present values.

**Example** (Parsing a date string that can fail)

```ts
import { Effect, Option, Schema, SchemaIssue, SchemaTransformation } from "effect"

const DateFromString = Schema.String.pipe(
  Schema.decodeTo(
    Schema.Date,
    SchemaTransformation.transformOrFail({
      decode: (s) => {
        const d = new Date(s)
        return isNaN(d.getTime())
          ? Effect.fail(new SchemaIssue.InvalidValue(Option.some(s), { message: "Invalid date" }))
          : Effect.succeed(d)
      },
      encode: (d) => Effect.succeed(d.toISOString())
    })
  )
)
```

**See**

- `transform` — for infallible, pure transformations
- `transformOptional` — for transformations that handle missing keys
- `make` — for transformations from existing Getters

**Signature**

```ts
declare const transformOrFail: <T, E, RD = never, RE = never>(options: {
  readonly decode: (e: E, options: SchemaAST.ParseOptions) => Effect.Effect<T, SchemaIssue.Issue, RD>
  readonly encode: (t: T, options: SchemaAST.ParseOptions) => Effect.Effect<E, SchemaIssue.Issue, RE>
}) => Transformation<T, E, RD, RE>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L286)

Since v3.10.0

# decoding

## fromFormData

Decodes a `FormData` instance into a nested record using bracket-path keys and
encodes object-like values back into `FormData`.

**When to use**

Use when you need a schema transformation for form or multipart payloads
whose keys, such as `user[name]` or `items[0]`, should become nested data.

**Details**

Decode preserves string and `Blob` leaves. Encode flattens nested objects and
arrays into bracket-path entries and returns an empty `FormData` for
non-object inputs.

**Example** (Decoding FormData)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.instanceOf(FormData).pipe(Schema.decodeTo(Schema.Unknown, SchemaTransformation.fromFormData))
```

**See**

- `fromURLSearchParams`
- `fromJsonString`

**Signature**

```ts
declare const fromFormData: Transformation<unknown, FormData, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1614)

Since v4.0.0

## fromJsonString

Decodes a JSON string with `JSON.parse` and encodes a value with
`JSON.stringify`.

**When to use**

Use when you need a schema transformation to decode JSON stored or
transmitted as a string, usually before composing with another schema that
validates the parsed structure.

**Details**

Decode fails with `InvalidValue` for invalid JSON, and encode can fail with
`InvalidValue` when `JSON.stringify` cannot serialize the value.

**Example** (Parsing JSON)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.String.pipe(Schema.decodeTo(Schema.Unknown, SchemaTransformation.fromJsonString))
```

**See**

- `uint8ArrayFromBase64String`
- `fromFormData`

**Signature**

```ts
declare const fromJsonString: Transformation<unknown, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1578)

Since v4.0.0

## fromURLSearchParams

Decodes `URLSearchParams` into a nested record using bracket-path keys and
encodes object-like values back into `URLSearchParams`.

**When to use**

Use when you need a schema transformation for query strings whose keys, such
as `filter[name]` or `items[0]`, should become nested data.

**Details**

Decode produces string leaves. Encode flattens nested objects and arrays into
bracket-path entries and returns empty `URLSearchParams` for non-object
inputs.

**Example** (Decoding URLSearchParams)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.instanceOf(URLSearchParams).pipe(
  Schema.decodeTo(Schema.Unknown, SchemaTransformation.fromURLSearchParams)
)
```

**See**

- `fromFormData`
- `fromJsonString`

**Signature**

```ts
declare const fromURLSearchParams: Transformation<unknown, URLSearchParams, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1650)

Since v4.0.0

# encoding

## stringFromBase64String

Decodes a Base64-encoded `string` into a UTF-8 `string` and encodes a
UTF-8 `string` back to a Base64 string.

**When to use**

Use when you need a schema transformation for text data transmitted as Base64
strings.

**Details**

Decoding parses the Base64 string into a UTF-8 string. Encoding writes the
string as a Base64 string.

**Example** (Converting Base64 to a string)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.String.pipe(Schema.decodeTo(Schema.String, SchemaTransformation.stringFromBase64String))
```

**See**

- `uint8ArrayFromBase64String`
- `Schema.StringFromBase64` - a ready-made schema wrapping this transformation.

**Signature**

```ts
declare const stringFromBase64String: Transformation<string, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1438)

Since v4.0.0

## stringFromBase64UrlString

Decodes a base64 (URL) encoded `string` into a UTF-8 `string` and encodes it back.

**When to use**

Use when you need a schema transformation for text data transmitted as Base64
URL-safe strings.

**Details**

Decoding parses the Base64 URL string into a UTF-8 string. Encoding writes
the string as a Base64 URL string.

**Example** (Converting Base64Url to a string)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.String.pipe(Schema.decodeTo(Schema.String, SchemaTransformation.stringFromBase64UrlString))
```

**See**

- `stringFromBase64String`
- `Schema.StringFromBase64Url` - a ready-made schema wrapping this transformation.

**Signature**

```ts
declare const stringFromBase64UrlString: Transformation<string, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1472)

Since v4.0.0

## stringFromHexString

Decodes a hex encoded `string` into a UTF-8 `string` and encodes it back.

**When to use**

Use when you need a schema transformation for text data transmitted as
hexadecimal strings.

**Details**

Decoding parses the hex string into a UTF-8 string. Encoding writes the
string as a hex string.

**Example** (Converting hex to a string)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.String.pipe(Schema.decodeTo(Schema.String, SchemaTransformation.stringFromHexString))
```

**See**

- `stringFromBase64String`
- `Schema.StringFromHex` - a ready-made schema wrapping this transformation.

**Signature**

```ts
declare const stringFromHexString: Transformation<string, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1506)

Since v4.0.0

## stringFromUriComponent

Decodes a URI component encoded string into a UTF-8 string and encodes a
UTF-8 string into a URI component encoded string.

**When to use**

Use when you need a schema transformation to store structured data in URL
query parameters or fragments, such as composing with `Schema.parseJson` to
round-trip JSON through a URL.

**Details**

Decoding calls `decodeURIComponent` and fails if the input contains malformed
percent-encoding sequences. Encoding calls `encodeURIComponent`.

**Example** (Defining a URI component schema)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.String.pipe(Schema.decodeTo(Schema.String, SchemaTransformation.stringFromUriComponent))
```

**See**

- `stringFromBase64String`
- `Schema.StringFromUriComponent` - a ready-made schema wrapping this transformation.

**Signature**

```ts
declare const stringFromUriComponent: Transformation<string, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1542)

Since v4.0.0

## uint8ArrayFromBase64String

Decodes a Base64-encoded `string` into a `Uint8Array` and encodes a
`Uint8Array` back to a Base64 string.

**When to use**

Use when you need a schema transformation for binary data transmitted as
Base64 strings (e.g. file uploads, API payloads).

**Details**

Decoding parses the Base64 string into bytes. Encoding writes the byte array
as a Base64 string.

**Example** (Converting Base64 to a Uint8Array)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.String.pipe(Schema.decodeTo(Schema.Uint8Array, SchemaTransformation.uint8ArrayFromBase64String))
```

**See**

- `fromJsonString`
- `Schema.Uint8ArrayFromBase64` - a ready-made schema wrapping this transformation.

**Signature**

```ts
declare const uint8ArrayFromBase64String: Transformation<Uint8Array<ArrayBufferLike>, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1403)

Since v4.0.0

# guards

## isTransformation

Returns `true` if `u` is a `Transformation` instance.

**When to use**

Use to check whether a value is already a schema transformation before
wrapping it.

**Details**

- Pure predicate, no side effects.
- Acts as a TypeScript type guard.

**Example** (Checking a value)

```ts
import { SchemaTransformation } from "effect"

SchemaTransformation.isTransformation(SchemaTransformation.trim())
// true

SchemaTransformation.isTransformation({ decode: null, encode: null })
// false
```

**See**

- `Transformation`
- `make`

**Signature**

```ts
declare const isTransformation: (u: unknown) => u is Transformation<any, any, unknown, unknown>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L197)

Since v4.0.0

# models

## Middleware (class)

Middleware that wraps the entire parsing `Effect` pipeline for both
decode and encode directions.

**When to use**

Use when you need a schema middleware to catch or recover from parsing
errors (e.g. `Schema.catchDecoding`), run side effects around the parsing
pipeline, or access the full `Effect` rather than a single decoded value.

**Details**

Unlike `Transformation`, which operates on individual values via `Getter`,
`Middleware` receives the full `Effect` produced by the inner schema and can
intercept, modify, retry, or replace it.

- `decode` receives an `Effect<Option<E>, Issue, RDE>` and returns
  `Effect<Option<T>, Issue, RDT>`.
- `encode` receives an `Effect<Option<T>, Issue, RET>` and returns
  `Effect<Option<E>, Issue, REE>`.
- `flip()` swaps the decode and encode functions, producing a
  `Middleware<E, T, ...>`.

Typically constructed indirectly via `Schema.middlewareDecoding` or
`Schema.middlewareEncoding` rather than instantiating this class directly.

**Example** (Creating a middleware that falls back on decode failure)

```ts
import { Effect, Option, SchemaTransformation } from "effect"

const fallback = new SchemaTransformation.Middleware(
  (effect) => Effect.catch(effect, () => Effect.succeed(Option.some("fallback"))),
  (effect) => effect
)
```

**See**

- `Transformation` — value-level bidirectional transformation

**Signature**

```ts
declare class Middleware<T, E, RDE, RDT, RET, REE> {
  constructor(
    decode: (
      effect: Effect.Effect<Option.Option<E>, SchemaIssue.Issue, RDE>,
      options: SchemaAST.ParseOptions
    ) => Effect.Effect<Option.Option<T>, SchemaIssue.Issue, RDT>,
    encode: (
      effect: Effect.Effect<Option.Option<T>, SchemaIssue.Issue, RET>,
      options: SchemaAST.ParseOptions
    ) => Effect.Effect<Option.Option<E>, SchemaIssue.Issue, REE>
  )
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L69)

Since v4.0.0

### flip (method)

**Signature**

```ts
declare const flip: () => Middleware<E, T, RET, REE, RDE, RDT>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L93)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Middleware"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L70)

### decode (property)

**Signature**

```ts
readonly decode: (effect: Effect.Effect<Option.Option<E>, SchemaIssue.Issue, RDE>, options: SchemaAST.ParseOptions) => Effect.Effect<Option.Option<T>, SchemaIssue.Issue, RDT>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L71)

### encode (property)

**Signature**

```ts
readonly encode: (effect: Effect.Effect<Option.Option<T>, SchemaIssue.Issue, RET>, options: SchemaAST.ParseOptions) => Effect.Effect<Option.Option<E>, SchemaIssue.Issue, REE>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L75)

## Transformation (class)

Represents a bidirectional transformation between a decoded type `T` and an encoded
type `E`, built from a pair of `Getter`s.

**When to use**

Use when you need a schema transformation that defines how a schema converts
between two representations.

- You want to compose multiple transformations into a pipeline.
- You want to flip a transformation to swap decode/encode.

**Details**

This is the primary building block for `Schema.decodeTo`, `Schema.encodeTo`,
`Schema.decode`, `Schema.encode`, and `Schema.link`. Each direction is a
`SchemaGetter.Getter` that handles optionality, failure, and Effect services.

- Immutable — `flip()` and `compose()` return new instances.
- `flip()` swaps the decode and encode getters.
- `compose(other)` chains: `this.decode` then `other.decode` for decoding,
  `other.encode` then `this.encode` for encoding.

**Example** (Composing two transformations)

```ts
import { SchemaTransformation } from "effect"

const trimAndLower = SchemaTransformation.trim().compose(SchemaTransformation.toLowerCase())
// decode: trim then lowercase
// encode: passthrough (both directions)
```

**See**

- `make` — construct from `{ decode, encode }` getters
- `transform` — construct from pure functions
- `transformOrFail` — construct from effectful functions
- `Middleware` — effect-pipeline-level alternative

**Signature**

```ts
declare class Transformation<T, E, RD, RE> {
  constructor(decode: SchemaGetter.Getter<T, E, RD>, encode: SchemaGetter.Getter<E, T, RE>)
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L142)

Since v4.0.0

### flip (method)

**Signature**

```ts
declare const flip: () => Transformation<E, T, RE, RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L155)

### compose (method)

**Signature**

```ts
declare const compose: <T2, RD2, RE2>(
  other: Transformation<T2, T, RD2, RE2>
) => Transformation<T2, E, RD | RD2, RE | RE2>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L158)

### [TypeId] (property)

**Signature**

```ts
readonly [TypeId]: "~effect/SchemaTransformation/Transformation"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L143)

### \_tag (property)

**Signature**

```ts
readonly _tag: "Transformation"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L144)

### decode (property)

**Signature**

```ts
readonly decode: SchemaGetter.Getter<T, E, RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L145)

### encode (property)

**Signature**

```ts
readonly encode: SchemaGetter.Getter<E, T, RE>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L146)

# transforming

## bigDecimalFromString

Decodes a `string` into a `BigDecimal` and encodes a `BigDecimal` back to
its string representation.

**When to use**

Use when you need a schema transformation to parse decimal number strings
from APIs or user input.

**Details**

Decoding calls `BigDecimal.fromString(s)` and fails with `InvalidValue` if
the string is not a valid `BigDecimal` representation. Encoding returns
`BigDecimal.format(bd)`.

**Signature**

```ts
declare const bigDecimalFromString: Transformation<BigDecimal.BigDecimal, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1360)

Since v4.0.0

## dateTimeUtcFromString

Decodes a date-time string into a `DateTime.Utc` and encodes it back to an ISO
string.

**When to use**

Use when you need a schema transformation to decode date-time strings to a
normalized `DateTime.Utc` and encode back as a UTC ISO string.

**Details**

Decode accepts strings supported by `DateTime.make`, converts the result to
UTC, and fails with `InvalidValue` when parsing fails. Encode uses
`DateTime.formatIso`.

**See**

- `dateTimeZonedFromString` for ISO strings that should preserve zoned date-time information
- `dateFromString` for decoding into JavaScript `Date`

**Signature**

```ts
declare const dateTimeUtcFromString: Transformation<DateTime.Utc, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1771)

Since v4.0.0

## dateTimeZonedFromString

Decodes a zoned date-time string into a `DateTime.Zoned` and encodes it back
to an ISO zoned string.

**When to use**

Use when you need a schema transformation for ISO zoned date-time strings
that decode to `DateTime.Zoned` and encode with `DateTime.formatIsoZoned`.

**Details**

Decode uses `DateTime.makeZonedFromString` and fails with `InvalidValue` when
the input is not a valid zoned date-time. Encode uses
`DateTime.formatIsoZoned`.

**See**

- `dateTimeUtcFromString` for date-time strings that should decode to `DateTime.Utc` and encode as UTC ISO strings

**Signature**

```ts
declare const dateTimeZonedFromString: Transformation<DateTime.Zoned, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1805)

Since v4.0.0

## durationFromMillis

Decodes a `number` of milliseconds into a `Duration` and encodes a `Duration`
back to milliseconds.

**When to use**

Use when you need a schema transformation to decode timeouts, delays, elapsed
intervals, or other duration values stored as millisecond counts.

**Details**

Decode creates a duration from the number, and encode returns the duration
length in milliseconds.

**Example** (Converting milliseconds to a Duration)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.Number.pipe(Schema.decodeTo(Schema.Duration, SchemaTransformation.durationFromMillis))
```

**See**

- `durationFromNanos`

**Signature**

```ts
declare const durationFromMillis: Transformation<Duration.Duration, number, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1001)

Since v4.0.0

## durationFromNanos

Decodes a `bigint` (nanoseconds) into a `Duration` and encodes a
`Duration` back to `bigint` nanoseconds.

**When to use**

Use when you need a schema transformation for nanosecond-precision timestamps
or intervals.

**Details**

Decoding always succeeds and creates a `Duration` from nanoseconds. Encoding
fails with `InvalidValue` if the `Duration` cannot be represented as a
`bigint`, such as `Duration.infinity`.

**Example** (Converting nanoseconds to a Duration)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.BigInt.pipe(Schema.decodeTo(Schema.Duration, SchemaTransformation.durationFromNanos))
```

**See**

- `durationFromMillis`

**Signature**

```ts
declare const durationFromNanos: Transformation<Duration.Duration, bigint, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L960)

Since v4.0.0

## durationFromString

Decodes a `string` into a `Duration` and encodes a `Duration` back to a
parseable `string`.

**When to use**

Use when you need a schema transformation to parse human-readable duration
strings from APIs, config, or user input.

**Details**

Decoding accepts any string that `Duration.fromInput` can parse, including
`"Infinity"` and `"-Infinity"`. Encoding returns `String(duration)`,
producing strings such as `"2000 millis"` or `"10 nanos"` that round-trip
through the parser.

**Example** (Converting a string to a Duration)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.String.pipe(Schema.decodeTo(Schema.Duration, SchemaTransformation.durationFromString))
```

**See**

- `durationFromNanos`
- `durationFromMillis`

**Signature**

```ts
declare const durationFromString: Transformation<Duration.Duration, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L917)

Since v4.0.0

## optionFromNullOr

Decodes `T | null` into `Option<T>` and encodes `Option<T>` back to
`T | null`.

**When to use**

Use when you need a schema transformation to convert nullable API fields to
`Option`.

**Details**

Decoding maps `null` to `Option.none()` and non-null values to
`Option.some(value)`. Encoding maps `Option.none()` to `null` and
`Option.some(value)` to `value`. The transformation is pure and synchronous.

**Example** (Converting nullable values to an Option)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.NullOr(Schema.String).pipe(
  Schema.decodeTo(Schema.Option(Schema.String), SchemaTransformation.optionFromNullOr())
)
```

**See**

- `optionFromNullishOr`

**Signature**

```ts
declare const optionFromNullOr: <T>() => Transformation<Option.Option<T>, T | null>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1119)

Since v4.0.0

## optionFromNullishOr

Decodes `T | null | undefined` into `Option<T>` and encodes `Option<T>`
back to `T | null` or `T | undefined` depending on the provided
`options.onNoneEncoding` (defaults to `undefined`).

**When to use**

Use when you need a schema transformation to convert nullish API fields to
`Option` when both `null` and `undefined` represent absence.

**Details**

Decoding maps `null` and `undefined` to `Option.none()` and all other values
to `Option.some(value)`. Encoding maps `Option.none()` to `null` or
`undefined` according to `options.onNoneEncoding`, and maps
`Option.some(value)` to `value`. The transformation is pure and synchronous.

**Example** (Converting nullish values to an Option and encoding None as null)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.NullishOr(Schema.String).pipe(
  Schema.decodeTo(Schema.Option(Schema.String), SchemaTransformation.optionFromNullishOr({ onNoneEncoding: null }))
)
```

**See**

- `optionFromNullOr`
- `optionFromUndefinedOr`

**Signature**

```ts
declare const optionFromNullishOr: <T>(options?: {
  onNoneEncoding: null | undefined
}) => Transformation<Option.Option<T>, T | null | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1203)

Since v4.0.0

## optionFromOptional

Decodes optional values into `Option<T>` and encodes `Option.none()` back to
an omitted optional value.

**When to use**

Use when you need a schema transformation to convert optional (possibly
`undefined`) values to `Option`.

**Details**

Decoding maps an absent or `undefined` value to `Some(None)` and a present
value to `Some(Some(v))`. Encoding maps `Some(None)` to `None` to omit the
value, and maps `Some(Some(v))` to `Some(v)`. This uses
`transformOptional` under the hood and filters out `undefined` on decode.

**Example** (Converting an optional value to an Option)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.Struct({
  age: Schema.optional(Schema.Number).pipe(
    Schema.decodeTo(Schema.Option(Schema.Number), SchemaTransformation.optionFromOptional())
  )
})
```

**See**

- `optionFromOptionalKey`
- `optionFromUndefinedOr`
- `transformOptional`

**Signature**

```ts
declare const optionFromOptional: <T>() => Transformation<Option.Option<T>, T | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1297)

Since v4.0.0

## optionFromOptionalKey

Decodes an optional struct key into `Option<T>` and encodes `Option<T>`
back to an optional key.

**When to use**

Use when you need a schema transformation to convert optional struct keys
(declared with `Schema.optionalKey`) to `Option` values.

**Details**

Decoding maps an absent key (`None`) to `Some(None)` and a present key
(`Some(v)`) to `Some(Some(v))`. Encoding maps `Some(None)` to `None` to omit
the key, and maps `Some(Some(v))` to `Some(v)`. This uses
`transformOptional` under the hood.

**Example** (Converting an optional key to an Option)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.Struct({
  name: Schema.optionalKey(Schema.String).pipe(
    Schema.decodeTo(Schema.Option(Schema.String), SchemaTransformation.optionFromOptionalKey())
  )
})
```

**See**

- `optionFromOptional`
- `optionFromUndefinedOr`
- `transformOptional`

**Signature**

```ts
declare const optionFromOptionalKey: <T>() => Transformation<Option.Option<T>, T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1252)

Since v4.0.0

## optionFromUndefinedOr

Decodes `T | undefined` into `Option<T>` and encodes `Option.none()` back to
`undefined`.

**When to use**

Use when you need a schema transformation to convert API fields that use
`undefined` for absence to `Option`.

**Details**

Decoding maps `undefined` to `Option.none()` and non-undefined values to
`Option.some(value)`. Encoding maps `Option.none()` to `undefined` and
`Option.some(value)` to `value`. The transformation is pure and synchronous.

**Example** (Converting undefined-or values to an Option)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.UndefinedOr(Schema.String).pipe(
  Schema.decodeTo(Schema.Option(Schema.String), SchemaTransformation.optionFromUndefinedOr())
)
```

**See**

- `optionFromOptionalKey`
- `optionFromOptional`

**Signature**

```ts
declare const optionFromUndefinedOr: <T>() => Transformation<Option.Option<T>, T | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1160)

Since v4.0.0

## timeZoneFromString

Decodes a string into a `DateTime.TimeZone` and encodes a time zone back to
its string representation.

**When to use**

Use when you need a schema transformation to accept either an IANA time-zone
identifier or an offset string and produce a general `DateTime.TimeZone`.

**Details**

Accepted decode inputs include valid IANA identifiers and offset strings such
as `"+03:00"`. Decode fails with `InvalidValue` when the string cannot be
parsed as a time zone.

**See**

- `timeZoneNamedFromString` for IANA named-zone strings only
- `timeZoneOffsetFromNumber` for fixed-offset zones encoded as numbers

**Signature**

```ts
declare const timeZoneFromString: Transformation<DateTime.TimeZone, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1737)

Since v4.0.0

## timeZoneNamedFromString

Decodes an IANA time-zone identifier string into a
`DateTime.TimeZone.Named` and encodes a named time zone back to its `id`.

**When to use**

Use when you need a schema transformation to accept only IANA time-zone
identifier strings and produce `DateTime.TimeZone.Named` values.

**Details**

Decode fails with `InvalidValue` when the string is not a valid IANA time-zone
identifier.

**See**

- `timeZoneFromString` for time-zone strings that may be either IANA identifiers or offset strings

**Signature**

```ts
declare const timeZoneNamedFromString: Transformation<DateTime.TimeZone.Named, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1702)

Since v4.0.0

## timeZoneOffsetFromNumber

Decodes a numeric time-zone offset in milliseconds into a
`DateTime.TimeZone.Offset` and encodes it back to the offset number.

**When to use**

Use when you need a schema transformation to represent fixed-offset time
zones with numeric millisecond offsets.

**Details**

Decode uses `DateTime.zoneMakeOffset`; encode returns the offset's `offset`
field.

**See**

- `timeZoneFromString` for IANA or offset string encodings
- `timeZoneNamedFromString` for IANA named-zone strings

**Signature**

```ts
declare const timeZoneOffsetFromNumber: Transformation<DateTime.TimeZone.Offset, number, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1675)

Since v4.0.0

## urlFromString

Decodes a `string` into a `URL` and encodes a `URL` back to its `href`
string.

**When to use**

Use when you need a schema transformation to parse URL strings from user
input or API responses.

**Details**

Decoding checks `URL.canParse(s)` and fails with `InvalidValue` if the string
is not a valid URL. Encoding returns `url.href`.

**Example** (Converting a string to a URL)

```ts
import { Schema, SchemaTransformation } from "effect"

const schema = Schema.String.pipe(Schema.decodeTo(Schema.URL, SchemaTransformation.urlFromString))
```

**See**

- `numberFromString`
- `transformOrFail`

**Signature**

```ts
declare const urlFromString: Transformation<URL, string, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaTransformation.ts#L1334)

Since v4.0.0
