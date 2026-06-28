---
title: NodeSocketServer.ts
nav_order: 10
parent: "@effect/platform-node-shared"
---

## NodeSocketServer.ts overview

Node socket server adapters for Effect's unstable socket server API.

This module turns `node:net` TCP or Unix-domain servers and `ws` WebSocket
servers into scoped `SocketServer.SocketServer` services. Use the TCP
constructors when handlers should receive a `Socket.Socket` backed by a Node
`net.Socket`; use the WebSocket constructors when handlers should receive a
`Socket.Socket` backed by `ws` and have access to the per-connection
WebSocket and `IncomingMessage` services.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
  - [makeWebSocket](#makewebsocket)
- [layers](#layers)
  - [layer](#layer)
  - [layerWebSocket](#layerwebsocket)
- [services](#services)
  - [IncomingMessage (class)](#incomingmessage-class)

---

# constructors

## make

Creates a scoped TCP `SocketServer` from a Node `net.Server`, starts
listening with the supplied options, queues pending connections until `run`
is called, and closes the server when the scope ends.

**Signature**

```ts
declare const make: (
  options: Net.ServerOpts & Net.ListenOptions
) => Effect.Effect<
  {
    readonly address: SocketServer.Address
    readonly run: <R, E, _>(
      handler: (socket: Socket.Socket) => Effect.Effect<_, E, R>
    ) => Effect.Effect<never, SocketServer.SocketServerError, R>
  },
  SocketServer.SocketServerError,
  Scope.Scope
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocketServer.ts#L51)

Since v4.0.0

## makeWebSocket

Creates a scoped WebSocket `SocketServer` backed by the `ws` package,
providing the WebSocket and its Node `IncomingMessage` to connection
handlers and closing the server when the scope ends.

**Signature**

```ts
declare const makeWebSocket: (
  options: NodeWS.ServerOptions<typeof NodeWS.WebSocket, typeof Http.IncomingMessage>
) => Effect.Effect<SocketServer.SocketServer["Service"], SocketServer.SocketServerError, Scope.Scope>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocketServer.ts#L184)

Since v4.0.0

# layers

## layer

Provides a TCP `SocketServer` by creating and managing a scoped Node
`net.Server` with the supplied server and listen options.

**Signature**

```ts
declare const layer: (
  options: Net.ServerOpts & Net.ListenOptions
) => Layer.Layer<SocketServer.SocketServer, SocketServer.SocketServerError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocketServer.ts#L169)

Since v4.0.0

## layerWebSocket

Provides a WebSocket `SocketServer` backed by the `ws` package and managed
with the supplied server options.

**Signature**

```ts
declare const layerWebSocket: (
  options: NodeSocket.NodeWS.ServerOptions<typeof NodeSocket.NodeWS.WebSocket, typeof Http.IncomingMessage>
) => Layer.Layer<SocketServer.SocketServer, SocketServer.SocketServerError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocketServer.ts#L287)

Since v4.0.0

# services

## IncomingMessage (class)

Service tag for the Node `IncomingMessage` associated with the current
WebSocket server connection.

**Signature**

```ts
declare class IncomingMessage
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocketServer.ts#L38)

Since v4.0.0
