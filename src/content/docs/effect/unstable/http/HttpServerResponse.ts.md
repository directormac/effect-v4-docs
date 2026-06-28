---
title: HttpServerResponse.ts
nav_order: 255
parent: "effect"
---

## HttpServerResponse.ts overview

Describes immutable responses returned by Effect HTTP handlers.

An `HttpServerResponse` stores the status, optional status text, headers,
cookies, and body that the server runtime later turns into a platform
response such as a Web `Response`. This module includes constructors for
common response bodies, helpers for updating response data, file response
support through `HttpPlatform`, and conversions to or from Web and Effect
HTTP client responses.

Since v4.0.0

---

## Exports Grouped by Category

- [combinators](#combinators)
  - [expireCookie](#expirecookie)
  - [expireCookieUnsafe](#expirecookieunsafe)
  - [mergeCookies](#mergecookies)
  - [removeCookie](#removecookie)
  - [replaceCookies](#replacecookies)
  - [setBody](#setbody)
  - [setCookie](#setcookie)
  - [setCookieUnsafe](#setcookieunsafe)
  - [setCookies](#setcookies)
  - [setCookiesUnsafe](#setcookiesunsafe)
  - [setHeader](#setheader)
  - [setHeaders](#setheaders)
  - [setStatus](#setstatus)
  - [updateCookies](#updatecookies)
- [constructors](#constructors)
  - [empty](#empty)
  - [file](#file)
  - [fileWeb](#fileweb)
  - [formData](#formdata)
  - [html](#html)
  - [htmlStream](#htmlstream)
  - [json](#json)
  - [jsonUnsafe](#jsonunsafe)
  - [raw](#raw)
  - [redirect](#redirect)
  - [schemaJson](#schemajson)
  - [stream](#stream)
  - [text](#text)
  - [uint8Array](#uint8array)
  - [urlParams](#urlparams)
- [converting](#converting)
  - [fromClientResponse](#fromclientresponse)
  - [fromWeb](#fromweb)
  - [toClientResponse](#toclientresponse)
  - [toWeb](#toweb)
- [guards](#guards)
  - [isHttpServerResponse](#ishttpserverresponse)
- [models](#models)
  - [HttpServerResponse (interface)](#httpserverresponse-interface)
- [options](#options)
  - [Options (interface)](#options-interface)
- [utils](#utils)
  - [Options (namespace)](#options-namespace)
    - [WithContent (interface)](#withcontent-interface)
    - [WithContentType (interface)](#withcontenttype-interface)

---

# combinators

## expireCookie

Sets an expired cookie on an `HttpServerResponse`.

**Details**

Returns an effect because cookie encoding can fail. The original response is not
mutated; the effect succeeds with a response containing the updated cookie set.

**Signature**

```ts
declare const expireCookie: {
  (
    name: string,
    options?: Omit<NonNullable<Cookies.Cookie["options"]>, "expires" | "maxAge">
  ): (self: HttpServerResponse) => Effect.Effect<HttpServerResponse, Cookies.CookiesError>
  (
    self: HttpServerResponse,
    name: string,
    options?: Omit<NonNullable<Cookies.Cookie["options"]>, "expires" | "maxAge">
  ): Effect.Effect<HttpServerResponse, Cookies.CookiesError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L643)

Since v4.0.0

## expireCookieUnsafe

Sets an expired cookie on an `HttpServerResponse`, throwing if the expiration cookie
cannot be encoded.

**When to use**

Use when you need to expire one trusted cookie and want encoding failures to
throw instead of being represented as `CookiesError` failures.

**Signature**

```ts
declare const expireCookieUnsafe: {
  (
    name: string,
    options?: Omit<NonNullable<Cookies.Cookie["options"]>, "expires" | "maxAge">
  ): (self: HttpServerResponse) => HttpServerResponse
  (
    self: HttpServerResponse,
    name: string,
    options?: Omit<NonNullable<Cookies.Cookie["options"]>, "expires" | "maxAge">
  ): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L722)

Since v4.0.0

## mergeCookies

Merges additional cookies into the cookies attached to an
`HttpServerResponse`.

**Details**

The original response is not mutated; a new response is returned with the merged
cookie collection.

**Signature**

```ts
declare const mergeCookies: {
  (cookies: Cookies.Cookies): (self: HttpServerResponse) => HttpServerResponse
  (self: HttpServerResponse, cookies: Cookies.Cookies): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L789)

Since v4.0.0

## removeCookie

Returns a response with the cookie of the specified name removed.

**Signature**

```ts
declare const removeCookie: {
  (name: string): (self: HttpServerResponse) => HttpServerResponse
  (self: HttpServerResponse, name: string): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L563)

Since v4.0.0

## replaceCookies

Returns a response with its cookie collection replaced by the supplied cookies.

**Signature**

```ts
declare const replaceCookies: {
  (cookies: Cookies.Cookies): (self: HttpServerResponse) => HttpServerResponse
  (self: HttpServerResponse, cookies: Cookies.Cookies): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L581)

Since v4.0.0

## setBody

Replaces the body of an `HttpServerResponse`.

**Details**

When the body carries a content type or content length, the returned response
includes the corresponding headers.

**Signature**

```ts
declare const setBody: {
  (body: Body.HttpBody): (self: HttpServerResponse) => HttpServerResponse
  (self: HttpServerResponse, body: Body.HttpBody): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L911)

Since v4.0.0

## setCookie

Sets a cookie on the response.

**Details**

The effect fails with `CookiesError` if the cookie name, value, or options are
invalid.

**Signature**

```ts
declare const setCookie: {
  (
    name: string,
    value: string,
    options?: Cookies.Cookie["options"]
  ): (self: HttpServerResponse) => Effect.Effect<HttpServerResponse, Cookies.CookiesError>
  (
    self: HttpServerResponse,
    name: string,
    value: string,
    options?: Cookies.Cookie["options"]
  ): Effect.Effect<HttpServerResponse, Cookies.CookiesError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L600)

Since v4.0.0

## setCookieUnsafe

Sets a cookie on an `HttpServerResponse`, throwing if the cookie cannot be
encoded.

**When to use**

Use when you need to set one trusted cookie and want encoding failures to
throw instead of being represented as `CookiesError` failures.

**Signature**

```ts
declare const setCookieUnsafe: {
  (name: string, value: string, options?: Cookies.Cookie["options"]): (self: HttpServerResponse) => HttpServerResponse
  (self: HttpServerResponse, name: string, value: string, options?: Cookies.Cookie["options"]): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L684)

Since v4.0.0

## setCookies

Sets multiple cookies on an `HttpServerResponse`.

**Details**

Each input entry contains a cookie name, value, and optional cookie options. The
returned effect fails with `CookiesError` if any cookie cannot be encoded.

**Signature**

```ts
declare const setCookies: {
  (
    cookies: Iterable<readonly [name: string, value: string, options?: Cookies.Cookie["options"]]>
  ): (self: HttpServerResponse) => Effect.Effect<HttpServerResponse, Cookies.CookiesError, never>
  (
    self: HttpServerResponse,
    cookies: Iterable<readonly [name: string, value: string, options?: Cookies.Cookie["options"]]>
  ): Effect.Effect<HttpServerResponse, Cookies.CookiesError, never>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L809)

Since v4.0.0

## setCookiesUnsafe

Sets multiple cookies on an `HttpServerResponse`, throwing if any cookie cannot
be encoded.

**When to use**

Use when you need to set multiple trusted cookies and want encoding failures
to throw instead of being represented as `CookiesError` failures.

**Signature**

```ts
declare const setCookiesUnsafe: {
  (
    cookies: Iterable<readonly [name: string, value: string, options?: Cookies.Cookie["options"]]>
  ): (self: HttpServerResponse) => HttpServerResponse
  (
    self: HttpServerResponse,
    cookies: Iterable<readonly [name: string, value: string, options?: Cookies.Cookie["options"]]>
  ): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L862)

Since v4.0.0

## setHeader

Returns a response with the specified header set to the supplied value.

**Signature**

```ts
declare const setHeader: {
  (key: string, value: string): (self: HttpServerResponse) => HttpServerResponse
  (self: HttpServerResponse, key: string, value: string): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L524)

Since v4.0.0

## setHeaders

Returns a response with all supplied headers set on the existing header map.

**Signature**

```ts
declare const setHeaders: {
  (input: Headers.Input): (self: HttpServerResponse) => HttpServerResponse
  (self: HttpServerResponse, input: Headers.Input): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L545)

Since v4.0.0

## setStatus

Sets the HTTP status code of an `HttpServerResponse`.

**Details**

When `statusText` is omitted, the existing status text is preserved.

**Signature**

```ts
declare const setStatus: {
  (status: number, statusText?: string | undefined): (self: HttpServerResponse) => HttpServerResponse
  (self: HttpServerResponse, status: number, statusText?: string | undefined): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L929)

Since v4.0.0

## updateCookies

Updates the cookies attached to an `HttpServerResponse` using the supplied
function.

**Details**

The original response is not mutated; a new response is returned with the
callback result as its cookie collection.

**Signature**

```ts
declare const updateCookies: {
  (f: (cookies: Cookies.Cookies) => Cookies.Cookies): (self: HttpServerResponse) => HttpServerResponse
  (self: HttpServerResponse, f: (cookies: Cookies.Cookies) => Cookies.Cookies): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L757)

Since v4.0.0

# constructors

## empty

Creates an empty HTTP response.

**Details**

The default status is `204`.

**Signature**

```ts
declare const empty: (options?: Options.WithContent | undefined) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L121)

Since v4.0.0

## file

Creates a streamed file response for a file system path.

**Details**

The effect requires `HttpPlatform`, can fail with a platform error, and supports
options for status, headers, offset, and byte range.

**Signature**

```ts
declare const file: (
  path: string,
  options?:
    | (Options & {
        readonly bytesToRead?: FileSystem.SizeInput | undefined
        readonly chunkSize?: FileSystem.SizeInput | undefined
        readonly offset?: FileSystem.SizeInput | undefined
      })
    | undefined
) => Effect.Effect<HttpServerResponse, PlatformError, HttpPlatform>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L483)

Since v4.0.0

## fileWeb

Creates a streamed file response for a Web `File`-like value.

**Details**

The effect requires `HttpPlatform` and supports options for status, headers,
offset, and byte range.

**Signature**

```ts
declare const fileWeb: (
  file: Body.HttpBody.FileLike,
  options?:
    | (Options.WithContent & {
        readonly bytesToRead?: FileSystem.SizeInput | undefined
        readonly chunkSize?: FileSystem.SizeInput | undefined
        readonly offset?: FileSystem.SizeInput | undefined
      })
    | undefined
) => Effect.Effect<HttpServerResponse, never, HttpPlatform>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L506)

Since v4.0.0

## formData

Creates a response whose body is a Web `FormData` value.

**Signature**

```ts
declare const formData: (body: FormData, options?: Options.WithContent | undefined) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L424)

Since v4.0.0

## html

Creates an HTML response with the `text/html` content type.

**Details**

Passing a string returns a response directly. Using it as a template tag returns
an effect so interpolated values can be rendered with their required services
and errors.

**Signature**

```ts
declare const html: {
  <A extends ReadonlyArray<Template.Interpolated>>(
    strings: TemplateStringsArray,
    ...args: A
  ): Effect.Effect<HttpServerResponse, Template.Interpolated.Error<A[number]>, Template.Interpolated.Context<A[number]>>
  (html: string): HttpServerResponse
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L224)

Since v4.0.0

## htmlStream

Creates a streaming HTML response from a template.

**Details**

The template is encoded as a byte stream and can use streaming interpolated
values from the current context.

**Signature**

```ts
declare const htmlStream: <A extends ReadonlyArray<Template.InterpolatedWithStream>>(
  strings: TemplateStringsArray,
  ...args: A
) => Effect.Effect<HttpServerResponse, never, Template.Interpolated.Context<A[number]>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L256)

Since v4.0.0

## json

Creates a JSON HTTP response.

**Details**

The body is serialized with `JSON.stringify`; serialization errors are captured
as `HttpBodyError` failures.

**Signature**

```ts
declare const json: (
  body: unknown,
  options?: Options.WithContentType | undefined
) => Effect.Effect<HttpServerResponse, Body.HttpBodyError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L289)

Since v4.0.0

## jsonUnsafe

Creates a JSON HTTP response synchronously.

**When to use**

Use when the response body is known to be JSON-serializable and you need a
synchronous `HttpServerResponse`.

**Gotchas**

Unlike `json`, serialization errors from `JSON.stringify` are not captured in
`Effect`.

**Signature**

```ts
declare const jsonUnsafe: (body: unknown, options?: Options.WithContentType | undefined) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L353)

Since v4.0.0

## raw

Creates a response with a raw body value.

**When to use**

Use when you want to pass through a body value already understood by the
underlying runtime, such as a Web `Response`, `Blob`, or `ReadableStream`,
for later platform conversion.

**Signature**

```ts
declare const raw: (body: unknown, options?: Options | undefined) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L403)

Since v4.0.0

## redirect

Creates a redirect response with a `Location` header.

**Details**

The default status is `302`; custom headers are merged with the generated
`Location` header.

**Signature**

```ts
declare const redirect: (location: string | URL, options?: Options.WithContent | undefined) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L142)

Since v4.0.0

## schemaJson

Creates a JSON response constructor backed by a schema encoder.

**Details**

The returned function encodes the value with the supplied schema before
serializing it as JSON, and can fail with `HttpBodyError` if schema encoding or
JSON serialization fails.

**Signature**

```ts
declare const schemaJson: <A, I, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => (
  body: A,
  options?: Options.WithContentType | undefined
) => Effect.Effect<HttpServerResponse, Body.HttpBodyError, RE>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L316)

Since v4.0.0

## stream

Creates a streaming response from a stream of byte chunks.

**Details**

Optional response metadata can supply the status, headers, content type, and
content length.

**Signature**

```ts
declare const stream: <E>(body: Stream.Stream<Uint8Array, E>, options?: Options | undefined) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L447)

Since v4.0.0

## text

Creates an HTTP response whose body is a string.

**Signature**

```ts
declare const text: (body: string, options?: Options.WithContentType) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L196)

Since v4.0.0

## uint8Array

Creates an HTTP response whose body is a `Uint8Array`.

**Signature**

```ts
declare const uint8Array: (body: Uint8Array, options?: Options.WithContentType) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L163)

Since v4.0.0

## urlParams

Creates a response from URL parameters using the
`application/x-www-form-urlencoded` content type by default.

**Signature**

```ts
declare const urlParams: (body: UrlParams.Input, options?: Options.WithContentType | undefined) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L374)

Since v4.0.0

# converting

## fromClientResponse

Converts an `HttpClientResponse` to an `HttpServerResponse`.

**Details**

The response body is streamed from the client response. `Set-Cookie` headers are
removed from the header map and represented in the response cookie collection.

**Signature**

```ts
declare const fromClientResponse: (response: HttpClientResponse.HttpClientResponse) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L1264)

Since v4.0.0

## fromWeb

Converts a Web `Response` to an `HttpServerResponse`.

**Details**

`Set-Cookie` headers are parsed into the response cookie collection and removed
from the header map. A present Web body is exposed as a stream body.

**Signature**

```ts
declare const fromWeb: (response: Response) => HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L1357)

Since v4.0.0

## toClientResponse

Wraps an `HttpServerResponse` as an `HttpClientResponse`.

**Details**

An optional request can be supplied for client-response metadata and decode
errors.

**Signature**

```ts
declare const toClientResponse: (
  response: HttpServerResponse,
  options?: { readonly request?: HttpClientRequest.HttpClientRequest | undefined }
) => HttpClientResponse.HttpClientResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L1043)

Since v4.0.0

## toWeb

Converts an `HttpServerResponse` to a Web `Response`.

**Details**

Cookies are appended as `Set-Cookie` headers. Stream bodies are converted using
the supplied context, and `withoutBody` can be used for responses such as HEAD
responses.

**Signature**

```ts
declare const toWeb: (
  response: HttpServerResponse,
  options?: { readonly withoutBody?: boolean | undefined; readonly context?: Context.Context<never> | undefined }
) => Response
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L965)

Since v4.0.0

# guards

## isHttpServerResponse

Returns `true` when the supplied value is an `HttpServerResponse`.

**Signature**

```ts
declare const isHttpServerResponse: (u: unknown) => u is HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L109)

Since v4.0.0

# models

## HttpServerResponse (interface)

Server-side HTTP response model.

**Details**

A response contains a status, optional status text, headers, cookies, and an
HTTP body that can later be converted to platform-specific response types.

**Signature**

```ts
export interface HttpServerResponse extends Inspectable.Inspectable, Pipeable, ErrorReporter.Reportable {
  readonly [TypeId]: typeof TypeId
  readonly status: number
  readonly statusText?: string | undefined
  readonly headers: Headers.Headers
  readonly cookies: Cookies.Cookies
  readonly body: Body.HttpBody
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L53)

Since v4.0.0

# options

## Options (interface)

Common options accepted by HTTP server response constructors.

**Signature**

```ts
export interface Options {
  readonly status?: number | undefined
  readonly statusText?: string | undefined
  readonly headers?: Headers.Input | undefined
  readonly cookies?: Cookies.Cookies | undefined
  readonly contentType?: string | undefined
  readonly contentLength?: number | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L68)

Since v4.0.0

# utils

## Options (namespace)

Option variants used by response constructors with different body metadata
rules.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L83)

Since v4.0.0

### WithContent (interface)

Response options for constructors whose body determines its own content type
and content length.

**Signature**

```ts
export interface WithContent extends Omit<Options, "contentType" | "contentLength"> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L91)

Since v4.0.0

### WithContentType (interface)

Response options for constructors that allow overriding the content type while
deriving the content length from the body.

**Signature**

```ts
export interface WithContentType extends Omit<Options, "contentLength"> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerResponse.ts#L100)

Since v4.0.0
