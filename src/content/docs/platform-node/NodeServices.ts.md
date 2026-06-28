---
title: NodeServices.ts
nav_order: 17
parent: "@effect/platform-node"
---

## NodeServices.ts overview

Aggregate Node.js platform services layer.

This module defines the `NodeServices` union and a single `layer` that
provides Node-backed child process spawning, crypto, filesystem, path, stdio,
and terminal services. Use the layer when a Node program wants the standard
platform services from one place.

Since v4.0.0

---

## Exports Grouped by Category

- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [NodeServices (type alias)](#nodeservices-type-alias)

---

# layers

## layer

Provides the default Node implementations for child process spawning,
filesystem, path, stdio, and terminal services.

**Signature**

```ts
declare const layer: Layer.Layer<NodeServices, never, never>
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeServices.ts#L41)

Since v4.0.0

# models

## NodeServices (type alias)

The union of core services provided by the Node platform layer, including
child process spawning, filesystem, path, stdio, and terminal services.

**Signature**

```ts
type NodeServices = ChildProcessSpawner | Crypto | FileSystem | Path | Stdio | Terminal
```

[Source](https://github.com/Effect-TS/effect/tree/main/packages/platform-node/src/NodeServices.ts#L32)

Since v4.0.0
