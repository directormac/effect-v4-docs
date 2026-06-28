---
title: RpcServer.ts
nav_order: 320
parent: "effect"
---

## RpcServer.ts overview

Runs server-side handlers for RPC groups.

This module connects typed handlers for an `RpcGroup` to a server `Protocol`.
It receives client messages, decodes request payloads, runs matching handlers
and middleware, tracks in-flight requests, handles acknowledgements and
interrupts, and sends responses back to clients. It also provides constructors
and layers for decoded messages, HTTP, WebSocket, sockets, stdio, and worker
runner protocols.

Since v4.0.0

---

## Exports Grouped by Category

- [http app](#http-app)
  - [toHttpEffect](#tohttpeffect)
  - [toHttpEffectWebsocket](#tohttpeffectwebsocket)
- [protocols](#protocols)
  - [Protocol (class)](#protocol-class)
  - [layerHttp](#layerhttp)
  - [layerProtocolHttp](#layerprotocolhttp)
  - [layerProtocolSocketServer](#layerprotocolsocketserver)
  - [layerProtocolStdio](#layerprotocolstdio)
  - [layerProtocolWebsocket](#layerprotocolwebsocket)
  - [layerProtocolWorkerRunner](#layerprotocolworkerrunner)
  - [makeProtocolHttp](#makeprotocolhttp)
  - [makeProtocolSocketServer](#makeprotocolsocketserver)
  - [makeProtocolStdio](#makeprotocolstdio)
  - [makeProtocolWebsocket](#makeprotocolwebsocket)
  - [makeProtocolWithHttpEffect](#makeprotocolwithhttpeffect)
  - [makeProtocolWithHttpEffectWebsocket](#makeprotocolwithhttpeffectwebsocket)
  - [makeProtocolWorkerRunner](#makeprotocolworkerrunner)
- [server](#server)
  - [RpcServer (interface)](#rpcserver-interface)
  - [layer](#layer)
  - [make](#make)
  - [makeNoSerialization](#makenoserialization)

---

# http app

## toHttpEffect

Starts an RPC server for a group and returns the HTTP request/response effect
that serves the non-websocket HTTP RPC protocol.

**Signature**

```ts
declare const toHttpEffect: <Rpcs extends Rpc.Any>(
  group: RpcGroup.RpcGroup<Rpcs>,
  options?:
    | {
        readonly disableTracing?: boolean | undefined
        readonly spanPrefix?: string | undefined
        readonly spanAttributes?: Record<string, unknown> | undefined
        readonly disableFatalDefects?: boolean | undefined
      }
    | undefined
) => Effect.Effect<
  Effect.Effect<HttpServerResponse.HttpServerResponse, never, Scope.Scope | HttpServerRequest.HttpServerRequest>,
  never,
  | Scope.Scope
  | RpcSerialization.RpcSerialization
  | Rpc.ToHandler<Rpcs>
  | Rpc.Middleware<Rpcs>
  | Rpc.ServicesServer<Rpcs>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L1165)

Since v4.0.0

## toHttpEffectWebsocket

Starts an RPC server for a group and returns the HTTP effect that upgrades
requests to the websocket RPC protocol.

**Signature**

```ts
declare const toHttpEffectWebsocket: <Rpcs extends Rpc.Any>(
  group: RpcGroup.RpcGroup<Rpcs>,
  options?:
    | {
        readonly disableTracing?: boolean | undefined
        readonly spanPrefix?: string | undefined
        readonly spanAttributes?: Record<string, unknown> | undefined
        readonly disableFatalDefects?: boolean | undefined
      }
    | undefined
) => Effect.Effect<
  Effect.Effect<HttpServerResponse.HttpServerResponse, never, Scope.Scope | HttpServerRequest.HttpServerRequest>,
  never,
  | Scope.Scope
  | RpcSerialization.RpcSerialization
  | Rpc.ToHandler<Rpcs>
  | Rpc.Middleware<Rpcs>
  | Rpc.ServicesServer<Rpcs>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L1206)

Since v4.0.0

# protocols

## Protocol (class)

Defines the service interface for an RPC server transport, responsible for receiving
encoded client messages, sending encoded responses, tracking clients, and
declaring transport capabilities.

**When to use**

Use to provide the transport boundary for RPC servers over HTTP, WebSocket,
workers, sockets, or custom protocols.

**Signature**

```ts
declare class Protocol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L830)

Since v4.0.0

## layerHttp

Creates a RPC server that registers a HTTP route with a `HttpRouter`.

**Details**

Defaults to using websockets for communication, but can be configured to use
HTTP.

**Signature**

```ts
declare const layerHttp: <Rpcs extends Rpc.Any>(options: {
  readonly group: RpcGroup.RpcGroup<Rpcs>
  readonly path: HttpRouter.PathInput
  readonly protocol?: "http" | "websocket" | undefined
  readonly disableTracing?: boolean | undefined
  readonly spanPrefix?: string | undefined
  readonly spanAttributes?: Record<string, unknown> | undefined
  readonly concurrency?: number | "unbounded" | undefined
  readonly disableFatalDefects?: boolean | undefined
}) => Layer.Layer<
  never,
  never,
  | RpcSerialization.RpcSerialization
  | HttpRouter.HttpRouter
  | Rpc.ToHandler<Rpcs>
  | Rpc.Middleware<Rpcs>
  | Rpc.ServicesServer<Rpcs>
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L791)

Since v4.0.0

## layerProtocolHttp

Provides a server `Protocol` that uses HTTP POST requests for RPC
communication.

**Signature**

```ts
declare const layerProtocolHttp: (options: {
  readonly path: HttpRouter.PathInput
}) => Layer.Layer<Protocol, never, RpcSerialization.RpcSerialization | HttpRouter.HttpRouter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L1152)

Since v4.0.0

## layerProtocolSocketServer

RPC protocol that uses `SocketServer` for communication.

**Signature**

```ts
declare const layerProtocolSocketServer: Layer.Layer<
  Protocol,
  never,
  RpcSerialization.RpcSerialization | SocketServer.SocketServer
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L880)

Since v4.0.0

## layerProtocolStdio

Provides a server `Protocol` that reads RPC messages from `Stdio.stdin` and
writes encoded responses to `Stdio.stdout`.

**Signature**

```ts
declare const layerProtocolStdio: Layer.Layer<Protocol, never, Stdio | RpcSerialization.RpcSerialization>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L1308)

Since v4.0.0

## layerProtocolWebsocket

RPC protocol that uses WebSockets for communication.

**Signature**

```ts
declare const layerProtocolWebsocket: (options: {
  readonly path: HttpRouter.PathInput
}) => Layer.Layer<Protocol, never, RpcSerialization.RpcSerialization | HttpRouter.HttpRouter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L947)

Since v4.0.0

## layerProtocolWorkerRunner

Provides a server `Protocol` backed by the current `WorkerRunnerPlatform`.

**Signature**

```ts
declare const layerProtocolWorkerRunner: Layer.Layer<Protocol, WorkerError, WorkerRunner.WorkerRunnerPlatform>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L1379)

Since v4.0.0

## makeProtocolHttp

Creates an HTTP server `Protocol` and registers its request handler as a POST
route on the current `HttpRouter`.

**Signature**

```ts
declare const makeProtocolHttp: (options: {
  readonly path: HttpRouter.PathInput
}) => Effect.Effect<Protocol["Service"], never, RpcSerialization.RpcSerialization | HttpRouter.HttpRouter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L1132)

Since v4.0.0

## makeProtocolSocketServer

Creates a server `Protocol` backed by the current `SocketServer`, accepting
socket connections and routing decoded RPC messages.

**Signature**

```ts
declare const makeProtocolSocketServer: Effect.Effect<
  {
    readonly run: (f: (clientId: number, data: FromClientEncoded) => Effect.Effect<void>) => Effect.Effect<never>
    readonly disconnects: Queue.Dequeue<number>
    readonly send: (
      clientId: number,
      response: FromServerEncoded,
      transferables?: ReadonlyArray<globalThis.Transferable>
    ) => Effect.Effect<void>
    readonly end: (clientId: number) => Effect.Effect<void>
    readonly clientIds: Effect.Effect<ReadonlySet<number>>
    readonly initialMessage: Effect.Effect<Option.Option<unknown>>
    readonly supportsAck: boolean
    readonly supportsTransferables: boolean
    readonly supportsSpanPropagation: boolean
  },
  never,
  Scope.Scope | RpcSerialization.RpcSerialization | SocketServer.SocketServer
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L865)

Since v4.0.0

## makeProtocolStdio

Creates a server `Protocol` that reads RPC messages from `Stdio.stdin` and
writes encoded responses to `Stdio.stdout`.

**Signature**

```ts
declare const makeProtocolStdio: Effect.Effect<
  {
    readonly run: (f: (clientId: number, data: FromClientEncoded) => Effect.Effect<void>) => Effect.Effect<never>
    readonly disconnects: Queue.Dequeue<number>
    readonly send: (
      clientId: number,
      response: FromServerEncoded,
      transferables?: ReadonlyArray<globalThis.Transferable>
    ) => Effect.Effect<void>
    readonly end: (clientId: number) => Effect.Effect<void>
    readonly clientIds: Effect.Effect<ReadonlySet<number>>
    readonly initialMessage: Effect.Effect<Option.Option<unknown>>
    readonly supportsAck: boolean
    readonly supportsTransferables: boolean
    readonly supportsSpanPropagation: boolean
  },
  never,
  Scope.Scope | Stdio | RpcSerialization.RpcSerialization
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L1247)

Since v4.0.0

## makeProtocolWebsocket

Creates a websocket server `Protocol` and registers its upgrade handler as a
GET route on the current `HttpRouter`.

**Signature**

```ts
declare const makeProtocolWebsocket: (options: {
  readonly path: HttpRouter.PathInput
}) => Effect.Effect<Protocol["Service"], never, RpcSerialization.RpcSerialization | HttpRouter.HttpRouter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L928)

Since v4.0.0

## makeProtocolWithHttpEffect

Creates an HTTP request/response server `Protocol` together with an HTTP
effect that decodes the current request and streams or returns encoded RPC
responses.

**Signature**

```ts
declare const makeProtocolWithHttpEffect: Effect.Effect<
  {
    readonly protocol: Protocol["Service"]
    readonly httpEffect: Effect.Effect<
      HttpServerResponse.HttpServerResponse,
      never,
      Scope.Scope | HttpServerRequest.HttpServerRequest
    >
  },
  never,
  RpcSerialization.RpcSerialization
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L965)

Since v4.0.0

## makeProtocolWithHttpEffectWebsocket

Creates a websocket server `Protocol` together with an HTTP effect that
upgrades the current request to a websocket and attaches it to the protocol.

**Signature**

```ts
declare const makeProtocolWithHttpEffectWebsocket: Effect.Effect<
  {
    readonly protocol: Protocol["Service"]
    readonly httpEffect: Effect.Effect<
      HttpServerResponse.HttpServerResponse,
      never,
      Scope.Scope | HttpServerRequest.HttpServerRequest
    >
  },
  never,
  RpcSerialization.RpcSerialization
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L893)

Since v4.0.0

## makeProtocolWorkerRunner

Creates a server `Protocol` backed by `WorkerRunnerPlatform`, routing worker
messages to the RPC server and server responses back to workers.

**Signature**

```ts
declare const makeProtocolWorkerRunner: Effect.Effect<
  {
    readonly run: (f: (clientId: number, data: FromClientEncoded) => Effect.Effect<void>) => Effect.Effect<never>
    readonly disconnects: Queue.Dequeue<number>
    readonly send: (
      clientId: number,
      response: FromServerEncoded,
      transferables?: ReadonlyArray<globalThis.Transferable>
    ) => Effect.Effect<void>
    readonly end: (clientId: number) => Effect.Effect<void>
    readonly clientIds: Effect.Effect<ReadonlySet<number>>
    readonly initialMessage: Effect.Effect<Option.Option<unknown>>
    readonly supportsAck: boolean
    readonly supportsTransferables: boolean
    readonly supportsSpanPropagation: boolean
  },
  WorkerError,
  Scope.Scope | WorkerRunner.WorkerRunnerPlatform
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L1321)

Since v4.0.0

# server

## RpcServer (interface)

The decoded RPC server boundary, accepting client messages for a client id
and allowing that client to be disconnected.

**Signature**

```ts
export interface RpcServer<A extends Rpc.Any> {
  readonly write: (clientId: number, message: FromClient<A>) => Effect.Effect<void>
  readonly disconnect: (clientId: number) => Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L69)

Since v4.0.0

## layer

Provides a scoped layer that starts an RPC server for a group using the
current server `Protocol`.

**Signature**

```ts
declare const layer: <Rpcs extends Rpc.Any>(
  group: RpcGroup.RpcGroup<Rpcs>,
  options?: {
    readonly disableTracing?: boolean | undefined
    readonly spanPrefix?: string | undefined
    readonly spanAttributes?: Record<string, unknown> | undefined
    readonly concurrency?: number | "unbounded" | undefined
    readonly disableFatalDefects?: boolean | undefined
  }
) => Layer.Layer<never, never, Protocol | Rpc.ToHandler<Rpcs> | Rpc.Middleware<Rpcs> | Rpc.ServicesServer<Rpcs>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L762)

Since v4.0.0

## make

Runs an RPC server for a group using the current server `Protocol`, decoding
requests, invoking handlers, encoding responses, and managing in-flight
request lifetime.

**Signature**

```ts
declare const make: <Rpcs extends Rpc.Any>(
  group: RpcGroup.RpcGroup<Rpcs>,
  options?:
    | {
        readonly disableTracing?: boolean | undefined
        readonly spanPrefix?: string | undefined
        readonly spanAttributes?: Record<string, unknown> | undefined
        readonly concurrency?: number | "unbounded" | undefined
        readonly disableFatalDefects?: boolean | undefined
      }
    | undefined
) => Effect.Effect<never, never, Protocol | Rpc.ToHandler<Rpcs> | Rpc.Middleware<Rpcs> | Rpc.ServicesServer<Rpcs>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L483)

Since v4.0.0

## makeNoSerialization

Creates an RPC server for an already-decoded message channel, running
handlers for a group and sending decoded server responses through
`onFromServer`.

**Signature**

```ts
declare const makeNoSerialization: <Rpcs extends Rpc.Any>(
  group: RpcGroup.RpcGroup<Rpcs>,
  options: {
    readonly onFromServer: (response: FromServer<Rpcs>) => Effect.Effect<void>
    readonly disableTracing?: boolean | undefined
    readonly disableSpanPropagation?: boolean | undefined
    readonly spanPrefix?: string | undefined
    readonly spanAttributes?: Record<string, unknown> | undefined
    readonly disableClientAcks?: boolean | undefined
    readonly concurrency?: number | "unbounded" | undefined
    readonly disableFatalDefects?: boolean | undefined
  }
) => Effect.Effect<RpcServer<Rpcs>, never, Rpc.ToHandler<Rpcs> | Rpc.Middleware<Rpcs> | Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/RpcServer.ts#L82)

Since v4.0.0
