---
title: HttpServerRequest.ts
nav_order: 253
parent: "effect"
---

## HttpServerRequest.ts overview

Provides server-side access to the current incoming HTTP request.

`HttpServerRequest` is the context service used by handlers, middleware,
schema decoders, multipart parsers, WebSocket upgrades, and adapters. A
request stores its method, URL, original URL, headers, cookies, remote
address, body stream, and platform source object. This module also includes
request conversions and schema decoders for cookies, headers, search
parameters, JSON, forms, URL-encoded bodies, and multipart bodies.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [upgradeChannel](#upgradechannel)
- [context](#context)
  - [HttpServerRequest](#httpserverrequest)
- [converting](#converting)
  - [fromClientRequest](#fromclientrequest)
  - [fromWeb](#fromweb)
  - [toClientRequest](#toclientrequest)
  - [toURL](#tourl)
  - [toWeb](#toweb)
  - [toWebResult](#towebresult)
- [fiber refs](#fiber-refs)
  - [MaxBodySize](#maxbodysize)
- [models](#models)
  - [HttpServerRequest (interface)](#httpserverrequest-interface)
- [schemas](#schemas)
  - [schemaBodyForm](#schemabodyform)
  - [schemaBodyFormJson](#schemabodyformjson)
  - [schemaBodyJson](#schemabodyjson)
  - [schemaBodyMultipart](#schemabodymultipart)
  - [schemaBodyUrlParams](#schemabodyurlparams)
  - [schemaCookies](#schemacookies)
  - [schemaHeaders](#schemaheaders)
  - [schemaSearchParams](#schemasearchparams)
- [search params](#search-params)
  - [ParsedSearchParams (class)](#parsedsearchparams-class)
  - [searchParamsFromURL](#searchparamsfromurl)
- [type IDs](#type-ids)
  - [TypeId](#typeid)

---

# accessors

## upgradeChannel

Creates a channel backed by the current request's upgraded socket.

**Details**

The channel reads incoming socket messages and writes byte chunks to the
socket, failing if the request cannot be upgraded or the socket fails.

**Signature**

```ts
declare const upgradeChannel: <IE = never>() => Channel.Channel<
  Arr.NonEmptyReadonlyArray<Uint8Array>,
  HttpServerError | IE | Socket.SocketError,
  void,
  Arr.NonEmptyReadonlyArray<string | Uint8Array | Socket.CloseEvent>,
  IE,
  unknown,
  HttpServerRequest
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L173)

Since v4.0.0

# context

## HttpServerRequest

Service tag for the active server-side HTTP request.

**When to use**

Use to access the request currently being handled by HTTP server routes and
middleware.

**Signature**

```ts
declare const HttpServerRequest: Context.Service<HttpServerRequest, HttpServerRequest>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L110)

Since v4.0.0

# converting

## fromClientRequest

Creates an `HttpServerRequest` view of an `HttpClientRequest`.

**Details**

If the client request can be converted to an absolute URL, that URL is used as
the original URL.

**Signature**

```ts
declare const fromClientRequest: (request: HttpClientRequest.HttpClientRequest) => HttpServerRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L391)

Since v4.0.0

## fromWeb

Wraps a Web `Request` as an `HttpServerRequest`.

**Details**

The request's current URL is stored without the scheme and host, while the
original Web URL remains available as `originalUrl`.

**Signature**

```ts
declare const fromWeb: (request: globalThis.Request) => HttpServerRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L410)

Since v4.0.0

## toClientRequest

Converts an `HttpServerRequest` into an `HttpClientRequest`.

**Details**

The converted request preserves the method, headers, body stream, and a URL
derived from the request when possible.

**Signature**

```ts
declare const toClientRequest: (request: HttpServerRequest) => HttpClientRequest.HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L424)

Since v4.0.0

## toURL

Attempts to construct an absolute `URL` for a server request safely.

**Details**

The host comes from the `host` header, defaulting to `localhost`, and the
protocol is `https` only when `x-forwarded-proto` is `https`; invalid URLs
return `Option.none`.

**Signature**

```ts
declare const toURL: (self: HttpServerRequest) => Option.Option<URL>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L1010)

Since v4.0.0

## toWeb

Converts an `HttpServerRequest` to a Web `Request` in `Effect`.

**Details**

The current context is used when streaming the request body into the Web
request.

**Signature**

```ts
declare const toWeb: (
  self: HttpServerRequest,
  options?: { readonly signal?: AbortSignal | undefined }
) => Effect.Effect<Request, RequestError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L1073)

Since v4.0.0

## toWebResult

Converts an `HttpServerRequest` safely to a Web `Request` as a `Result`.

**Details**

If the source is already a Web `Request`, it is returned unchanged. Otherwise
an absolute URL is derived from the request; invalid URLs fail with a
`RequestParseError`.

**Signature**

```ts
declare const toWebResult: (
  self: HttpServerRequest,
  options?: { readonly signal?: AbortSignal | undefined; readonly context?: Context.Context<never> | undefined }
) => Result.Result<Request, RequestError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L1032)

Since v4.0.0

# fiber refs

## MaxBodySize

Provides the `MaxBodySize` fiber reference for configuring request body limits.

**When to use**

Use to configure the maximum body size accepted while reading server
request bodies.

**Signature**

```ts
declare const MaxBodySize: Context.Reference<FileSystem.Size | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L50)

Since v4.0.0

# models

## HttpServerRequest (interface)

Server-side representation of an incoming HTTP request.

**Details**

It extends `HttpIncomingMessage` with request metadata, parsed cookies,
multipart accessors, WebSocket upgrade support, and a `modify` method for
creating adjusted request views.

**Signature**

```ts
export interface HttpServerRequest extends HttpIncomingMessage.HttpIncomingMessage<HttpServerError> {
  readonly [TypeId]: typeof TypeId
  readonly source: object
  readonly url: string
  readonly originalUrl: string
  readonly method: HttpMethod
  readonly cookies: ReadonlyRecord<string, string>

  readonly multipart: Effect.Effect<
    Multipart.Persisted,
    Multipart.MultipartError,
    Scope.Scope | FileSystem.FileSystem | Path.Path
  >
  readonly multipartStream: Stream.Stream<Multipart.Part, Multipart.MultipartError>

  readonly upgrade: Effect.Effect<Socket.Socket, HttpServerError>

  readonly modify: (options: {
    readonly url?: string
    readonly headers?: Headers.Headers
    readonly remoteAddress?: Option.Option<string>
  }) => HttpServerRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L73)

Since v4.0.0

# schemas

## schemaBodyForm

Decodes the current request body as form data.

**Details**

Multipart requests are persisted and decoded as multipart data; other form
requests are decoded from URL-encoded body parameters.

**Signature**

```ts
declare const schemaBodyForm: <A, I extends Partial<Multipart.Persisted>, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => Effect.Effect<
  A,
  Schema.SchemaError | Multipart.MultipartError | HttpServerError,
  Scope.Scope | Path.Path | FileSystem.FileSystem | HttpServerRequest | RD
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L268)

Since v4.0.0

## schemaBodyFormJson

Creates a decoder for a JSON value stored in a form field.

**Details**

For multipart requests, the named multipart field is decoded as JSON. For
URL-encoded requests, the named parameter is decoded as JSON and then decoded
with the supplied schema.

**Signature**

```ts
declare const schemaBodyFormJson: <A, I, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => (
  field: string
) => Effect.Effect<
  A,
  Schema.SchemaError | HttpServerError,
  Scope.Scope | Path.Path | FileSystem.FileSystem | HttpServerRequest | RD
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L345)

Since v4.0.0

## schemaBodyJson

Reads the current request body as JSON and decodes it with the supplied schema.

**Details**

The effect can fail if the body cannot be read or parsed, or if schema decoding
fails.

**Signature**

```ts
declare const schemaBodyJson: <A, I, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => Effect.Effect<A, HttpServerError | Schema.SchemaError, HttpServerRequest | RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L245)

Since v4.0.0

## schemaBodyMultipart

Persists the current multipart request body and decodes it with the supplied
schema.

**Details**

The effect requires the services needed to persist multipart files, including a
scope, file system, and path service.

**Signature**

```ts
declare const schemaBodyMultipart: <A, I extends Partial<Multipart.Persisted>, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => Effect.Effect<
  A,
  Multipart.MultipartError | Schema.SchemaError,
  HttpServerRequest | Scope.Scope | FileSystem.FileSystem | Path.Path | RD
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L318)

Since v4.0.0

## schemaBodyUrlParams

Reads the current request body as URL-encoded parameters and decodes them with
the supplied schema.

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
) => Effect.Effect<A, HttpServerError | Schema.SchemaError, HttpServerRequest | RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L293)

Since v4.0.0

## schemaCookies

Decodes a schema from the cookies of the current request.

**Signature**

```ts
declare const schemaCookies: <A, I extends Readonly<Record<string, string | undefined>>, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => Effect.Effect<A, Schema.SchemaError, RD | HttpServerRequest>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L194)

Since v4.0.0

## schemaHeaders

Decodes a schema from the headers of the current request.

**Signature**

```ts
declare const schemaHeaders: <A, I extends Readonly<Record<string, string | undefined>>, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => Effect.Effect<A, Schema.SchemaError, HttpServerRequest | RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L208)

Since v4.0.0

## schemaSearchParams

Decodes a schema from the parsed search parameters of the current request.

**Signature**

```ts
declare const schemaSearchParams: <
  A,
  I extends Readonly<Record<string, string | ReadonlyArray<string> | undefined>>,
  RD,
  RE
>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => Effect.Effect<A, Schema.SchemaError, ParsedSearchParams | RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L222)

Since v4.0.0

# search params

## ParsedSearchParams (class)

Service that contains decoded URL query parameters for the current request.

**When to use**

Use to access query parameters that have already been parsed for the current
server request.

**Details**

Each key maps to a string value, or to an array when the parameter appears more
than once.

**Signature**

```ts
declare class ParsedSearchParams
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L130)

Since v4.0.0

## searchParamsFromURL

Converts a `URL` object's search parameters into a record.

**Details**

Repeated parameters are represented as arrays in insertion order.

**Signature**

```ts
declare const searchParamsFromURL: (url: URL) => ReadonlyRecord<string, string | Array<string>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L145)

Since v4.0.0

# type IDs

## TypeId

Runtime type identifier for `HttpServerRequest` values.

**Signature**

```ts
declare const TypeId: "~effect/http/HttpServerRequest"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRequest.ts#L59)

Since v4.0.0
