---
title: HttpStaticServer.ts
nav_order: 256
parent: "effect"
---

## HttpStaticServer.ts overview

Serves static files for Effect HTTP applications.

`HttpStaticServer` turns request paths into file responses under a configured
root directory. It can be used as an application value or mounted onto an
`HttpRouter`, and it handles index files, optional single-page application
fallback, MIME type headers, cache-control headers, byte ranges, and
conditional `304 Not Modified` responses.

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

Creates an `HttpApp` that serves files from a directory.

**Example** (Serving files from a directory)

```ts
import { Effect } from "effect"
import { HttpStaticServer } from "effect/unstable/http"

const program = Effect.gen(function* () {
  const app = yield* HttpStaticServer.make({ root: "./public" })
  return app
})
```

**Signature**

```ts
declare const make: (options: {
  readonly root: string
  readonly index?: string | undefined
  readonly spa?: boolean | undefined
  readonly cacheControl?: string | undefined
  readonly mimeTypes?: Record<string, string> | undefined
}) => Effect.Effect<
  Effect.Effect<
    HttpServerResponse.HttpServerResponse,
    HttpServerError.HttpServerError,
    HttpServerRequest.HttpServerRequest
  >,
  PlatformError,
  FileSystem.FileSystem | Path.Path | HttpPlatform.HttpPlatform
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpStaticServer.ts#L42)

Since v4.0.0

# layers

## layer

Creates a layer that mounts static files on an `HttpRouter`.

**Example** (Mounting static files on a router)

```ts
import { Layer } from "effect"
import { HttpRouter, HttpServerResponse, HttpStaticServer } from "effect/unstable/http"

const ApiLayer = HttpRouter.add("GET", "/health", HttpServerResponse.text("ok"))

const StaticFilesLayer = HttpStaticServer.layer({
  root: "./public",
  prefix: "/static"
})

const AppLayer = Layer.mergeAll(ApiLayer, StaticFilesLayer)
```

**Signature**

```ts
declare const layer: (options: {
  readonly root: string
  readonly index?: string | undefined
  readonly spa?: boolean | undefined
  readonly cacheControl?: string | undefined
  readonly mimeTypes?: Record<string, string> | undefined
  readonly prefix?: string | undefined
}) => Layer.Layer<
  never,
  PlatformError,
  HttpRouter.HttpRouter | FileSystem.FileSystem | Path.Path | HttpPlatform.HttpPlatform
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpStaticServer.ts#L199)

Since v4.0.0
