---
title: Sse.ts
nav_order: 219
parent: "effect"
---

## Sse.ts overview

Parses and renders Server-Sent Events text streams.

Server-Sent Events, or SSE, are the text format used by `EventSource` for
one-way server-to-client updates. This module includes parsers, encoders,
channel helpers, and schema-based helpers for the `id`, `event`, and `data`
fields of each event.

Since v4.0.0

---

## Exports Grouped by Category

- [decoding](#decoding)
  - [EventCodec (interface)](#eventcodec-interface)
  - [Parser (interface)](#parser-interface)
  - [decode](#decode)
  - [decodeDataSchema](#decodedataschema)
  - [decodeSchema](#decodeschema)
  - [makeParser](#makeparser)
- [encoding](#encoding)
  - [Encoder (interface)](#encoder-interface)
  - [encode](#encode)
  - [encodeSchema](#encodeschema)
  - [encoder](#encoder)
- [models](#models)
  - [AnyEvent (type alias)](#anyevent-type-alias)
  - [Event](#event)
  - [Event (interface)](#event-interface)
  - [EventEncoded](#eventencoded)
  - [EventEncoded (interface)](#eventencoded-interface)
  - [Retry (class)](#retry-class)
    - [is (static method)](#is-static-method)
    - [filter (static method)](#filter-static-method)
    - [[RetryTypeId] (property)](#retrytypeid-property)
  - [transformEvent](#transformevent)

---

# decoding

## EventCodec (interface)

A constraint for schemas that can decode SSE events.

**Signature**

```ts
export interface EventCodec extends Schema.Codec<
  any,
  {
    readonly id?: string | undefined
    readonly event?: string | undefined
    readonly data: string
  },
  any,
  any
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L82)

Since v4.0.0

## Parser (interface)

Stateful Server-Sent Events parser returned by `makeParser`.

**Details**

`feed` accepts additional text chunks and `reset` clears buffered parser state.

**Signature**

```ts
export interface Parser {
  feed(chunk: string): void
  reset(): void
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L346)

Since v4.0.0

## decode

Creates a channel that parses Server-Sent Events text chunks into `Event` values.

**Details**

SSE `retry` directives are emitted as `Retry` failures so callers can
reconnect with the requested delay.

**Signature**

```ts
declare const decode: <IE, Done>() => Channel.Channel<
  NonEmptyReadonlyArray<Event>,
  IE | Retry,
  Done,
  NonEmptyReadonlyArray<string>,
  IE,
  Done
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L36)

Since v4.0.0

## decodeDataSchema

Creates an SSE decoder channel that JSON-decodes each event `data` field with a schema.

**Details**

The output preserves the SSE `event` name and optional `id` while replacing
`data` with the decoded value.

**Signature**

```ts
declare const decodeDataSchema: <Type, DecodingServices, IE, Done>(
  schema: Schema.ConstraintDecoder<Type, DecodingServices>
) => Channel.Channel<
  NonEmptyReadonlyArray<{ readonly event: string; readonly id: string | undefined; readonly data: Type }>,
  IE | Retry | Schema.SchemaError,
  Done,
  NonEmptyReadonlyArray<string>,
  IE,
  Done,
  DecodingServices
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L139)

Since v4.0.0

## decodeSchema

Creates an SSE decoder channel that decodes each parsed event with a schema.

**Details**

The schema receives the untagged event shape containing `id`, `event`, and
string `data`.

**Signature**

```ts
declare const decodeSchema: <S extends EventCodec, IE, Done>(
  schema: S
) => Channel.Channel<
  NonEmptyReadonlyArray<S["Type"]>,
  IE | Retry | Schema.SchemaError,
  Done,
  NonEmptyReadonlyArray<string>,
  IE,
  Done,
  S["DecodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L106)

Since v4.0.0

## makeParser

Creates a stateful Server-Sent Events parser.

**Details**

Call `feed` with text chunks to parse `Event` and `Retry` values through the
callback, and call `reset` to clear any buffered event state.

**Signature**

```ts
declare const makeParser: (onParse: (event: AnyEvent) => void) => Parser
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L178)

Since v4.0.0

# encoding

## Encoder (interface)

Encoder capable of rendering an `Event` or `Retry` value as Server-Sent
Events text.

**Signature**

```ts
export interface Encoder {
  write(event: AnyEvent): string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L422)

Since v4.0.0

## encode

Creates a channel that encodes `Event` values as Server-Sent Events text.

**Details**

If the upstream channel fails with `Retry`, the retry directive is written and
the encoder completes.

**Signature**

```ts
declare const encode: <IE, Done>() => Channel.Channel<
  NonEmptyReadonlyArray<string>,
  IE,
  void,
  NonEmptyReadonlyArray<Event>,
  IE | Retry,
  Done
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L362)

Since v4.0.0

## encodeSchema

Creates an SSE encoder channel for values accepted by a schema.

**Details**

Values are schema-encoded to the untagged SSE event shape, transformed to
`Event`, and then written as Server-Sent Events text.

**Signature**

```ts
declare const encodeSchema: <S extends EventCodec, IE, Done>(
  schema: S
) => Channel.Channel<
  NonEmptyReadonlyArray<string>,
  IE | Schema.SchemaError,
  void,
  NonEmptyReadonlyArray<S["Type"]>,
  IE | Retry,
  Done,
  S["EncodingServices"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L396)

Since v4.0.0

## encoder

Default Server-Sent Events encoder.

**Details**

It renders `Event` values as `id`, `event`, and `data` lines and renders
`Retry` values as `retry:` directives.

**Signature**

```ts
declare const encoder: Encoder
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L572)

Since v4.0.0

# models

## AnyEvent (type alias)

Union of SSE values that can be rendered by an `Encoder`: regular events and
retry directives.

**Signature**

```ts
type AnyEvent = Event | Retry
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L559)

Since v4.0.0

## Event

Schema for the tagged Server-Sent Events message model that adds `_tag: "Event"` to the event name, optional event ID, and string data payload.

**Signature**

```ts
declare const Event: Schema.Struct<{
  readonly _tag: Schema.tag<"Event">
  readonly id: Schema.UndefinedOr<Schema.String>
  readonly event: Schema.String
  readonly data: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L461)

Since v4.0.0

## Event (interface)

Tagged model for a Server-Sent Events message containing the event name, optional event ID, and string data payload.

**Signature**

```ts
export interface Event {
  readonly _tag: "Event"
  readonly event: string
  readonly id: string | undefined
  readonly data: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L432)

Since v4.0.0

## EventEncoded

Schema for the untagged Server-Sent Events payload shape containing an optional `id`, `event`, and string `data` fields.

**Signature**

```ts
declare const EventEncoded: Schema.Struct<{
  readonly id: Schema.optional<Schema.String>
  readonly event: Schema.String
  readonly data: Schema.String
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L445)

Since v4.0.0

## EventEncoded (interface)

Untagged Server-Sent Events payload shape containing the event name, optional event ID, and string data payload.

**Signature**

```ts
export interface EventEncoded {
  readonly event: string
  readonly id?: string | undefined
  readonly data: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L505)

Since v4.0.0

## Retry (class)

Represents a Server-Sent Events retry directive.

**Details**

Decoders surface this value as a failure to request reconnection after
`duration`; encoders serialize an upstream `Retry` failure as a `retry:` line.

**Signature**

```ts
declare class Retry
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L524)

Since v4.0.0

### is (static method)

Returns `true` when the value is an SSE retry directive.

**Signature**

```ts
declare const is: (u: unknown) => u is Retry
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L539)

Since v4.0.0

### filter (static method)

Separates SSE retry directives from regular event values.

**Signature**

```ts
declare const filter: <A>(u: A) => Result.Result<Retry, Exclude<A, Retry>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L547)

Since v4.0.0

### [RetryTypeId] (property)

Marks this value as an SSE retry directive for runtime guards.

**Signature**

```ts
readonly [RetryTypeId]: "~effect/encoding/Sse/Retry"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L533)

Since v4.0.0

## transformEvent

Schema for transforming untagged SSE event payloads into tagged `Event`
models.

**Signature**

```ts
declare const transformEvent: SchemaTransformation.Transformation<
  { readonly id?: string | undefined; readonly event?: string | undefined; readonly data: string },
  { readonly _tag: "Event"; readonly id: string | undefined; readonly event: string; readonly data: string },
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Sse.ts#L480)

Since v4.0.0
