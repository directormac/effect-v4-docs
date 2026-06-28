---
title: NodePath.ts
nav_order: 6
parent: "@effect/platform-node-shared"
---

## NodePath.ts overview

Node-backed provider for Effect's `Path` service.

This module turns Node's `node:path` and `node:url` APIs into `Path` layers.
`layer` uses the host platform path implementation, while `layerPosix` and
`layerWin32` provide fixed POSIX and Windows variants. All three layers also
include helpers for converting between file paths and file URLs.

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

Provides the default `Path` service using the host platform's Node path
implementation plus file URL conversion helpers.

**Signature**

```ts
declare const layer: Layer.Layer<Path, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodePath.ts#L75)

Since v4.0.0

## layerPosix

Provides the `Path` service using Node's POSIX path implementation plus
file URL conversion helpers.

**Signature**

```ts
declare const layerPosix: Layer.Layer<Path, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodePath.ts#L47)

Since v4.0.0

## layerWin32

Provides the `Path` service using Node's Windows path implementation plus
file URL conversion helpers.

**Signature**

```ts
declare const layerWin32: Layer.Layer<Path, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodePath.ts#L61)

Since v4.0.0
