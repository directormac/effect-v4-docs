---
title: HttpIncomingMessage.ts
nav_order: 246
parent: "effect"
---

## HttpIncomingMessage.ts overview

Common model for incoming HTTP messages.

`HttpIncomingMessage` is used by server requests and client responses to
expose headers, an optional remote address, and body accessors. This module
provides decoders for JSON bodies, URL-encoded bodies, and headers, plus the
shared body-size setting and inspection helper used by request and response
implementations.

Since v4.0.0

---

## Exports Grouped by Category

- [converting](#converting)
  - [inspect](#inspect)
- [guards](#guards)
  - [isHttpIncomingMessage](#ishttpincomingmessage)
- [models](#models)
  - [HttpIncomingMessage (interface)](#httpincomingmessage-interface)
- [references](#references)
  - [MaxBodySize](#maxbodysize)
- [schemas](#schemas)
  - [schemaBodyJson](#schemabodyjson)
  - [schemaBodyUrlParams](#schemabodyurlparams)
  - [schemaHeaders](#schemaheaders)
- [type IDs](#type-ids)
  - [TypeId](#typeid)

---

# converting

## inspect

Builds an inspectable object for an incoming message, redacting headers and including a synchronously readable JSON or text body when available.

**Signature**

```ts
declare const inspect: <E>(self: HttpIncomingMessage<E>, that: object) => object
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpIncomingMessage.ts#L126)

Since v4.0.0

# guards

## isHttpIncomingMessage

Returns `true` when a value is an `HttpIncomingMessage`.

**Signature**

```ts
declare const isHttpIncomingMessage: (u: unknown) => u is HttpIncomingMessage
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpIncomingMessage.ts#L39)

Since v4.0.0

# models

## HttpIncomingMessage (interface)

Common model for incoming HTTP messages, with headers, remote address, and effectful body accessors.

**Signature**

```ts
export interface HttpIncomingMessage<E = unknown> extends Inspectable.Inspectable {
  readonly [TypeId]: typeof TypeId
  readonly headers: Headers.Headers
  readonly remoteAddress: Option.Option<string>
  readonly json: Effect.Effect<Schema.Json, E>
  readonly text: Effect.Effect<string, E>
  readonly urlParamsBody: Effect.Effect<UrlParams.UrlParams, E>
  readonly arrayBuffer: Effect.Effect<ArrayBuffer, E>
  readonly stream: Stream.Stream<Uint8Array, E>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpIncomingMessage.ts#L47)

Since v4.0.0

# references

## MaxBodySize

Context reference for the optional maximum size allowed when reading an incoming message body.

**Signature**

```ts
declare const MaxBodySize: Context.Reference<FileSystem.Size | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpIncomingMessage.ts#L115)

Since v4.0.0

# schemas

## schemaBodyJson

Creates a decoder that reads an incoming message's JSON body and decodes it with the supplied schema.

**Signature**

```ts
declare const schemaBodyJson: <S extends Schema.Constraint>(
  schema: S,
  options?: ParseOptions | undefined
) => <E>(self: HttpIncomingMessage<E>) => Effect.Effect<S["Type"], E | Schema.SchemaError, S["DecodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpIncomingMessage.ts#L64)

Since v4.0.0

## schemaBodyUrlParams

Creates a decoder that reads an incoming message's URL-encoded body parameters and decodes them with the supplied schema.

**Signature**

```ts
declare const schemaBodyUrlParams: <
  A,
  I extends Readonly<Record<string, string | ReadonlyArray<string> | undefined>>,
  RD,
  RE
>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => <E>(self: HttpIncomingMessage<E>) => Effect.Effect<A, E | Schema.SchemaError, RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpIncomingMessage.ts#L78)

Since v4.0.0

## schemaHeaders

Creates a decoder that validates and decodes an incoming message's headers with the supplied schema.

**Signature**

```ts
declare const schemaHeaders: <A, I extends Readonly<Record<string, string | undefined>>, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => <E>(self: HttpIncomingMessage<E>) => Effect.Effect<A, Schema.SchemaError, RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpIncomingMessage.ts#L101)

Since v4.0.0

# type IDs

## TypeId

Type identifier for `HttpIncomingMessage` values.

**Signature**

```ts
declare const TypeId: "~effect/http/HttpIncomingMessage"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpIncomingMessage.ts#L31)

Since v4.0.0
