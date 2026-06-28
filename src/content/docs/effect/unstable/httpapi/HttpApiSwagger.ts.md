---
title: HttpApiSwagger.ts
nav_order: 278
parent: "effect"
---

## HttpApiSwagger.ts overview

Swagger documentation UI for declarative `HttpApi` contracts.

This module mounts a browser-based Swagger UI route on an `HttpRouter`. The
page renders the OpenAPI document derived from the supplied `HttpApi`, so a
running application can expose interactive API documentation without writing a
separate OpenAPI file.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Mounts Swagger UI for an `HttpApi` at the configured path, defaulting to
`/docs`, using the OpenAPI specification generated from the API.

**Signature**

```ts
declare const layer: <Id extends string, Groups extends HttpApiGroup.Any>(
  api: HttpApi.HttpApi<Id, Groups>,
  options?: { readonly path?: `/${string}` | undefined }
) => Layer.Layer<never, never, HttpRouter.HttpRouter>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/HttpApiSwagger.ts#L59)

Since v4.0.0
