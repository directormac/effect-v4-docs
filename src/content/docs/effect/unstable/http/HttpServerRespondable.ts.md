---
title: HttpServerRespondable.ts
nav_order: 254
parent: "effect"
---

## HttpServerRespondable.ts overview

Converts supported values into HTTP server responses.

Server-side errors and helper values can implement `Respondable` when they
know which status, headers, cookies, or body should be sent to the client.
This module detects those values and converts them to `HttpServerResponse`
values, with fallback handling for schema errors and missing values.

Since v4.0.0

---

## Exports Grouped by Category

- [accessors](#accessors)
  - [toResponse](#toresponse)
  - [toResponseOrElse](#toresponseorelse)
  - [toResponseOrElseDefect](#toresponseorelsedefect)
- [guards](#guards)
  - [isRespondable](#isrespondable)
- [models](#models)
  - [Respondable (interface)](#respondable-interface)
- [type IDs](#type-ids)
  - [symbol](#symbol)

---

# accessors

## toResponse

Converts a `Respondable` value into an `HttpServerResponse`.

**Details**

If the value is already an HTTP server response it is returned directly; errors
from the response conversion are converted to defects.

**Signature**

```ts
declare const toResponse: (self: Respondable) => Effect.Effect<HttpServerResponse>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRespondable.ts#L64)

Since v4.0.0

## toResponseOrElse

Attempts to convert an unknown value into an `HttpServerResponse`, falling back
to the supplied response when no conversion is available.

**Details**

`HttpServerResponse` and `Respondable` values are used directly, schema errors
become `400` responses, and no-such-element errors become `404` responses.

**Signature**

```ts
declare const toResponseOrElse: (u: unknown, orElse: HttpServerResponse) => Effect.Effect<HttpServerResponse>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRespondable.ts#L83)

Since v4.0.0

## toResponseOrElseDefect

Attempts to convert an unknown defect into an `HttpServerResponse`, falling
back to the supplied response when no conversion is available.

**Details**

Only `HttpServerResponse` and `Respondable` values receive special handling.

**Signature**

```ts
declare const toResponseOrElseDefect: (u: unknown, orElse: HttpServerResponse) => Effect.Effect<HttpServerResponse>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRespondable.ts#L108)

Since v4.0.0

# guards

## isRespondable

Returns `true` when the supplied value implements the `Respondable` protocol.

**Signature**

```ts
declare const isRespondable: (u: unknown) => u is Respondable
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRespondable.ts#L48)

Since v4.0.0

# models

## Respondable (interface)

Protocol for values that can be converted into an `HttpServerResponse`.

**Details**

Implement the protocol method to describe the response that should be sent for
the value.

**Signature**

```ts
export interface Respondable {
  [symbol](): Effect.Effect<HttpServerResponse, unknown>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRespondable.ts#L38)

Since v4.0.0

# type IDs

## symbol

Protocol key used by values that can render themselves as
`HttpServerResponse` values.

**Signature**

```ts
declare const symbol: "~effect/http/HttpServerRespondable"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpServerRespondable.ts#L25)

Since v4.0.0
