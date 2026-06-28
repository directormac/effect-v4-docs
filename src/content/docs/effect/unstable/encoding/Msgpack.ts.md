---
title: Msgpack.ts
nav_order: 217
parent: "effect"
---

## Msgpack.ts overview

Encodes and decodes MessagePack frames in Effect channels.

MessagePack is a compact binary serialization format for protocols and
storage layers that expect bytes instead of JSON text, such as RPC
transports, socket streams, caches, or database columns. This module includes
raw channel helpers for values whose shape is already agreed on, and
schema-based helpers for validating and transforming values at the boundary.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [duplex](#duplex)
  - [duplexSchema](#duplexschema)
- [constructors](#constructors)
  - [decode](#decode)
  - [decodeSchema](#decodeschema)
  - [encode](#encode)
  - [encodeSchema](#encodeschema)
- [errors](#errors)
  - [MsgPackError (class)](#msgpackerror-class)
    - [[MsgPackErrorTypeId] (property)](#msgpackerrortypeid-property)
- [schemas](#schemas)
  - [schema](#schema)
  - [schema (interface)](#schema-interface)
  - [transformation](#transformation)

---

# combinators

## duplex

Wraps a bidirectional byte channel with MessagePack encoding and decoding.

**Details**

Outgoing values are packed as MessagePack bytes before reaching the wrapped
channel, and incoming bytes are unpacked into values.

**Signature**

```ts
declare const duplex: <R, IE, OE, OutDone, InDone>(
  self: Channel.Channel<
    Arr.NonEmptyReadonlyArray<Uint8Array<ArrayBuffer>>,
    OE,
    OutDone,
    Arr.NonEmptyReadonlyArray<Uint8Array<ArrayBuffer>>,
    IE | MsgPackError,
    InDone,
    R
  >
) => Channel.Channel<
  Arr.NonEmptyReadonlyArray<unknown>,
  MsgPackError | OE,
  OutDone,
  Arr.NonEmptyReadonlyArray<unknown>,
  IE,
  InDone,
  R
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Msgpack.ts#L208)

Since v4.0.0

## duplexSchema

Wraps a bidirectional byte channel with schema-aware MessagePack encoding and
decoding.

**Details**

Values sent to the wrapped channel are encoded with `inputSchema` and packed
as MessagePack bytes; bytes received from it are unpacked and decoded with
`outputSchema`.

**Signature**

```ts
declare const duplexSchema: {
  <In extends Schema.Constraint, Out extends Schema.Constraint>(options: {
    readonly inputSchema: In
    readonly outputSchema: Out
  }): <OutErr, OutDone, InErr, InDone, R>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<Uint8Array<ArrayBuffer>>,
      OutErr,
      OutDone,
      Arr.NonEmptyReadonlyArray<Uint8Array<ArrayBuffer>>,
      MsgPackError | Schema.SchemaError | InErr,
      InDone,
      R
    >
  ) => Channel.Channel<
    Arr.NonEmptyReadonlyArray<Out["Type"]>,
    MsgPackError | Schema.SchemaError | OutErr,
    OutDone,
    Arr.NonEmptyReadonlyArray<In["Type"]>,
    InErr,
    InDone,
    R | In["EncodingServices"] | Out["DecodingServices"]
  >
  <Out extends Schema.Constraint, In extends Schema.Constraint, OutErr, OutDone, InErr, InDone, R>(
    self: Channel.Channel<
      Arr.NonEmptyReadonlyArray<Uint8Array<ArrayBuffer>>,
      OutErr,
      OutDone,
      Arr.NonEmptyReadonlyArray<Uint8Array<ArrayBuffer>>,
      MsgPackError | Schema.SchemaError | InErr,
      InDone,
      R
    >,
    options: { readonly inputSchema: In; readonly outputSchema: Out }
  ): Channel.Channel<
    Arr.NonEmptyReadonlyArray<Out["Type"]>,
    MsgPackError | Schema.SchemaError | OutErr,
    OutDone,
    Arr.NonEmptyReadonlyArray<In["Type"]>,
    InErr,
    InDone,
    R | In["EncodingServices"] | Out["DecodingServices"]
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Msgpack.ts#L245)

Since v4.0.0

# constructors

## decode

Creates a channel that decodes MessagePack byte chunks into values.

**Details**

Incomplete frames are buffered across chunks, and invalid MessagePack data
fails with `MsgPackError`.

**Signature**

```ts
declare const decode: <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<unknown>,
  IE | MsgPackError,
  Done,
  Arr.NonEmptyReadonlyArray<Uint8Array<ArrayBuffer>>,
  IE,
  Done
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Msgpack.ts#L128)

Since v4.0.0

## decodeSchema

Creates a MessagePack decoder channel for values of a schema.

**Details**

The channel unpacks bytes into unknown values and then decodes each value with
the schema.

**Signature**

```ts
declare const decodeSchema: <S extends Schema.Constraint>(
  schema: S
) => <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<S["Type"]>,
  Schema.SchemaError | MsgPackError | IE,
  Done,
  Arr.NonEmptyReadonlyArray<Uint8Array<ArrayBuffer>>,
  IE,
  Done,
  S["DecodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Msgpack.ts#L184)

Since v4.0.0

## encode

Creates a channel that encodes non-empty chunks of values as MessagePack byte
arrays.

**Details**

The channel fails with `MsgPackError` when any value cannot be packed.

**Signature**

```ts
declare const encode: <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<Uint8Array<ArrayBuffer>>,
  IE | MsgPackError,
  Done,
  Arr.NonEmptyReadonlyArray<unknown>,
  IE,
  Done
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Msgpack.ts#L72)

Since v4.0.0

## encodeSchema

Creates a MessagePack encoder channel for values of a schema.

**Details**

Values are first encoded with the schema and then packed as MessagePack bytes,
so the channel can fail with either schema errors or `MsgPackError`.

**Signature**

```ts
declare const encodeSchema: <S extends Schema.Constraint>(
  schema: S
) => <IE = never, Done = unknown>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<Uint8Array<ArrayBuffer>>,
  MsgPackError | Schema.SchemaError | IE,
  Done,
  Arr.NonEmptyReadonlyArray<S["Type"]>,
  IE,
  Done,
  S["EncodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Msgpack.ts#L104)

Since v4.0.0

# errors

## MsgPackError (class)

Error raised when MessagePack encoding or decoding fails.

**Details**

The `kind` field identifies whether the failure happened while packing or
unpacking, and `cause` preserves the original error.

**Signature**

```ts
declare class MsgPackError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Msgpack.ts#L40)

Since v4.0.0

### [MsgPackErrorTypeId] (property)

Marks this value as a MessagePack encoding or decoding error for runtime guards.

**Signature**

```ts
readonly [MsgPackErrorTypeId]: "~effect/encoding/MsgPack/MsgPackError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Msgpack.ts#L49)

Since v4.0.0

# schemas

## schema

Builds a schema that stores values as MessagePack bytes.

**Details**

The resulting schema decodes `Uint8Array` payloads with MessagePack and the
provided schema, and encodes values back to MessagePack bytes.

**Signature**

```ts
declare const schema: <S extends Schema.Constraint>(schema: S) => schema<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Msgpack.ts#L382)

Since v4.0.0

## schema (interface)

Schema type for values encoded as MessagePack bytes.

**Details**

It decodes a `Uint8Array` MessagePack payload to the target schema type and
encodes the target type back to bytes.

**Signature**

```ts
export interface schema<S extends Schema.Constraint> extends Schema.decodeTo<
  S,
  Schema.instanceOf<Uint8Array<ArrayBuffer>>
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Msgpack.ts#L328)

Since v4.0.0

## transformation

Schema for decoding MessagePack bytes into values and encoding values back to
MessagePack bytes.

**Details**

MessagePack codec failures are converted to `InvalidValue` schema issues.

**Signature**

```ts
declare const transformation: SchemaTransformation.Transformation<unknown, Uint8Array<ArrayBuffer>, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Msgpack.ts#L343)

Since v4.0.0
