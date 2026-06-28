---
title: HttpApiClient.ts
nav_order: 270
parent: "effect"
---

## HttpApiClient.ts overview

Builds HTTP clients from `HttpApi` declarations.

The client methods are derived from the groups and endpoints in an `HttpApi`
and run through an `HttpClient`. They use the same schema-driven contract as
the server: request parts are encoded from endpoint schemas, client
middleware is applied, the HTTP request is executed, and declared success or
error responses are decoded. This module also includes helpers for building a
client for only one group, one endpoint, or only the encoded URL.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [endpoint](#endpoint)
  - [group](#group)
  - [make](#make)
  - [makeWith](#makewith)
  - [urlBuilder](#urlbuilder)
- [models](#models)
  - [Client (type alias)](#client-type-alias)
  - [ForApi (type alias)](#forapi-type-alias)
  - [UrlBuilder (type alias)](#urlbuilder-type-alias)
- [utils](#utils)
  - [Client (namespace)](#client-namespace)
    - [ResponseMode (type alias)](#responsemode-type-alias)
    - [Response (type alias)](#response-type-alias)
    - [Group (type alias)](#group-type-alias)
    - [Method (type alias)](#method-type-alias)
    - [TopLevelMethods (type alias)](#toplevelmethods-type-alias)

---

# constructors

## endpoint

Builds the typed client method for one endpoint in one API group, using the
supplied `HttpClient` and endpoint metadata.

**Signature**

```ts
declare const endpoint: <
  ApiId extends string,
  Groups extends HttpApiGroup.Any,
  const GroupName extends HttpApiGroup.Name<Groups>,
  const EndpointName extends HttpApiEndpoint.Name<HttpApiGroup.EndpointsWithName<Groups, GroupName>>,
  E,
  R
>(
  api: HttpApi.HttpApi<ApiId, Groups>,
  options: {
    readonly group: GroupName
    readonly endpoint: EndpointName
    readonly httpClient: HttpClient.HttpClient.With<E, R>
    readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
    readonly transformResponse?:
      | ((effect: Effect.Effect<unknown, unknown, unknown>) => Effect.Effect<unknown, unknown, unknown>)
      | undefined
    readonly baseUrl?: URL | string | undefined
  }
) => Effect.Effect<
  Client.Method<
    HttpApiEndpoint.WithName<HttpApiGroup.Endpoints<HttpApiGroup.WithName<Groups, GroupName>>, EndpointName>,
    E,
    R
  >,
  never,
  HttpApiEndpoint.MiddlewareClient<
    HttpApiEndpoint.WithName<HttpApiGroup.Endpoints<HttpApiGroup.WithName<Groups, GroupName>>, EndpointName>
  >
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L555)

Since v4.0.0

## group

Builds a typed client object for a single API group from the supplied
`HttpClient`, filtering the API to that group.

**Signature**

```ts
declare const group: <
  ApiId extends string,
  Groups extends HttpApiGroup.Any,
  const GroupName extends HttpApiGroup.Name<Groups>,
  E,
  R
>(
  api: HttpApi.HttpApi<ApiId, Groups>,
  options: {
    readonly group: GroupName
    readonly httpClient: HttpClient.HttpClient.With<E, R>
    readonly transformResponse?:
      | ((effect: Effect.Effect<unknown, unknown, unknown>) => Effect.Effect<unknown, unknown, unknown>)
      | undefined
    readonly baseUrl?: URL | string | undefined
  }
) => Effect.Effect<
  Client.Group<Groups, GroupName, E, R>,
  never,
  HttpApiGroup.MiddlewareClient<HttpApiGroup.WithName<Groups, GroupName>>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L517)

Since v4.0.0

## make

Constructs a type-safe client for an HTTP API using the `HttpClient` service,
endpoint schemas, middleware, and optional client or response transformations.

**Signature**

```ts
declare const make: <ApiId extends string, Groups extends HttpApiGroup.Any>(
  api: HttpApi.HttpApi<ApiId, Groups>,
  options?: {
    readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
    readonly transformResponse?:
      | ((effect: Effect.Effect<unknown, unknown, unknown>) => Effect.Effect<unknown, unknown, unknown>)
      | undefined
    readonly baseUrl?: URL | string | undefined
  }
) => Effect.Effect<Client<Groups>, never, HttpClient.HttpClient | HttpApiGroup.MiddlewareClient<Groups>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L459)

Since v4.0.0

## makeWith

Constructs a type-safe client for an HTTP API from the supplied `HttpClient`,
using the API metadata to encode requests, execute middleware, and decode
responses.

**Signature**

```ts
declare const makeWith: <ApiId extends string, Groups extends HttpApiGroup.Any, E, R>(
  api: HttpApi.HttpApi<ApiId, Groups>,
  options: {
    readonly httpClient: HttpClient.HttpClient.With<E, R>
    readonly transformResponse?:
      | ((effect: Effect.Effect<unknown, unknown, unknown>) => Effect.Effect<unknown, unknown, unknown>)
      | undefined
    readonly baseUrl?: URL | string | undefined
  }
) => Effect.Effect<Client<Groups, E, R>, never, HttpApiGroup.MiddlewareClient<Groups>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L487)

Since v4.0.0

## urlBuilder

Creates a type-safe URL builder that mirrors `HttpApiClient.make`.

**Example** (Building typed URLs)

```ts
import { Schema } from "effect"
import { HttpApi, HttpApiClient, HttpApiEndpoint, HttpApiGroup } from "effect/unstable/httpapi"

const Api = HttpApi.make("Api").add(
  HttpApiGroup.make("users").add(
    HttpApiEndpoint.get("getUser", "/users/:id", {
      params: { id: Schema.String }
    })
  )
)

const buildUrl = HttpApiClient.urlBuilder(Api, {
  baseUrl: "https://api.example.com"
})

buildUrl.users.getUser({
  params: { id: "123" }
})
//=> "https://api.example.com/users/123"
```

**Signature**

```ts
declare const urlBuilder: <Api extends HttpApi.Any>(
  api: Api,
  options?: { readonly baseUrl?: URL | string | undefined }
) => UrlBuilder<Api>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L625)

Since v4.0.0

# models

## Client (type alias)

The type-safe client shape generated from HTTP API groups, with non-top-level
groups exposed as nested objects and top-level endpoints exposed as methods.

**Signature**

```ts
type Client<Groups, E, R> = Simplify<
  {
    readonly [Group in Extract<Groups, { readonly topLevel: false }> as HttpApiGroup.Name<Group>]: Client.Group<
      Group,
      Group["identifier"],
      E,
      R
    >
  } & {
    readonly [Method in Client.TopLevelMethods<Groups, E, R> as Method[0]]: Method[1]
  }
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L48)

Since v4.0.0

## ForApi (type alias)

Derives the typed client interface for an `HttpApi`, preserving any additional
client error and service requirements supplied by the caller.

**Signature**

```ts
type ForApi<Api, E, R> = Api extends HttpApi.HttpApi<infer _Id, infer Groups> ? Client<Groups, E, R> : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L69)

Since v4.0.0

## UrlBuilder (type alias)

The type-safe URL builder shape for an HTTP API, mirroring the generated client
layout while returning URL strings instead of executing requests.

**Signature**

```ts
type UrlBuilder<Api> =
  Api extends HttpApi.HttpApi<infer _ApiId, infer Groups>
    ? Simplify<
        {
          readonly [Group in Extract<
            Groups,
            { readonly topLevel: false }
          > as HttpApiGroup.Name<Group>]: UrlBuilderGroup<HttpApiGroup.Endpoints<Group>>
        } & {
          readonly [Method in UrlBuilderTopLevelMethods<Groups> as Method[0]]: Method[1]
        }
      >
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L216)

Since v4.0.0

# utils

## Client (namespace)

Helper types used to describe generated HTTP API clients, including endpoint
methods, response modes, and grouped client shapes.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L103)

Since v4.0.0

### ResponseMode (type alias)

The response mode accepted by generated client methods, controlling whether a
call returns the decoded success value, the raw response, or both.

**Signature**

```ts
type ResponseMode = HttpApiEndpoint.ClientResponseMode
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L111)

Since v4.0.0

### Response (type alias)

Computes the value returned by a client method for a success type and response
mode.

**Signature**

```ts
type Response<Success, Mode> = [Mode] extends ["decoded-and-response"]
  ? [Success, HttpClientResponse.HttpClientResponse]
  : [Mode] extends ["response-only"]
    ? HttpClientResponse.HttpClientResponse
    : Success
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L120)

Since v4.0.0

### Group (type alias)

The client object for one API group, mapping each endpoint name in that group to
its typed client method.

**Signature**

```ts
type Group<Groups, GroupName, E, R> = [HttpApiGroup.WithName<Groups, GroupName>] extends [
  HttpApiGroup.HttpApiGroup<infer _GroupName, infer _Endpoints>
]
  ? {
      readonly [Endpoint in _Endpoints as HttpApiEndpoint.Name<Endpoint>]: Method<Endpoint, E, R>
    }
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L132)

Since v4.0.0

### Method (type alias)

The typed function generated for an endpoint, accepting the endpoint request
shape and returning an effect whose success, error, and service channels reflect
the endpoint schemas, middleware, and selected response mode.

**Signature**

```ts
type Method<Endpoint, E, R> = [Endpoint] extends [
  HttpApiEndpoint.HttpApiEndpoint<
    infer _Name,
    infer _Method,
    infer _Path,
    infer _Params,
    infer _Query,
    infer _Payload,
    infer _Headers,
    infer _Success,
    infer _Error,
    infer _Middleware,
    infer _MR
  >
]
  ? <Mode extends ResponseMode = ResponseMode>(
      request: Simplify<HttpApiEndpoint.ClientRequest<_Params, _Query, _Payload, _Headers, Mode>>
    ) => Effect.Effect<
      Response<SuccessType<_Success>, Mode>,
      | HttpApiMiddleware.Error<_Middleware>
      | HttpApiMiddleware.ClientError<_Middleware>
      | E
      | HttpClientError.HttpClientError
      | ([Mode] extends ["response-only"] ? never : _Error["Type"] | Schema.SchemaError),
      | R
      | _Params["EncodingServices"]
      | _Query["EncodingServices"]
      | _Payload["EncodingServices"]
      | _Headers["EncodingServices"]
      | ([Mode] extends ["response-only"] ? never : SuccessDecodingServices<_Success> | _Error["DecodingServices"])
    >
  : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L147)

Since v4.0.0

### TopLevelMethods (type alias)

Extracts client methods for endpoints in top-level groups so they can be exposed
directly on the generated client object.

**Signature**

```ts
type TopLevelMethods<Groups, E, R> =
  Extract<Groups, { readonly topLevel: true }> extends HttpApiGroup.HttpApiGroup<
    infer _Id,
    infer _Endpoints,
    infer _TopLevel
  >
    ? _Endpoints extends infer Endpoint
      ? [HttpApiEndpoint.Name<Endpoint>, Method<Endpoint, E, R>]
      : never
    : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiClient.ts#L189)

Since v4.0.0
