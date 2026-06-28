---
title: BunHttpPlatform.ts
nav_order: 7
parent: "@effect/platform-bun"
---

## BunHttpPlatform.ts overview

Bun implementation of the Effect HTTP platform service.

This module provides one `layer` for `HttpPlatform`. It implements file
responses with `Bun.file`, supports sliced file responses for byte ranges,
and returns Web `File` values as raw HTTP server responses. The layer also
provides the Bun file-system layer and ETag generator required by
`HttpPlatform`.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Layer that provides the Bun `HttpPlatform`, including file responses backed by `Bun.file`.

**Signature**

```ts
declare const layer: Layer.Layer<Platform.HttpPlatform, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunHttpPlatform.ts#L47)

Since v4.0.0
