---
title: Ndjson.ts
nav_order: 218
parent: "effect"
---

## Ndjson.ts overview

Encodes and decodes newline-delimited JSON streams in Effect channels.

NDJSON stores one complete JSON value on each line. This module has helpers
for byte streams, string streams, and schema-checked records, so streaming
code can read or write one JSON record at a time.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [duplex](#duplex)
  - [duplexSchema](#duplexschema)
  - [duplexSchemaString](#duplexschemastring)
  - [duplexString](#duplexstring)
- [constructors](#constructors)
  - [decode](#decode)
  - [decodeSchema](#decodeschema)
  - [decodeSchemaString](#decodeschemastring)
  - [decodeString](#decodestring)
  - [encode](#encode)
  - [encodeSchema](#encodeschema)
  - [encodeSchemaString](#encodeschemastring)
  - [encodeString](#encodestring)
- [errors](#errors)
  - [NdjsonError (class)](#ndjsonerror-class)
    - [[NdjsonErrorTypeId] (property)](#ndjsonerrortypeid-property)

---

# combinators

## duplex

Wraps a bidirectional byte channel with NDJSON encoding and decoding.

**Details**

Outgoing values are written as UTF-8 NDJSON bytes, and incoming bytes are
parsed as NDJSON values.

**Signature**

```ts
declare const duplex: {
  (options?: {
    readonly ignoreEmptyLines?: boolean | undefined
  }): <R, IE, OE, OutDone, InDone>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<Uint8Array>,
      OE,
      OutDone,
      Arr.NonEmptyReadonlyArray<Uint8Array>,
      IE | NdjsonError,
      InDone,
      R
    >
  ) => Channel.Channel<
    Arr.NonEmptyReadonlyArray<unknown>,
    NdjsonError | OE,
    OutDone,
    Arr.NonEmptyReadonlyArray<unknown>,
    IE,
    InDone,
    R
  >
  <R, IE, OE, OutDone, InDone>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<Uint8Array>,
      OE,
      OutDone,
      Arr.NonEmptyReadonlyArray<Uint8Array>,
      IE | NdjsonError,
      InDone,
      R
    >,
    options?: { readonly ignoreEmptyLines?: boolean | undefined }
  ): Channel.Channel<
    Arr.NonEmptyReadonlyArray<unknown>,
    NdjsonError | OE,
    OutDone,
    Arr.NonEmptyReadonlyArray<unknown>,
    IE,
    InDone,
    R
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L277)

Since v4.0.0

## duplexSchema

Wraps a bidirectional byte channel with schema-aware NDJSON encoding and
decoding.

**Details**

Values sent to the wrapped channel are encoded with `inputSchema`; bytes
received from it are parsed as NDJSON and decoded with `outputSchema`.

**Signature**

```ts
declare const duplexSchema: {
  <In extends Schema.Constraint, Out extends Schema.Constraint>(options: {
    readonly inputSchema: In
    readonly outputSchema: Out
    readonly ignoreEmptyLines?: boolean | undefined
  }): <OutErr, OutDone, InErr, InDone, R>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<Uint8Array>,
      OutErr,
      OutDone,
      Arr.NonEmptyReadonlyArray<Uint8Array>,
      NdjsonError | Schema.SchemaError | InErr,
      InDone,
      R
    >
  ) => Channel.Channel<
    Arr.NonEmptyReadonlyArray<Out["Type"]>,
    NdjsonError | Schema.SchemaError | OutErr,
    OutDone,
    Arr.NonEmptyReadonlyArray<In["Type"]>,
    InErr,
    InDone,
    R | In["EncodingServices"] | Out["DecodingServices"]
  >
  <Out extends Schema.Constraint, In extends Schema.Constraint, OutErr, OutDone, InErr, InDone, R>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<Uint8Array>,
      OutErr,
      OutDone,
      Arr.NonEmptyReadonlyArray<Uint8Array>,
      NdjsonError | Schema.SchemaError | InErr,
      InDone,
      R
    >,
    options: { readonly inputSchema: In; readonly outputSchema: Out; readonly ignoreEmptyLines?: boolean | undefined }
  ): Channel.Channel<
    Arr.NonEmptyReadonlyArray<Out["Type"]>,
    NdjsonError | Schema.SchemaError | OutErr,
    OutDone,
    Arr.NonEmptyReadonlyArray<In["Type"]>,
    InErr,
    InDone,
    R | In["EncodingServices"] | Out["DecodingServices"]
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L442)

Since v4.0.0

## duplexSchemaString

Wraps a bidirectional string channel with schema-aware NDJSON encoding and
decoding.

**Details**

Values sent to the wrapped channel are encoded with `inputSchema`; strings
received from it are parsed as NDJSON and decoded with `outputSchema`.

**Signature**

```ts
declare const duplexSchemaString: {
  <In extends Schema.Constraint, Out extends Schema.Constraint>(options: {
    readonly inputSchema: In
    readonly outputSchema: Out
    readonly ignoreEmptyLines?: boolean | undefined
  }): <OutErr, OutDone, InErr, InDone, R>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<string>,
      OutErr,
      OutDone,
      Arr.NonEmptyReadonlyArray<string>,
      NdjsonError | Schema.SchemaError | InErr,
      InDone,
      R
    >
  ) => Channel.Channel<
    Arr.NonEmptyReadonlyArray<Out["Type"]>,
    NdjsonError | Schema.SchemaError | OutErr,
    OutDone,
    Arr.NonEmptyReadonlyArray<In["Type"]>,
    InErr,
    InDone,
    R | In["EncodingServices"] | Out["DecodingServices"]
  >
  <Out extends Schema.Constraint, In extends Schema.Constraint, OutErr, OutDone, InErr, InDone, R>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<string>,
      OutErr,
      OutDone,
      Arr.NonEmptyReadonlyArray<string>,
      NdjsonError | Schema.SchemaError | InErr,
      InDone,
      R
    >,
    options: { readonly inputSchema: In; readonly outputSchema: Out; readonly ignoreEmptyLines?: boolean | undefined }
  ): Channel.Channel<
    Arr.NonEmptyReadonlyArray<Out["Type"]>,
    NdjsonError | Schema.SchemaError | OutErr,
    OutDone,
    Arr.NonEmptyReadonlyArray<In["Type"]>,
    InErr,
    InDone,
    R | In["EncodingServices"] | Out["DecodingServices"]
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L529)

Since v4.0.0

## duplexString

Wraps a bidirectional string channel with NDJSON encoding and decoding.

**Details**

Outgoing values are written as NDJSON strings, and incoming strings are parsed
as NDJSON values.

**Signature**

```ts
declare const duplexString: {
  (options?: {
    readonly ignoreEmptyLines?: boolean | undefined
  }): <R, IE, OE, OutDone, InDone>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<string>,
      OE,
      OutDone,
      Arr.NonEmptyReadonlyArray<string>,
      IE | NdjsonError,
      InDone,
      R
    >
  ) => Channel.Channel<
    Arr.NonEmptyReadonlyArray<unknown>,
    NdjsonError | OE,
    OutDone,
    Arr.NonEmptyReadonlyArray<unknown>,
    IE,
    InDone,
    R
  >
  <R, IE, OE, OutDone, InDone>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<string>,
      OE,
      OutDone,
      Arr.NonEmptyReadonlyArray<string>,
      IE | NdjsonError,
      InDone,
      R
    >,
    options?: { readonly ignoreEmptyLines?: boolean | undefined }
  ): Channel.Channel<
    Arr.NonEmptyReadonlyArray<unknown>,
    NdjsonError | OE,
    OutDone,
    Arr.NonEmptyReadonlyArray<unknown>,
    IE,
    InDone,
    R
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L359)

Since v4.0.0

# constructors

## decode

Creates a channel that decodes UTF-8 byte chunks and parses them as NDJSON.

**Details**

Lines may span input chunks, and `ignoreEmptyLines` controls whether blank
lines are skipped before JSON parsing.

**Signature**

```ts
declare const decode: <IE = never, Done = unknown>(options?: {
  readonly ignoreEmptyLines?: boolean | undefined
}) => Channel.Channel<
  Arr.NonEmptyReadonlyArray<unknown>,
  IE | NdjsonError,
  Done,
  Arr.NonEmptyReadonlyArray<Uint8Array>,
  IE,
  Done
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L201)

Since v4.0.0

## decodeSchema

Creates an NDJSON byte decoder channel for values of a schema.

**Details**

The channel decodes UTF-8 bytes, parses each NDJSON line, and then decodes
each parsed value with the schema.

**Signature**

```ts
declare const decodeSchema: <S extends Schema.Constraint>(
  schema: S
) => <IE = never, Done = unknown>(options?: {
  readonly ignoreEmptyLines?: boolean | undefined
}) => Channel.Channel<
  Arr.NonEmptyReadonlyArray<S["Type"]>,
  Schema.SchemaError | NdjsonError | IE,
  Done,
  Arr.NonEmptyReadonlyArray<Uint8Array>,
  IE,
  Done,
  S["DecodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L225)

Since v4.0.0

## decodeSchemaString

Creates an NDJSON string decoder channel for values of a schema.

**Details**

The channel parses each line as JSON and then decodes each parsed value with
the schema.

**Signature**

```ts
declare const decodeSchemaString: <S extends Schema.Constraint>(
  schema: S
) => <IE = never, Done = unknown>(options?: {
  readonly ignoreEmptyLines?: boolean | undefined
}) => Channel.Channel<
  Arr.NonEmptyReadonlyArray<S["Type"]>,
  Schema.SchemaError | NdjsonError | IE,
  Done,
  Arr.NonEmptyReadonlyArray<string>,
  IE,
  Done,
  S["DecodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L251)

Since v4.0.0

## decodeString

Creates a channel that parses NDJSON string chunks into values.

**When to use**

Use when NDJSON input arrives as string chunks and each complete line should
be parsed into a JSON value.

**Details**

Lines may span input chunks.

**Gotchas**

Set `ignoreEmptyLines` to skip blank lines before calling `JSON.parse`;
otherwise blank lines are parsed and fail as invalid JSON.

**Signature**

```ts
declare const decodeString: <IE = never, Done = unknown>(options?: {
  readonly ignoreEmptyLines?: boolean | undefined
}) => Channel.Channel<
  Arr.NonEmptyReadonlyArray<unknown>,
  IE | NdjsonError,
  Done,
  Arr.NonEmptyReadonlyArray<string>,
  IE,
  Done
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L166)

Since v4.0.0

## encode

Creates a channel that encodes chunks of values as UTF-8 NDJSON bytes.

**Signature**

```ts
declare const encode: <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<Uint8Array>,
  IE | NdjsonError,
  Done,
  Arr.NonEmptyReadonlyArray<unknown>,
  IE,
  Done
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L89)

Since v4.0.0

## encodeSchema

Creates an NDJSON byte encoder channel for values of a schema.

**Details**

Values are first encoded with the schema and then written as UTF-8
newline-delimited JSON.

**Signature**

```ts
declare const encodeSchema: <S extends Schema.Constraint>(
  schema: S
) => <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<Uint8Array>,
  NdjsonError | Schema.SchemaError | IE,
  Done,
  Arr.NonEmptyReadonlyArray<S["Type"]>,
  IE,
  Done,
  S["EncodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L109)

Since v4.0.0

## encodeSchemaString

Creates an NDJSON string encoder channel for values of a schema.

**Details**

Values are first encoded with the schema and then written as newline-delimited
JSON strings.

**Signature**

```ts
declare const encodeSchemaString: <S extends Schema.Constraint>(
  schema: S
) => <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<string>,
  NdjsonError | Schema.SchemaError | IE,
  Done,
  Arr.NonEmptyReadonlyArray<S["Type"]>,
  IE,
  Done,
  S["EncodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L133)

Since v4.0.0

## encodeString

Creates a channel that encodes chunks of values as NDJSON strings.

**Details**

Each input item is `JSON.stringify`-encoded, separated by newlines, and the
output chunk ends with a trailing newline.

**Signature**

```ts
declare const encodeString: <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<string>,
  IE | NdjsonError,
  Done,
  Arr.NonEmptyReadonlyArray<unknown>,
  IE,
  Done
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L65)

Since v4.0.0

# errors

## NdjsonError (class)

Error raised when NDJSON encoding or decoding fails.

**Details**

The `kind` field identifies whether the failure happened while packing or
unpacking, and `cause` preserves the original error.

**Signature**

```ts
declare class NdjsonError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L33)

Since v4.0.0

### [NdjsonErrorTypeId] (property)

Marks this value as an NDJSON encoding or decoding error for runtime guards.

**Signature**

```ts
readonly [NdjsonErrorTypeId]: "~effect/encoding/Ndjson/NdjsonError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Ndjson.ts#L42)

Since v4.0.0
