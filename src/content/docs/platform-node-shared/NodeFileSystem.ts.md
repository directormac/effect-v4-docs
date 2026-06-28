---
title: NodeFileSystem.ts
nav_order: 5
parent: "@effect/platform-node-shared"
---

## NodeFileSystem.ts overview

Shared Node-compatible implementation of Effect's `FileSystem` service.

This module adapts Node's `node:fs`, `node:os`, and `node:path` APIs into a
`FileSystem` layer for Effect programs running on Node-compatible runtimes.
Platform packages use it to provide file and directory I/O, permissions,
links, metadata, temporary files and directories, and file watching through
the shared `FileSystem` service.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)

---

# layers

## layer

Provides the `FileSystem` service backed by Node filesystem APIs, including
file operations, directory operations, links, metadata, and file watching.

**Signature**

```ts
declare const layer: Layer.Layer<FileSystem.FileSystem, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeFileSystem.ts#L652)

Since v4.0.0
