---
title: HttpApiSchema.ts
nav_order: 276
parent: "effect"
---

## HttpApiSchema.ts overview

Attaches HTTP API metadata to Effect Schema values.

This module is the schema-side bridge for HttpApi endpoint builders,
generated clients, and OpenAPI support. It does not define routes or perform
IO. Instead, the helpers annotate schemas so the surrounding HTTP API tooling
can choose response status codes, content types, body codecs, multipart
handling, and no-body response behavior.

Since v4.0.0

---

## Exports Grouped by Category

- [Empty](#empty)
  - [Accepted](#accepted)
  - [Created](#created)
  - [Empty](#empty-1)
  - [NoContent](#nocontent)
- [constructors](#constructors)
  - [StreamSse](#streamsse)
  - [StreamUint8Array](#streamuint8array)
- [encoding](#encoding)
  - [asFormUrlEncoded](#asformurlencoded)
  - [asJson](#asjson)
  - [asMultipart](#asmultipart)
  - [asMultipartStream](#asmultipartstream)
  - [asNoContent](#asnocontent)
  - [asText](#astext)
  - [asUint8Array](#asuint8array)
- [models](#models)
  - [Accepted (interface)](#accepted-interface)
  - [Created (interface)](#created-interface)
  - [Encoding (type alias)](#encoding-type-alias)
  - [NoContent (interface)](#nocontent-interface)
  - [PayloadEncoding (type alias)](#payloadencoding-type-alias)
  - [ResponseEncoding (type alias)](#responseencoding-type-alias)
  - [SseEventFromData (interface)](#sseeventfromdata-interface)
  - [StreamSchema (type alias)](#streamschema-type-alias)
  - [StreamSse (interface)](#streamsse-interface)
  - [StreamSseMode (type alias)](#streamssemode-type-alias)
  - [StreamUint8Array (interface)](#streamuint8array-interface)
- [predicates](#predicates)
  - [isNoContent](#isnocontent)
- [schemas](#schemas)
  - [asMultipart (interface)](#asmultipart-interface)
  - [asMultipartStream (interface)](#asmultipartstream-interface)
  - [asNoContent (interface)](#asnocontent-interface)
- [status](#status)
  - [StatusLiteral (type alias)](#statusliteral-type-alias)
  - [status](#status-1)
- [type IDs](#type-ids)
  - [MultipartStreamTypeId](#multipartstreamtypeid)
  - [MultipartStreamTypeId (type alias)](#multipartstreamtypeid-type-alias)
  - [MultipartTypeId](#multiparttypeid)
  - [MultipartTypeId (type alias)](#multiparttypeid-type-alias)

---

# Empty

## Accepted

Schema for empty HTTP responses with status code 202.

**Signature**

```ts
declare const Accepted: Accepted
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L228)

Since v4.0.0

## Created

Schema for empty HTTP responses with status code 201.

**Signature**

```ts
declare const Created: Created
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L212)

Since v4.0.0

## Empty

Creates a void schema with the given HTTP status code.
This is used to represent empty responses with a specific status code.

**See**

- `NoContent` for the predefined 204 no content schema.

**Signature**

```ts
declare const Empty: (code: number) => Schema.Void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L180)

Since v4.0.0

## NoContent

Schema for empty HTTP responses with status code 204.

**Signature**

```ts
declare const NoContent: NoContent
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L196)

Since v4.0.0

# constructors

## StreamSse

Creates a Server-Sent Events streaming success response schema.

**Signature**

```ts
declare const StreamSse: {
  <Events extends Sse.EventCodec, Error extends Schema.Constraint = Schema.Never>(options: {
    readonly contentType?: string | undefined
    readonly events: Events
    readonly error?: Error | undefined
  }): StreamSse<Events, Error, Events["Type"]>
  <Data extends Schema.Constraint, Error extends Schema.Constraint = Schema.Never>(options: {
    readonly contentType?: string | undefined
    readonly data: Data
    readonly error?: Error | undefined
  }): StreamSse<SseEventFromData<Data>, Error, Data["Type"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L389)

Since v4.0.0

## StreamUint8Array

Creates a streaming `Uint8Array` success response schema.

**Signature**

```ts
declare const StreamUint8Array: (options?: { readonly contentType?: string | undefined }) => StreamUint8Array
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L431)

Since v4.0.0

# encoding

## asFormUrlEncoded

Marks a schema as an `application/x-www-form-urlencoded` payload or response.

**Details**

The schema's encoded side must be a record of strings.

**Signature**

```ts
declare const asFormUrlEncoded: (options?: {
  readonly contentType?: string
}) => <S extends Schema.Top>(self: S) => S["Rebuild"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L599)

Since v4.0.0

## asJson

Marks a schema as a JSON payload / response.

**Signature**

```ts
declare const asJson: (options?: { readonly contentType?: string }) => <S extends Schema.Top>(self: S) => S["Rebuild"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L583)

Since v4.0.0

## asMultipart

Marks a schema as a multipart payload.

**See**

- `asMultipartStream` for a multipart stream payload.

**Signature**

```ts
declare const asMultipart: (
  options?: Multipart_.withLimits.Options
) => <S extends Schema.Top>(self: S) => asMultipart<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L494)

Since v4.0.0

## asMultipartStream

Marks a schema as a multipart stream payload.

**See**

- `asMultipart` for a buffered multipart payload.

**Signature**

```ts
declare const asMultipartStream: (
  options?: Multipart_.withLimits.Options
) => <S extends Schema.Top>(self: S) => asMultipartStream<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L538)

Since v4.0.0

## asNoContent

Marks a schema as a no-content response while preserving a decoded client value.

**Details**

The server encodes the response as `void`; generated clients call `decode` to
produce the schema's decoded value when the response has no body.

**See**

- `NoContent` for a void schema with the status code 204.
- `Empty` for creating a void schema with a specific status code.

**Signature**

```ts
declare const asNoContent: <S extends Schema.Constraint>(options: {
  readonly decode: LazyArg<S["Type"]>
}) => (self: S) => asNoContent<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L252)

Since v4.0.0

## asText

Marks a schema as a text payload / response.

**Details**

The schema encoded side must be a string.

**Signature**

```ts
declare const asText: (options?: {
  readonly contentType?: string
}) => <S extends Schema.Top & { readonly Encoded: string }>(self: S) => S["Rebuild"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L617)

Since v4.0.0

## asUint8Array

Marks a schema as a binary payload / response.

**Details**

The schema encoded side must be a `Uint8Array`.

**Signature**

```ts
declare const asUint8Array: (options?: {
  readonly contentType?: string
}) => <S extends Schema.Top & { readonly Encoded: Uint8Array }>(self: S) => S["Rebuild"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L634)

Since v4.0.0

# models

## Accepted (interface)

Type of the `Accepted` schema, a void schema annotated with HTTP status code 202.

**Signature**

```ts
export interface Accepted extends Schema.Void {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L220)

Since v4.0.0

## Created (interface)

Type of the `Created` schema, a void schema annotated with HTTP status code 201.

**Signature**

```ts
export interface Created extends Schema.Void {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L204)

Since v4.0.0

## Encoding (type alias)

HTTP API body encoding metadata used by payloads and responses.

**Signature**

```ts
type Encoding = PayloadEncoding | ResponseEncoding
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L42)

Since v4.0.0

## NoContent (interface)

Type of the `NoContent` schema, a void schema annotated with HTTP status code 204.

**Signature**

```ts
export interface NoContent extends Schema.Void {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L188)

Since v4.0.0

## PayloadEncoding (type alias)

HTTP API request payload encoding metadata.

**Signature**

```ts
type PayloadEncoding =
  | {
      readonly _tag: "Multipart"
      readonly mode: "buffered" | "stream"
      readonly contentType: string
      readonly limits?: Multipart_.withLimits.Options | undefined
    }
  | {
      readonly _tag: "Json" | "FormUrlEncoded" | "Uint8Array" | "Text"
      readonly contentType: string
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L50)

Since v4.0.0

## ResponseEncoding (type alias)

HTTP API response body encoding metadata.

**Signature**

```ts
type ResponseEncoding = {
  readonly _tag: "Json" | "FormUrlEncoded" | "Uint8Array" | "Text"
  readonly contentType: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L68)

Since v4.0.0

## SseEventFromData (interface)

Event schema produced when `StreamSse` is constructed from a JSON data schema.

**Signature**

```ts
export interface SseEventFromData<Data extends Schema.Constraint> extends Schema.Codec<
  {
    readonly id: string | undefined
    readonly event: string
    readonly data: Data["Type"]
  },
  {
    readonly id?: string | undefined
    readonly event?: string | undefined
    readonly data: string
  },
  Data["DecodingServices"],
  Data["EncodingServices"]
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L327)

Since v4.0.0

## StreamSchema (type alias)

Schema for a streaming HTTP API success response.

**Signature**

```ts
type StreamSchema = StreamSse<Sse.EventCodec, Schema.Top, unknown> | StreamUint8Array
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L379)

Since v4.0.0

## StreamSse (interface)

Schema for a Server-Sent Events success response.

**Details**

`events` describes successful application events emitted by the stream, and
`error` describes typed stream failures that will be encoded by later
endpoint/server/client integrations using the reserved failure event. If
`error` is omitted, it defaults to `Schema.Never`. When `StreamSse` is
constructed from `data`, handlers and clients expose raw data values while
the server and client still use an SSE event schema internally.

**Signature**

```ts
export interface StreamSse<
  Events extends Sse.EventCodec,
  Error extends Schema.Constraint,
  Value = Events["Type"]
> extends Schema.BottomLazy<SchemaAST.Declaration, StreamSse<Events, Error, Value>> {
  readonly Type: Stream.Stream<Value, Error["Type"], never>
  readonly Encoded: Stream.Stream<Value, Error["Type"], never>
  readonly DecodingServices: Events["DecodingServices"] | Error["DecodingServices"]
  readonly EncodingServices: Events["EncodingServices"] | Error["EncodingServices"]
  readonly Rebuild: StreamSse<Events, Error, Value>
  readonly "~type.make.in": Stream.Stream<Value, Error["Type"], never>
  readonly "~type.make": Stream.Stream<Value, Error["Type"], never>
  readonly Iso: Stream.Stream<Value, Error["Type"], never>
  readonly [StreamSchemaTypeId]: typeof StreamSchemaTypeId
  readonly _tag: "StreamSse"
  readonly mode: "sse"
  readonly sseMode: StreamSseMode
  readonly contentType: string
  readonly events: Events
  readonly error: Error
  readonly "~Value"?: Value | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L293)

Since v4.0.0

## StreamSseMode (type alias)

Mode describing whether an SSE stream emits full events or raw data values.

**Signature**

```ts
type StreamSseMode = "events" | "data"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L276)

Since v4.0.0

## StreamUint8Array (interface)

Schema for a streaming `Uint8Array` success response.

**Details**

This declaration stores the response content type for later endpoint,
server, client, and OpenAPI integrations. It is intentionally separate from
the buffered `asUint8Array` response encoding.

**Signature**

```ts
export interface StreamUint8Array extends Schema.Bottom<
  Stream.Stream<Uint8Array, unknown, never>,
  Stream.Stream<Uint8Array, unknown, never>,
  never,
  never,
  SchemaAST.Declaration,
  StreamUint8Array
> {
  readonly Rebuild: StreamUint8Array
  readonly [StreamSchemaTypeId]: typeof StreamSchemaTypeId
  readonly _tag: "StreamUint8Array"
  readonly mode: "uint8array"
  readonly contentType: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L356)

Since v4.0.0

# predicates

## isNoContent

Returns `true` when a schema AST represents a no-content response.

**Details**

The check succeeds for direct `void` schemas and schemas whose encoded or
transformation target is `void`.

**Signature**

```ts
declare const isNoContent: (ast: SchemaAST.AST) => boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L651)

Since v4.0.0

# schemas

## asMultipart (interface)

Schema type returned by `asMultipart` for buffered multipart payloads.

**Signature**

```ts
export interface asMultipart<S extends Schema.Top> extends Schema.brand<S["Rebuild"], MultipartTypeId> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L484)

Since v4.0.0

## asMultipartStream (interface)

Schema type returned by `asMultipartStream` for streaming multipart payloads.

**Signature**

```ts
export interface asMultipartStream<S extends Schema.Top> extends Schema.brand<S["Rebuild"], MultipartStreamTypeId> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L528)

Since v4.0.0

## asNoContent (interface)

Schema type returned by `asNoContent`, encoding as `void` while decoding to the original schema type.

**Signature**

```ts
export interface asNoContent<S extends Schema.Constraint> extends Schema.decodeTo<Schema.toType<S>, Schema.Void> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L236)

Since v4.0.0

# status

## StatusLiteral (type alias)

Common HTTP status code literals accepted by `status`.

**Signature**

```ts
type StatusLiteral = keyof typeof statusCodeByLiteral
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L146)

Since v4.0.0

## status

Sets the HTTP status code of a schema.

**Details**

This is equivalent to calling `.annotate({ httpApiStatus: code })` on the
schema. You can pass either a numeric status code (for example, `201`) or a
common literal name (for example, `"Created"`).

**Signature**

```ts
declare const status: {
  (code: number): { <S extends Schema.Top>(self: S): S["Rebuild"] }
  (code: StatusLiteral): { <S extends Schema.Top>(self: S): S["Rebuild"] }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L166)

Since v4.0.0

# type IDs

## MultipartStreamTypeId

Runtime brand key used to mark schemas as streaming multipart payloads.

**Signature**

```ts
declare const MultipartStreamTypeId: "~effect/httpapi/HttpApiSchema/MultipartStream"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L512)

Since v4.0.0

## MultipartStreamTypeId (type alias)

Type-level brand identifier used by `asMultipartStream`.

**Signature**

```ts
type MultipartStreamTypeId = typeof MultipartStreamTypeId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L520)

Since v4.0.0

## MultipartTypeId

Runtime brand key used to mark schemas as buffered multipart payloads.

**Signature**

```ts
declare const MultipartTypeId: "~effect/httpapi/HttpApiSchema/Multipart"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L468)

Since v4.0.0

## MultipartTypeId (type alias)

Type-level brand identifier used by `asMultipart`.

**Signature**

```ts
type MultipartTypeId = typeof MultipartTypeId
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSchema.ts#L476)

Since v4.0.0
