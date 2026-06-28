---
title: NodeHttpPlatform.ts
nav_order: 10
parent: "@effect/platform-node"
---

## NodeHttpPlatform.ts overview

Node.js implementation of the Effect HTTP platform service.

This module connects the portable `HttpPlatform` file response helpers to
Node runtime primitives. It serves local files through Node readable streams,
supports byte ranges, converts Web `File` values to readable streams, and
fills in content type and content length headers when needed.

Since v4.0.0

---

## Exports Grouped by Category

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)

---

# constructors

## make

Creates the Node `HttpPlatform`, serving file responses from Node readable
streams and adding MIME type and content-length headers when needed.

**Signature**

```ts
declare const make: Effect<
  {
    readonly fileResponse: (
      path: string,
      options?: ServerResponse.Options.WithContent & {
        readonly bytesToRead?: SizeInput | undefined
        readonly chunkSize?: SizeInput | undefined
        readonly offset?: SizeInput | undefined
      }
    ) => Effect<ServerResponse.HttpServerResponse, PlatformError>
    readonly fileWebResponse: (
      file: HttpBody.FileLike,
      options?: ServerResponse.Options.WithContent & {
        readonly bytesToRead?: SizeInput | undefined
        readonly chunkSize?: SizeInput | undefined
        readonly offset?: SizeInput | undefined
      }
    ) => Effect<ServerResponse.HttpServerResponse>
  },
  never,
  FileSystem | EtagImpl.Generator
>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpPlatform.ts#L29)

Since v4.0.0

# layers

## layer

Provides the Node `HttpPlatform` together with the filesystem and ETag
services it needs for file responses.

**Signature**

```ts
declare const layer: Layer.Layer<Platform.HttpPlatform, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeHttpPlatform.ts#L66)

Since v4.0.0
