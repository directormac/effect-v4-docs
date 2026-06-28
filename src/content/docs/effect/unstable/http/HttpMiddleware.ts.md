---
title: HttpMiddleware.ts
nav_order: 248
parent: "effect"
---

## HttpMiddleware.ts overview

Wraps HTTP server apps with request and response behavior.

A middleware is a function from one HTTP server app effect to another. The app
runs with the current `HttpServerRequest` in its context, so middleware can
inspect or rewrite the request, provide request-scoped services, attach hooks
before the response is sent, or observe the app exit. This module includes
middleware for response logging, server tracing, forwarded proxy headers,
parsed search parameters, and CORS response headers.

Since v4.0.0

---

## Exports Grouped by Category

- [CORS](#cors)
  - [cors](#cors-1)
- [Logger](#logger)
  - [logger](#logger-1)
  - [withLoggerDisabled](#withloggerdisabled)
- [Proxying](#proxying)
  - [xForwardedHeaders](#xforwardedheaders)
- [Tracer](#tracer)
  - [SpanNameGenerator](#spannamegenerator)
  - [TracerDisabledWhen](#tracerdisabledwhen)
  - [layerTracerDisabledForUrls](#layertracerdisabledforurls)
  - [tracer](#tracer-1)
- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [HttpMiddleware (interface)](#httpmiddleware-interface)
- [search params](#search-params)
  - [searchParamsParser](#searchparamsparser)
- [utils](#utils)
  - [HttpMiddleware (namespace)](#httpmiddleware-namespace)
    - [Applied (interface)](#applied-interface)

---

# CORS

## cors

Middleware that handles CORS preflight requests and adds configured CORS headers to HTTP responses.

**Signature**

```ts
declare const cors: (options?: {
  readonly allowedOrigins?: ReadonlyArray<string> | Predicate<string> | undefined
  readonly allowedMethods?: ReadonlyArray<string> | undefined
  readonly allowedHeaders?: ReadonlyArray<string> | undefined
  readonly exposedHeaders?: ReadonlyArray<string> | undefined
  readonly maxAge?: number | undefined
  readonly credentials?: boolean | undefined
}) => <E, R>(
  httpApp: Effect.Effect<HttpServerResponse, E, R>
) => Effect.Effect<HttpServerResponse, E, R | HttpServerRequest>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L289)

Since v4.0.0

# Logger

## logger

Middleware that logs sent HTTP responses with request method, request URL, and response status annotations.

**Signature**

```ts
declare const logger: <E, R>(
  httpApp: Effect.Effect<HttpServerResponse, E, HttpServerRequest | R>
) => Effect.Effect<HttpServerResponse, E, HttpServerRequest | R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L135)

Since v4.0.0

## withLoggerDisabled

Runs an effect with HTTP response logging disabled for the current server request.

**Signature**

```ts
declare const withLoggerDisabled: <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R | HttpServerRequest>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L90)

Since v4.0.0

# Proxying

## xForwardedHeaders

Middleware that trusts `X-Forwarded-Host` and `X-Forwarded-For`, updating the request host header and remote address.

**Signature**

```ts
declare const xForwardedHeaders: <E, R>(
  httpApp: Effect.Effect<Response.HttpServerResponse, E, HttpServerRequest | R>
) => Effect.Effect<Response.HttpServerResponse, E, HttpServerRequest | R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L249)

Since v4.0.0

# Tracer

## SpanNameGenerator

Context reference for generating server span names from HTTP server requests.

**Signature**

```ts
declare const SpanNameGenerator: Context.Reference<(request: HttpServerRequest) => string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L124)

Since v4.0.0

## TracerDisabledWhen

Context reference for a predicate that disables server-side tracing for matching requests.

**Signature**

```ts
declare const TracerDisabledWhen: Context.Reference<Predicate<HttpServerRequest>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L103)

Since v4.0.0

## layerTracerDisabledForUrls

Creates a layer that disables server-side tracing for requests whose URL exactly matches one of the supplied URLs.

**Signature**

```ts
declare const layerTracerDisabledForUrls: (urls: ReadonlyArray<string>) => Layer.Layer<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L114)

Since v4.0.0

## tracer

Middleware that creates a server trace span for each request and records request and response HTTP attributes.

**Signature**

```ts
declare const tracer: <E, R>(
  httpApp: Effect.Effect<HttpServerResponse, E, HttpServerRequest | R>
) => Effect.Effect<HttpServerResponse, E, HttpServerRequest | R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L176)

Since v4.0.0

# constructors

## make

Defines an `HttpMiddleware` while preserving its precise type.

**Signature**

```ts
declare const make: <M extends HttpMiddleware>(middleware: M) => M
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L67)

Since v4.0.0

# models

## HttpMiddleware (interface)

Middleware that transforms an HTTP server app effect into another HTTP server app effect.

**Signature**

```ts
export interface HttpMiddleware {
  <E, R>(self: Effect.Effect<HttpServerResponse, E, R | HttpServerRequest>): Effect.Effect<HttpServerResponse, any, any>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L40)

Since v4.0.0

# search params

## searchParamsParser

Middleware that parses the current request URL's search parameters and provides them as `ParsedSearchParams`.

**Signature**

```ts
declare const searchParamsParser: <E, R>(
  httpApp: Effect.Effect<HttpServerResponse, E, R>
) => Effect.Effect<Response.HttpServerResponse, E, HttpServerRequest | Exclude<R, Request.ParsedSearchParams>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L269)

Since v4.0.0

# utils

## HttpMiddleware (namespace)

Namespace containing types associated with `HttpMiddleware`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L49)

Since v4.0.0

### Applied (interface)

Callable type representing middleware already specialized to a particular transformed app type.

**Signature**

```ts
export interface Applied<A extends Effect.Effect<HttpServerResponse, any, any>, E, R> {
  (self: Effect.Effect<HttpServerResponse, E, R>): A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpMiddleware.ts#L56)

Since v4.0.0
