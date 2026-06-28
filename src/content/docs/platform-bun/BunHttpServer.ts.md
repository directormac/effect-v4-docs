---
title: BunHttpServer.ts
nav_order: 8
parent: "@effect/platform-bun"
---

## BunHttpServer.ts overview

Bun implementation of the Effect `HttpServer`.

`make` creates a scoped HTTP server from `Bun.serve`, converting Bun
`Request` values into `HttpServerRequest` values and Effect
`HttpServerResponse` values back into Web `Response` values. The server
supports streaming bodies, multipart requests, file responses through
`BunHttpPlatform`, and WebSocket upgrades. This module also provides layers
for the server alone, the Bun HTTP support services, the combined server,
configurable server options, and a test server with an HTTP client.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)
  - [layerHttpServices](#layerhttpservices)
  - [layerServer](#layerserver)
  - [layerTest](#layertest)
- [options](#options)
  - [ServeOptions (type alias)](#serveoptions-type-alias)

---

# constructors

## make

Creates a scoped Bun `HttpServer` from `Bun.serve` options, stopping the server on scope finalization with optional graceful shutdown settings.

**Signature**

```ts
declare const make: <R extends string>(
  options: ServeOptions<R> & {
    readonly disablePreemptiveShutdown?: boolean | undefined
    readonly gracefulShutdownTimeout?: Duration.Input | undefined
  }
) => Effect.Effect<
  {
    readonly serve: {
      <E, R>(
        effect: Effect.Effect<ServerResponse.HttpServerResponse, E, R>
      ): Effect.Effect<void, never, Exclude<R, ServerRequest.HttpServerRequest> | Scope.Scope>
      <E, R, App extends Effect.Effect<ServerResponse.HttpServerResponse, any, any>>(
        effect: Effect.Effect<ServerResponse.HttpServerResponse, E, R>,
        middleware: HttpMiddleware.Applied<App, E, R>
      ): Effect.Effect<void, never, Exclude<R, ServerRequest.HttpServerRequest> | Scope.Scope>
    }
    readonly address: Server.Address
  },
  never,
  Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunHttpServer.ts#L75)

Since v4.0.0

# layers

## layer

Layer that provides a Bun `HttpServer` together with the Bun HTTP platform, ETag generator, and Bun services.

**Signature**

```ts
declare const layer: <R extends string>(
  options: ServeOptions<R> & {
    readonly disablePreemptiveShutdown?: boolean | undefined
    readonly gracefulShutdownTimeout?: Duration.Input | undefined
  }
) => Layer.Layer<Server.HttpServer | HttpPlatform | Etag.Generator | BunServices.BunServices>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunHttpServer.ts#L261)

Since v4.0.0

## layerConfig

Creates the Bun HTTP server and support-services layer from configurable serve options.

**Signature**

```ts
declare const layerConfig: <R extends string>(
  options: Config.Wrap<
    ServeOptions<R> & {
      readonly disablePreemptiveShutdown?: boolean | undefined
      readonly gracefulShutdownTimeout?: Duration.Input | undefined
    }
  >
) => Layer.Layer<Server.HttpServer | HttpPlatform | FileSystem.FileSystem | Etag.Generator | Path.Path, ConfigError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunHttpServer.ts#L294)

Since v4.0.0

## layerHttpServices

Layer that provides Bun HTTP support services: `HttpPlatform`, weak ETag generation, and `BunServices`.

**Signature**

```ts
declare const layerHttpServices: Layer.Layer<BunServices.BunServices | HttpPlatform | Etag.Generator, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunHttpServer.ts#L245)

Since v4.0.0

## layerServer

Layer that provides only `HttpServer` by constructing a scoped Bun server from the supplied serve options.

**Signature**

```ts
declare const layerServer: <R extends string>(
  options: ServeOptions<R> & {
    readonly disablePreemptiveShutdown?: boolean | undefined
    readonly gracefulShutdownTimeout?: Duration.Input | undefined
  }
) => Layer.Layer<Server.HttpServer>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunHttpServer.ts#L232)

Since v4.0.0

## layerTest

Layer that starts a Bun HTTP server on an ephemeral port for tests.

**Signature**

```ts
declare const layerTest: Layer.Layer<
  FileSystem.FileSystem | Path.Path | Server.HttpServer | HttpPlatform | Etag.Generator | HttpClient,
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunHttpServer.ts#L279)

Since v4.0.0

# options

## ServeOptions (type alias)

Bun serve options accepted by the HTTP server, extended with typed route definitions.

**Signature**

```ts
type ServeOptions<R> = (
  | Bun.Serve.UnixServeOptions<WebSocketContext>
  | Bun.Serve.HostnamePortServeOptions<WebSocketContext>
) & { readonly routes?: Bun.Serve.Routes<WebSocketContext, R> }
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunHttpServer.ts#L62)

Since v4.0.0
