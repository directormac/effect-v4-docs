---
title: HttpPlatform.ts
nav_order: 249
parent: "effect"
---

## HttpPlatform.ts overview

Platform-specific support for serving files as HTTP server responses.

`HttpPlatform` is the boundary between the portable HTTP response model and
the runtime that knows how to stream bytes from the host platform. Server
code uses this service when it needs to return local files, static assets,
downloads, byte ranges, or Web `File`-like values without constructing the
response body by hand.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
- [services](#services)
  - [HttpPlatform (class)](#httpplatform-class)

---

# constructors

## make

Creates an `HttpPlatform` service from platform-specific file response constructors, using `FileSystem` and `Etag.Generator`.

**Signature**

```ts
declare const make: (impl: {
  readonly fileResponse: (
    path: string,
    status: number,
    statusText: string | undefined,
    headers: Headers.Headers,
    start: number,
    end: number | undefined,
    contentLength: number
  ) => Response.HttpServerResponse
  readonly fileWebResponse: (
    file: Body.HttpBody.FileLike,
    status: number,
    statusText: string | undefined,
    headers: Headers.Headers,
    options?: {
      readonly bytesToRead?: FileSystem.SizeInput | undefined
      readonly chunkSize?: FileSystem.SizeInput | undefined
      readonly offset?: FileSystem.SizeInput | undefined
    }
  ) => Response.HttpServerResponse
}) => Effect.Effect<HttpPlatform["Service"], never, Etag.Generator | FileSystem.FileSystem>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpPlatform.ts#L56)

Since v4.0.0

# layers

## layer

Provides the default `HttpPlatform` implementation for serving file paths and
`File`-like values as streamed HTTP responses.

**Details**

The layer uses the `FileSystem` and weak ETag services to add file metadata
headers such as `etag` and `last-modified`.

**Signature**

```ts
declare const layer: Layer.Layer<HttpPlatform, never, FileSystem.FileSystem>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpPlatform.ts#L143)

Since v4.0.0

# services

## HttpPlatform (class)

Service for platform-specific HTTP response helpers, including file-backed server responses.

**Signature**

```ts
declare class HttpPlatform
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpPlatform.ts#L31)

Since v4.0.0
