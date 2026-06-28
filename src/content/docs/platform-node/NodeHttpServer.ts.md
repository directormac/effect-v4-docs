---
title: NodeHttpServer.ts
nav_order: 11
parent: "@effect/platform-node"
---

## NodeHttpServer.ts overview

Node.js implementation of the Effect `HttpServer`.

This module adapts a supplied Node `http.Server` into Effect's
platform-independent HTTP server service. It starts the server with Node
`listen` options, converts `request` events into `HttpServerRequest` values,
writes `HttpServerResponse` bodies through Node's `ServerResponse`, and
handles `upgrade` events by exposing the upgraded socket through
`HttpServerRequest.upgrade`. It also exports request and upgrade handler
constructors plus layers for the server alone, HTTP support services, the
combined server, configurable options, and tests.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [handlers](#handlers)
  - [makeHandler](#makehandler)
  - [makeUpgradeHandler](#makeupgradehandler)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
  - [layerHttpServices](#layerhttpservices)
  - [layerServer](#layerserver)
- [testing](#testing)
  - [layerTest](#layertest)

---

# constructors

## make

Creates a scoped `HttpServer` from a Node `http.Server`, starts listening
with the supplied options, registers request and upgrade handling, and closes
the server during scope finalization with optional graceful-shutdown control.

**Signature**

```ts
declare const make: (
  evaluate: LazyArg<Http.Server<typeof Http.IncomingMessage, typeof Http.ServerResponse>>,
  options: Net.ListenOptions & {
    readonly disablePreemptiveShutdown?: boolean | undefined
    readonly gracefulShutdownTimeout?: Duration.Input | undefined
  }
) => Effect.Effect<
  {
    readonly serve: {
      <E, R>(
        effect: Effect.Effect<HttpServerResponse, E, R>
      ): Effect.Effect<void, never, Exclude<R, HttpServerRequest> | Scope.Scope>
      <E, R, App extends Effect.Effect<HttpServerResponse, any, any>>(
        effect: Effect.Effect<HttpServerResponse, E, R>,
        middleware: Middleware.HttpMiddleware.Applied<App, E, R>
      ): Effect.Effect<void, never, Exclude<R, HttpServerRequest> | Scope.Scope>
    }
    readonly address: HttpServer.Address
  },
  ServeError,
  Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpServer.ts#L73)

Since v4.0.0

# handlers

## makeHandler

Creates a Node `request` event handler for an Effect HTTP application,
injecting a `HttpServerRequest` and interrupting the request fiber if the
client closes the response before it finishes.

**Signature**

```ts
declare const makeHandler: <
  R,
  E,
  App extends Effect.Effect<HttpServerResponse, any, any> = Effect.Effect<HttpServerResponse, E, R>
>(
  httpEffect: Effect.Effect<HttpServerResponse, E, R>,
  options: {
    readonly scope: Scope.Scope
    readonly middleware?: Middleware.HttpMiddleware.Applied<App, E, R> | undefined
  }
) => Effect.Effect<
  (nodeRequest: Http.IncomingMessage, nodeResponse: Http.ServerResponse) => void,
  never,
  Exclude<Effect.Services<App>, HttpServerRequest | Scope.Scope>
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpServer.ts#L170)

Since v4.0.0

## makeUpgradeHandler

Creates a Node `upgrade` event handler for an Effect HTTP application,
exposing the upgraded WebSocket as the request's `upgrade` effect and
interrupting the request fiber when the socket closes early.

**Signature**

```ts
declare const makeUpgradeHandler: <
  R,
  E,
  App extends Effect.Effect<HttpServerResponse, any, any> = Effect.Effect<HttpServerResponse, E, R>
>(
  lazyWss: Effect.Effect<NodeWS.WebSocketServer>,
  httpEffect: Effect.Effect<HttpServerResponse, E, R>,
  options: {
    readonly scope: Scope.Scope
    readonly middleware?: Middleware.HttpMiddleware.Applied<App, E, R> | undefined
  }
) => Effect.Effect<
  (nodeRequest: Http.IncomingMessage, socket: Duplex, head: Buffer) => void,
  never,
  Exclude<Effect.Services<App>, HttpServerRequest | Scope.Scope>
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpServer.ts#L212)

Since v4.0.0

# layers

## layer

Provides a Node `HttpServer` together with the Node HTTP platform, ETag, and
core platform services required to serve requests.

**Signature**

```ts
declare const layer: (
  evaluate: LazyArg<Http.Server>,
  options: Net.ListenOptions & {
    readonly disablePreemptiveShutdown?: boolean | undefined
    readonly gracefulShutdownTimeout?: Duration.Input | undefined
  }
) => Layer.Layer<
  HttpServer.HttpServer | NodeServices.NodeServices | HttpPlatform.HttpPlatform | Etag.Generator,
  ServeError
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpServer.ts#L428)

Since v4.0.0

## layerConfig

Provides a Node `HttpServer` together with the Node HTTP platform, ETag,
and core Node platform services, reading the listen and shutdown options from
a `Config` value.

**Signature**

```ts
declare const layerConfig: (
  evaluate: LazyArg<Http.Server>,
  options: Config.Wrap<
    Net.ListenOptions & {
      readonly disablePreemptiveShutdown?: boolean | undefined
      readonly gracefulShutdownTimeout?: Duration.Input | undefined
    }
  >
) => Layer.Layer<
  HttpServer.HttpServer | NodeServices.NodeServices | HttpPlatform.HttpPlatform | Etag.Generator,
  ServeError | Config.ConfigError
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpServer.ts#L451)

Since v4.0.0

## layerHttpServices

Provides the Node HTTP support services used by `NodeHttpServer`, including
the HTTP platform, ETag generator, and core Node platform services.

**Signature**

```ts
declare const layerHttpServices: Layer.Layer<
  NodeServices.NodeServices | HttpPlatform.HttpPlatform | Etag.Generator,
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpServer.ts#L413)

Since v4.0.0

## layerServer

Provides an `HttpServer` by creating and managing a scoped Node
`http.Server` with the supplied listen and shutdown options.

**Signature**

```ts
declare const layerServer: (
  evaluate: LazyArg<Http.Server<typeof Http.IncomingMessage, typeof Http.ServerResponse>>,
  options: Net.ListenOptions & {
    readonly disablePreemptiveShutdown?: boolean | undefined
    readonly gracefulShutdownTimeout?: Duration.Input | undefined
  }
) => Layer.Layer<HttpServer.HttpServer, ServeError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpServer.ts#L398)

Since v4.0.0

# testing

## layerTest

Provides a test HTTP server listening on an ephemeral port together with a
Fetch-backed `HttpClient` configured for server integration tests.

**Signature**

```ts
declare const layerTest: Layer.Layer<
  FileSystem.FileSystem | Path.Path | HttpServer.HttpServer | HttpPlatform.HttpPlatform | Etag.Generator | HttpClient,
  ServeError,
  never
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpServer.ts#L477)

Since v4.0.0
