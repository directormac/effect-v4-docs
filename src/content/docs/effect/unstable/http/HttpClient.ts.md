---
title: HttpClient.ts
nav_order: 241
parent: "effect"
---

## HttpClient.ts overview

Provides the service used to run outgoing HTTP requests.

`HttpClient` executes immutable `HttpClientRequest` values and returns
`HttpClientResponse` values. Keeping HTTP behind this service lets programs,
tests, and generated API clients use the same request model without depending
on one concrete platform transport. This module includes request accessors,
constructors and layers, request and response transformations, status
filtering, retries, rate limiting, cookies, redirect handling, scoped request
abortion, and tracing support.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [del](#del)
  - [execute](#execute)
  - [get](#get)
  - [head](#head)
  - [options](#options)
  - [patch](#patch)
  - [post](#post)
  - [put](#put)
- [constructors](#constructors)
  - [make](#make)
  - [makeWith](#makewith)
- [cookies](#cookies)
  - [withCookiesRef](#withcookiesref)
- [error handling](#error-handling)
  - [catch](#catch)
  - [catchTag](#catchtag)
  - [catchTags](#catchtags)
  - [retry](#retry)
  - [retryTransient](#retrytransient)
- [filters](#filters)
  - [filterOrElse](#filterorelse)
  - [filterOrFail](#filterorfail)
  - [filterStatus](#filterstatus)
  - [filterStatusOk](#filterstatusok)
- [guards](#guards)
  - [isHttpClient](#ishttpclient)
- [layers](#layers)
  - [layerMergedContext](#layermergedcontext)
- [mapping & sequencing](#mapping--sequencing)
  - [mapRequest](#maprequest)
  - [mapRequestEffect](#maprequesteffect)
  - [mapRequestInput](#maprequestinput)
  - [mapRequestInputEffect](#maprequestinputeffect)
  - [tap](#tap)
  - [tapError](#taperror)
  - [tapRequest](#taprequest)
  - [transform](#transform)
  - [transformResponse](#transformresponse)
- [models](#models)
  - [HttpClient (interface)](#httpclient-interface)
- [rate limiting](#rate-limiting)
  - [withRateLimiter](#withratelimiter)
- [redirects](#redirects)
  - [followRedirects](#followredirects)
- [references](#references)
  - [SpanNameGenerator](#spannamegenerator)
  - [TracerDisabledWhen](#tracerdisabledwhen)
  - [TracerPropagationEnabled](#tracerpropagationenabled)
- [resource management](#resource-management)
  - [withScope](#withscope)
- [services](#services)
  - [HttpClient](#httpclient)
- [utils](#utils)
  - [HttpClient (namespace)](#httpclient-namespace)
    - [With (interface)](#with-interface)
    - [Preprocess (type alias)](#preprocess-type-alias)
    - [Postprocess (type alias)](#postprocess-type-alias)
  - [Retry (namespace)](#retry-namespace)
    - [Return (type alias)](#return-type-alias)
  - [WithRateLimiter (namespace)](#withratelimiter-namespace)
    - [Options (interface)](#options-interface)

---

# accessors

## del

Executes a `DELETE` request using the `HttpClient` service from the environment.

**Signature**

```ts
declare const del: (
  url: string | URL,
  options?: HttpClientRequest.Options.NoUrl | undefined
) => Effect.Effect<HttpClientResponse.HttpClientResponse, Error.HttpClientError, HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L235)

Since v4.0.0

## execute

Executes a prebuilt `HttpClientRequest` using the `HttpClient` service from the environment.

**Signature**

```ts
declare const execute: (
  request: HttpClientRequest.HttpClientRequest
) => Effect.Effect<HttpClientResponse.HttpClientResponse, Error.HttpClientError, HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L165)

Since v4.0.0

## get

Executes a `GET` request using the `HttpClient` service from the environment.

**Signature**

```ts
declare const get: (
  url: string | URL,
  options?: HttpClientRequest.Options.NoUrl | undefined
) => Effect.Effect<HttpClientResponse.HttpClientResponse, Error.HttpClientError, HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L175)

Since v4.0.0

## head

Executes a `HEAD` request using the `HttpClient` service from the environment.

**Signature**

```ts
declare const head: (
  url: string | URL,
  options?: HttpClientRequest.Options.NoUrl | undefined
) => Effect.Effect<HttpClientResponse.HttpClientResponse, Error.HttpClientError, HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L187)

Since v4.0.0

## options

Executes an `OPTIONS` request using the `HttpClient` service from the environment.

**Signature**

```ts
declare const options: (
  url: string | URL,
  options?: HttpClientRequest.Options.NoUrl | undefined
) => Effect.Effect<HttpClientResponse.HttpClientResponse, Error.HttpClientError, HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L247)

Since v4.0.0

## patch

Executes a `PATCH` request using the `HttpClient` service from the environment.

**Signature**

```ts
declare const patch: (
  url: string | URL,
  options?: HttpClientRequest.Options.NoUrl | undefined
) => Effect.Effect<HttpClientResponse.HttpClientResponse, Error.HttpClientError, HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L211)

Since v4.0.0

## post

Executes a `POST` request using the `HttpClient` service from the environment.

**Signature**

```ts
declare const post: (
  url: string | URL,
  options?: HttpClientRequest.Options.NoUrl | undefined
) => Effect.Effect<HttpClientResponse.HttpClientResponse, Error.HttpClientError, HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L199)

Since v4.0.0

## put

Executes a `PUT` request using the `HttpClient` service from the environment.

**Signature**

```ts
declare const put: (
  url: string | URL,
  options?: HttpClientRequest.Options.NoUrl | undefined
) => Effect.Effect<HttpClientResponse.HttpClientResponse, Error.HttpClientError, HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L223)

Since v4.0.0

# constructors

## make

Constructs an `HttpClient` from a low-level request runner.

**Details**

The runner receives the request, resolved URL, abort signal, and current fiber. The client wrapper handles URL construction failures, tracing and propagation, header redaction, and aborting non-scoped requests on interruption.

**Signature**

```ts
declare const make: (
  f: (
    request: HttpClientRequest.HttpClientRequest,
    url: URL,
    signal: AbortSignal,
    fiber: Fiber.Fiber<HttpClientResponse.HttpClientResponse, Error.HttpClientError>
  ) => Effect.Effect<HttpClientResponse.HttpClientResponse, Error.HttpClientError>
) => HttpClient
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L627)

Since v4.0.0

## makeWith

Constructs an `HttpClient.With` from a preprocessing function and a postprocessing function.

**Details**

`execute` applies preprocessing to the request and then passes the resulting request effect to postprocessing.

**Signature**

```ts
declare const makeWith: <E2, R2, E, R>(
  postprocess: (
    request: Effect.Effect<HttpClientRequest.HttpClientRequest, E2, R2>
  ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>,
  preprocess: HttpClient.Preprocess<E2, R2>
) => HttpClient.With<E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L582)

Since v4.0.0

# cookies

## withCookiesRef

Adds a `Ref` of cookies to the client for handling cookies across requests.

**When to use**

Use to add shared cookie storage to a client so response cookies are retained
and sent by later requests.

**Signature**

```ts
declare const withCookiesRef: {
  (ref: Ref.Ref<Cookies.Cookies>): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E, R>
  <E, R>(self: HttpClient.With<E, R>, ref: Ref.Ref<Cookies.Cookies>): HttpClient.With<E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L1400)

Since v4.0.0

# error handling

## catch

Handles all client failures with an effectful recovery function and returns a transformed client.

**Signature**

```ts
declare const catch: { <E, E2, R2>(f: (e: E) => Effect.Effect<HttpClientResponse.HttpClientResponse, E2, R2>): <R>(self: HttpClient.With<E, R>) => HttpClient.With<E2, R2 | R>; <E, R, A2, E2, R2>(self: HttpClient.With<E, R>, f: (e: E) => Effect.Effect<A2, E2, R2>): HttpClient.With<E2, R | R2>; }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L337)

Since v4.0.0

## catchTag

Handles client failures with one or more matching `_tag` values and returns a transformed client.

**Signature**

```ts
declare const catchTag: {
  <K extends Tags<E> | NonEmptyReadonlyArray<Tags<E>>, E, E1, R1>(
    tag: K,
    f: (
      e: ExtractTag<NoInfer<E>, K extends NonEmptyReadonlyArray<string> ? K[number] : K>
    ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E1, R1>
  ): <R>(
    self: HttpClient.With<E, R>
  ) => HttpClient.With<E1 | ExcludeTag<E, K extends NonEmptyReadonlyArray<string> ? K[number] : K>, R1 | R>
  <R, E, K extends Tags<E> | NonEmptyReadonlyArray<Tags<E>>, R1, E1>(
    self: HttpClient.With<E, R>,
    tag: K,
    f: (
      e: ExtractTag<E, K extends NonEmptyReadonlyArray<string> ? K[number] : K>
    ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E1, R1>
  ): HttpClient.With<E1 | ExcludeTag<E, K extends NonEmptyReadonlyArray<string> ? K[number] : K>, R1 | R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L346)

Since v4.0.0

## catchTags

Handles client failures by matching their `_tag` values against a case map.

**Signature**

```ts
declare const catchTags: {
  <
    E,
    Cases extends {
      [K in Extract<E, { _tag: string }>["_tag"]]+?: (
        error: Extract<E, { _tag: K }>
      ) => Effect.Effect<HttpClientResponse.HttpClientResponse, any, any>
    } & (unknown extends E ? {} : { [K in Exclude<keyof Cases, Extract<E, { _tag: string }>["_tag"]>]: never })
  >(
    cases: Cases
  ): <R>(
    self: HttpClient.With<E, R>
  ) => HttpClient.With<
    | Exclude<E, { _tag: keyof Cases }>
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, infer E, any> ? E : never
      }[keyof Cases],
    | R
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, any, infer R> ? R : never
      }[keyof Cases]
  >
  <
    E extends { _tag: string },
    R,
    Cases extends {
      [K in Extract<E, { _tag: string }>["_tag"]]+?: (
        error: Extract<E, { _tag: K }>
      ) => Effect.Effect<HttpClientResponse.HttpClientResponse, any, any>
    } & (unknown extends E ? {} : { [K in Exclude<keyof Cases, Extract<E, { _tag: string }>["_tag"]>]: never })
  >(
    self: HttpClient.With<E, R>,
    cases: Cases
  ): HttpClient.With<
    | Exclude<E, { _tag: keyof Cases }>
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, infer E, any> ? E : never
      }[keyof Cases],
    | R
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, any, infer R> ? R : never
      }[keyof Cases]
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L388)

Since v4.0.0

## retry

Retries the request based on a provided schedule or policy.

**Signature**

```ts
declare const retry: {
  <E, O extends NoExcessProperties<Effect.Retry.Options<E>, O>>(
    options: O
  ): <R>(self: HttpClient.With<E, R>) => Retry.Return<R, E, O>
  <B, E, ES, R1>(
    policy: Schedule.Schedule<B, NoInfer<E>, ES, R1>
  ): <R>(self: HttpClient.With<E, R>) => HttpClient.With<E | ES, R1 | R>
  <E, R, O extends NoExcessProperties<Effect.Retry.Options<E>, O>>(
    self: HttpClient.With<E, R>,
    options: O
  ): Retry.Return<R, E, O>
  <E, R, B, ES, R1>(
    self: HttpClient.With<E, R>,
    policy: Schedule.Schedule<B, E, ES, R1>
  ): HttpClient.With<E | ES, R1 | R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L850)

Since v4.0.0

## retryTransient

Retries common transient errors, such as rate limiting, timeouts or network issues.

**When to use**

Use to focus on retrying errors, transient responses, or both.

**Details**

Specifying a `while` predicate allows you to consider other errors as
transient, and is ignored in "response-only" mode.

**Signature**

```ts
declare const retryTransient: {
  <
    E,
    B = never,
    ES = never,
    R1 = never,
    const RetryOn extends "errors-only" | "response-only" | "errors-and-responses" =
      | "response-only"
      | "errors-only"
      | "errors-and-responses",
    Input = RetryOn extends "errors-only"
      ? E
      : RetryOn extends "response-only"
        ? HttpClientResponse.HttpClientResponse
        : HttpClientResponse.HttpClientResponse | E
  >(options: {
    readonly retryOn?: RetryOn | undefined
    readonly while?: Predicate.Predicate<NoInfer<E | ES>>
    readonly schedule?: Schedule.Schedule<B, NoInfer<Input>, ES, R1>
    readonly times?: number
  }): <R>(self: HttpClient.With<E, R>) => HttpClient.With<E | ES, R1 | R>
  <
    E,
    R,
    B = never,
    ES = never,
    R1 = never,
    const RetryOn extends "errors-only" | "response-only" | "errors-and-responses" =
      | "response-only"
      | "errors-only"
      | "errors-and-responses",
    Input = RetryOn extends "errors-only"
      ? E
      : RetryOn extends "response-only"
        ? HttpClientResponse.HttpClientResponse
        : HttpClientResponse.HttpClientResponse | E
  >(
    self: HttpClient.With<E, R>,
    options: {
      readonly retryOn?: RetryOn | undefined
      readonly while?: Predicate.Predicate<NoInfer<E | ES>>
      readonly schedule?: Schedule.Schedule<B, NoInfer<Input>, ES, R1>
      readonly times?: number
    }
  ): HttpClient.With<E | ES, R1 | R>
  <B, E, ES = never, R1 = never>(
    options: Schedule.Schedule<B, NoInfer<HttpClientResponse.HttpClientResponse | E>, ES, R1>
  ): <R>(self: HttpClient.With<E, R>) => HttpClient.With<E | ES, R1 | R>
  <E, R, B, ES = never, R1 = never>(
    self: HttpClient.With<E, R>,
    options: Schedule.Schedule<B, NoInfer<HttpClientResponse.HttpClientResponse | E>, ES, R1>
  ): HttpClient.With<E | ES, R1 | R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L888)

Since v4.0.0

# filters

## filterOrElse

Filters the result of a response, or runs an alternative effect if the predicate fails.

**Signature**

```ts
declare const filterOrElse: {
  <B extends HttpClientResponse.HttpClientResponse, E2, R2>(
    refinement: Predicate.Refinement<NoInfer<HttpClientResponse.HttpClientResponse>, B>,
    orElse: (
      response: EqualsWith<
        HttpClientResponse.HttpClientResponse,
        B,
        NoInfer<HttpClientResponse.HttpClientResponse>,
        Exclude<NoInfer<HttpClientResponse.HttpClientResponse>, B>
      >
    ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E2, R2>
  ): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E2 | E, R2 | R>
  <E2, R2>(
    predicate: Predicate.Predicate<NoInfer<HttpClientResponse.HttpClientResponse>>,
    orElse: (
      response: NoInfer<HttpClientResponse.HttpClientResponse>
    ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E2, R2>
  ): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E2 | E, R2 | R>
  <E, R, B extends HttpClientResponse.HttpClientResponse, E2, R2>(
    self: HttpClient.With<E, R>,
    refinement: Predicate.Refinement<HttpClientResponse.HttpClientResponse, B>,
    orElse: (
      response: EqualsWith<
        HttpClientResponse.HttpClientResponse,
        B,
        HttpClientResponse.HttpClientResponse,
        Exclude<HttpClientResponse.HttpClientResponse, B>
      >
    ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E2, R2>
  ): HttpClient.With<E2 | E, R2 | R>
  <E, R, E2, R2>(
    self: HttpClient.With<E, R>,
    predicate: Predicate.Predicate<HttpClientResponse.HttpClientResponse>,
    orElse: (
      response: HttpClientResponse.HttpClientResponse
    ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E2, R2>
  ): HttpClient.With<E2 | E, R2 | R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L482)

Since v4.0.0

## filterOrFail

Filters successful responses, or fails with the error produced by `orFailWith` when the predicate does not match.

**Signature**

```ts
declare const filterOrFail: {
  <B extends HttpClientResponse.HttpClientResponse, E2>(
    refinement: Predicate.Refinement<NoInfer<HttpClientResponse.HttpClientResponse>, B>,
    orFailWith: (response: NoInfer<HttpClientResponse.HttpClientResponse>) => E2
  ): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E2 | E, R>
  <E2>(
    predicate: Predicate.Predicate<NoInfer<HttpClientResponse.HttpClientResponse>>,
    orFailWith: (response: NoInfer<HttpClientResponse.HttpClientResponse>) => E2
  ): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E2 | E, R>
  <E, R, B extends HttpClientResponse.HttpClientResponse, E2>(
    self: HttpClient.With<E, R>,
    refinement: Predicate.Refinement<NoInfer<HttpClientResponse.HttpClientResponse>, B>,
    orFailWith: (response: NoInfer<HttpClientResponse.HttpClientResponse>) => E2
  ): HttpClient.With<E2 | E, R>
  <E, R, E2>(
    self: HttpClient.With<E, R>,
    predicate: Predicate.Predicate<NoInfer<HttpClientResponse.HttpClientResponse>>,
    orFailWith: (response: NoInfer<HttpClientResponse.HttpClientResponse>) => E2
  ): HttpClient.With<E2 | E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L527)

Since v4.0.0

## filterStatus

Filters responses by HTTP status code.

**Signature**

```ts
declare const filterStatus: {
  (f: (status: number) => boolean): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E | Error.HttpClientError, R>
  <E, R>(self: HttpClient.With<E, R>, f: (status: number) => boolean): HttpClient.With<E | Error.HttpClientError, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L554)

Since v4.0.0

## filterStatusOk

Filters responses that return a 2xx status code.

**Signature**

```ts
declare const filterStatusOk: <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E | Error.HttpClientError, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L569)

Since v4.0.0

# guards

## isHttpClient

Returns `true` if the provided value is an `HttpClient`.

**Signature**

```ts
declare const isHttpClient: (u: unknown) => u is HttpClient
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L53)

Since v4.0.0

# layers

## layerMergedContext

Creates an `HttpClient` layer and merges the layer construction context into client response effects.

**Signature**

```ts
declare const layerMergedContext: <E, R>(effect: Effect.Effect<HttpClient, E, R>) => Layer.Layer<HttpClient, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L1526)

Since v4.0.0

# mapping & sequencing

## mapRequest

Appends a transformation of the request object before sending it.

**Signature**

```ts
declare const mapRequest: {
  (
    f: (a: HttpClientRequest.HttpClientRequest) => HttpClientRequest.HttpClientRequest
  ): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E, R>
  <E, R>(
    self: HttpClient.With<E, R>,
    f: (a: HttpClientRequest.HttpClientRequest) => HttpClientRequest.HttpClientRequest
  ): HttpClient.With<E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L730)

Since v4.0.0

## mapRequestEffect

Appends an effectful transformation of the request object before sending it.

**Signature**

```ts
declare const mapRequestEffect: {
  <E2, R2>(
    f: (a: HttpClientRequest.HttpClientRequest) => Effect.Effect<HttpClientRequest.HttpClientRequest, E2, R2>
  ): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E | E2, R | R2>
  <E, R, E2, R2>(
    self: HttpClient.With<E, R>,
    f: (a: HttpClientRequest.HttpClientRequest) => Effect.Effect<HttpClientRequest.HttpClientRequest, E2, R2>
  ): HttpClient.With<E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L752)

Since v4.0.0

## mapRequestInput

Prepends a transformation of the request object before sending it.

**Signature**

```ts
declare const mapRequestInput: {
  (
    f: (a: HttpClientRequest.HttpClientRequest) => HttpClientRequest.HttpClientRequest
  ): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E, R>
  <E, R>(
    self: HttpClient.With<E, R>,
    f: (a: HttpClientRequest.HttpClientRequest) => HttpClientRequest.HttpClientRequest
  ): HttpClient.With<E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L775)

Since v4.0.0

## mapRequestInputEffect

Prepends an effectful transformation of the request object before sending it.

**Signature**

```ts
declare const mapRequestInputEffect: {
  <E2, R2>(
    f: (a: HttpClientRequest.HttpClientRequest) => Effect.Effect<HttpClientRequest.HttpClientRequest, E2, R2>
  ): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E | E2, R | R2>
  <E, R, E2, R2>(
    self: HttpClient.With<E, R>,
    f: (a: HttpClientRequest.HttpClientRequest) => Effect.Effect<HttpClientRequest.HttpClientRequest, E2, R2>
  ): HttpClient.With<E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L797)

Since v4.0.0

## tap

Performs an additional effect after a successful request.

**Signature**

```ts
declare const tap: {
  <_, E2, R2>(
    f: (response: HttpClientResponse.HttpClientResponse) => Effect.Effect<_, E2, R2>
  ): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E | E2, R | R2>
  <E, R, _, E2, R2>(
    self: HttpClient.With<E, R>,
    f: (response: HttpClientResponse.HttpClientResponse) => Effect.Effect<_, E2, R2>
  ): HttpClient.With<E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L1328)

Since v4.0.0

## tapError

Performs an additional effect after an unsuccessful request.

**Signature**

```ts
declare const tapError: {
  <_, E, E2, R2>(
    f: (e: NoInfer<E>) => Effect.Effect<_, E2, R2>
  ): <R>(self: HttpClient.With<E, R>) => HttpClient.With<E | E2, R | R2>
  <E, R, _, E2, R2>(
    self: HttpClient.With<E, R>,
    f: (e: NoInfer<E>) => Effect.Effect<_, E2, R2>
  ): HttpClient.With<E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L1350)

Since v4.0.0

## tapRequest

Performs an additional effect on the request before sending it.

**Signature**

```ts
declare const tapRequest: {
  <_, E2, R2>(
    f: (a: HttpClientRequest.HttpClientRequest) => Effect.Effect<_, E2, R2>
  ): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E | E2, R | R2>
  <E, R, _, E2, R2>(
    self: HttpClient.With<E, R>,
    f: (a: HttpClientRequest.HttpClientRequest) => Effect.Effect<_, E2, R2>
  ): HttpClient.With<E | E2, R | R2>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L1372)

Since v4.0.0

## transform

Transforms a client by wrapping the response effect for each request.

**Details**

The transformation receives both the response effect and the original request, allowing it to change success, error, and environment behavior.

**Signature**

```ts
declare const transform: {
  <E, R, E1, R1>(
    f: (
      effect: Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>,
      request: HttpClientRequest.HttpClientRequest
    ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E1, R1>
  ): (self: HttpClient.With<E, R>) => HttpClient.With<E | E1, R | R1>
  <E, R, E1, R1>(
    self: HttpClient.With<E, R>,
    f: (
      effect: Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>,
      request: HttpClientRequest.HttpClientRequest
    ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E1, R1>
  ): HttpClient.With<E | E1, R | R1>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L263)

Since v4.0.0

## transformResponse

Transforms a client by applying an effectful transformation to each response effect.

**Signature**

```ts
declare const transformResponse: {
  <E, R, E1, R1>(
    f: (
      effect: Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>
    ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E1, R1>
  ): (self: HttpClient.With<E, R>) => HttpClient.With<E1, R1>
  <E, R, E1, R1>(
    self: HttpClient.With<E, R>,
    f: (
      effect: Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>
    ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E1, R1>
  ): HttpClient.With<E1, R1>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L295)

Since v4.0.0

# models

## HttpClient (interface)

HTTP client whose requests produce `HttpClientResponse` values and can fail with `HttpClientError`.

**Signature**

```ts
export interface HttpClient extends HttpClient.With<Error.HttpClientError> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L61)

Since v4.0.0

# rate limiting

## withRateLimiter

Applies request rate limiting using the `RateLimiter` service.

**Details**

It can update limits by inspecting common rate limit response headers and
automatically retries HTTP `429` responses (or `HttpClientError` values
wrapping a `429` response) by forcing the retry back through the limiter.

**Signature**

```ts
declare const withRateLimiter: {
  (
    options: WithRateLimiter.Options
  ): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E | RateLimiter.RateLimiterError, R>
  <E, R>(
    self: HttpClient.With<E, R>,
    options: WithRateLimiter.Options
  ): HttpClient.With<E | RateLimiter.RateLimiterError, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L1046)

Since v4.0.0

# redirects

## followRedirects

Enables following HTTP redirects up to a specified number of times.

**Signature**

```ts
declare const followRedirects: {
  (maxRedirects?: number | undefined): <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E, R>
  <E, R>(self: HttpClient.With<E, R>, maxRedirects?: number | undefined): HttpClient.With<E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L1454)

Since v4.0.0

# references

## SpanNameGenerator

Context reference for generating the span name used for outgoing client request spans.

**Signature**

```ts
declare const SpanNameGenerator: Context.Reference<(request: HttpClientRequest.HttpClientRequest) => string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L1514)

Since v4.0.0

## TracerDisabledWhen

Context reference for a predicate that disables client-side tracing for matching outgoing requests.

**Signature**

```ts
declare const TracerDisabledWhen: Context.Reference<Predicate.Predicate<HttpClientRequest.HttpClientRequest>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L1492)

Since v4.0.0

## TracerPropagationEnabled

Context reference that controls whether outgoing client spans are propagated to request headers.

**Signature**

```ts
declare const TracerPropagationEnabled: Context.Reference<boolean>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L1504)

Since v4.0.0

# resource management

## withScope

Attaches the lifetime of the `HttpClientRequest` to a `Scope`.

**Signature**

```ts
declare const withScope: <E, R>(self: HttpClient.With<E, R>) => HttpClient.With<E, R | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L1433)

Since v4.0.0

# services

## HttpClient

Service tag for the default outgoing HTTP client service.

**When to use**

Use to provide the default outgoing HTTP client service used by request
accessors such as `execute`, `get`, and `post`.

**Signature**

```ts
declare const HttpClient: Context.Service<HttpClient, HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L149)

Since v4.0.0

# utils

## HttpClient (namespace)

Namespace containing type-level members associated with `HttpClient`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L68)

Since v4.0.0

### With (interface)

Parameterized HTTP client that may fail with `E` and require environment `R`.

**Details**

It exposes preprocessing, postprocessing, direct request execution, and method-specific helpers.

**Signature**

```ts
export interface With<E, R = never> extends Pipeable, Inspectable.Inspectable {
  readonly [TypeId]: typeof TypeId
  readonly preprocess: Preprocess<E, R>
  readonly postprocess: Postprocess<E, R>
  readonly execute: (
    request: HttpClientRequest.HttpClientRequest
  ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>

  readonly get: (
    url: string | URL,
    options?: HttpClientRequest.Options.NoUrl
  ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>
  readonly head: (
    url: string | URL,
    options?: HttpClientRequest.Options.NoUrl
  ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>
  readonly post: (
    url: string | URL,
    options?: HttpClientRequest.Options.NoUrl
  ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>
  readonly patch: (
    url: string | URL,
    options?: HttpClientRequest.Options.NoUrl
  ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>
  readonly put: (
    url: string | URL,
    options?: HttpClientRequest.Options.NoUrl
  ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>
  readonly del: (
    url: string | URL,
    options?: HttpClientRequest.Options.NoUrl
  ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>
  readonly options: (
    url: string | URL,
    options?: HttpClientRequest.Options.NoUrl
  ) => Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L79)

Since v4.0.0

### Preprocess (type alias)

Effectful transformation applied to a request before the client executes it.

**Signature**

```ts
type Preprocess<E, R> = (
  request: HttpClientRequest.HttpClientRequest
) => Effect.Effect<HttpClientRequest.HttpClientRequest, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L123)

Since v4.0.0

### Postprocess (type alias)

Function that turns a preprocessed request effect into the response effect executed by the client.

**Signature**

```ts
type Postprocess<E, R> = (
  request: Effect.Effect<HttpClientRequest.HttpClientRequest, E, R>
) => Effect.Effect<HttpClientResponse.HttpClientResponse, E, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L133)

Since v4.0.0

## Retry (namespace)

Namespace containing type-level helpers for retrying HTTP clients.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L819)

Since v4.0.0

### Return (type alias)

Computes the client type returned by `retry` for a given set of retry options.

**Details**

The result includes errors and requirements introduced by schedules and effectful retry predicates.

**Signature**

```ts
type HttpClient.With<(O extends { schedule: Schedule.Schedule<infer _O, infer _I, infer _E, infer _R>; } ? E | _E : O extends { times: number; } ? E : O extends { until: Predicate.Refinement<E, infer E2>; } ? E2 : E) | (O extends { while: (...args: Array<any>) => Effect.Effect<infer _A, infer E, infer _R>; } ? E : never) | (O extends { until: (...args: Array<any>) => Effect.Effect<infer _A, infer E, infer _R>; } ? E : never), R | (O extends { schedule: Schedule.Schedule<infer _O, infer _I, infer _E, infer R>; } ? R : never) | (O extends { while: (...args: Array<any>) => Effect.Effect<infer _A, infer _E, infer R>; } ? R : never) | (O extends { until: (...args: Array<any>) => Effect.Effect<infer _A, infer _E, infer R>; } ? R : never)> = HttpClient.With<
    | (O extends { schedule: Schedule.Schedule<infer _O, infer _I, infer _E, infer _R> } ? E | _E
      : O extends { times: number } ? E
      : O extends { until: Predicate.Refinement<E, infer E2> } ? E2
      : E)
    | (O extends { while: (...args: Array<any>) => Effect.Effect<infer _A, infer E, infer _R> } ? E : never)
    | (O extends { until: (...args: Array<any>) => Effect.Effect<infer _A, infer E, infer _R> } ? E : never),
    | R
    | (O extends { schedule: Schedule.Schedule<infer _O, infer _I, infer _E, infer R> } ? R : never)
    | (O extends { while: (...args: Array<any>) => Effect.Effect<infer _A, infer _E, infer R> } ? R : never)
    | (O extends { until: (...args: Array<any>) => Effect.Effect<infer _A, infer _E, infer R> } ? R : never)
  > extends infer Z ? Z : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L830)

Since v4.0.0

## WithRateLimiter (namespace)

Namespace containing configuration types for `withRateLimiter`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L985)

Since v4.0.0

### Options (interface)

Options used to configure `withRateLimiter`.

**Details**

They define the backing limiter, initial limit window, keying strategy, algorithm, token cost, and whether response headers update future limits.

**Signature**

```ts
export interface Options {
  /**
   * The `RateLimiter` service to use for rate limiting.
   */
  readonly limiter: RateLimiter.RateLimiter
  /**
   * The initial rate limit window duration.
   */
  readonly window: Duration.Input
  /**
   * The initial maximum number of allowed requests in the window.
   */
  readonly limit: number
  /**
   * The key to identify the rate limit. Requests with the same key will share
   * the same rate limit. This can be used to implement per-user or
   * per-endpoint rate limits.
   */
  readonly key: string | ((request: HttpClientRequest.HttpClientRequest) => string)
  /**
   * Defaults to `"fixed-window"`.
   */
  readonly algorithm?: "fixed-window" | "token-bucket" | undefined
  /**
   * Defaults to `1`.
   */
  readonly tokens?: number | ((request: HttpClientRequest.HttpClientRequest) => number) | undefined
  /**
   * Disable automatic limits updates from response headers.
   */
  readonly disableResponseInspection?: boolean | undefined
  /**
   * Disable adaptive learning from `Retry-After` responses.
   */
  readonly disableAdaptiveLearning?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpClient.ts#L996)

Since v4.0.0
