---
title: BrowserSocket.ts
nav_order: 6
parent: "@effect/platform-browser"
---

## BrowserSocket.ts overview

Browser WebSocket layers for Effect sockets.

`layerWebSocket` creates a `Socket.Socket` connected to a WebSocket URL using
the browser `WebSocket` constructor. `layerWebSocketConstructor` provides
only the browser-backed constructor service for lower-level socket code.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layerWebSocket](#layerwebsocket)
  - [layerWebSocketConstructor](#layerwebsocketconstructor)

---

# layers

## layerWebSocket

Creates a `Socket` layer connected to the given URL using the browser `WebSocket` constructor.

**When to use**

Use when you need browser code to satisfy the platform socket service from a
URL without wiring the browser constructor service separately.

**Details**

Delegates socket construction to `Socket.makeWebSocket` and provides the
browser-backed `WebSocketConstructor` service.

**Gotchas**

Browser WebSocket rules still control URL schemes, mixed-content blocking,
cookies, authentication, origin checks, subprotocols, and extensions. Close
events are errors unless `closeCodeIsError` classifies the close code as
clean.

**See**

- `layerWebSocketConstructor` for providing only the browser constructor service

**Signature**

```ts
declare const layerWebSocket: (
  url: string,
  options?: { readonly closeCodeIsError?: (code: number) => boolean }
) => Layer.Layer<Socket.Socket>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserSocket.ts#L38)

Since v4.0.0

## layerWebSocketConstructor

Layer that provides a `WebSocketConstructor` service backed by `globalThis.WebSocket`.

**Signature**

```ts
declare const layerWebSocketConstructor: Layer.Layer<Socket.WebSocketConstructor, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserSocket.ts#L51)

Since v4.0.0
