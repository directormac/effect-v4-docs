---
title: BunSocket.ts
nav_order: 16
parent: "@effect/platform-bun"
---

## BunSocket.ts overview

Bun platform socket entry point for Effect sockets.

This module re-exports the shared Node socket constructors for TCP clients,
Unix domain socket clients, and adapters from existing Node `Duplex` streams.
It also provides Bun WebSocket layers using `globalThis.WebSocket`, including
a constructor layer and a `Socket.Socket` layer for a WebSocket URL.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layerWebSocket](#layerwebsocket)
  - [layerWebSocketConstructor](#layerwebsocketconstructor)
- [utils](#utils)
  - ["@effect/platform-node-shared/NodeSocket" (namespace export)](#effectplatform-node-sharednodesocket-namespace-export)

---

# layers

## layerWebSocket

Creates a `Socket.Socket` layer for a WebSocket URL using Bun's global
`WebSocket` constructor, honoring protocol, open-timeout, and close-code
error options.

**Signature**

```ts
declare const layerWebSocket: (
  url: string | Effect<string>,
  options?:
    | {
        readonly closeCodeIsError?: ((code: number) => boolean) | undefined
        readonly openTimeout?: Duration.Input | undefined
        readonly protocols?: string | Array<string> | undefined
      }
    | undefined
) => Layer.Layer<Socket.Socket, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunSocket.ts#L43)

Since v4.0.0

## layerWebSocketConstructor

Provides a `Socket.WebSocketConstructor` backed by Bun's global
`WebSocket` implementation.

**Signature**

```ts
declare const layerWebSocketConstructor: Layer.Layer<Socket.WebSocketConstructor, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunSocket.ts#L29)

Since v4.0.0

# utils

## "@effect/platform-node-shared/NodeSocket" (namespace export)

Re-exports all named exports from the "@effect/platform-node-shared/NodeSocket" module.

**Signature**

```ts
export * from "@effect/platform-node-shared/NodeSocket"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunSocket.ts#L20)

Since v4.0.0
