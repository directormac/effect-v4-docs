---
title: BrowserHttpClient.ts
nav_order: 2
parent: "@effect/platform-browser"
---

## BrowserHttpClient.ts overview

Browser implementations of the Effect `HttpClient`.

This module exposes HTTP client layers for code that runs in a browser. It
re-exports the fetch-based `Fetch`, `RequestInit`, and `layerFetch` APIs for
the common case where requests use the platform `fetch` implementation. It
also provides an `XMLHttpRequest`-backed client, including controls for the
XHR response type, an overridable `XMLHttpRequest` constructor service, and
the `layerXMLHttpRequest` layer.

Since v4.0.0

---

## Exports Grouped by Category

- [fetch](#fetch)
  - [Fetch](#fetch-1)
  - [RequestInit](#requestinit)
  - [layerFetch](#layerfetch)
- [layers](#layers)
  - [layerXMLHttpRequest](#layerxmlhttprequest)
- [models](#models)
  - [XHRResponseType (type alias)](#xhrresponsetype-type-alias)
- [references](#references)
  - [CurrentXHRResponseType](#currentxhrresponsetype)
  - [withXHRArrayBuffer](#withxhrarraybuffer)
- [services](#services)
  - [XMLHttpRequest (class)](#xmlhttprequest-class)

---

# fetch

## Fetch

Context reference for the `fetch` implementation used by the fetch-based HTTP client.

**Signature**

```ts
declare const Fetch: Context.Reference<{
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>
  (input: string | URL | Request, init?: RequestInit): Promise<Response>
}>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserHttpClient.ts#L45)

Since v4.0.0

## RequestInit

Service that contains default fetch options for the browser fetch client.

**When to use**

Use to provide default credentials, cache, redirect, integrity, or other
fetch options for browser HTTP requests.

**Signature**

```ts
declare const RequestInit: typeof RequestInit
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserHttpClient.ts#L64)

Since v4.0.0

## layerFetch

Layer that provides an `HttpClient` implementation backed by the configured `Fetch` function.

**Signature**

```ts
declare const layerFetch: Layer.Layer<HttpClient.HttpClient, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserHttpClient.ts#L52)

Since v4.0.0

# layers

## layerXMLHttpRequest

Layer that provides an `HttpClient` implementation backed by the browser `XMLHttpRequest` API.

**Signature**

```ts
declare const layerXMLHttpRequest: Layer.Layer<HttpClient.HttpClient, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserHttpClient.ts#L428)

Since v4.0.0

# models

## XHRResponseType (type alias)

Allowed response body modes for the browser XHR HTTP client.

**Signature**

```ts
type XHRResponseType = "arraybuffer" | "text"
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserHttpClient.ts#L77)

Since v4.0.0

# references

## CurrentXHRResponseType

Context reference for the `XMLHttpRequest.responseType` used by the browser XHR HTTP client, defaulting to `"text"`.

**When to use**

Use when you need XHR-backed HTTP requests to receive response bodies as text
or raw `ArrayBuffer` values.

**See**

- `XHRResponseType` for the allowed response body modes
- `withXHRArrayBuffer` for scoping XHR response handling to `ArrayBuffer`

**Signature**

```ts
declare const CurrentXHRResponseType: Context.Reference<XHRResponseType>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserHttpClient.ts#L93)

Since v4.0.0

## withXHRArrayBuffer

Runs an effect with `CurrentXHRResponseType` set to `"arraybuffer"` so the XHR HTTP client receives response bodies as `ArrayBuffer` values.

**Signature**

```ts
declare const withXHRArrayBuffer: <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserHttpClient.ts#L104)

Since v4.0.0

# services

## XMLHttpRequest (class)

Service tag for the `XMLHttpRequest` constructor used by the browser XHR HTTP client.

**Signature**

```ts
declare class XMLHttpRequest
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-browser/src/BrowserHttpClient.ts#L119)

Since v4.0.0
