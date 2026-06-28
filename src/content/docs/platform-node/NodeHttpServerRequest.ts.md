---
title: NodeHttpServerRequest.ts
nav_order: 12
parent: "@effect/platform-node"
---

## NodeHttpServerRequest.ts overview

Accessors for the Node.js objects behind an Effect HTTP server request.

`toIncomingMessage` returns the underlying Node `http.IncomingMessage`.
`toServerResponse` returns the underlying Node `http.ServerResponse`,
evaluating the stored response thunk when the response was created lazily.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [toIncomingMessage](#toincomingmessage)
  - [toServerResponse](#toserverresponse)

---

# accessors

## toIncomingMessage

Returns the underlying Node `IncomingMessage` for a platform Node
`HttpServerRequest`.

**Signature**

```ts
declare const toIncomingMessage: (self: HttpServerRequest) => Http.IncomingMessage
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpServerRequest.ts#L20)

Since v4.0.0

## toServerResponse

Returns the underlying Node `ServerResponse` for a platform Node
`HttpServerRequest`, evaluating the stored response thunk when the response
was created lazily.

**Signature**

```ts
declare const toServerResponse: (self: HttpServerRequest) => Http.ServerResponse
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpServerRequest.ts#L30)

Since v4.0.0
