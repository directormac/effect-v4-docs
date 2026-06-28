---
title: ChannelSchema.ts
nav_order: 9
parent: "effect"
---

## ChannelSchema.ts overview

Schema adapters for `Channel` boundaries. The helpers encode typed channel
chunks before they cross an encoded boundary, decode encoded chunks before
application code receives them, and wrap bidirectional channels so callers
work with schema-typed input and output while the inner channel uses encoded
values.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [duplex](#duplex)
  - [duplexUnknown](#duplexunknown)
- [constructors](#constructors)
  - [decode](#decode)
  - [decodeUnknown](#decodeunknown)
  - [encode](#encode)
  - [encodeUnknown](#encodeunknown)

---

# combinators

## duplex

Wraps a channel so callers work with typed input and output chunks while the
wrapped channel uses encoded chunks.

**When to use**

Use to expose typed input and output at a bidirectional channel boundary
while the wrapped channel continues to operate on schema-encoded chunks.

**Details**

Values sent into the resulting channel are encoded with `inputSchema` before
reaching the wrapped channel. Values emitted by the wrapped channel are
decoded with `outputSchema` before they are emitted downstream. Schema
failures are surfaced as `SchemaError`.

**See**

- `duplexUnknown` for the variant whose encoded side is intentionally untyped
- `encode` for encoding typed chunks at one-way channel boundaries
- `decode` for decoding encoded chunks at one-way channel boundaries

**Signature**

```ts
declare const duplex: {
  <In extends Schema.Constraint, Out extends Schema.Constraint>(options: {
    readonly inputSchema: In
    readonly outputSchema: Out
  }): <OutErr, OutDone, InErr, InDone, R>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<Out["Encoded"]>,
      OutErr,
      OutDone,
      Arr.NonEmptyReadonlyArray<In["Encoded"]>,
      Schema.SchemaError | InErr,
      InDone,
      R
    >
  ) => Channel.Channel<
    Arr.NonEmptyReadonlyArray<Out["Type"]>,
    Schema.SchemaError | OutErr,
    OutDone,
    Arr.NonEmptyReadonlyArray<In["Type"]>,
    InErr,
    InDone,
    R | In["EncodingServices"] | Out["DecodingServices"]
  >
  <Out extends Schema.Constraint, OutErr, OutDone, In extends Schema.Constraint, InErr, InDone, R>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<Out["Encoded"]>,
      OutErr,
      OutDone,
      Arr.NonEmptyReadonlyArray<In["Encoded"]>,
      Schema.SchemaError | InErr,
      InDone,
      R
    >,
    options: { readonly inputSchema: In; readonly outputSchema: Out }
  ): Channel.Channel<
    Arr.NonEmptyReadonlyArray<Out["Type"]>,
    Schema.SchemaError | OutErr,
    OutDone,
    Arr.NonEmptyReadonlyArray<In["Type"]>,
    InErr,
    InDone,
    R | In["EncodingServices"] | Out["DecodingServices"]
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChannelSchema.ts#L168)

Since v4.0.0

## duplexUnknown

Wraps a bidirectional channel whose encoded chunks are typed as `unknown`.

**When to use**

Use when you need a bidirectional channel to cross an encoded boundary whose
chunk types are intentionally erased, while callers send and receive
schema-typed chunks.

**Details**

The resulting channel accepts typed input chunks, encodes them with
`inputSchema`, decodes unknown output chunks with `outputSchema`, and
surfaces schema failures as `SchemaError`.

**See**

- `duplex` for the variant that preserves the schema encoded types on the wrapped channel

**Signature**

```ts
declare const duplexUnknown: {
  <In extends Schema.Constraint, Out extends Schema.Constraint>(options: {
    readonly inputSchema: In
    readonly outputSchema: Out
  }): <OutErr, OutDone, InErr, InDone, R>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<unknown>,
      OutErr,
      OutDone,
      Arr.NonEmptyReadonlyArray<any>,
      Schema.SchemaError | InErr,
      InDone,
      R
    >
  ) => Channel.Channel<
    Arr.NonEmptyReadonlyArray<Out["Type"]>,
    Schema.SchemaError | OutErr,
    OutDone,
    Arr.NonEmptyReadonlyArray<In["Type"]>,
    InErr,
    InDone,
    R | In["EncodingServices"] | Out["DecodingServices"]
  >
  <Out extends Schema.Constraint, OutErr, OutDone, In extends Schema.Constraint, InErr, InDone, R>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<unknown>,
      OutErr,
      OutDone,
      Arr.NonEmptyReadonlyArray<any>,
      Schema.SchemaError | InErr,
      InDone,
      R
    >,
    options: { readonly inputSchema: In; readonly outputSchema: Out }
  ): Channel.Channel<
    Arr.NonEmptyReadonlyArray<Out["Type"]>,
    Schema.SchemaError | OutErr,
    OutDone,
    Arr.NonEmptyReadonlyArray<In["Type"]>,
    InErr,
    InDone,
    R | In["EncodingServices"] | Out["DecodingServices"]
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChannelSchema.ts#L262)

Since v4.0.0

# constructors

## decode

Creates a channel that decodes non-empty chunks from the schema's encoded
representation into schema values.

**When to use**

Use to validate and decode encoded channel output into typed schema values
before application code consumes it.

**Details**

Decoding failures are emitted as `SchemaError`, and any decoding services
required by the schema become channel requirements.

**See**

- `decodeUnknown` for boundaries where the encoded input side is intentionally untyped
- `encode` for the inverse adapter that encodes typed schema values

**Signature**

```ts
declare const decode: <S extends Schema.Constraint>(
  schema: S
) => <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<S["Type"]>,
  IE | Schema.SchemaError,
  Done,
  Arr.NonEmptyReadonlyArray<S["Encoded"]>,
  IE,
  Done,
  S["DecodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChannelSchema.ts#L98)

Since v4.0.0

## decodeUnknown

Creates a `decode` channel variant for schema-decoding channel boundaries.

**When to use**

Use when you need an intentionally unknown or untyped encoded input while
keeping only the decoded output statically typed according to the schema.

**Details**

The channel decodes non-empty encoded chunks into schema values, emits
`SchemaError` when decoding fails, and requires the schema's decoding
services.

**See**

- `decode` for the typed variant that preserves the schema's encoded type

**Signature**

```ts
declare const decodeUnknown: <S extends Schema.Constraint>(
  schema: S
) => <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<S["Type"]>,
  IE | Schema.SchemaError,
  Done,
  Arr.NonEmptyReadonlyArray<S["Encoded"]>,
  IE,
  Done,
  S["DecodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChannelSchema.ts#L133)

Since v4.0.0

## encode

Creates a channel that encodes non-empty chunks of schema values into the
schema's encoded representation.

**When to use**

Use to encode typed channel input into the schema's encoded representation
before passing chunks to an encoded downstream boundary.

**Details**

Encoding failures are emitted as `SchemaError`, and any encoding services
required by the schema become channel requirements.

**See**

- `encodeUnknown` for encoded output chunks that should be typed as `unknown`
- `decode` for the inverse channel that decodes encoded chunks into schema values

**Signature**

```ts
declare const encode: <S extends Schema.Constraint>(
  schema: S
) => <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<S["Encoded"]>,
  IE | Schema.SchemaError,
  Done,
  Arr.NonEmptyReadonlyArray<S["Type"]>,
  IE,
  Done,
  S["EncodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChannelSchema.ts#L36)

Since v4.0.0

## encodeUnknown

Creates an `encode` channel variant whose encoded output chunks are typed as
`unknown`.

**When to use**

Use when a channel boundary should encode typed input chunks while the encoded
output representation is intentionally untyped.

**See**

- `encode` for the variant that preserves the schema encoded type

**Signature**

```ts
declare const encodeUnknown: <S extends Schema.Constraint>(
  schema: S
) => <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<unknown>,
  IE | Schema.SchemaError,
  Done,
  Arr.NonEmptyReadonlyArray<S["Type"]>,
  IE,
  Done,
  S["EncodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/ChannelSchema.ts#L66)

Since v4.0.0
