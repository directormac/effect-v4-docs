---
title: HttpTraceContext.ts
nav_order: 257
parent: "effect"
---

## HttpTraceContext.ts overview

HTTP propagation helpers for Effect tracing context.

This module converts Effect `Tracer.Span` values into outbound trace headers
and decodes inbound propagation headers into `Tracer.ExternalSpan` parents.
HTTP clients use it to continue the current span across outgoing requests, and
server middleware uses it to parent request spans from upstream services.

Since v4.0.0

---

## Exports Grouped by Category

- [decoding](#decoding)
  - [b3](#b3)
  - [fromHeaders](#fromheaders)
  - [w3c](#w3c)
  - [xb3](#xb3)
- [encoding](#encoding)
  - [toHeaders](#toheaders)
- [models](#models)
  - [FromHeaders (interface)](#fromheaders-interface)

---

# decoding

## b3

Decodes an external span safely from the compact B3 `b3` header.

**Details**

Returns `Option.none` when the header is missing or does not contain trace and
span identifiers.

**Signature**

```ts
declare const b3: FromHeaders
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpTraceContext.ts#L86)

Since v4.0.0

## fromHeaders

Decodes an external span safely from HTTP trace propagation headers.

**Details**

W3C `traceparent` is tried first, followed by compact B3 (`b3`) and then
multi-header B3 (`x-b3-*`).

**Signature**

```ts
declare const fromHeaders: (headers: Headers.Headers) => Option.Option<Tracer.ExternalSpan>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpTraceContext.ts#L63)

Since v4.0.0

## w3c

Decodes an external span safely from the W3C `traceparent` header.

**Details**

Only version `00` headers with valid trace and span identifiers are accepted.

**Signature**

```ts
declare const w3c: FromHeaders
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpTraceContext.ts#L136)

Since v4.0.0

## xb3

Decodes an external span safely from multi-header B3 propagation headers.

**Details**

The decoder reads `x-b3-traceid`, `x-b3-spanid`, and optional `x-b3-sampled`
headers.

**Signature**

```ts
declare const xb3: FromHeaders
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpTraceContext.ts#L112)

Since v4.0.0

# encoding

## toHeaders

Encodes a span into HTTP trace propagation headers.

**Details**

The generated headers include both compact B3 (`b3`) and W3C `traceparent`
formats.

**Signature**

```ts
declare const toHeaders: (span: Tracer.Span) => Headers.Headers
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpTraceContext.ts#L41)

Since v4.0.0

# models

## FromHeaders (interface)

Function type for decoding tracing headers into an external span.

**Details**

Returns `Option.none` when the headers do not contain a supported or valid trace
context.

**Signature**

```ts
export interface FromHeaders {
  (headers: Headers.Headers): Option.Option<Tracer.ExternalSpan>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpTraceContext.ts#L26)

Since v4.0.0
