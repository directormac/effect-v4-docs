---
title: HttpServer.ts
nav_order: 251
parent: "effect"
---

## HttpServer.ts overview

Service for serving Effect HTTP responses on a concrete HTTP server.

Platform adapters provide `HttpServer`, and routers or applications consume
it to run an `HttpServerResponse` effect for each incoming request. The
service exposes the listening address, while this module also includes helpers
for address formatting, server logging, and clients that target the current
server in tests.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [serve](#serve)
  - [serveEffect](#serveeffect)
- [address](#address)
  - [Address (type alias)](#address-type-alias)
  - [TcpAddress (interface)](#tcpaddress-interface)
  - [UnixAddress (interface)](#unixaddress-interface)
  - [addressFormattedWith](#addressformattedwith)
  - [formatAddress](#formataddress)
  - [logAddress](#logaddress)
  - [withLogAddress](#withlogaddress)
- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [HttpServer (class)](#httpserver-class)
- [testing](#testing)
  - [layerServices](#layerservices)
  - [layerTestClient](#layertestclient)
  - [makeTestClient](#maketestclient)

---

# accessors

## serve

Creates a layer that starts serving an HTTP response effect with the current
`HttpServer`.

**Details**

The request service is supplied by the server for each request; the returned
layer still requires the server, a scope, and any non-request dependencies of
the response effect or middleware.

**Signature**

```ts
declare const serve: {
  (): <E, R>(
    effect: Effect.Effect<HttpServerResponse, E, R>
  ) => Layer.Layer<never, never, HttpServer | Exclude<R, HttpServerRequest | Scope.Scope>>
  <E, R, App extends Effect.Effect<HttpServerResponse, any, any>>(
    middleware: Middleware.HttpMiddleware.Applied<App, E, R>
  ): (
    effect: Effect.Effect<HttpServerResponse, E, R>
  ) => Layer.Layer<never, never, HttpServer | Exclude<Effect.Services<App>, HttpServerRequest | Scope.Scope>>
  <E, R>(
    effect: Effect.Effect<HttpServerResponse, E, R>
  ): Layer.Layer<never, never, HttpServer | Exclude<R, HttpServerRequest | Scope.Scope>>
  <E, R, App extends Effect.Effect<HttpServerResponse, any, any>>(
    effect: Effect.Effect<HttpServerResponse, E, R>,
    middleware: Middleware.HttpMiddleware.Applied<App, E, R>
  ): Layer.Layer<never, never, HttpServer | Exclude<Effect.Services<App>, HttpServerRequest | Scope.Scope>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L123)

Since v4.0.0

## serveEffect

Effect that starts serving an HTTP response effect with the current
`HttpServer`.

**Details**

The request service is supplied by the server for each request; the effect
requires a scope and any non-request dependencies of the response effect or
middleware.

**Signature**

```ts
declare const serveEffect: {
  (): <E, R>(
    effect: Effect.Effect<HttpServerResponse, E, R>
  ) => Effect.Effect<void, never, Scope.Scope | HttpServer | Exclude<R, HttpServerRequest>>
  <E, R, App extends Effect.Effect<HttpServerResponse, any, any>>(
    middleware: Middleware.HttpMiddleware.Applied<App, E, R>
  ): (
    effect: Effect.Effect<HttpServerResponse, E, R>
  ) => Effect.Effect<void, never, Scope.Scope | HttpServer | Exclude<Effect.Services<App>, HttpServerRequest>>
  <E, R>(
    effect: Effect.Effect<HttpServerResponse, E, R>
  ): Effect.Effect<void, never, Scope.Scope | HttpServer | Exclude<R, HttpServerRequest>>
  <E, R, App extends Effect.Effect<HttpServerResponse, any, any>>(
    effect: Effect.Effect<HttpServerResponse, E, R>,
    middleware: Middleware.HttpMiddleware.Applied<App, E, R>
  ): Effect.Effect<void, never, Scope.Scope | HttpServer | Exclude<Effect.Services<App>, HttpServerRequest>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L172)

Since v4.0.0

# address

## Address (type alias)

Address where an HTTP server is listening.

**Details**

The address is either a TCP host and port or a Unix domain socket path.

**Signature**

```ts
type Address = UnixAddress | TcpAddress
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L68)

Since v4.0.0

## TcpAddress (interface)

TCP address for an HTTP server, identified by hostname and port.

**Signature**

```ts
export interface TcpAddress {
  readonly _tag: "TcpAddress"
  readonly hostname: string
  readonly port: number
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L76)

Since v4.0.0

## UnixAddress (interface)

Unix domain socket address for an HTTP server.

**Signature**

```ts
export interface UnixAddress {
  readonly _tag: "UnixAddress"
  readonly path: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L88)

Since v4.0.0

## addressFormattedWith

Reads the current server address, formats it with `formatAddress`, and passes
the formatted address to the supplied effectful function.

**Signature**

```ts
declare const addressFormattedWith: <A, E, R>(
  f: (address: string) => Effect.Effect<A, E, R>
) => Effect.Effect<A, E, HttpServer | R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L232)

Since v4.0.0

## formatAddress

Formats a server address as a display string.

**Details**

TCP addresses are formatted as `http://host:port`; Unix socket addresses are
formatted as `unix://path`.

**Signature**

```ts
declare const formatAddress: (address: Address) => string
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L216)

Since v4.0.0

## logAddress

Logs the formatted address of the current HTTP server.

**Signature**

```ts
declare const logAddress: Effect.Effect<void, never, HttpServer>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L246)

Since v4.0.0

## withLogAddress

Adds address logging to a layer that provides an `HttpServer`.

**Signature**

```ts
declare const withLogAddress: <A, E, R>(layer: Layer.Layer<A, E, R>) => Layer.Layer<A, E, R | Exclude<HttpServer, A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L256)

Since v4.0.0

# constructors

## make

Constructs an `HttpServer` service from a serving implementation and listening
address.

**Signature**

```ts
declare const make: (options: {
  readonly serve: (
    httpEffect: Effect.Effect<HttpServerResponse, unknown, HttpServerRequest | Scope.Scope>,
    middleware?: Middleware.HttpMiddleware
  ) => Effect.Effect<void, never, Scope.Scope>
  readonly address: Address
}) => HttpServer["Service"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L100)

Since v4.0.0

# models

## HttpServer (class)

Service tag for an HTTP server runtime.

**Details**

The service can serve an HTTP response effect and exposes the address where the
server is listening.

**Signature**

```ts
declare class HttpServer
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L38)

Since v4.0.0

# testing

## layerServices

Layer that provides the platform services commonly needed by HTTP
server tests.

**Details**

It includes `HttpPlatform`, `Path`, a weak ETag generator, and a no-op
`FileSystem`.

**Signature**

```ts
declare const layerServices: Layer.Layer<
  Path.Path | FileSystem.FileSystem | Etag.Generator | HttpPlatform.HttpPlatform,
  never,
  never
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L318)

Since v4.0.0

## layerTestClient

Layer that provides the test `HttpClient` created by `makeTestClient`.

**Signature**

```ts
declare const layerTestClient: Layer.Layer<HttpClient.HttpClient, never, HttpClient.HttpClient | HttpServer>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L300)

Since v4.0.0

## makeTestClient

Builds an `HttpClient` that sends requests to the current test HTTP server.

**Details**

For TCP servers, requests are prefixed with the server URL and `0.0.0.0` is
rewritten to `127.0.0.1`.

**Gotchas**

Unix socket addresses are not supported.

**Signature**

```ts
declare const makeTestClient: Effect.Effect<HttpClient.HttpClient, never, HttpClient.HttpClient | HttpServer>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServer.ts#L278)

Since v4.0.0
