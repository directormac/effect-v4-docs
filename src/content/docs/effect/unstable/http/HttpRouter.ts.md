---
title: HttpRouter.ts
nav_order: 250
parent: "effect"
---

## HttpRouter.ts overview

Builds server-side routers for Effect HTTP applications.

`HttpRouter` collects routes and middleware while an application layer is
being built. Once the router is complete, it handles each
`HttpServerRequest` by finding a matching route and producing an
`HttpServerResponse`. The module also includes helpers for route definitions,
prefixes, parameters, request decoding, CORS, and running the router.

Since v4.0.0

---

## Exports Grouped by Category

- [HttpRouter](#httprouter)
  - [HttpRouter](#httprouter-1)
  - [HttpRouter (interface)](#httprouter-interface)
  - [add](#add)
  - [addAll](#addall)
  - [layer](#layer)
  - [make](#make)
  - [toHttpEffect](#tohttpeffect)
  - [use](#use)
- [PathInput](#pathinput)
  - [PathInput (type alias)](#pathinput-type-alias)
  - [prefixPath](#prefixpath)
- [Request types](#request-types)
  - [GlobalProvided (type alias)](#globalprovided-type-alias)
  - [Provided (type alias)](#provided-type-alias)
  - [Request (interface)](#request-interface)
- [Route](#route)
  - [Route (interface)](#route-interface)
  - [prefixRoute](#prefixroute)
  - [route](#route-1)
- [configuration](#configuration)
  - [RouterConfig](#routerconfig)
- [getters](#getters)
  - [params](#params)
- [middleware](#middleware)
  - [Middleware (interface)](#middleware-interface)
  - [cors](#cors)
  - [disableLogger](#disablelogger)
  - [middleware](#middleware-1)
  - [provideRequest](#providerequest)
- [schemas](#schemas)
  - [schemaJson](#schemajson)
  - [schemaNoBody](#schemanobody)
  - [schemaParams](#schemaparams)
  - [schemaPathParams](#schemapathparams)
- [server](#server)
  - [serve](#serve)
  - [toWebHandler](#towebhandler)
- [services](#services)
  - [RouteContext (class)](#routecontext-class)
- [utils](#utils)
  - [Request (namespace)](#request-namespace)
    - [From (type alias)](#from-type-alias)
    - [Only (type alias)](#only-type-alias)
    - [Without (type alias)](#without-type-alias)
  - [Route (namespace)](#route-namespace)
    - [Error (type alias)](#error-type-alias)
    - [Context (type alias)](#context-type-alias)
  - [middleware (namespace)](#middleware-namespace)
    - [Make (type alias)](#make-type-alias)
    - [Fn (type alias)](#fn-type-alias)

---

# HttpRouter

## HttpRouter

Service tag for the HTTP router used while constructing an HTTP application.
Route and middleware layers require this service to register themselves with
the router.

**Signature**

```ts
declare const HttpRouter: Context.Service<HttpRouter, HttpRouter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L103)

Since v4.0.0

## HttpRouter (interface)

Defines the service interface for registering HTTP routes and middleware.

**Details**

An `HttpRouter` can add routes, apply path prefixes, install global middleware,
and expose the registered routes as an Effect that handles the current server
request.

**Signature**

```ts
export interface HttpRouter {
  readonly [TypeId]: typeof TypeId

  readonly prefixed: (prefix: string) => HttpRouter

  readonly add: <E = never, R = never>(
    method: "*" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS",
    path: PathInput,
    handler:
      | HttpServerResponse.HttpServerResponse
      | Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>
      | ((request: HttpServerRequest.HttpServerRequest) => Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>),
    options?: { readonly uninterruptible?: boolean | undefined } | undefined
  ) => Effect.Effect<void, never, Request.From<"Requires", Exclude<R, Provided>> | Request.From<"Error", E>>

  readonly addAll: <const Routes extends ReadonlyArray<Route<any, any>>>(
    routes: Routes
  ) => Effect.Effect<
    void,
    never,
    | Request.From<"Requires", Exclude<Route.Context<Routes[number]>, Provided>>
    | Request.From<"Error", Route.Error<Routes[number]>>
  >

  readonly addGlobalMiddleware: <E, R>(
    middleware: ((
      effect: Effect.Effect<HttpServerResponse.HttpServerResponse, Types.unhandled>
    ) => Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>) &
      (Types.unhandled extends E ? unknown : "You cannot handle any errors")
  ) => Effect.Effect<
    void,
    never,
    | Request.From<"GlobalRequires", Exclude<R, GlobalProvided>>
    | Request.From<"GlobalError", Exclude<E, Types.unhandled>>
  >

  readonly asHttpEffect: () => Effect.Effect<
    HttpServerResponse.HttpServerResponse,
    unknown,
    HttpServerRequest.HttpServerRequest | Scope.Scope
  >
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L47)

Since v4.0.0

## add

Create a layer that adds a single route to the HTTP router.

**Example** (Adding a GET route)

```ts
import { Effect } from "effect"
import { HttpRouter, HttpServerResponse } from "effect/unstable/http"

const Route = HttpRouter.add("GET", "/hello", Effect.succeed(HttpServerResponse.text("Hello, World!")))
```

**Signature**

```ts
declare const add: <E = never, R = never>(
  method: "*" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS",
  path: PathInput,
  handler:
    | HttpServerResponse.HttpServerResponse
    | Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>
    | ((request: HttpServerRequest.HttpServerRequest) => Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>),
  options?: { readonly uninterruptible?: boolean | undefined }
) => Layer.Layer<never, never, HttpRouter | Request.From<"Requires", Exclude<R, Provided>> | Request.From<"Error", E>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L488)

Since v4.0.0

## addAll

Create a layer that adds multiple routes to the HTTP router.

**Example** (Adding multiple routes)

```ts
import { Effect } from "effect"
import { HttpRouter, HttpServerResponse } from "effect/unstable/http"

const Routes = HttpRouter.addAll([
  HttpRouter.route("GET", "/hello", Effect.succeed(HttpServerResponse.text("Hello, World!")))
])
```

**Signature**

```ts
declare const addAll: <Routes extends ReadonlyArray<Route<any, any>>, EX = never, RX = never>(
  routes: Routes | Effect.Effect<Routes, EX, RX>,
  options?: { readonly prefix?: string | undefined }
) => Layer.Layer<
  never,
  EX,
  | HttpRouter
  | Exclude<RX, Scope.Scope>
  | Request.From<"Requires", Exclude<Route.Context<Routes[number]>, Provided>>
  | Request.From<"Error", Route.Error<Routes[number]>>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L522)

Since v4.0.0

## layer

Layer that provides a newly constructed `HttpRouter`.

**Signature**

```ts
declare const layer: Layer.Layer<HttpRouter, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L550)

Since v4.0.0

## make

Constructs an empty `HttpRouter` service.

**Details**

The returned router accepts route and middleware registrations and later routes
the current `HttpServerRequest` to the matching `HttpServerResponse`.

**Signature**

```ts
declare const make: Effect.Effect<HttpRouter, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L118)

Since v4.0.0

## toHttpEffect

Builds an application layer with a router and returns the router as an HTTP
handler effect.

**Details**

The returned effect handles the current `HttpServerRequest` in the current
`Scope`; route request markers are converted into the ordinary requirements of
the returned handler.

**Signature**

```ts
declare const toHttpEffect: <A, E, R>(
  appLayer: Layer.Layer<A, E, R>
) => Effect.Effect<
  Effect.Effect<
    HttpServerResponse.HttpServerResponse,
    Request.Only<"Error", R> | Request.Only<"GlobalRequires", R> | HttpServerError.HttpServerError,
    Scope.Scope | HttpServerRequest.HttpServerRequest | Request.Only<"Requires", R> | Request.Only<"GlobalRequires", R>
  >,
  Request.Without<E>,
  Exclude<Request.Without<R>, HttpRouter> | Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L565)

Since v4.0.0

## use

Creates a layer that accesses the current `HttpRouter` service and runs the
supplied effect.

**When to use**

Use when you need to register routes or middleware with the router during layer
construction.

**Example** (Registering routes during layer construction)

```ts
import { Effect, Layer } from "effect"
import { HttpRouter } from "effect/unstable/http"

const MyRoute = Layer.effectDiscard(
  Effect.gen(function* () {
    const router = yield* HttpRouter.HttpRouter

    // then use `yield* router.add(...)` to add a route
  })
)
```

**Signature**

```ts
declare const use: <A, E, R>(
  f: (router: HttpRouter) => Effect.Effect<A, E, R>
) => Layer.Layer<never, E, HttpRouter | Exclude<R, Scope.Scope>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L465)

Since v4.0.0

# PathInput

## PathInput (type alias)

Path pattern accepted by the router. Routes must use an absolute path
beginning with `/` or the wildcard `*`.

**Signature**

```ts
type PathInput = `/${string}` | "*"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L684)

Since v4.0.0

## prefixPath

Adds a path prefix to a route path.

**Details**

Trailing slashes are removed from the prefix; `/` becomes the prefix itself and
`*` becomes a wildcard route under the prefix.

**Signature**

```ts
declare const prefixPath: { (prefix: string): (self: string) => string; (self: string, prefix: string): string }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L701)

Since v4.0.0

# Request types

## GlobalProvided (type alias)

Services provided to global middleware.

**Signature**

```ts
type GlobalProvided = HttpServerRequest.HttpServerRequest | Scope.Scope
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L802)

Since v4.0.0

## Provided (type alias)

Services provided by the HTTP router, which are available in the
request context.

**Signature**

```ts
type Provided = HttpServerRequest.HttpServerRequest | Scope.Scope | HttpServerRequest.ParsedSearchParams | RouteContext
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L790)

Since v4.0.0

## Request (interface)

Represents a request-level dependency, that needs to be provided by
middleware.

**Signature**

```ts
export interface Request<Kind extends string, T> {
  readonly _: unique symbol
  readonly kind: Kind
  readonly type: T
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L743)

Since v4.0.0

# Route

## Route (interface)

Description of a registered HTTP route.

**Details**

A route pairs an HTTP method and path pattern with a response handler, plus
metadata used for prefix handling and interruptibility.

**Signature**

```ts
export interface Route<E = never, R = never> {
  readonly [RouteTypeId]: typeof RouteTypeId
  readonly method: HttpMethod.HttpMethod | "*"
  readonly path: PathInput
  readonly handler: Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>
  readonly uninterruptible: boolean
  readonly prefix: Option.Option<string>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L596)

Since v4.0.0

## prefixRoute

Returns a copy of a route with its path prefixed.

**Details**

The prefix is also tracked on the route so that, when the route handles a
request, the matched prefix can be removed from the request URL seen by the
handler.

**Signature**

```ts
declare const prefixRoute: {
  (prefix: string): <E, R>(self: Route<E, R>) => Route<E, R>
  <E, R>(self: Route<E, R>, prefix: string): Route<E, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L723)

Since v4.0.0

## route

Constructs a `Route` from an HTTP method, path, and handler.

**Details**

The handler may be a static response, an effect that produces a response, or a
function from the current request to a response effect. Set `uninterruptible` to
prevent the route handler from being made interruptible while it runs.

**Signature**

```ts
declare const route: <E = never, R = never>(
  method: "*" | HttpMethod.HttpMethod,
  path: PathInput,
  handler:
    | HttpServerResponse.HttpServerResponse
    | Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>
    | ((request: HttpServerRequest.HttpServerRequest) => Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>),
  options?: { readonly uninterruptible?: boolean | undefined }
) => Route<E, Exclude<R, Provided>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L654)

Since v4.0.0

# configuration

## RouterConfig

Context reference for low-level router configuration.

**Details**

The value is passed to the route matcher when an `HttpRouter` is created and
defaults to an empty configuration.

**Signature**

```ts
declare const RouterConfig: Context.Reference<Partial<FindMyWay.RouterConfig>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L255)

Since v4.0.0

# getters

## params

Effect that returns the path parameters captured for the current matched route.

**Signature**

```ts
declare const params: Effect.Effect<ReadonlyRecord<string, string | undefined>, never, RouteContext>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L287)

Since v4.0.0

# middleware

## Middleware (interface)

Composable descriptor for route-scoped HTTP router middleware.

**Details**

Its `layer` can be provided to route layers, and `combine` composes middleware
while tracking provided services, handled errors, and remaining requirements at
the type level.

**Signature**

```ts
export interface Middleware<
  Config extends {
    provides: any
    handles: any
    error: any
    requires: any
    layerError: any
    layerRequires: any
  }
> {
  readonly [MiddlewareTypeId]: Config

  readonly layer: [Config["requires"]] extends [never]
    ? Layer.Layer<
        Request.From<"Requires", Config["provides"]>,
        Config["layerError"],
        Config["layerRequires"] | Request.From<"Requires", Config["requires"]> | Request.From<"Error", Config["error"]>
      >
    : "Need to .combine(middleware) that satisfy the missing request dependencies"

  readonly combine: <
    Config2 extends {
      provides: any
      handles: any
      error: any
      requires: any
      layerError: any
      layerRequires: any
    }
  >(
    other: Middleware<Config2>
  ) => Middleware<{
    provides: Config2["provides"] | Config["provides"]
    handles: Config2["handles"] | Config["handles"]
    error: Config2["error"] | Exclude<Config["error"], Config2["handles"]>
    requires: Exclude<Config["requires"], Config2["provides"]> | Config2["requires"]
    layerError: Config["layerError"] | Config2["layerError"]
    layerRequires: Config["layerRequires"] | Config2["layerRequires"]
  }>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L820)

Since v4.0.0

## cors

Middleware that applies CORS headers to the HTTP response.

**Signature**

```ts
declare const cors: (
  options?:
    | {
        readonly allowedOrigins?: ReadonlyArray<string> | undefined
        readonly allowedMethods?: ReadonlyArray<string> | undefined
        readonly allowedHeaders?: ReadonlyArray<string> | undefined
        readonly exposedHeaders?: ReadonlyArray<string> | undefined
        readonly maxAge?: number | undefined
        readonly credentials?: boolean | undefined
      }
    | undefined
) => Layer.Layer<never, never, HttpRouter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L1155)

Since v4.0.0

## disableLogger

Middleware that disables the logger for some routes.

**Example** (Disabling route logging)

```ts
import { Effect, Layer } from "effect"
import { HttpRouter, HttpServerResponse } from "effect/unstable/http"

const Route = HttpRouter.add("GET", "/hello", Effect.succeed(HttpServerResponse.text("Hello, World!"))).pipe(
  // disable the logger for this route
  Layer.provide(HttpRouter.disableLogger)
)
```

**Signature**

```ts
declare const disableLogger: Layer.Layer<never, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L1188)

Since v4.0.0

## middleware

Create a middleware layer that can be used to modify requests and responses.

**Details**

By default, the middleware only affects the routes that it is provided to.

If you want to create a middleware that applies globally to all routes, pass
the `global` option as `true`.

**Example** (Applying route and global middleware)

```ts
import { Context, Effect, Layer } from "effect"
import { HttpMiddleware, HttpRouter, HttpServerResponse } from "effect/unstable/http"

// Here we are defining a CORS middleware
const CorsMiddleware = HttpRouter.middleware(HttpMiddleware.cors()).layer
// You can also use HttpRouter.cors() to create a CORS middleware

class CurrentSession extends Context.Service<
  CurrentSession,
  {
    readonly token: string
  }
>()("CurrentSession") {}

// You can create middleware that provides a service to the HTTP requests.
const SessionMiddleware = HttpRouter.middleware<{
  provides: CurrentSession
}>()(
  Effect.gen(function* () {
    yield* Effect.log("SessionMiddleware initialized")

    return (httpEffect) =>
      Effect.provideService(httpEffect, CurrentSession, {
        token: "dummy-token"
      })
  })
).layer

Effect.gen(function* () {
  const router = yield* HttpRouter.HttpRouter
  yield* router.add(
    "GET",
    "/hello",
    Effect.gen(function* () {
      // Requests can now access the current session
      const session = yield* CurrentSession
      return HttpServerResponse.text(`Hello, World! Your token is ${session.token}`)
    })
  )
}).pipe(
  Layer.effectDiscard,
  // Provide the SessionMiddleware & CorsMiddleware to some routes
  Layer.provide([SessionMiddleware, CorsMiddleware])
)
```

**Signature**

```ts
declare const middleware: middleware.Make<never, never> &
  (<Config extends { provides?: any; handles?: any } = {}>() => middleware.Make<
    Config extends { provides: infer R } ? R : never,
    Config extends { handles: infer E } ? E : never
  >)
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L921)

Since v4.0.0

## provideRequest

Provides request-level dependencies to some routes.

**Signature**

```ts
declare const provideRequest: <A2, E2, R2>(
  layer: Layer.Layer<A2, E2, R2>
) => <A, E, R>(self: Layer.Layer<A, E, R>) => Layer.Layer<A, E | E2, R2 | Exclude<R, Request.From<"Requires", A2>>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L1196)

Since v4.0.0

# schemas

## schemaJson

Decodes a schema from the current request and its JSON body.

**Details**

The input passed to the schema includes the request method, URL, headers,
cookies, path parameters, search parameters, and parsed JSON body. The effect
fails if the body cannot be parsed or the schema decode fails.

**Signature**

```ts
declare const schemaJson: <
  A,
  I extends Partial<{
    readonly method: HttpMethod.HttpMethod
    readonly url: string
    readonly cookies: Readonly<Record<string, string | undefined>>
    readonly headers: Readonly<Record<string, string | undefined>>
    readonly pathParams: Readonly<Record<string, string | undefined>>
    readonly searchParams: Readonly<Record<string, string | ReadonlyArray<string> | undefined>>
    readonly body: any
  }>,
  RD,
  RE
>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => Effect.Effect<
  A,
  HttpServerError.HttpServerError | Schema.SchemaError,
  HttpServerRequest.HttpServerRequest | HttpServerRequest.ParsedSearchParams | RouteContext | RD
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L305)

Since v4.0.0

## schemaNoBody

Decodes a schema from the current request without reading the request body.

**Details**

The input passed to the schema includes the request method, URL, headers,
cookies, path parameters, and search parameters.

**Signature**

```ts
declare const schemaNoBody: <
  A,
  I extends Partial<{
    readonly method: HttpMethod.HttpMethod
    readonly url: string
    readonly cookies: Readonly<Record<string, string | undefined>>
    readonly headers: Readonly<Record<string, string | undefined>>
    readonly pathParams: Readonly<Record<string, string | undefined>>
    readonly searchParams: Readonly<Record<string, string | ReadonlyArray<string> | undefined>>
  }>,
  RD,
  RE
>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => Effect.Effect<
  A,
  Schema.SchemaError,
  HttpServerRequest.HttpServerRequest | HttpServerRequest.ParsedSearchParams | RouteContext | RD
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L361)

Since v4.0.0

## schemaParams

Decodes a schema from the current route path parameters and search parameters.

**Details**

When the same key appears in both sources, the path parameter value is used.

**Signature**

```ts
declare const schemaParams: <A, I extends Readonly<Record<string, string | ReadonlyArray<string> | undefined>>, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => Effect.Effect<A, Schema.SchemaError, HttpServerRequest.ParsedSearchParams | RouteContext | RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L413)

Since v4.0.0

## schemaPathParams

Decodes a schema from the path parameters captured for the current matched
route.

**Signature**

```ts
declare const schemaPathParams: <A, I extends Readonly<Record<string, string | undefined>>, RD, RE>(
  schema: Schema.Codec<A, I, RD, RE>,
  options?: ParseOptions | undefined
) => Effect.Effect<A, Schema.SchemaError, RouteContext | RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L432)

Since v4.0.0

# server

## serve

Runs the provided application layer as an HTTP server.

**Signature**

```ts
declare const serve: <A, E, R, HE, HR = Request.Only<"Requires", R> | Request.Only<"GlobalRequires", R>>(
  appLayer: Layer.Layer<A, E, R>,
  options?: {
    readonly routerConfig?: Partial<FindMyWay.RouterConfig> | undefined
    readonly disableLogger?: boolean | undefined
    readonly disableListenLog?: boolean
    readonly middleware?: (
      effect: Effect.Effect<
        HttpServerResponse.HttpServerResponse,
        Request.Only<"Error", R> | Request.Only<"GlobalError", R> | HttpServerError.HttpServerError,
        | Scope.Scope
        | HttpServerRequest.HttpServerRequest
        | Request.Only<"Requires", R>
        | Request.Only<"GlobalRequires", R>
      >
    ) => Effect.Effect<HttpServerResponse.HttpServerResponse, HE, HR>
  }
) => Layer.Layer<
  A,
  Request.Without<E>,
  HttpServer.HttpServer | Exclude<Request.Without<R> | Exclude<HR, GlobalProvided>, HttpRouter>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L1221)

Since v4.0.0

## toWebHandler

Builds a Fetch-compatible request handler from an HTTP router application
layer.

**Details**

The result contains a `handler` function that converts Web `Request` values to
Web `Response` values and a `dispose` function for releasing the layer
resources.

**Signature**

```ts
declare const toWebHandler: <
  A,
  E,
  R extends
    | HttpRouter
    | Request<"Requires", any>
    | Request<"GlobalRequires", any>
    | Request<"Error", any>
    | Request<"GlobalError", any>,
  HE,
  HR = Exclude<Request.Only<"Requires", R>, A> | Exclude<Request.Only<"GlobalRequires", R>, A>
>(
  appLayer: Layer.Layer<A, E, R>,
  options?: {
    readonly memoMap?: Layer.MemoMap | undefined
    readonly routerConfig?: Partial<FindMyWay.RouterConfig> | undefined
    readonly disableLogger?: boolean | undefined
    readonly middleware?: (
      effect: Effect.Effect<
        HttpServerResponse.HttpServerResponse,
        Request.Only<"Error", R> | Request.Only<"GlobalError", R> | HttpServerError.HttpServerError,
        | Scope.Scope
        | HttpServerRequest.HttpServerRequest
        | Request.Only<"Requires", R>
        | Request.Only<"GlobalRequires", R>
      >
    ) => Effect.Effect<HttpServerResponse.HttpServerResponse, HE, HR>
  }
) => {
  readonly handler: [HR] extends [never]
    ? (request: globalThis.Request, context?: Context.Context<never> | undefined) => Promise<Response>
    : (request: globalThis.Request, context: Context.Context<HR>) => Promise<Response>
  readonly dispose: () => Promise<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L1285)

Since v4.0.0

# services

## RouteContext (class)

Service for the matched HTTP route in the current request.

**When to use**

Use to read captured path parameters and route metadata while handling a
request matched by the router.

**Details**

It provides the route definition and the path parameters captured by the route
matcher.

**Signature**

```ts
declare class RouteContext
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L276)

Since v4.0.0

# utils

## Request (namespace)

Helper types for request-level dependency markers used by router layers and
middleware.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L755)

Since v4.0.0

### From (type alias)

Wraps a type in a request-level marker of the supplied kind.

**Signature**

```ts
type From<Kind, R> = R extends infer T ? Request<Kind, T> : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L762)

Since v4.0.0

### Only (type alias)

Extracts the payload types from request-level markers that have the supplied
kind.

**Signature**

```ts
type Only<Kind, A> = A extends Request<Kind, infer T> ? T : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L771)

Since v4.0.0

### Without (type alias)

Removes request-level markers from a union, leaving only ordinary requirement
or error types.

**Signature**

```ts
type Without<A> = A extends Request<infer _Kind, infer _> ? never : A
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L780)

Since v4.0.0

## Route (namespace)

Helper types for extracting the error and context types carried by `Route`
values.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L611)

Since v4.0.0

### Error (type alias)

Extracts the error type produced by a `Route` handler.

**Signature**

```ts
type Error<R> = R extends Route<infer E, infer _R> ? E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L618)

Since v4.0.0

### Context (type alias)

Extracts the context requirements of a `Route` handler.

**Signature**

```ts
type Context<T> = T extends Route<infer _E, infer R> ? R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L626)

Since v4.0.0

## middleware (namespace)

Types used by the `middleware` constructor.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L1046)

Since v4.0.0

### Make (type alias)

Overloaded constructor type for router middleware.

**Details**

It builds either a route-scoped `Middleware` or, when `global` is `true`, a
layer that installs middleware for all routes. The type tracks provided
services, handled errors, middleware failures, and remaining requirements.

**Signature**

```ts
type Make<Provides, Handles> = {
  <E, R, EX, RX, const Global extends boolean = false>(
    middleware: Effect.Effect<
      (
        effect: Effect.Effect<
          HttpServerResponse.HttpServerResponse,
          Types.NoInfer<Handles | Types.unhandled>,
          Types.NoInfer<Provides>
        >
      ) => Effect.Effect<HttpServerResponse.HttpServerResponse, E, R> &
        (Types.unhandled extends E ? unknown : "You must only handle the configured errors"),
      EX,
      RX
    >,
    options?: {
      readonly global?: Global | undefined
    }
  ): Global extends true
    ? Layer.Layer<
        | Request.From<"Requires", Provides>
        | Request.From<"Error", Handles>
        | Request.From<"GlobalRequires", Provides>
        | Request.From<"GlobalError", Handles>,
        EX,
        | HttpRouter
        | Exclude<RX, Scope.Scope>
        | Request.From<"GlobalRequires", Exclude<R, GlobalProvided>>
        | Request.From<"GlobalError", Exclude<E, Types.unhandled>>
      >
    : Middleware<{
        provides: Provides
        handles: Handles
        error: Exclude<E, Types.unhandled>
        requires: Exclude<R, Provided>
        layerError: EX
        layerRequires: Exclude<RX, Scope.Scope>
      }>
  <E, R, const Global extends boolean = false>(
    middleware: ((
      effect: Effect.Effect<
        HttpServerResponse.HttpServerResponse,
        Types.NoInfer<Handles | Types.unhandled>,
        Types.NoInfer<Provides>
      >
    ) => Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>) &
      (Types.unhandled extends E ? unknown : "You must only handle the configured errors"),
    options?: {
      readonly global?: Global | undefined
    }
  ): Global extends true
    ? Layer.Layer<
        | Request.From<"Requires", Provides>
        | Request.From<"Error", Handles>
        | Request.From<"GlobalRequires", Provides>
        | Request.From<"GlobalError", Handles>,
        never,
        | HttpRouter
        | Request.From<"GlobalRequires", Exclude<R, GlobalProvided>>
        | Request.From<"GlobalError", Exclude<E, Types.unhandled>>
      >
    : Middleware<{
        provides: Provides
        handles: Handles
        error: Exclude<E, Types.unhandled>
        requires: Exclude<R, Provided>
        layerError: never
        layerRequires: never
      }>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L1059)

Since v4.0.0

### Fn (type alias)

Function that transforms an HTTP response effect into another HTTP response
effect.

**Signature**

```ts
type Fn = (
  effect: Effect.Effect<HttpServerResponse.HttpServerResponse>
) => Effect.Effect<HttpServerResponse.HttpServerResponse>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRouter.ts#L1144)

Since v4.0.0
