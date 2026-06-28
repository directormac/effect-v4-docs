---
title: NodeSocket.ts
nav_order: 19
parent: "@effect/platform-node"
---

## NodeSocket.ts overview

Node.js socket constructors and layers for Effect sockets.

This module re-exports the shared Node socket support for TCP connections,
Unix domain socket connections, and Node `Duplex` streams. It also provides
WebSocket constructor layers: one that uses `globalThis.WebSocket` when
present and falls back to `ws`, one that always uses `ws`, and one that
creates a `Socket.Socket` layer for a WebSocket URL.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layerWebSocket](#layerwebsocket)
  - [layerWebSocketConstructor](#layerwebsocketconstructor)
  - [layerWebSocketConstructorWS](#layerwebsocketconstructorws)
- [utils](#utils)
  - ["@effect/platform-node-shared/NodeSocket" (namespace export)](#effectplatform-node-sharednodesocket-namespace-export)

---

# layers

## layerWebSocket

Creates a `Socket.Socket` layer for a WebSocket URL using the Node WebSocket
constructor layer, honoring protocol, open-timeout, and close-code error
options.

**Signature**

```ts
declare const layerWebSocket: (
  url: string | Effect.Effect<string>,
  options?:
    | {
        readonly closeCodeIsError?: ((code: number) => boolean) | undefined
        readonly openTimeout?: Duration.Input | undefined
        readonly protocols?: string | Array<string> | undefined
      }
    | undefined
) => Layer.Layer<Socket.Socket, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocket.ts#L61)

Since v4.0.0

## layerWebSocketConstructor

Provides a `Socket.WebSocketConstructor`, using `globalThis.WebSocket` when
available and falling back to the `ws` package otherwise.

**Signature**

```ts
declare const layerWebSocketConstructor: Layer.Layer<Socket.WebSocketConstructor, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocket.ts#L31)

Since v4.0.0

## layerWebSocketConstructorWS

Provides a `Socket.WebSocketConstructor` backed explicitly by the `ws`
package.

**Signature**

```ts
declare const layerWebSocketConstructorWS: Layer.Layer<Socket.WebSocketConstructor, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocket.ts#L47)

Since v4.0.0

# utils

## "@effect/platform-node-shared/NodeSocket" (namespace export)

Re-exports all named exports from the "@effect/platform-node-shared/NodeSocket" module.

**Signature**

```ts
export * from "@effect/platform-node-shared/NodeSocket"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeSocket.ts#L22)

Since v4.0.0
