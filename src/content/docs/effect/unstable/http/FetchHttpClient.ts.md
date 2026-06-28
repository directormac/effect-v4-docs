---
title: FetchHttpClient.ts
nav_order: 237
parent: "effect"
---

## FetchHttpClient.ts overview

Fetch-based implementation of the Effect HTTP client service.

This module provides an `HttpClient` layer that executes requests through a
Web Fetch API implementation. It is the transport to use in browsers, edge
runtimes, and Node.js environments where `globalThis.fetch` is available, or
anywhere a compatible fetch function can be supplied.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
- [services](#services)
  - [Fetch](#fetch)
  - [RequestInit (class)](#requestinit-class)

---

# layers

## layer

Layer that provides an `HttpClient` implementation backed by the configured
`Fetch` function.

**When to use**

Use when an Effect program should execute `HttpClient` requests through the
platform `fetch` implementation, especially in browser, edge, or Node.js
runtimes with `globalThis.fetch`.

**Details**

The layer uses the current `Fetch` reference and optional `RequestInit`
service for each request. Request-specific method, headers, body, and abort
signal are supplied by the client and override matching `RequestInit` fields.

**Gotchas**

Fetch behavior comes from the runtime's implementation, so CORS, cookies,
redirects, abort handling, and streaming support can vary by platform. Stream
request bodies are sent as Web streams with `duplex: "half"`, and any
`content-length` header is removed before calling `fetch`.

**See**

- `Fetch` for supplying the fetch implementation used by this layer
- `RequestInit` for default `RequestInit` options applied before request-specific fields

**Signature**

```ts
declare const layer: Layer.Layer<HttpClient.HttpClient, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FetchHttpClient.ts#L123)

Since v4.0.0

# services

## Fetch

Context reference for the `fetch` implementation used by the fetch-based HTTP client.

**Details**

Defaults to `globalThis.fetch`.

**Signature**

```ts
declare const Fetch: Context.Reference<{
  (input: RequestInfo | URL, init?: globalThis.RequestInit): Promise<Response>
  (input: string | URL | Request, init?: globalThis.RequestInit): Promise<Response>
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FetchHttpClient.ts#L30)

Since v4.0.0

## RequestInit (class)

Service that contains default fetch options for the fetch-based HTTP client.

**When to use**

Use to provide default credentials, cache, redirect, integrity, or other
fetch options for outgoing HTTP requests.

**Details**

Request-specific method, headers, body, and abort signal are supplied by the client when a request is executed.

**Signature**

```ts
declare class RequestInit
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/FetchHttpClient.ts#L49)

Since v4.0.0
