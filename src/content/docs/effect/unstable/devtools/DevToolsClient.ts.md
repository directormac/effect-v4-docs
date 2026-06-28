---
title: DevToolsClient.ts
nav_order: 212
parent: "effect"
---

## DevToolsClient.ts overview

Low-level devtools client and tracer wiring over the current `Socket`.

`DevToolsClient` speaks the devtools NDJSON protocol used by the unstable
devtools integration. It sends span starts, span events, span completions,
ping messages, and metric snapshots through a socket, then exposes tracer
layers that forward telemetry while preserving the current tracer's behavior.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
  - [makeTracer](#maketracer)
- [layers](#layers)
  - [layer](#layer)
  - [layerTracer](#layertracer)
- [services](#services)
  - [DevToolsClient (class)](#devtoolsclient-class)

---

# constructors

## make

Creates a devtools client over the current `Socket`, speaking the devtools
NDJSON protocol, sending periodic pings, and responding to metrics snapshot
requests.

**When to use**

Use when you already have a `Socket` and need the low-level `DevToolsClient`
service to exchange devtools telemetry directly.

**Details**

The effect requires `Scope` because it starts background fibers for the socket
stream and heartbeat.

**Gotchas**

`make` creates only the client service; tracing is installed separately.

**See**

- `layer` for providing the client as a layer
- `makeTracer` for creating a tracer after a `DevToolsClient` is available
- `layerTracer` for creating the client from the current `Socket` and installing the tracer as a layer

**Signature**

```ts
declare const make: Effect.Effect<
  { readonly sendUnsafe: (_: DevToolsSchema.Span | DevToolsSchema.SpanEvent) => void },
  never,
  Scope.Scope | Socket.Socket
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsClient.ts#L141)

Since v4.0.0

## makeTracer

Creates a tracer that delegates to the current tracer while sending span
starts, span events, and span ends to `DevToolsClient`.

**Signature**

```ts
declare const makeTracer: Effect.Effect<Tracer.Tracer, never, DevToolsClient>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsClient.ts#L220)

Since v4.0.0

# layers

## layer

Layer that provides `DevToolsClient` using the current `Socket`.

**When to use**

Use to provide the low-level `DevToolsClient` service over an existing
`Socket` for custom devtools integrations that send telemetry through the
client directly.

**Details**

It delegates to `make`, so it speaks the devtools NDJSON protocol over the
provided `Socket`, sends periodic pings, responds to metrics snapshot
requests, and finalizes its background fibers when the layer scope closes.

**Gotchas**

This layer only provides the client. It does not install the devtools tracer
by itself.

**See**

- `make` for constructing the client as a scoped effect instead of a layer
- `layerTracer` for a higher-level layer that creates the client and installs the devtools tracer

**Signature**

```ts
declare const layer: Layer.Layer<DevToolsClient, never, Socket.Socket>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsClient.ts#L178)

Since v4.0.0

## layerTracer

Layer that creates a `DevToolsClient` from the current `Socket` and installs
the devtools tracer.

**Signature**

```ts
declare const layerTracer: Layer.Layer<never, never, Socket.Socket>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsClient.ts#L234)

Since v4.0.0

# services

## DevToolsClient (class)

Service for sending span and span-event telemetry to the Effect devtools
connection.

**Signature**

```ts
declare class DevToolsClient
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsClient.ts#L37)

Since v4.0.0
