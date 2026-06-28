---
title: NodeSocket.ts
nav_order: 9
parent: "@effect/platform-node-shared"
---

## NodeSocket.ts overview

Node socket adapters for Effect sockets.

This module opens `node:net` connections or wraps existing Node `Duplex`
streams and presents them as `Socket.Socket` values, socket channels, or
layers. It also exposes the current underlying `NetSocket` service for code
running inside a socket handler and re-exports the `ws` package namespace.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [fromDuplex](#fromduplex)
  - [makeNet](#makenet)
  - [makeNetChannel](#makenetchannel)
- [layers](#layers)
  - [layerNet](#layernet)
- [re-exports](#re-exports)
  - [NodeWS (namespace export)](#nodews-namespace-export)
- [services](#services)
  - [NetSocket (class)](#netsocket-class)

---

# constructors

## fromDuplex

Adapts a Node `Duplex` into a `Socket.Socket`, wiring data events to socket
handlers, providing a scoped writer, and mapping open, read, write, and close
failures to `SocketError`.

**Signature**

```ts
declare const fromDuplex: <RO>(
  open: Effect.Effect<Duplex, Socket.SocketError, RO>,
  options?: { readonly openTimeout?: Duration.Input | undefined }
) => Effect.Effect<Socket.Socket, never, Exclude<RO, Scope.Scope>>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocket.ts#L108)

Since v4.0.0

## makeNet

Opens a Node TCP connection as an Effect socket.

**When to use**

Use to create a scoped `Socket.Socket` from Node `net.createConnection`.

**Details**

Supports `openTimeout` and closes or destroys the underlying socket when the
enclosing scope is finalized.

**Signature**

```ts
declare const makeNet: (
  options: Net.NetConnectOpts & { readonly openTimeout?: Duration.Input | undefined }
) => Effect.Effect<Socket.Socket>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocket.ts#L59)

Since v4.0.0

## makeNetChannel

Creates a `Channel` over a TCP socket, reading arrays of `Uint8Array`
chunks and writing arrays of bytes, strings, or socket close events.

**Signature**

```ts
declare const makeNetChannel: <IE = never>(
  options: Net.NetConnectOpts
) => Channel.Channel<
  Array.NonEmptyReadonlyArray<Uint8Array>,
  Socket.SocketError | IE,
  void,
  Array.NonEmptyReadonlyArray<Uint8Array | string | Socket.CloseEvent>,
  IE
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocket.ts#L246)

Since v4.0.0

# layers

## layerNet

Provides a `Socket.Socket` by opening a TCP connection with the supplied
Node `net` connection options.

**Signature**

```ts
declare const layerNet: (options: Net.NetConnectOpts) => Layer.Layer<Socket.Socket, Socket.SocketError>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocket.ts#L266)

Since v4.0.0

# re-exports

## NodeWS (namespace export)

Re-exports all named exports from the "ws" module as `NodeWS`.

**Signature**

```ts
export * as NodeWS from "ws"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocket.ts#L31)

Since v4.0.0

# services

## NetSocket (class)

Service tag for the underlying Node `net.Socket` associated with the current
socket connection.

**Signature**

```ts
declare class NetSocket
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocket.ts#L40)

Since v4.0.0
