---
title: DevTools.ts
nav_order: 211
parent: "effect"
---

## DevTools.ts overview

High-level layers for connecting an Effect runtime to the unstable devtools
tracer.

`DevTools` is the application-facing entry point for installing a tracer that
mirrors the current tracer and streams spans, span events, span completions,
and metric snapshots to an external devtools process. Lower-level socket
protocol details live in `DevToolsClient`.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerSocket](#layersocket)
  - [layerWebSocket](#layerwebsocket)

---

# layers

## layer

Layer that installs the devtools tracer over a WebSocket connection using the
global WebSocket constructor, defaulting to `ws://localhost:34437`.

**When to use**

Use to stream Effect tracing and metrics telemetry to a devtools process when
the runtime environment already provides a global `WebSocket` constructor.

**Details**

This is a convenience wrapper around `layerWebSocket(url)` that provides
`Socket.layerWebSocketConstructorGlobal`, so the resulting layer has no
remaining requirements.

**Gotchas**

This layer only installs the client-side tracer; it does not start a devtools
server, so the configured WebSocket endpoint must already be reachable. It
relies on `globalThis.WebSocket` being available in the runtime.

**See**

- `layerWebSocket` for installing the devtools tracer with an explicit `WebSocketConstructor` requirement
- `layerSocket` for installing the devtools tracer over an existing `Socket` transport

**Signature**

```ts
declare const layer: (url?: string) => Layer.Layer<never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevTools.ts#L65)

Since v4.0.0

## layerSocket

Layer that installs the devtools tracer using an existing `Socket`.

**Signature**

```ts
declare const layerSocket: Layer.Layer<never, never, Socket.Socket>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevTools.ts#L22)

Since v4.0.0

## layerWebSocket

Layer that installs the devtools tracer over a WebSocket connection to the
specified URL, defaulting to `ws://localhost:34437`.

**Signature**

```ts
declare const layerWebSocket: (url?: string) => Layer.Layer<never, never, Socket.WebSocketConstructor>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevTools.ts#L31)

Since v4.0.0
