---
title: DevToolsServer.ts
nav_order: 214
parent: "effect"
---

## DevToolsServer.ts overview

Runs the server side of the unstable Effect devtools socket protocol.

Use this module when an integration needs to accept devtools clients over a
`SocketServer`, decode newline-delimited JSON messages, and handle each
connection with application-specific logic. It does not interpret spans or
metrics itself; it gives handlers a typed surface for the telemetry described
by `DevToolsSchema`.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [run](#run)
- [models](#models)
  - [Client (interface)](#client-interface)

---

# constructors

## run

Runs the devtools socket server.

**Details**

Each connection is decoded as NDJSON devtools protocol messages, `Ping`
requests are answered with `Pong`, and all other requests are delivered
through the `Client` passed to the handler.

**Signature**

```ts
declare const run: <_, E, R>(
  handle: (client: Client) => Effect.Effect<_, E, R>
) => Effect.Effect<never, SocketServer.SocketServerError, R | SocketServer.SocketServer>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsServer.ts#L52)

Since v4.0.0

# models

## Client (interface)

Handle for a connected devtools client.

**Details**

It exposes a queue of non-ping requests received from the socket and a
`send` function for non-pong responses.

**Signature**

```ts
export interface Client {
  readonly queue: Queue.Dequeue<DevToolsSchema.Request.WithoutPing>
  readonly send: (_: DevToolsSchema.Response.WithoutPong) => Effect.Effect<void>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/DevToolsServer.ts#L35)

Since v4.0.0
