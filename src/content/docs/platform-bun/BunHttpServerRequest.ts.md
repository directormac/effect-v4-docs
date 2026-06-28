---
title: BunHttpServerRequest.ts
nav_order: 9
parent: "@effect/platform-bun"
---

## BunHttpServerRequest.ts overview

Accessor for the Bun request behind an Effect HTTP server request.

This module exports `toBunServerRequest`, which returns the underlying
`Bun.BunRequest` stored inside a Bun-backed `HttpServerRequest`. It is meant
for code that needs to interoperate with Bun-specific request APIs.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [toBunServerRequest](#tobunserverrequest)

---

# accessors

## toBunServerRequest

Returns the underlying `Bun.BunRequest` from an Effect `HttpServerRequest`.

**Signature**

```ts
declare const toBunServerRequest: <T extends string = string>(self: HttpServerRequest) => Bun.BunRequest<T>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunHttpServerRequest.ts#L18)

Since v4.0.0
