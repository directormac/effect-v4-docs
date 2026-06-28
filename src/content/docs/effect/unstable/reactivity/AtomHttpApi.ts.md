---
title: AtomHttpApi.ts
nav_order: 304
parent: "effect"
---

## AtomHttpApi.ts overview

Connects typed `HttpApi` clients to atoms.

The service created here exposes the generated HTTP API client plus
atom-based query and mutation helpers. Query atoms call endpoints and track
their asynchronous result, while mutations run endpoint calls that can
invalidate reactivity keys after a successful request. Query atoms can also be
cached, serialized for hydration, and kept alive with a time-to-live.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [Service](#service)
- [models](#models)
  - [AtomHttpApiClient (interface)](#atomhttpapiclient-interface)

---

# constructors

## Service

Creates a `Context.Service` class for an HTTP API client backed by an atom
runtime.

**Details**

The options provide the API definition, HTTP client layer, optional client and
response transforms, base URL, and runtime factory used by the query and
mutation helpers.

**Signature**

```ts
declare const Service: <Self>() => <const Id extends string, ApiId extends string, Groups extends HttpApiGroup.Any>(
  id: Id,
  options: {
    readonly api: HttpApi.HttpApi<ApiId, Groups>
    readonly httpClient:
      | Layer.Layer<HttpApiGroup.ClientServices<Groups> | HttpClient.HttpClient>
      | ((get: Atom.AtomContext) => Layer.Layer<HttpApiGroup.ClientServices<Groups> | HttpClient.HttpClient>)
    readonly transformClient?: ((client: HttpClient.HttpClient) => HttpClient.HttpClient) | undefined
    readonly transformResponse?:
      | ((effect: Effect.Effect<unknown, unknown, unknown>) => Effect.Effect<unknown, unknown, unknown>)
      | undefined
    readonly baseUrl?: URL | string | undefined
    readonly runtime?: Atom.RuntimeFactory | undefined
  }
) => AtomHttpApiClient<Self, Id, Groups>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomHttpApi.ts#L169)

Since v4.0.0

# models

## AtomHttpApiClient (interface)

A `Context.Service` for an HTTP API client integrated with atom reactivity.

**Details**

It exposes the generated HTTP API client, an atom runtime, mutation helpers that
return `AtomResultFn`s, and query helpers that return atoms of endpoint results.

**Signature**

```ts
export interface AtomHttpApiClient<Self, Id extends string, Groups extends HttpApiGroup.Any> extends Context.Service<
  Self,
  HttpApiClient.Client<Groups, never, never>
> {
  new (_: never): Context.ServiceClass.Shape<Id, HttpApiClient.Client<Groups, never, never>>

  readonly runtime: Atom.AtomRuntime<Self>

  readonly mutation: <
    GroupName extends HttpApiGroup.Name<Groups>,
    Name extends HttpApiEndpoint.Name<HttpApiGroup.Endpoints<Group>>,
    Group extends HttpApiGroup.Any = HttpApiGroup.WithName<Groups, GroupName>,
    Endpoint extends HttpApiEndpoint.Any = HttpApiEndpoint.WithName<HttpApiGroup.Endpoints<Group>, Name>,
    const ResponseMode extends HttpApiEndpoint.ClientResponseMode = HttpApiEndpoint.ClientResponseMode
  >(
    group: GroupName,
    endpoint: Name,
    options?: {
      readonly responseMode?: ResponseMode | undefined
    }
  ) => [Endpoint] extends [
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
      infer _RE
    >
  ]
    ? Atom.AtomResultFn<
        Simplify<
          HttpApiEndpoint.ClientRequest<_Params, _Query, _Payload, _Headers, "decoded-only"> & {
            readonly reactivityKeys?:
              | ReadonlyArray<unknown>
              | ReadonlyRecord<string, ReadonlyArray<unknown>>
              | undefined
          }
        >,
        ResponseByMode<Extract<_Success, Schema.Top>["Type"], ResponseMode>,
        ErrorByMode<_Error, _Middleware, ResponseMode>
      >
    : never

  readonly query: <
    GroupName extends HttpApiGroup.Name<Groups>,
    Name extends HttpApiEndpoint.Name<HttpApiGroup.Endpoints<Group>>,
    Group extends HttpApiGroup.Any = HttpApiGroup.WithName<Groups, GroupName>,
    Endpoint extends HttpApiEndpoint.Any = HttpApiEndpoint.WithName<HttpApiGroup.Endpoints<Group>, Name>,
    const ResponseMode extends HttpApiEndpoint.ClientResponseMode = "decoded-only"
  >(
    group: GroupName,
    endpoint: Name,
    request: [Endpoint] extends [
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
        infer _R,
        infer _RE
      >
    ]
      ? Simplify<
          HttpApiEndpoint.ClientRequest<_Params, _Query, _Payload, _Headers, ResponseMode> & {
            readonly reactivityKeys?:
              | ReadonlyArray<unknown>
              | ReadonlyRecord<string, ReadonlyArray<unknown>>
              | undefined
            readonly timeToLive?: Duration.Input | undefined
            readonly serializationKey?: string | undefined
          }
        >
      : never
  ) => [Endpoint] extends [
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
      infer _RE
    >
  ]
    ? Atom.Atom<
        AsyncResult.AsyncResult<
          ResponseByMode<Extract<_Success, Schema.Top>["Type"], ResponseMode>,
          ErrorByMode<_Error, _Middleware, ResponseMode>
        >
      >
    : never
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/AtomHttpApi.ts#L43)

Since v4.0.0
