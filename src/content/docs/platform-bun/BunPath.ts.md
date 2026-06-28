---
title: BunPath.ts
nav_order: 11
parent: "@effect/platform-bun"
---

## BunPath.ts overview

Bun-backed layers for Effect's `Path` service.

This module provides the `Path` service for Bun programs by reusing the
shared Node-compatible path implementation. Provide one of these layers when
Bun code should receive path operations from the Effect environment instead
of importing runtime path helpers directly.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
  - [layerPosix](#layerposix)
  - [layerWin32](#layerwin32)

---

# layers

## layer

Layer that provides the default `Path` service for Bun using the shared Node path implementation.

**Signature**

```ts
declare const layer: Layer.Layer<Path, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunPath.ts#L21)

Since v4.0.0

## layerPosix

Layer that provides the POSIX `Path` service for Bun using the shared Node path implementation.

**Signature**

```ts
declare const layerPosix: Layer.Layer<Path, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunPath.ts#L29)

Since v4.0.0

## layerWin32

Layer that provides the Win32 `Path` service for Bun using the shared Node path implementation.

**Signature**

```ts
declare const layerWin32: Layer.Layer<Path, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun/src/BunPath.ts#L37)

Since v4.0.0
