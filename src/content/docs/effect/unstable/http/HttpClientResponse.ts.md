---
title: HttpClientResponse.ts
nav_order: 244
parent: "effect"
---

## HttpClientResponse.ts overview

Represents responses returned by the Effect HTTP client.

An `HttpClientResponse` keeps the original request together with the response
status, headers, cookies, and body accessors from the shared incoming-message
model. This module includes constructors, schema-based decoders, helpers for
streaming response bodies, and utilities for matching or filtering by HTTP
status.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [stream](#stream)
- [constructors](#constructors)
  - [fromWeb](#fromweb)
- [filters](#filters)
  - [filterStatus](#filterstatus)
  - [filterStatusOk](#filterstatusok)
- [models](#models)
  - [HttpClientResponse (interface)](#httpclientresponse-interface)
- [pattern matching](#pattern-matching)
  - [matchStatus](#matchstatus)
- [schemas](#schemas)
  - [schemaBodyJson](#schemabodyjson)
  - [schemaBodyUrlParams](#schemabodyurlparams)
  - [schemaHeaders](#schemaheaders)
  - [schemaJson](#schemajson)
  - [schemaNoBody](#schemanobody)
- [type IDs](#type-ids)
  - [TypeId](#typeid)

---

# accessors

## stream

Converts an effect producing an `HttpClientResponse` into a stream of response body bytes.

**Signature**

```ts
declare const stream: <E, R>(
  effect: Effect.Effect<HttpClientResponse, E, R>
) => Stream.Stream<Uint8Array, Error.HttpClientError | E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L146)

Since v4.0.0

# constructors

## fromWeb

Wraps a Web `Response` and its original `HttpClientRequest` as an `HttpClientResponse`.

**Signature**

```ts
declare const fromWeb: (request: HttpClientRequest.HttpClientRequest, source: Response) => HttpClientResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L80)

Since v4.0.0

# filters

## filterStatus

Succeeds with the response when its status satisfies the predicate, otherwise fails with `HttpClientError`.

**Signature**

```ts
declare const filterStatus: {
  (
    f: (status: number) => boolean
  ): (self: HttpClientResponse) => Effect.Effect<HttpClientResponse, Error.HttpClientError>
  (self: HttpClientResponse, f: (status: number) => boolean): Effect.Effect<HttpClientResponse, Error.HttpClientError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L208)

Since v4.0.0

## filterStatusOk

Succeeds with the response only when its status is in the 2xx range, otherwise fails with `HttpClientError`.

**Signature**

```ts
declare const filterStatusOk: (self: HttpClientResponse) => Effect.Effect<HttpClientResponse, Error.HttpClientError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L235)

Since v4.0.0

# models

## HttpClientResponse (interface)

Model of an HTTP client response, including the original request, status, cookies, headers, and body accessors.

**Signature**

```ts
export interface HttpClientResponse extends HttpIncomingMessage.HttpIncomingMessage<Error.HttpClientError>, Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly request: HttpClientRequest.HttpClientRequest
  readonly status: number
  readonly cookies: Cookies.Cookies
  readonly formData: Effect.Effect<FormData, Error.HttpClientError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L66)

Since v4.0.0

# pattern matching

## matchStatus

Pattern matches on a response status, checking exact status handlers before status-class handlers and `orElse`.

**Signature**

```ts
declare const matchStatus: {
  <
    const Cases extends {
      readonly [status: number]: (_: HttpClientResponse) => any
      readonly "2xx"?: (_: HttpClientResponse) => any
      readonly "3xx"?: (_: HttpClientResponse) => any
      readonly "4xx"?: (_: HttpClientResponse) => any
      readonly "5xx"?: (_: HttpClientResponse) => any
      readonly orElse: (_: HttpClientResponse) => any
    }
  >(
    cases: Cases
  ): (self: HttpClientResponse) => Cases[keyof Cases] extends (_: any) => infer R ? Unify<R> : never
  <
    const Cases extends {
      readonly [status: number]: (_: HttpClientResponse) => any
      readonly "2xx"?: (_: HttpClientResponse) => any
      readonly "3xx"?: (_: HttpClientResponse) => any
      readonly "4xx"?: (_: HttpClientResponse) => any
      readonly "5xx"?: (_: HttpClientResponse) => any
      readonly orElse: (_: HttpClientResponse) => any
    }
  >(
    self: HttpClientResponse,
    cases: Cases
  ): Cases[keyof Cases] extends (_: any) => infer R ? Unify<R> : never
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L156)

Since v4.0.0

# schemas

## schemaBodyJson

Creates a decoder that reads a response JSON body and decodes it with the supplied schema.

**Signature**

```ts
declare const schemaBodyJson: <S extends Schema.Constraint>(
  schema: S,
  options?: ParseOptions | undefined
) => <E>(
  self: HttpIncomingMessage.HttpIncomingMessage<E>
) => Effect.Effect<S["Type"], E | Schema.SchemaError, S["DecodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L35)

Since v4.0.0

## schemaBodyUrlParams

Creates a decoder that reads response URL-encoded body parameters and decodes them with the supplied schema.

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
) => <E>(self: HttpIncomingMessage.HttpIncomingMessage<E>) => Effect.Effect<A, E | Schema.SchemaError, RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L42)

Since v4.0.0

## schemaHeaders

Creates a decoder that validates and decodes response headers with the supplied schema.

**Signature**

```ts
declare const schemaHeaders: <A, I extends Readonly<Record<string, string | undefined>>, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => <E>(self: HttpIncomingMessage.HttpIncomingMessage<E>) => Effect.Effect<A, Schema.SchemaError, RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L49)

Since v4.0.0

## schemaJson

Creates a decoder for a response's status, headers, and JSON body using the supplied schema.

**Signature**

```ts
declare const schemaJson: <
  A,
  I extends {
    readonly status?: number | undefined
    readonly headers?: Readonly<Record<string, string | undefined>> | undefined
    readonly body?: unknown
  },
  RD,
  RE
>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => (self: HttpClientResponse) => Effect.Effect<A, Schema.SchemaError | Error.HttpClientError, RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L89)

Since v4.0.0

## schemaNoBody

Creates a decoder for a response's status and headers without reading a response body.

**Signature**

```ts
declare const schemaNoBody: <
  A,
  I extends { readonly status?: number | undefined; readonly headers?: Readonly<Record<string, string>> | undefined },
  RD,
  RE
>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => (self: HttpClientResponse) => Effect.Effect<A, Schema.SchemaError, RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L120)

Since v4.0.0

# type IDs

## TypeId

Type identifier for `HttpClientResponse` values.

**Signature**

```ts
declare const TypeId: "~effect/http/HttpClientResponse"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientResponse.ts#L58)

Since v4.0.0
