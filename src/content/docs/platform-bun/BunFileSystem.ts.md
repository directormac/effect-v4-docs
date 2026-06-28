---
title: BunFileSystem.ts
nav_order: 5
parent: "@effect/platform-bun"
---

## BunFileSystem.ts overview

Bun layer for Effect's `FileSystem` service.

This module exposes one `layer` that provides `FileSystem` in Bun by using
the shared Node file-system implementation. Once the layer is provided,
programs use the standard `effect/FileSystem` service operations.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Layer that provides the `FileSystem` service for Bun using the shared Node file-system implementation.

**Signature**

```ts
declare const layer: Layer.Layer<FileSystem, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunFileSystem.ts#L20)

Since v4.0.0
