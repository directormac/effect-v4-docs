---
title: NodePath.ts
nav_order: 14
parent: "@effect/platform-node"
---

## NodePath.ts overview

Node.js layers for Effect's `Path` service.

This module provides the default, POSIX, and Windows variants of the
platform-independent `Path` service by reusing the shared Node path
implementation. The provided path services include Node file URL conversion
behavior.

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

Provides the default Node `Path` service using the platform's `node:path`
implementation.

**Signature**

```ts
declare const layer: Layer.Layer<Path, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodePath.ts#L22)

Since v4.0.0

## layerPosix

Provides the `Path` service using Node's POSIX path implementation,
regardless of the host platform.

**Signature**

```ts
declare const layerPosix: Layer.Layer<Path, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodePath.ts#L31)

Since v4.0.0

## layerWin32

Provides the `Path` service using Node's Windows path implementation,
regardless of the host platform.

**Signature**

```ts
declare const layerWin32: Layer.Layer<Path, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodePath.ts#L40)

Since v4.0.0
