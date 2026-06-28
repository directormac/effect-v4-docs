---
title: HttpRunner.ts
nav_order: 186
parent: "effect"
---

## HttpRunner.ts overview

Connects cluster runner RPCs to HTTP and WebSocket transports.

Runner nodes communicate through the `Runners.Rpcs` protocol. This module
provides client protocol layers for dialing runner addresses over HTTP or
WebSocket, HTTP effects that serve runner RPC handlers, route layers for
installing runner endpoints into an `HttpRouter`, and ready-made layers for
HTTP or WebSocket runner communication.

Since v4.0.0

---

## Exports Grouped by Category

- [http app](#http-app)
  - [toHttpEffect](#tohttpeffect)
  - [toHttpEffectWebsocket](#tohttpeffectwebsocket)
- [layers](#layers)
  - [layerClient](#layerclient)
  - [layerClientProtocolHttp](#layerclientprotocolhttp)
  - [layerClientProtocolHttpDefault](#layerclientprotocolhttpdefault)
  - [layerClientProtocolWebsocket](#layerclientprotocolwebsocket)
  - [layerClientProtocolWebsocketDefault](#layerclientprotocolwebsocketdefault)
  - [layerHttp](#layerhttp)
  - [layerHttpClientOnly](#layerhttpclientonly)
  - [layerHttpOptions](#layerhttpoptions)
  - [layerWebsocket](#layerwebsocket)
  - [layerWebsocketClientOnly](#layerwebsocketclientonly)
  - [layerWebsocketOptions](#layerwebsocketoptions)

---

# http app

## toHttpEffect

Builds an HTTP effect that serves runner RPCs over the HTTP protocol.

**Details**

The returned effect is produced from `RunnerServer.layerHandlers` and the
cluster runner RPC group.

**Signature**

```ts
declare const toHttpEffect: Effect.Effect<
  Effect.Effect<HttpServerResponse, never, Scope | HttpServerRequest>,
  never,
  Scope | RpcSerialization.RpcSerialization | Sharding.Sharding | MessageStorage
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L145)

Since v4.0.0

## toHttpEffectWebsocket

Builds an HTTP effect that serves runner RPCs over WebSocket.

**Details**

The returned effect is produced from `RunnerServer.layerHandlers` and the
cluster runner RPC group.

**Signature**

```ts
declare const toHttpEffectWebsocket: Effect.Effect<
  Effect.Effect<HttpServerResponse, never, Scope | HttpServerRequest>,
  never,
  Scope | RpcSerialization.RpcSerialization | Sharding.Sharding | MessageStorage
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L168)

Since v4.0.0

# layers

## layerClient

Layer that provides `Sharding` and `Runners` using the configured runner RPC
client protocol and storage services.

**Signature**

```ts
declare const layerClient: Layer.Layer<
  Sharding.Sharding | Runners.Runners,
  never,
  MessageStorage | RunnerStorage | ShardingConfig.ShardingConfig | Runners.RpcClientProtocol | RunnerHealth
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L187)

Since v4.0.0

## layerClientProtocolHttp

Provides a runner RPC client protocol that connects to runner addresses over
HTTP.

**Details**

The configured path is appended to each runner address, and `https` switches
the generated URL from `http` to `https`.

**Signature**

```ts
declare const layerClientProtocolHttp: (options: {
  readonly path: string
  readonly https?: boolean | undefined
}) => Layer.Layer<RpcClientProtocol, never, RpcSerialization.RpcSerialization | HttpClient.HttpClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L46)

Since v4.0.0

## layerClientProtocolHttpDefault

Default HTTP runner client protocol layer using path `/`.

**Signature**

```ts
declare const layerClientProtocolHttpDefault: Layer.Layer<
  Runners.RpcClientProtocol,
  never,
  RpcSerialization.RpcSerialization | HttpClient.HttpClient
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L77)

Since v4.0.0

## layerClientProtocolWebsocket

Provides a runner RPC client protocol that connects to runner addresses over
WebSocket.

**Details**

The configured path is appended to each runner address, and `https` switches
the generated URL from `ws` to `wss`.

**Signature**

```ts
declare const layerClientProtocolWebsocket: (options: {
  readonly path: string
  readonly https?: boolean | undefined
}) => Layer.Layer<RpcClientProtocol, never, RpcSerialization.RpcSerialization | Socket.WebSocketConstructor>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L95)

Since v4.0.0

## layerClientProtocolWebsocketDefault

Default WebSocket runner client protocol layer using path `/`.

**Signature**

```ts
declare const layerClientProtocolWebsocketDefault: Layer.Layer<
  Runners.RpcClientProtocol,
  never,
  Socket.WebSocketConstructor | RpcSerialization.RpcSerialization
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L128)

Since v4.0.0

## layerHttp

Layer that serves runner routes at `/` and configures HTTP runner clients.

**Details**

It serves runner routes at `/` and configures runner clients to communicate
over HTTP.

**Signature**

```ts
declare const layerHttp: Layer.Layer<
  Sharding.Sharding | Runners.Runners,
  never,
  | RpcSerialization.RpcSerialization
  | HttpClient.HttpClient
  | HttpServer.HttpServer
  | MessageStorage
  | RunnerStorage
  | ShardingConfig.ShardingConfig
  | RunnerHealth
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L252)

Since v4.0.0

## layerHttpClientOnly

Provides a client-only HTTP runner layer.

**When to use**

Use to provide runner clients over HTTP from a process that should not serve
runner routes.

**Details**

It configures runner clients to communicate over HTTP without serving runner
HTTP routes.

**Signature**

```ts
declare const layerHttpClientOnly: Layer.Layer<
  Sharding.Sharding | Runners.Runners,
  never,
  | RpcSerialization.RpcSerialization
  | HttpClient.HttpClient
  | MessageStorage
  | RunnerStorage
  | ShardingConfig.ShardingConfig
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L282)

Since v4.0.0

## layerHttpOptions

Layer that adds HTTP runner routes to the provided `HttpRouter`.

**Signature**

```ts
declare const layerHttpOptions: (options: {
  readonly path: HttpRouter.PathInput
}) => Layer.Layer<
  Sharding.Sharding | Runners.Runners,
  never,
  | RunnerStorage
  | RunnerHealth
  | RpcSerialization.RpcSerialization
  | MessageStorage
  | ShardingConfig.ShardingConfig
  | Runners.RpcClientProtocol
  | HttpRouter.HttpRouter
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L201)

Since v4.0.0

## layerWebsocket

Layer that serves runner routes at `/` and configures WebSocket runner clients.

**Details**

It serves runner routes at `/` and configures runner clients to communicate
over WebSocket.

**Signature**

```ts
declare const layerWebsocket: Layer.Layer<
  Sharding.Sharding | Runners.Runners,
  never,
  | Socket.WebSocketConstructor
  | RpcSerialization.RpcSerialization
  | HttpServer.HttpServer
  | MessageStorage
  | RunnerStorage
  | ShardingConfig.ShardingConfig
  | RunnerHealth
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L305)

Since v4.0.0

## layerWebsocketClientOnly

Provides a client-only WebSocket runner layer.

**When to use**

Use to provide runner clients over WebSocket from a process that should not
serve runner routes.

**Details**

It configures runner clients to communicate over WebSocket without serving
runner WebSocket routes.

**Signature**

```ts
declare const layerWebsocketClientOnly: Layer.Layer<
  Sharding.Sharding | Runners.Runners,
  never,
  | Socket.WebSocketConstructor
  | RpcSerialization.RpcSerialization
  | MessageStorage
  | RunnerStorage
  | ShardingConfig.ShardingConfig
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L335)

Since v4.0.0

## layerWebsocketOptions

Layer that adds WebSocket runner routes to the provided `HttpRouter`.

**Signature**

```ts
declare const layerWebsocketOptions: (options: {
  readonly path: HttpRouter.PathInput
}) => Layer.Layer<
  Sharding.Sharding | Runners.Runners,
  never,
  | ShardingConfig.ShardingConfig
  | Runners.RpcClientProtocol
  | MessageStorage
  | RunnerStorage
  | RunnerHealth
  | RpcSerialization.RpcSerialization
  | HttpRouter.HttpRouter
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpRunner.ts#L224)

Since v4.0.0
