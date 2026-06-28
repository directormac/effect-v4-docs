---
title: HttpServerError.ts
nav_order: 252
parent: "effect"
---

## HttpServerError.ts overview

Describes failures raised while handling HTTP server requests.

`HttpServerError` covers failures that happen while accepting a request,
matching a route, running a handler, or building and sending a response.
Request-scoped failures keep the request that caused them, and response
failures keep the response being produced. This module also includes helpers
for turning failed causes or exits into HTTP responses and an annotation for
interrupts caused by client aborts.

Since v4.0.0

---

## Exports Grouped by Category

- [annotations](#annotations)
  - [ClientAbort (class)](#clientabort-class)
- [error handling](#error-handling)
  - [causeResponse](#causeresponse)
  - [causeResponseStripped](#causeresponsestripped)
  - [exitResponse](#exitresponse)
- [errors](#errors)
  - [HttpServerError (class)](#httpservererror-class)
    - [[Respondable.symbol] (method)](#respondablesymbol-method)
    - [[TypeId] (property)](#typeid-property)
    - [stack (property)](#stack-property)
  - [HttpServerErrorReason (type alias)](#httpservererrorreason-type-alias)
  - [InternalError (class)](#internalerror-class)
    - [[Respondable.symbol] (method)](#respondablesymbol-method-1)
  - [RequestError (type alias)](#requesterror-type-alias)
  - [RequestParseError (class)](#requestparseerror-class)
    - [[Respondable.symbol] (method)](#respondablesymbol-method-2)
  - [ResponseError (class)](#responseerror-class)
    - [[Respondable.symbol] (method)](#respondablesymbol-method-3)
  - [RouteNotFound (class)](#routenotfound-class)
    - [[Respondable.symbol] (method)](#respondablesymbol-method-4)
    - [[ErrorReporter.ignore] (property)](#errorreporterignore-property)
  - [ServeError (class)](#serveerror-class)
- [predicates](#predicates)
  - [isHttpServerError](#ishttpservererror)

---

# annotations

## ClientAbort (class)

Context annotation used to mark an interrupt as caused by the client aborting
the request.

**Details**

`causeResponse` uses this annotation to map a pure client abort to a `499`
response instead of a server abort response.

**Signature**

```ts
declare class ClientAbort
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L255)

Since v4.0.0

# error handling

## causeResponse

Converts a failed handler cause into the HTTP response that should be sent and
the cause that should be reported.

**Details**

Respondable failures and defects can choose their own response, defects that
are already `HttpServerResponse` values are used directly, and pure interrupts
produce either `499` for client aborts or `503` for server aborts.

**Signature**

```ts
declare const causeResponse: <E>(
  cause: Cause.Cause<E>
) => Effect.Effect<readonly [Response.HttpServerResponse, Cause.Cause<E>]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L283)

Since v4.0.0

## causeResponseStripped

Derives an HTTP response from a failed handler cause synchronously.

**Details**

If the cause contains a defect that is already an `HttpServerResponse`, that
response is used and removed from the remaining cause. Otherwise the response
defaults to `500`.

**Signature**

```ts
declare const causeResponseStripped: <E>(
  cause: Cause.Cause<E>
) => readonly [response: Response.HttpServerResponse, cause: Option.Option<Cause.Cause<E>>]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L340)

Since v4.0.0

## exitResponse

Extracts the response from a successful handler exit, or derives a response
from the failure cause.

**Signature**

```ts
declare const exitResponse: <E>(exit: Exit.Exit<Response.HttpServerResponse, E>) => Response.HttpServerResponse
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L369)

Since v4.0.0

# errors

## HttpServerError (class)

Tagged error for failures that occur while handling an HTTP server request.

**Details**

It wraps a `HttpServerErrorReason`, exposes the associated request and optional
response, and can be converted to an HTTP response through the `Respondable`
protocol.

**Signature**

```ts
declare class HttpServerError {
  constructor(props: { readonly reason: HttpServerErrorReason })
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L40)

Since v4.0.0

### [Respondable.symbol] (method)

**Signature**

```ts
declare const [Respondable.symbol]: () => Effect.Effect<Response.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L68)

### [TypeId] (property)

**Signature**

```ts
readonly [TypeId]: "~effect/http/HttpServerError"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L56)

### stack (property)

**Signature**

```ts
stack: string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L58)

## HttpServerErrorReason (type alias)

Reason carried by an `HttpServerError`, either a request-level error or a response-level error.

**Signature**

```ts
type HttpServerErrorReason = RequestError | ResponseError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L231)

Since v4.0.0

## InternalError (class)

Error describing an unexpected server-side failure while handling a request.

**Details**

When converted to a response it produces an empty `500` response.

**Signature**

```ts
declare class InternalError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L155)

Since v4.0.0

### [Respondable.symbol] (method)

Converts the server error into a `500 Internal Server Error` response.

**Signature**

```ts
declare const [Respondable.symbol]: () => Effect.Effect<Response.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L165)

Since v4.0.0

## RequestError (type alias)

Union of errors that are tied directly to an incoming server request.

**Signature**

```ts
type RequestError = RequestParseError | RouteNotFound | InternalError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L223)

Since v4.0.0

## RequestParseError (class)

Error describing a failure to parse or read an incoming request.

**Details**

When converted to a response it produces an empty `400` response.

**Signature**

```ts
declare class RequestParseError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L91)

Since v4.0.0

### [Respondable.symbol] (method)

Converts the request error into a `400 Bad Request` response.

**Signature**

```ts
declare const [Respondable.symbol]: () => Effect.Effect<Response.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L101)

Since v4.0.0

## ResponseError (class)

Error describing a failure related to an HTTP response.

**Details**

It carries the request and response involved in the failure. When converted to
a response it produces an empty `500` response.

**Signature**

```ts
declare class ResponseError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L197)

Since v4.0.0

### [Respondable.symbol] (method)

**Signature**

```ts
declare const [Respondable.symbol]: () => Effect.Effect<Response.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L203)

## RouteNotFound (class)

Error indicating that no route matched the incoming request.

**Details**

When converted to a response it produces an empty `404` response, and it is
ignored by the error reporter.

**Signature**

```ts
declare class RouteNotFound
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L125)

Since v4.0.0

### [Respondable.symbol] (method)

**Signature**

```ts
declare const [Respondable.symbol]: () => Effect.Effect<Response.HttpServerResponse, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L130)

### [ErrorReporter.ignore] (property)

**Signature**

```ts
readonly [ErrorReporter.ignore]: true
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L134)

## ServeError (class)

Error wrapping a low-level failure from the HTTP server implementation.

**Signature**

```ts
declare class ServeError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L239)

Since v4.0.0

# predicates

## isHttpServerError

Returns `true` when the supplied value is an `HttpServerError`.

**Signature**

```ts
declare const isHttpServerError: (u: unknown) => u is HttpServerError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerError.ts#L184)

Since v4.0.0
