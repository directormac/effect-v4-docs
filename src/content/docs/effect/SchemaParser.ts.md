---
title: SchemaParser.ts
nav_order: 102
parent: "effect"
---

## SchemaParser.ts overview

Runs schemas against real values.

Schema parsers construct values from schema input, check whether a value
matches a schema, decode encoded input, and encode decoded values back to
their external form. This module exposes those operations through several
result styles, including `Effect`, `Promise`, `Exit`, `Option`, `Result`, and
synchronous functions that throw. It also contains the lower-level runner that
walks a schema AST and reports schema failures as `SchemaIssue.Issue` values.

Since v4.0.0

---

## Exports Grouped by Category

- [Asserting](#asserting)
  - [asserts](#asserts)
  - [is](#is)
- [constructors](#constructors)
  - [make](#make)
  - [makeEffect](#makeeffect)
  - [makeOption](#makeoption)
- [decoding](#decoding)
  - [decodeEffect](#decodeeffect)
  - [decodeExit](#decodeexit)
  - [decodePromise](#decodepromise)
  - [decodeResult](#decoderesult)
  - [decodeSync](#decodesync)
  - [decodeUnknownEffect](#decodeunknowneffect)
  - [decodeUnknownExit](#decodeunknownexit)
  - [decodeUnknownPromise](#decodeunknownpromise)
  - [decodeUnknownResult](#decodeunknownresult)
  - [decodeUnknownSync](#decodeunknownsync)
- [encoding](#encoding)
  - [encodeEffect](#encodeeffect)
  - [encodeExit](#encodeexit)
  - [encodePromise](#encodepromise)
  - [encodeResult](#encoderesult)
  - [encodeSync](#encodesync)
  - [encodeUnknownEffect](#encodeunknowneffect)
  - [encodeUnknownExit](#encodeunknownexit)
  - [encodeUnknownPromise](#encodeunknownpromise)
  - [encodeUnknownResult](#encodeunknownresult)
  - [encodeUnknownSync](#encodeunknownsync)

---

# Asserting

## asserts

Asserts that an input satisfies the schema's decoded type side.

**When to use**

Use to assert that an input satisfies the decoded side of a schema when schema
validation failures should throw an `Error` whose cause is `SchemaIssue.Issue`.

**Details**

The assertion returns normally when validation succeeds. When the input does
not satisfy the schema with a schema-only failure, it throws an `Error` with
the `SchemaIssue.Issue` in its `cause`.

**Gotchas**

Causes that contain defects, interruptions, or asynchronous work at this
synchronous boundary throw an `Error` whose cause is the underlying `Cause`,
instead of being converted to a schema validation error.

**Signature**

```ts
declare const asserts: <S extends Schema.Constraint, I>(schema: S, input: I) => asserts input is I & S["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L225)

Since v4.0.0

## is

Creates a type guard that checks whether an input satisfies the schema's decoded
type side.

**When to use**

Use to build a type guard for checking the decoded side of a schema without
exposing issue details.

**Details**

The guard returns `true` on successful validation and `false` when validation
fails only with schema issues, without exposing issue details.

**Gotchas**

Only causes made entirely of schema issues are converted to `false`. Causes
that contain defects, interruptions, or asynchronous work at this synchronous
boundary throw an `Error` whose cause is the underlying `Cause`.

**Signature**

```ts
declare const is: <T>(schema: Schema.Schema<T>) => <I>(input: I) => input is I & T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L173)

Since v3.10.0

# constructors

## make

Creates a synchronous maker for the schema's decoded type side.

**When to use**

Use to construct decoded schema values synchronously when invalid input
should throw an `Error` whose cause is `SchemaIssue.Issue`.

**Details**

The returned function constructs a value from constructor input and throws an
`Error` with the `SchemaIssue.Issue` in its `cause` when construction fails.

**Gotchas**

Causes that contain defects, interruptions, or asynchronous work at this
synchronous boundary throw an `Error` whose cause is the underlying `Cause`,
instead of being converted to a schema validation error.

**Signature**

```ts
declare const make: <S extends Schema.Constraint>(
  schema: S
) => (input: S["~type.make.in"], options?: Schema.MakeOptions) => S["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L135)

Since v4.0.0

## makeEffect

Creates an effectful maker for the schema's decoded type side.

**When to use**

Use to construct decoded schema values in `Effect` while preserving
construction failures as `SchemaIssue.Issue` values in the error channel.

**Details**

The returned function accepts constructor input, applies constructor defaults,
runs type-side validation unless checks are disabled, and fails with a
`SchemaIssue.Issue` when construction fails.

**Signature**

```ts
declare const makeEffect: <S extends Schema.Constraint>(
  schema: S
) => (input: S["~type.make.in"], options?: Schema.MakeOptions) => Effect.Effect<S["Type"], SchemaIssue.Issue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L70)

Since v4.0.0

## makeOption

Creates a synchronous maker that returns `Option.some` with the constructed
value on success, or `Option.none` when construction fails with schema issues.

**When to use**

Use when you need to validate schema constructor input and only care whether
construction succeeds, without exposing `SchemaIssue.Issue` details.

**Gotchas**

Only causes made entirely of schema issues are converted to `Option.none`.
Causes that contain defects, interruptions, or asynchronous work at this
synchronous boundary throw an `Error` whose cause is the underlying `Cause`.

**Signature**

```ts
declare const makeOption: <S extends Schema.Constraint>(
  schema: S
) => (input: S["~type.make.in"], options?: Schema.MakeOptions) => Option.Option<S["Type"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L101)

Since v4.0.0

# decoding

## decodeEffect

Creates an effectful decoder for input already typed as the schema's `Encoded`
type.

**When to use**

Use when you already have input typed as the schema's `Encoded` type and
need an `Effect` whose failure channel is `SchemaIssue.Issue`, while
preserving decoding service requirements.

**Details**

The returned function succeeds with the decoded `Type` or fails with a
`SchemaIssue.Issue`, preserving any decoding service requirements in the
returned `Effect`.

**See**

- `decodeUnknownEffect` for untyped boundary input
- `encodeEffect` for the opposite direction

**Signature**

```ts
declare const decodeEffect: <S extends Schema.Constraint>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (
  input: S["Encoded"],
  options?: SchemaAST.ParseOptions
) => Effect.Effect<S["Type"], SchemaIssue.Issue, S["DecodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L293)

Since v4.0.0

## decodeExit

Creates a synchronous decoder for input already typed as the schema's `Encoded`
type, reporting failure safely as an `Exit`.

**When to use**

Use when you need synchronous decoding of already typed `Encoded` input into
an `Exit` whose failure contains `SchemaIssue.Issue`.

**Details**

The returned function produces `Exit.Success` with the decoded `Type` or
`Exit.Failure` with a `SchemaIssue.Issue`.

**Gotchas**

Because this adapter runs synchronously, async decoding work can produce an
`Exit.Failure` with a defect cause. When the cause contains both schema
issues and non-schema reasons, all reasons remain in the returned `Cause`.

**See**

- `decodeUnknownExit` for untyped input with the same `Exit` result shape
- `decodeEffect` for preserving decoding services and failures in `Effect`

**Signature**

```ts
declare const decodeExit: <S extends Schema.ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Encoded"], options?: SchemaAST.ParseOptions) => Exit.Exit<S["Type"], SchemaIssue.Issue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L426)

Since v4.0.0

## decodePromise

Creates a Promise-based decoder for input already typed as the schema's
`Encoded` type.

**When to use**

Use when you already have input typed as the schema's `Encoded` type and need
decoding to return a JavaScript `Promise`.

**Details**

The returned function resolves with the decoded `Type` on success and rejects
with an `Error` whose cause is a `SchemaIssue.Issue` on decoding failure.

**Gotchas**

Causes that contain defects, interruptions, or other non-schema reasons reject
with an `Error` whose cause is the underlying `Cause`.

**See**

- `decodeUnknownPromise` for untyped input returning a JavaScript `Promise`
- `decodeEffect` for preserving decoding services and failures in `Effect`

**Signature**

```ts
declare const decodePromise: <S extends Schema.ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Encoded"], options?: SchemaAST.ParseOptions) => Promise<S["Type"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L357)

Since v3.10.0

## decodeResult

Creates a decoder for input already typed as the schema's `Encoded` type,
reporting failure safely as a `Result`.

**When to use**

Use when you already have input typed as the schema's `Encoded` type and want
schema decoding failures represented as `Result.fail` with `SchemaIssue.Issue`.

**Details**

The returned function produces `Result.succeed` with the decoded `Type` on
success or `Result.fail` with a `SchemaIssue.Issue` on decoding failure.

**Gotchas**

This synchronous adapter returns `Result.fail` for causes made entirely of
schema issues, but causes that contain defects, interruptions, or other
non-schema reasons throw instead.

**See**

- `decodeUnknownResult` for untyped input with the same `Result` shape
- `decodeEffect` for effectful or service-requiring decoding

**Signature**

```ts
declare const decodeResult: <S extends Schema.ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Encoded"], options?: SchemaAST.ParseOptions) => Result.Result<S["Type"], SchemaIssue.Issue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L505)

Since v4.0.0

## decodeSync

Creates a synchronous decoder for input already typed as the schema's `Encoded`
type.

**When to use**

Use to decode values already typed as the schema's `Encoded` input when
decoding failure should throw an `Error` whose cause is `SchemaIssue.Issue`.

**Details**

The returned function returns the decoded `Type` on success and throws an
`Error` with the `SchemaIssue.Issue` in its `cause` on decoding failure.

**Gotchas**

Causes that contain defects, interruptions, or asynchronous work at this
synchronous boundary throw an `Error` whose cause is the underlying `Cause`,
instead of being converted to a schema validation error.

**See**

- `decodeUnknownSync` for untrusted or dynamically typed input
- `decodeResult` for returning schema issues as data
- `decodeEffect` for preserving decoding failures in `Effect`

**Signature**

```ts
declare const decodeSync: <S extends Schema.ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Encoded"], options?: SchemaAST.ParseOptions) => S["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L571)

Since v3.10.0

## decodeUnknownEffect

Creates an effectful decoder for `unknown` input.

**When to use**

Use when you need to decode untyped boundary input in an `Effect` whose
failure channel is `SchemaIssue.Issue`, while preserving transformations
and service requirements.

**Details**

The returned function succeeds with the schema's decoded `Type` or fails with a
`SchemaIssue.Issue`. Decoding service requirements are preserved in the returned
`Effect`. Parse options may be provided when creating the decoder and overridden
when applying it.

**See**

- `decodeEffect` for input already typed as the schema's `Encoded` type

**Signature**

```ts
declare const decodeUnknownEffect: <S extends Schema.Constraint>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (
  input: unknown,
  options?: SchemaAST.ParseOptions
) => Effect.Effect<S["Type"], SchemaIssue.Issue, S["DecodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L258)

Since v4.0.0

## decodeUnknownExit

Creates a synchronous decoder for `unknown` input that reports failure safely
as an `Exit`.

**When to use**

Use when you need to decode unknown input synchronously into an `Exit` whose
failure contains `SchemaIssue.Issue`.

**Details**

The returned function produces `Exit.Success` with the decoded `Type`.
Schema issues are represented by an `Exit.Failure` cause containing a
`SchemaIssue.Issue`.

**Gotchas**

Because this adapter runs synchronously, async decoding work can produce an
`Exit.Failure` with a defect cause. When the cause contains both schema
issues and non-schema reasons, all reasons remain in the returned `Cause`.

**See**

- `decodeExit` for input already typed as the schema's `Encoded` type
- `decodeUnknownEffect` for preserving decoding services and failures in `Effect`
- `decodeUnknownResult` for returning schema issues as data
- `decodeUnknownSync` for throwing on decoding failure

**Signature**

```ts
declare const decodeUnknownExit: <S extends Schema.ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Exit.Exit<S["Type"], SchemaIssue.Issue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L393)

Since v4.0.0

## decodeUnknownPromise

Creates a Promise-based decoder for `unknown` input.

**When to use**

Use when you need to decode untyped input with a service-free schema and
return a JavaScript `Promise`.

**Details**

The returned function resolves with the decoded `Type` on success and rejects
with an `Error` whose cause is a `SchemaIssue.Issue` on decoding failure.

**Gotchas**

Causes that contain defects, interruptions, or other non-schema reasons reject
with an `Error` whose cause is the underlying `Cause`.

**See**

- `decodePromise` for input already typed as the schema's `Encoded` type
- `decodeUnknownEffect` for schemas that require decoding services or when failures should remain in `Effect`

**Signature**

```ts
declare const decodeUnknownPromise: <S extends Schema.ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Promise<S["Type"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L325)

Since v3.10.0

## decodeUnknownResult

Creates a decoder for `unknown` input that reports failure safely as a
`Result`.

**When to use**

Use when decoding untyped boundary input and you want `SchemaIssue.Issue`
failures returned as data in a `Result`.

**Details**

The returned function produces `Result.succeed` with the decoded `Type` on
success or `Result.fail` with a `SchemaIssue.Issue` on decoding failure.

**Gotchas**

This adapter runs synchronously. Causes made entirely of schema issues become
`Result.fail`, but causes that contain defects, interruptions, or asynchronous
work at this synchronous boundary throw instead.

**See**

- `decodeResult` for input already typed as the schema's `Encoded` type
- `decodeUnknownEffect` for effectful or service-requiring decoding

**Signature**

```ts
declare const decodeUnknownResult: <S extends Schema.ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Result.Result<S["Type"], SchemaIssue.Issue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L472)

Since v4.0.0

## decodeUnknownSync

Creates a synchronous decoder for `unknown` input.

**When to use**

Use to decode untrusted or dynamically typed input at a synchronous boundary
where invalid data should throw an `Error` whose cause is `SchemaIssue.Issue`.

**Details**

The returned function returns the decoded `Type` on success and throws an
`Error` with the `SchemaIssue.Issue` in its `cause` on decoding failure.

**Gotchas**

Causes that contain defects, interruptions, or asynchronous work at this
synchronous boundary throw an `Error` whose cause is the underlying `Cause`,
instead of being converted to a schema validation error.

**See**

- `decodeSync` for input already typed as the schema's `Encoded` type
- `decodeUnknownEffect` for preserving decoding failures in `Effect`
- `decodeUnknownResult` for returning schema issues as data

**Signature**

```ts
declare const decodeUnknownSync: <S extends Schema.ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => S["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L537)

Since v3.10.0

# encoding

## encodeEffect

Creates an effectful encoder for input already typed as the schema's decoded
`Type`.

**When to use**

Use when you need to encode values already typed as the schema's decoded
`Type` in an `Effect` whose failure channel is `SchemaIssue.Issue`, while
preserving service requirements.

**Details**

The returned function succeeds with the schema's `Encoded` value or fails with a
`SchemaIssue.Issue`, preserving any encoding service requirements in the
returned `Effect`.

**See**

- `encodeUnknownEffect` for encoding unknown input before the value is statically typed as the schema's `Type`

**Signature**

```ts
declare const encodeEffect: <S extends Schema.Constraint>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (
  input: S["Type"],
  options?: SchemaAST.ParseOptions
) => Effect.Effect<S["Encoded"], SchemaIssue.Issue, S["EncodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L631)

Since v4.0.0

## encodeExit

Creates a synchronous encoder for input already typed as the schema's decoded
`Type`, reporting failure safely as an `Exit`.

**When to use**

Use when you need synchronous encoding of already typed schema values into
an `Exit` whose failure contains `SchemaIssue.Issue`.

**Details**

The returned function produces `Exit.Success` with the schema's `Encoded` value
or `Exit.Failure` with a `SchemaIssue.Issue`.

**Gotchas**

Because this adapter runs synchronously, async encoding work can produce an
`Exit.Failure` with a defect cause. When the cause contains both schema
issues and non-schema reasons, all reasons remain in the returned `Cause`.

**See**

- `encodeUnknownExit` for unknown input with the same `Exit` result shape
- `encodeEffect` for effectful encoding that preserves service requirements

**Signature**

```ts
declare const encodeExit: <S extends Schema.ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Type"], options?: SchemaAST.ParseOptions) => Exit.Exit<S["Encoded"], SchemaIssue.Issue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L758)

Since v4.0.0

## encodePromise

Creates a Promise-based encoder for input already typed as the schema's decoded
`Type`.

**When to use**

Use when you already have values typed as the schema's decoded `Type` and
need encoding to return a JavaScript `Promise`.

**Details**

The returned function resolves with the schema's `Encoded` value on success and
rejects with an `Error` whose cause is a `SchemaIssue.Issue` on encoding failure.

**Gotchas**

Causes that contain defects, interruptions, or other non-schema reasons reject
with an `Error` whose cause is the underlying `Cause`.

**See**

- `encodeUnknownPromise` for encoding untyped input
- `encodeEffect` for effectful encoding or schemas with encoding service requirements

**Signature**

```ts
declare const encodePromise: <S extends Schema.ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Type"], options?: SchemaAST.ParseOptions) => Promise<S["Encoded"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L694)

Since v3.10.0

## encodeResult

Creates an encoder for input already typed as the schema's decoded `Type`,
reporting failure safely as a `Result`.

**When to use**

Use when you already have input typed as the schema's decoded `Type` and want
encoding failures returned as `Result.fail` with `SchemaIssue.Issue`.

**Details**

The returned function produces `Result.succeed` with the schema's `Encoded`
value on success or `Result.fail` with a `SchemaIssue.Issue` on encoding
failure.

**Gotchas**

This synchronous adapter returns `Result.fail` for causes made entirely of
schema issues, but causes that contain defects, interruptions, or other
non-schema reasons throw instead.

**See**

- `encodeUnknownResult` for the same `Result` shape when the input is not already typed

**Signature**

```ts
declare const encodeResult: <S extends Schema.ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Type"], options?: SchemaAST.ParseOptions) => Result.Result<S["Encoded"], SchemaIssue.Issue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L839)

Since v4.0.0

## encodeSync

Creates a synchronous encoder for input already typed as the schema's decoded
`Type`.

**When to use**

Use to encode already typed schema values synchronously when encoding failure
should throw an `Error` whose cause is `SchemaIssue.Issue`.

**Details**

The returned function returns the schema's `Encoded` value on success and throws
an `Error` with the `SchemaIssue.Issue` in its `cause` on encoding failure.

**Gotchas**

Causes that contain defects, interruptions, or asynchronous work at this
synchronous boundary throw an `Error` whose cause is the underlying `Cause`,
instead of being converted to a schema validation error.

**See**

- `encodeUnknownSync` for unknown input with the same throwing boundary
- `encodeResult` for returning schema issues as data
- `encodeEffect` for effectful encoding that preserves service requirements

**Signature**

```ts
declare const encodeSync: <S extends Schema.ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Type"], options?: SchemaAST.ParseOptions) => S["Encoded"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L904)

Since v3.10.0

## encodeUnknownEffect

Creates an effectful encoder for `unknown` input.

**When to use**

Use when you need to encode untyped boundary input in an `Effect` whose
failure channel is `SchemaIssue.Issue`, while preserving service
requirements.

**Details**

The returned function succeeds with the schema's `Encoded` value or fails with a
`SchemaIssue.Issue`. Encoding service requirements are preserved in the returned
`Effect`. Parse options may be provided when creating the encoder and overridden
when applying it.

**See**

- `encodeEffect` for the typed-input variant when the value is already typed as the schema's decoded `Type`

**Signature**

```ts
declare const encodeUnknownEffect: <S extends Schema.Constraint>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (
  input: unknown,
  options?: SchemaAST.ParseOptions
) => Effect.Effect<S["Encoded"], SchemaIssue.Issue, S["EncodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L597)

Since v4.0.0

## encodeUnknownExit

Creates a synchronous encoder for `unknown` input that reports failure safely
as an `Exit`.

**When to use**

Use when you need synchronous encoding of unknown input into an `Exit` whose
failure contains `SchemaIssue.Issue`.

**Details**

The returned function produces `Exit.Success` with the schema's `Encoded` value
or `Exit.Failure` with a `SchemaIssue.Issue`.

**Gotchas**

Because this adapter runs synchronously, async encoding work can produce an
`Exit.Failure` with a defect cause. When the cause contains both schema
issues and non-schema reasons, all reasons remain in the returned `Cause`.

**See**

- `encodeExit` for input already typed as the schema's decoded `Type`
- `encodeUnknownEffect` for effectful encoding that preserves service requirements

**Signature**

```ts
declare const encodeUnknownExit: <S extends Schema.ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Exit.Exit<S["Encoded"], SchemaIssue.Issue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L725)

Since v4.0.0

## encodeUnknownPromise

Creates a Promise-based encoder for `unknown` input.

**When to use**

Use when you need to encode untrusted or dynamically typed values with a
service-free schema and return a JavaScript `Promise`.

**Details**

The returned function resolves with the schema's `Encoded` value on success and
rejects with an `Error` whose cause is a `SchemaIssue.Issue` on encoding failure.

**Gotchas**

Causes that contain defects, interruptions, or other non-schema reasons reject
with an `Error` whose cause is the underlying `Cause`.

**See**

- `encodePromise` for input already typed as the schema's decoded `Type`
- `encodeUnknownEffect` for schemas that require encoding services or when failures should remain in `Effect`

**Signature**

```ts
declare const encodeUnknownPromise: <S extends Schema.ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Promise<S["Encoded"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L663)

Since v3.10.0

## encodeUnknownResult

Creates an encoder for `unknown` input that reports failure safely as a
`Result`.

**When to use**

Use when encoding values from an unknown or dynamically typed boundary
synchronously, and you want `SchemaIssue.Issue` failures returned as `Result`
data.

**Details**

The returned function produces `Result.succeed` with the schema's `Encoded`
value on success or `Result.fail` with a `SchemaIssue.Issue` on encoding
failure.

**Gotchas**

This adapter runs synchronously. Causes made entirely of schema issues become
`Result.fail`, but causes that contain defects, interruptions, or asynchronous
work at this synchronous boundary throw instead.

**See**

- `encodeResult` for input already typed as the schema's decoded `Type`
- `encodeUnknownEffect` for effectful encoding, including schemas with encoding service requirements

**Signature**

```ts
declare const encodeUnknownResult: <S extends Schema.ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Result.Result<S["Encoded"], SchemaIssue.Issue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L806)

Since v4.0.0

## encodeUnknownSync

Creates a synchronous encoder for `unknown` input.

**When to use**

Use when you need to encode values from untyped input in synchronous code and
want encoding failures to throw an `Error` whose cause is `SchemaIssue.Issue`.

**Details**

The returned function returns the schema's `Encoded` value on success and throws
an `Error` with the `SchemaIssue.Issue` in its `cause` on encoding failure.

**Gotchas**

Causes that contain defects, interruptions, or asynchronous work at this
synchronous boundary throw an `Error` whose cause is the underlying `Cause`,
instead of being converted to a schema validation error.

**See**

- `encodeSync` for input already typed as the schema's decoded `Type`
- `encodeUnknownEffect` for effectful encoding that preserves service requirements

**Signature**

```ts
declare const encodeUnknownSync: <S extends Schema.ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => S["Encoded"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/SchemaParser.ts#L870)

Since v3.10.0
