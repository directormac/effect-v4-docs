---
title: NodeFileSystem.ts
nav_order: 7
parent: "@effect/platform-node"
---

## NodeFileSystem.ts overview

Node.js `FileSystem` layer for programs that perform real filesystem I/O.

The exported layer satisfies the platform-independent `FileSystem` service
with Node-backed operations for files, directories, metadata, permissions,
links, temporary paths, and path watching. Effects still call the service from
`effect/FileSystem`; this module only chooses the Node implementation.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Provides the `FileSystem` service backed by Node filesystem APIs.

**Signature**

```ts
declare const layer: Layer.Layer<FileSystem, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeFileSystem.ts#L21)

Since v4.0.0
