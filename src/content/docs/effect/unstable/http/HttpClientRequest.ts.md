---
title: HttpClientRequest.ts
nav_order: 243
parent: "effect"
---

## HttpClientRequest.ts overview

Describes immutable outgoing HTTP client requests.

`HttpClientRequest` is the request model shared by Effect HTTP clients and
platform adapters. A request stores its method, URL, query parameters, hash,
headers, and body as structured data. This module includes constructors,
helpers for updating requests, body encoders for common payloads, and
conversions to and from Web `Request` values.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [accept](#accept)
  - [acceptJson](#acceptjson)
  - [appendUrl](#appendurl)
  - [appendUrlParam](#appendurlparam)
  - [appendUrlParams](#appendurlparams)
  - [basicAuth](#basicauth)
  - [bearerToken](#bearertoken)
  - [bodyFile](#bodyfile)
  - [bodyFormData](#bodyformdata)
  - [bodyFormDataRecord](#bodyformdatarecord)
  - [bodyJson](#bodyjson)
  - [bodyJsonUnsafe](#bodyjsonunsafe)
  - [bodyStream](#bodystream)
  - [bodyText](#bodytext)
  - [bodyUint8Array](#bodyuint8array)
  - [bodyUrlParams](#bodyurlparams)
  - [modify](#modify)
  - [prependUrl](#prependurl)
  - [removeHash](#removehash)
  - [schemaBodyJson](#schemabodyjson)
  - [setBody](#setbody)
  - [setHash](#sethash)
  - [setHeader](#setheader)
  - [setHeaders](#setheaders)
  - [setMethod](#setmethod)
  - [setUrl](#seturl)
  - [setUrlParam](#seturlparam)
  - [setUrlParams](#seturlparams)
  - [toUrl](#tourl)
  - [updateUrl](#updateurl)
- [constructors](#constructors)
  - [delete](#delete)
  - [empty](#empty)
  - [get](#get)
  - [head](#head)
  - [make](#make)
  - [makeWith](#makewith)
  - [options](#options)
  - [patch](#patch)
  - [post](#post)
  - [put](#put)
  - [trace](#trace)
- [converting](#converting)
  - [fromWeb](#fromweb)
  - [toWeb](#toweb)
  - [toWebResult](#towebresult)
- [guards](#guards)
  - [isHttpClientRequest](#ishttpclientrequest)
- [models](#models)
  - [HttpClientRequest (interface)](#httpclientrequest-interface)
- [options](#options-1)
  - [Options (interface)](#options-interface)
- [utils](#utils)
  - [Options (namespace)](#options-namespace)
    - [NoUrl (interface)](#nourl-interface)

---

# combinators

## accept

Sets the `Accept` header to the specified media type.

**Signature**

```ts
declare const accept: {
  (mediaType: string): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, mediaType: string): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L376)

Since v4.0.0

## acceptJson

Sets the `Accept` header to `application/json`.

**Signature**

```ts
declare const acceptJson: (self: HttpClientRequest) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L387)

Since v4.0.0

## appendUrl

Appends a URL segment to the request URL, inserting or trimming one slash as needed.

**Signature**

```ts
declare const appendUrl: {
  (path: string): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, path: string): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L451)

Since v4.0.0

## appendUrlParam

Appends one query parameter value without removing existing values for the same name.

**Signature**

```ts
declare const appendUrlParam: {
  (key: string, value: string): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, key: string, value: string): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L541)

Since v4.0.0

## appendUrlParams

Appends query parameters from an input collection without removing existing values for matching names.

**Signature**

```ts
declare const appendUrlParams: {
  (input: UrlParams.Input): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, input: UrlParams.Input): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L560)

Since v4.0.0

## basicAuth

Sets the `Authorization` header using HTTP Basic authentication credentials.

**Signature**

```ts
declare const basicAuth: {
  (
    username: string | Redacted.Redacted,
    password: string | Redacted.Redacted
  ): (self: HttpClientRequest) => HttpClientRequest
  (
    self: HttpClientRequest,
    username: string | Redacted.Redacted,
    password: string | Redacted.Redacted
  ): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L335)

Since v4.0.0

## bearerToken

Sets the `Authorization` header using a bearer token.

**Signature**

```ts
declare const bearerToken: {
  (token: string | Redacted.Redacted): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, token: string | Redacted.Redacted): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L361)

Since v4.0.0

## bodyFile

Creates a file-backed request body from a filesystem path and sets it on the request.

**Signature**

```ts
declare const bodyFile: {
  (
    path: string,
    options?: {
      readonly bytesToRead?: FileSystem.SizeInput | undefined
      readonly chunkSize?: FileSystem.SizeInput | undefined
      readonly offset?: FileSystem.SizeInput | undefined
      readonly contentType?: string
    }
  ): (self: HttpClientRequest) => Effect.Effect<HttpClientRequest, PlatformError.PlatformError, FileSystem.FileSystem>
  (
    self: HttpClientRequest,
    path: string,
    options?: {
      readonly bytesToRead?: FileSystem.SizeInput | undefined
      readonly chunkSize?: FileSystem.SizeInput | undefined
      readonly offset?: FileSystem.SizeInput | undefined
      readonly contentType?: string
    }
  ): Effect.Effect<HttpClientRequest, PlatformError.PlatformError, FileSystem.FileSystem>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L811)

Since v4.0.0

## bodyFormData

Sets a `FormData` request body.

**Signature**

```ts
declare const bodyFormData: {
  (body: FormData): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, body: FormData): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L756)

Since v4.0.0

## bodyFormDataRecord

Creates a `FormData` request body from record-style entries and sets it on the request.

**Signature**

```ts
declare const bodyFormDataRecord: {
  (entries: HttpBody.FormDataInput): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, entries: HttpBody.FormDataInput): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L767)

Since v4.0.0

## bodyJson

Encodes a value as a JSON request body and sets it on the request, failing with `HttpBodyError` if encoding fails.

**Signature**

```ts
declare const bodyJson: {
  (body: unknown): (self: HttpClientRequest) => Effect.Effect<HttpClientRequest, HttpBody.HttpBodyError>
  (self: HttpClientRequest, body: unknown): Effect.Effect<HttpClientRequest, HttpBody.HttpBodyError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L675)

Since v4.0.0

## bodyJsonUnsafe

Sets a JSON request body using unsafe JSON encoding.

**When to use**

Use when the request body is known to be JSON-serializable and a synchronous
`HttpClientRequest` result is needed.

**Gotchas**

JSON encoding may throw instead of failing in the Effect error channel.

**Signature**

```ts
declare const bodyJsonUnsafe: {
  (body: unknown): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, body: unknown): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L699)

Since v4.0.0

## bodyStream

Sets a streaming `Uint8Array` request body with optional content type and content length metadata.

**Signature**

```ts
declare const bodyStream: {
  (
    body: Stream.Stream<Uint8Array, unknown>,
    options?: { readonly contentType?: string | undefined; readonly contentLength?: number | undefined } | undefined
  ): (self: HttpClientRequest) => HttpClientRequest
  (
    self: HttpClientRequest,
    body: Stream.Stream<Uint8Array, unknown>,
    options?: { readonly contentType?: string | undefined; readonly contentLength?: number | undefined } | undefined
  ): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L782)

Since v4.0.0

## bodyText

Sets a text request body with an optional content type.

**Signature**

```ts
declare const bodyText: {
  (body: string, contentType?: string): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, body: string, contentType?: string): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L660)

Since v4.0.0

## bodyUint8Array

Sets a `Uint8Array` request body with an optional content type.

**Signature**

```ts
declare const bodyUint8Array: {
  (body: Uint8Array, contentType?: string): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, body: Uint8Array, contentType?: string): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L645)

Since v4.0.0

## bodyUrlParams

Sets an `application/x-www-form-urlencoded` request body from URL parameter input.

**Signature**

```ts
declare const bodyUrlParams: {
  (input: UrlParams.Input): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, input: UrlParams.Input): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L741)

Since v4.0.0

## modify

Applies request options to an `HttpClientRequest`, returning a new request.

**Signature**

```ts
declare const modify: {
  (options: Options): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, options: Options): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L242)

Since v4.0.0

## prependUrl

Prepends a URL segment to the request URL, inserting or trimming one slash as needed.

**Signature**

```ts
declare const prependUrl: {
  (path: string): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, path: string): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L430)

Since v4.0.0

## removeHash

Removes the URL fragment from a request.

**Signature**

```ts
declare const removeHash: (self: HttpClientRequest) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L598)

Since v4.0.0

## schemaBodyJson

Creates a schema-based JSON body encoder that sets the encoded value on a request.

**Signature**

```ts
declare const schemaBodyJson: <S extends Schema.Constraint>(
  schema: S,
  options?: ParseOptions | undefined
) => {
  (
    body: S["Type"]
  ): (self: HttpClientRequest) => Effect.Effect<HttpClientRequest, HttpBody.HttpBodyError, S["EncodingServices"]>
  (
    self: HttpClientRequest,
    body: S["Type"]
  ): Effect.Effect<HttpClientRequest, HttpBody.HttpBodyError, S["EncodingServices"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L710)

Since v4.0.0

## setBody

Sets the request body and updates `Content-Type` and `Content-Length` headers from the body metadata when available.

**Signature**

```ts
declare const setBody: {
  (body: HttpBody.HttpBody): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, body: HttpBody.HttpBody): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L614)

Since v4.0.0

## setHash

Sets the URL fragment on a request without the leading `#`.

**Signature**

```ts
declare const setHash: {
  (hash: string): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, hash: string): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L579)

Since v4.0.0

## setHeader

Sets a single request header, replacing any existing value for that header.

**Signature**

```ts
declare const setHeader: {
  (key: string, value: string): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, key: string, value: string): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L297)

Since v4.0.0

## setHeaders

Sets multiple request headers from an input collection, replacing existing values with matching names.

**Signature**

```ts
declare const setHeaders: {
  (input: Headers.Input): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, input: Headers.Input): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L316)

Since v4.0.0

## setMethod

Sets the HTTP method on a request, returning a new request.

**Signature**

```ts
declare const setMethod: {
  (method: HttpMethod): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, method: HttpMethod): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L282)

Since v4.0.0

## setUrl

Sets the request URL. When given a `URL`, its search parameters and hash are extracted into the request's structured fields.

**Signature**

```ts
declare const setUrl: {
  (url: string | URL): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, url: string | URL): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L395)

Since v4.0.0

## setUrlParam

Sets one query parameter, replacing existing values for that parameter name.

**Signature**

```ts
declare const setUrlParam: {
  (key: string, value: string): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, key: string, value: string): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L503)

Since v4.0.0

## setUrlParams

Sets query parameters from an input collection, replacing existing values for matching names.

**Signature**

```ts
declare const setUrlParams: {
  (input: UrlParams.Input): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, input: UrlParams.Input): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L522)

Since v4.0.0

## toUrl

Builds a `URL` from the request URL, query parameters, and hash, returning `Option.none()` if the URL is invalid.

**Signature**

```ts
declare const toUrl: (self: HttpClientRequest) => Option.Option<URL>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L855)

Since v4.0.0

## updateUrl

Updates the request URL by applying a function to the current URL string.

**Signature**

```ts
declare const updateUrl: {
  (f: (url: string) => string): (self: HttpClientRequest) => HttpClientRequest
  (self: HttpClientRequest, f: (url: string) => string): HttpClientRequest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L484)

Since v4.0.0

# constructors

## delete

Creates a `DELETE` request for the specified URL.

**Signature**

```ts
declare const delete: (url: string | URL, options?: Options.NoUrl) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L209)

Since v4.0.0

## empty

An empty `GET` request with no URL, query parameters, hash, headers, or body.

**Signature**

```ts
declare const empty: HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L140)

Since v4.0.0

## get

Creates a `GET` request for the specified URL.

**Signature**

```ts
declare const get: (url: string | URL, options?: Options.NoUrl) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L174)

Since v4.0.0

## head

Creates a `HEAD` request for the specified URL.

**Signature**

```ts
declare const head: (url: string | URL, options?: Options.NoUrl) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L218)

Since v4.0.0

## make

Creates a request constructor for the specified HTTP method.

**Signature**

```ts
declare const make: <M extends HttpMethod>(
  method: M
) => (url: string | URL, options?: Options.NoUrl | undefined) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L155)

Since v4.0.0

## makeWith

Constructs an `HttpClientRequest` from fully normalized request components.

**Signature**

```ts
declare const makeWith: (
  method: HttpMethod,
  url: string,
  urlParams: UrlParams.UrlParams,
  hash: Option.Option<string>,
  headers: Headers.Headers,
  body: HttpBody.HttpBody
) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L116)

Since v4.0.0

## options

Creates an `OPTIONS` request for the specified URL.

**Signature**

```ts
declare const options: (url: string | URL, options?: Options.NoUrl) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L226)

Since v4.0.0

## patch

Creates a `PATCH` request for the specified URL.

**Signature**

```ts
declare const patch: (url: string | URL, options?: Options.NoUrl) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L190)

Since v4.0.0

## post

Creates a `POST` request for the specified URL.

**Signature**

```ts
declare const post: (url: string | URL, options?: Options.NoUrl) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L182)

Since v4.0.0

## put

Creates a `PUT` request for the specified URL.

**Signature**

```ts
declare const put: (url: string | URL, options?: Options.NoUrl) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L198)

Since v4.0.0

## trace

Creates a `TRACE` request for the specified URL.

**Signature**

```ts
declare const trace: (url: string | URL, options?: Options.NoUrl) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L234)

Since v4.0.0

# converting

## fromWeb

Converts a Web `Request` into an `HttpClientRequest`, preserving method, URL, headers, and supported request bodies.

**Signature**

```ts
declare const fromWeb: (request: globalThis.Request) => HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L869)

Since v4.0.0

## toWeb

Converts an `HttpClientRequest` to a Web `Request`, failing with `UrlParamsError` when the request URL is invalid.

**Signature**

```ts
declare const toWeb: (
  self: HttpClientRequest,
  options?: { readonly signal?: AbortSignal | undefined }
) => Effect.Effect<Request, UrlParams.UrlParamsError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L960)

Since v4.0.0

## toWebResult

Converts an `HttpClientRequest` safely to a Web `Request` as a `Result`, failing when the request URL is invalid.

**Signature**

```ts
declare const toWebResult: (
  self: HttpClientRequest,
  options?: { readonly signal?: AbortSignal | undefined; readonly context?: Context.Context<never> | undefined }
) => Result.Result<Request, UrlParams.UrlParamsError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L903)

Since v4.0.0

# guards

## isHttpClientRequest

Returns `true` when a value is an `HttpClientRequest`.

**Signature**

```ts
declare const isHttpClientRequest: (u: unknown) => u is HttpClientRequest
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L41)

Since v4.0.0

# models

## HttpClientRequest (interface)

Immutable model of an outgoing HTTP client request, including its method, URL components, headers, and body.

**Signature**

```ts
export interface HttpClientRequest extends Inspectable.Inspectable, Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly method: HttpMethod
  readonly url: string
  readonly urlParams: UrlParams.UrlParams
  readonly hash: Option.Option<string>
  readonly headers: Headers.Headers
  readonly body: HttpBody.HttpBody
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L49)

Since v4.0.0

# options

## Options (interface)

Options for constructing or modifying an `HttpClientRequest`.

**Signature**

```ts
export interface Options {
  readonly method?: HttpMethod | undefined
  readonly url?: string | URL | undefined
  readonly urlParams?: UrlParams.Input | undefined
  readonly hash?: string | undefined
  readonly headers?: Headers.Input | undefined
  readonly body?: HttpBody.HttpBody | undefined
  readonly accept?: string | undefined
  readonly acceptJson?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L65)

Since v4.0.0

# utils

## Options (namespace)

Namespace containing option types associated with `HttpClientRequest` construction.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L81)

Since v4.0.0

### NoUrl (interface)

Request options that omit the method and URL for helpers that already receive those values separately.

**Signature**

```ts
export interface NoUrl extends Omit<Options, "method" | "url"> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClientRequest.ts#L88)

Since v4.0.0
